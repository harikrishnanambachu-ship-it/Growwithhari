import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Phone, MessageCircle, Check } from "lucide-react";
import { PageHero, Section } from "@/components/site/PageBits";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT } from "@/lib/content";
import { api, hasApi, errMsg } from "@/lib/api";

const TOPICS = ["Growth Clarity Call", "Track A · Growth and Investor Readiness", "Track B · AI Build and Automation", "Track C · Founders Training Program", "Something else"];
const empty = { name: "", email: "", phone: "", business: "", topic: TOPICS[0], message: "", website: "" };

const Field = ({ label, children }) => (
  <label className="block">
    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sage">{label}</span>
    {children}
  </label>
);
const inputCls = "mt-2 w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-bone placeholder:text-sage/60 outline-none transition-colors focus:border-mint";

const Channels = () => (
  <div className="space-y-4">
    {[
      { icon: MessageCircle, label: "WhatsApp", value: "7592830276", href: CONTACT.whatsapp, id: "whatsapp" },
      { icon: Phone, label: "Phone", value: CONTACT.phone, href: `tel:${CONTACT.tel}`, id: "phone" },
      { icon: Mail, label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, id: "email" },
    ].map((c, i) => (
      <Reveal key={c.id} delay={i * 0.08}>
        <a href={c.href} target={c.id === "whatsapp" ? "_blank" : undefined} rel="noopener noreferrer" data-testid={`contact-${c.id}`}
          className="group flex items-center gap-5 rounded-[1.5rem] border border-line bg-panel/60 p-5 transition-colors hover:border-mint/60 hover:bg-forest/20">
          <span className="grid h-12 w-12 place-items-center rounded-full border border-mint/40 text-mint transition-colors group-hover:bg-mint group-hover:text-ink"><c.icon className="h-5 w-5" /></span>
          <span><span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-sage">{c.label}</span><span className="text-lg text-bone">{c.value}</span></span>
        </a>
      </Reveal>
    ))}
  </div>
);

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    if (!hasApi) { toast.error("Form is unavailable right now. Please WhatsApp us instead."); return; }
    setBusy(true);
    try {
      await api.post("/contact", form);
      setSent(true);
      setForm(empty);
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageHero testid="contact-hero" eyebrow="Get started"
        lines={["Ready to", <em key="r" className="italic text-mint">grow smarter?</em>]}
        text="Book a free Growth Clarity Call through the website or WhatsApp 7592830276. We will review your business and suggest the next step." />
      <Section testid="contact-body" className="pt-0 pb-32">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5"><Channels /></div>
          <Reveal className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel/60 p-6 sm:p-10">
              {sent ? (
                <motion.div data-testid="contact-success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-16 text-center">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-mint text-ink"><Check className="h-8 w-8" /></span>
                  <p className="mt-6 font-display text-3xl font-light text-bone">Thank you. Message received.</p>
                  <p className="mt-3 text-sage">The Grow With Hari team will get back to you shortly.</p>
                  <button data-testid="contact-send-another" onClick={() => setSent(false)} className="mt-8 text-sm text-mint hover:text-bone">Send another message</button>
                </motion.div>
              ) : (
                <form onSubmit={submit} data-testid="contact-form" className="grid gap-7 sm:grid-cols-2">
                  <Field label="Your name *"><input required value={form.name} onChange={set("name")} data-testid="contact-name" className={inputCls} placeholder="Full name" /></Field>
                  <Field label="Email *"><input required type="email" value={form.email} onChange={set("email")} data-testid="contact-email-input" className={inputCls} placeholder="you@business.com" /></Field>
                  <Field label="Phone / WhatsApp"><input value={form.phone} onChange={set("phone")} data-testid="contact-phone-input" className={inputCls} placeholder="+91" /></Field>
                  <Field label="Business"><input value={form.business} onChange={set("business")} data-testid="contact-business" className={inputCls} placeholder="Business name and city" /></Field>
                  <div className="sm:col-span-2">
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-sage">I'm interested in</span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {TOPICS.map((t, i) => (
                        <button type="button" key={t} data-testid={`contact-topic-${i}`} onClick={() => setForm((f) => ({ ...f, topic: t }))}
                          className={`rounded-full border px-4 py-2 text-xs sm:text-sm transition-colors ${form.topic === t ? "border-mint bg-mint text-ink" : "border-line text-sage hover:text-bone"}`}>{t}</button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2"><Field label="Tell us about your business *"><textarea required rows={4} value={form.message} onChange={set("message")} data-testid="contact-message" className={`${inputCls} resize-none`} placeholder="Where are you today, and where do you want to be?" /></Field></div>
                  <input tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} className="hidden" aria-hidden="true" />
                  <div className="sm:col-span-2">
                    <button type="submit" disabled={busy} data-testid="contact-submit"
                      className="w-full rounded-full bg-mint px-8 py-4 font-semibold text-ink transition-colors hover:bg-bone disabled:opacity-60 sm:w-auto">
                      {busy ? "Sending…" : "Book my Growth Clarity Call"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </Section>
    </>
  );
}
