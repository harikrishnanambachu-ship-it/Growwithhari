import ipaddress
import logging
import os
import re
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

import httpx

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": os.environ["EMAIL_FROM_NAME"]}
    async with httpx.AsyncClient(timeout=30) as client:
        resp = await client.post(
            f"{EMAIL_BASE_URL}/api/v1/email/send",
            headers={"X-Email-Key": os.environ["EMERGENT_EMAIL_KEY"]},
            json=payload,
        )
    if resp.status_code >= 400:
        try:
            info = resp.json()
        except ValueError:
            info = {}
        if info.get("code") in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning("Email paused: %s (%s): %s", info.get("code"), resp.status_code, info.get("message", ""))
        else:
            logger.error("Email send failed: %s %s", resp.status_code, resp.text)
        return None
    return resp.json().get("id")


def _row(label: str, value: str) -> str:
    return (f'<tr><td style="padding:6px 0;color:#6b7c72;font-size:13px;width:110px;vertical-align:top">{label}</td>'
            f'<td style="padding:6px 0;color:#0d1410;font-size:14px">{value}</td></tr>')


async def notify_owner_new_message(msg: dict) -> None:
    try:
        name = escape(msg.get("name", ""))
        email = escape(msg.get("email", ""))
        rows = _row("Name", name) + _row("Email", f'<a href="mailto:{email}" style="color:#1F5A3D">{email}</a>')
        if msg.get("phone"):
            rows += _row("Phone", escape(msg["phone"]))
        if msg.get("business"):
            rows += _row("Business", escape(msg["business"]))
        if msg.get("topic"):
            rows += _row("Interested in", escape(msg["topic"]))
        brand = escape(os.environ["EMAIL_FROM_NAME"])
        message = escape(msg.get("message", "")).replace("\n", "<br>")
        html = (
            '<table role="presentation" width="100%" style="background:#f1f7f3;padding:24px 0"><tr><td align="center">'
            '<table role="presentation" width="560" style="background:#ffffff;border-radius:16px;padding:28px;font-family:Arial,sans-serif">'
            f'<tr><td style="font-size:12px;letter-spacing:3px;color:#1F5A3D;font-weight:bold">{brand.upper()}</td></tr>'
            '<tr><td style="padding-top:10px;font-size:22px;color:#0d1410">New enquiry from the website</td></tr>'
            f'<tr><td style="padding-top:18px"><table role="presentation" width="100%">{rows}</table></td></tr>'
            f'<tr><td style="padding-top:16px;font-size:14px;color:#0d1410;line-height:1.6;border-top:1px solid #e3ece6">{message}</td></tr>'
            f'<tr><td style="padding-top:22px;font-size:12px;color:#6b7c72">Sent by {brand}. This message is also saved in your owner inbox on the website.</td></tr>'
            '</table></td></tr></table>'
        )
        await send_email(to=os.environ["OWNER_EMAIL"], subject=f"New enquiry from {msg.get('name', '')[:60]}", html=html)
    except Exception as exc:
        logger.error("Owner notification failed: %s", exc)
