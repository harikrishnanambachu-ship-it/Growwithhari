import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, CheckCheck, RotateCcw, Bot } from "lucide-react";

const STAGES = ["Lead sources", "WhatsApp AI", "CRM pipeline", "Qualified?", "Booking or sale", "Onboarding", "Reviews, repeat"];

const SCRIPT = [
  { t: "sys", s: 0, text: "New lead · Instagram ad" },
  { t: "in", s: 0, text: "Hi, I saw your ad. What are your membership plans?" },
  { t: "out", s: 1, text: "Hi! Thanks for reaching out. May I have your name and what you're looking for?" },
  { t: "in", s: 1, text: "Arjun. Weight loss, morning batch preferred." },
  { t: "out", s: 1, text: "Great, Arjun. What monthly budget works for you?" },
  { t: "in", s: 1, text: "Around ₹2,000" },
  { t: "sys", s: 2, text: "Saved to CRM · source: Instagram · assigned to sales" },
  { t: "sys", s: 3, text: "Qualified · budget and timing match" },
  { t: "out", s: 3, text: "We have a 7 AM batch that fits. Shall I book you a free trial session?" },
  { t: "in", s: 4, text: "Yes, tomorrow 7 AM please" },
  { t: "out", s: 4, text: "Booked! Free trial tomorrow at 7:00 AM. You'll get a reminder tonight." },
  { t: "sys", s: 5, text: "Reminder sent automatically · 8:00 PM" },
  { t: "out", s: 6, text: "How was your first session, Arjun? A quick review would mean a lot to us." },
  { t: "in", s: 6, text: "Loved it! Leaving a review now." },
];
const DELAY = { in: 1500, out: 1300, sys: 1000 };

const Bubble = ({ m }) => {
  if (m.t === "sys") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mx-auto my-1 rounded-full border border-mint/30 bg-mint/10 px-3 py-1 text-center font-mono text-[10px] text-mint">
        {m.text}
      </motion.div>
    );
  }
  const out = m.t === "out";
  return (
    <motion.div initial={{ opacity: 0, y: 12, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 26 }}
      className={`max-w-[82%] rounded-2xl px-3 py-2 text-[13px] leading-snug ${out ? "self-end rounded-br-md bg-forest text-bone" : "self-start rounded-bl-md bg-[#1d2a23] text-bone/90"}`}>
      {m.text}
      {out && <CheckCheck className="ml-1 inline h-3 w-3 text-mint" />}
    </motion.div>
  );
};

const Typing = () => (
  <div className="self-end flex gap-1 rounded-2xl rounded-br-md bg-forest px-3 py-3">
    {[0, 1, 2].map((i) => (
      <motion.span key={i} className="h-1.5 w-1.5 rounded-full bg-mint" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }} />
    ))}
  </div>
);

const Phone = ({ shown, typing }) => (
  <div className="relative mx-auto w-full max-w-[320px] rounded-[2.6rem] border border-mint/30 bg-ink p-2.5 shadow-[0_40px_120px_-40px_rgba(16,185,129,0.6)]">
    <div className="overflow-hidden rounded-[2.1rem] bg-[#0b120e]">
      <div className="flex items-center gap-3 bg-forest/70 px-4 pb-3 pt-6">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-mint text-ink"><Bot className="h-4 w-4" /></span>
        <div className="flex-1">
          <p className="text-sm font-semibold text-bone">Studio Assistant</p>
          <p className="text-[11px] text-mint">{typing ? "typing…" : "online · replies instantly"}</p>
        </div>
      </div>
      <div data-testid="chat-demo-messages" className="flex h-[440px] flex-col justify-end gap-2 overflow-hidden px-3 py-4 [background-image:radial-gradient(rgba(120,200,160,0.06)_1px,transparent_1px)] [background-size:16px_16px]">
        {shown.map((m, i) => <Bubble key={i} m={m} />)}
        {typing && <Typing />}
      </div>
      <div className="flex items-center gap-2 border-t border-line px-3 py-3">
        <div className="flex-1 rounded-full bg-[#1d2a23] px-4 py-2 text-xs text-sage">Message</div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-mint text-ink"><Check className="h-4 w-4" /></span>
      </div>
    </div>
  </div>
);

export const ChatDemo = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    if (!inView) return undefined;
    if (count >= SCRIPT.length) {
      const r = setTimeout(() => setCount(0), 5000);
      return () => clearTimeout(r);
    }
    const m = SCRIPT[count];
    if (m.t === "out") setTyping(true);
    const t = setTimeout(() => { setTyping(false); setCount((c) => c + 1); }, DELAY[m.t]);
    return () => clearTimeout(t);
  }, [inView, count]);

  const stage = SCRIPT[Math.max(count - 1, 0)].s;
  const shown = SCRIPT.slice(0, count).slice(-9);

  return (
    <div ref={ref} data-testid="chat-demo" className="relative grid items-center gap-12 overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-panel via-moss to-ink p-5 sm:p-10 lg:grid-cols-[1fr_1.1fr]">
      <div className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 rounded-full bg-jade/15 blur-[100px]" />
      <div className="relative"><Phone shown={shown} typing={typing} /></div>
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint">Live demo · sample conversation</p>
        <p className="mt-3 font-display text-3xl sm:text-4xl font-light leading-tight text-bone">Watch one lead travel <em className="italic text-mint">the whole journey.</em></p>
        <ol className="relative mt-8 space-y-2 pl-8">
          <span className="absolute bottom-3 left-[11px] top-3 w-px bg-line" />
          <motion.span className="absolute left-[11px] top-3 w-px bg-mint shadow-[0_0_10px_#10B981]" animate={{ height: `${(stage / (STAGES.length - 1)) * 94}%` }} transition={{ duration: 0.6 }} />
          {STAGES.map((s, i) => (
            <li key={s} data-testid={`chat-stage-${i}`} className="relative flex items-center gap-3">
              <span className={`absolute -left-8 grid h-6 w-6 place-items-center rounded-full border font-mono text-[10px] transition-[background-color,border-color,box-shadow] duration-500 ${
                i === stage ? "border-mint bg-mint text-ink shadow-[0_0_20px_rgba(16,185,129,0.8)]" : i < stage ? "border-mint/70 bg-forest text-mint" : "border-mint/30 bg-ink text-sage"}`}>{i + 1}</span>
              <span className={`rounded-xl px-3 py-2 text-sm transition-colors duration-500 ${i === stage ? "bg-mint/10 text-bone" : i < stage ? "text-bone/80" : "text-sage"}`}>{s}</span>
            </li>
          ))}
        </ol>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-full border border-line px-4 py-2 font-mono text-xs text-sage">Dashboard: lead {stage >= 2 ? "logged" : "incoming"} · {count >= 11 ? "booking confirmed" : "in progress"}</span>
          <button data-testid="chat-demo-replay" onClick={() => setCount(0)} className="inline-flex items-center gap-2 rounded-full border border-mint/40 px-4 py-2 text-xs text-mint hover:bg-mint hover:text-ink">
            <RotateCcw className="h-3.5 w-3.5" /> Replay
          </button>
        </div>
      </div>
    </div>
  );
};
