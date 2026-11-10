import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/site/Logo";
import { api, errMsg } from "@/lib/api";

export default function AdminLogin() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setError("");
    try {
      await api.post("/auth/login", { email, password });
      nav("/admin/inbox");
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-5">
      <form onSubmit={submit} data-testid="admin-login-form" className="w-full max-w-sm rounded-[2rem] border border-line bg-panel/70 p-8">
        <Link to="/" data-testid="admin-back-home"><Logo className="mx-auto h-16 w-auto" /></Link>
        <p className="mt-8 text-center font-display text-2xl font-light text-bone">Owner inbox</p>
        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" data-testid="admin-email"
          className="mt-8 w-full rounded-xl border border-line bg-ink px-4 py-3 text-bone outline-none focus:border-mint" />
        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" data-testid="admin-password"
          className="mt-3 w-full rounded-xl border border-line bg-ink px-4 py-3 text-bone outline-none focus:border-mint" />
        {error && <p data-testid="admin-login-error" className="mt-3 text-sm text-red-300">{error}</p>}
        <button type="submit" disabled={busy} data-testid="admin-login-submit" className="mt-6 w-full rounded-full bg-mint py-3 font-semibold text-ink hover:bg-bone disabled:opacity-60">
          {busy ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
