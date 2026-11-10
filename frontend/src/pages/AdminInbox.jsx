import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Trash2, MailOpen, Mail, LogOut } from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { api, errMsg } from "@/lib/api";

const MessageCard = ({ m, onToggle, onDelete }) => (
  <li data-testid={`inbox-item-${m.id}`} className={`rounded-2xl border p-5 sm:p-6 ${m.read ? "border-line bg-panel/40" : "border-mint/50 bg-forest/20"}`}>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div>
        <p className="flex items-center gap-2 font-semibold text-bone">{!m.read && <span className="h-2 w-2 rounded-full bg-mint" />}{m.name}</p>
        <p className="text-sm text-sage">
          <a href={`mailto:${m.email}`} className="hover:text-mint">{m.email}</a>{m.phone && <> · <a href={`tel:${m.phone}`} className="hover:text-mint">{m.phone}</a></>}{m.business && <> · {m.business}</>}
        </p>
      </div>
      <p className="font-mono text-xs text-sage">{new Date(m.created_at).toLocaleString()}</p>
    </div>
    {m.topic && <p className="mt-3 inline-block rounded-full border border-mint/40 px-3 py-1 text-xs text-mint">{m.topic}</p>}
    <p className="mt-3 whitespace-pre-wrap text-sm text-bone/90">{m.message}</p>
    <div className="mt-4 flex gap-2">
      <button data-testid={`inbox-toggle-${m.id}`} onClick={() => onToggle(m)} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-sage hover:text-bone">
        {m.read ? <Mail className="h-3.5 w-3.5" /> : <MailOpen className="h-3.5 w-3.5" />}{m.read ? "Mark unread" : "Mark read"}
      </button>
      <button data-testid={`inbox-delete-${m.id}`} onClick={() => onDelete(m)} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-xs text-sage hover:border-red-300/50 hover:text-red-300">
        <Trash2 className="h-3.5 w-3.5" />Delete
      </button>
    </div>
  </li>
);

export default function AdminInbox() {
  const nav = useNavigate();
  const [items, setItems] = useState(null);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get("/admin/messages");
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      if (e?.response?.status === 401) nav("/admin");
      else { toast.error(errMsg(e)); setItems([]); }
    }
  }, [nav]);

  useEffect(() => { load(); }, [load]);

  const toggle = async (m) => { await api.patch(`/admin/messages/${m.id}`, { read: !m.read }); load(); };
  const remove = async (m) => {
    if (!window.confirm(`Delete message from ${m.name}?`)) return;
    await api.delete(`/admin/messages/${m.id}`); toast.success("Message deleted"); load();
  };
  const logout = async () => { await api.post("/auth/logout"); nav("/admin"); };
  const unread = (items || []).filter((m) => !m.read).length;

  return (
    <div className="min-h-screen bg-ink px-5 py-8 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between">
          <Link to="/" data-testid="inbox-home"><Logo className="h-12 w-auto" tag={false} /></Link>
          <button onClick={logout} data-testid="inbox-logout" className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-sage hover:text-bone"><LogOut className="h-4 w-4" />Log out</button>
        </div>
        <h1 className="mt-10 font-display text-4xl font-light text-bone">Inbox</h1>
        <p data-testid="inbox-count" className="mt-2 text-sage">{items ? `${items.length} messages · ${unread} unread` : "Loading…"}</p>
        <ul className="mt-8 space-y-4">
          {items?.length === 0 && <li data-testid="inbox-empty" className="rounded-2xl border border-line p-8 text-center text-sage">No messages yet.</li>}
          {items?.map((m) => <MessageCard key={m.id} m={m} onToggle={toggle} onDelete={remove} />)}
        </ul>
      </div>
    </div>
  );
}
