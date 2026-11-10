import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/site/Reveal";

const NODES = [
  { id: "src", x: 20, y: 60, t: "Lead sources", s: "Ads, Google, website", d: "Every enquiry from Meta Ads, Google Business Profile, Instagram, Facebook and the website lands in one place." },
  { id: "wa", x: 260, y: 60, t: "WhatsApp AI", s: "replies in seconds", d: "An AI assistant on WhatsApp replies in seconds, answers common questions and collects name, need and budget." },
  { id: "crm", x: 500, y: 60, t: "CRM pipeline", s: "every lead tagged", d: "Each lead is saved, tagged by source and assigned to a salesperson." },
  { id: "book", x: 735, y: 290, t: "Booking or sale", s: "team takes over", d: "Ready leads go to your team, who book appointments, trials, consultations or orders." },
  { id: "onb", x: 480, y: 290, t: "Onboarding", s: "reminders, updates", d: "Automatic confirmations, reminders and updates keep new customers informed." },
  { id: "rev", x: 230, y: 290, t: "Reviews, repeat", s: "renewals, referrals", d: "Renewal reminders, review requests and referral offers go out automatically after each sale." },
];
const W = 170, H = 80;
const FLOW = ["M190 100 L260 100", "M430 100 L500 100", "M670 100 L760 100", "M820 150 L820 290", "M735 330 L650 330", "M480 330 L400 330"];
const NURTURE = "M820 50 L820 22 L345 22 L345 60";

const Pulse = ({ path, delay }) => (
  <circle r="4" fill="#A8E3C5" style={{ filter: "drop-shadow(0 0 6px #10B981)" }}>
    <animateMotion dur="2.4s" repeatCount="indefinite" begin={`${delay}s`} path={path} />
  </circle>
);

export const JourneyFlow = () => {
  const [active, setActive] = useState("wa");
  const current = active === "q"
    ? { t: "Qualified?", d: "One decision. Ready leads go straight to your team; leads not yet ready get a nurture sequence on WhatsApp." }
    : active === "dash"
      ? { t: "Live dashboard", d: "Every step feeds one live dashboard: leads, response time, conversion and sales." }
      : NODES.find((n) => n.id === active);
  return (
    <div data-testid="journey-flow" className="rounded-[1.75rem] border border-line bg-panel/60 p-4 sm:p-8">
      <div className="hidden md:block">
        <svg viewBox="0 0 1000 520" className="w-full">
          <defs>
            <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 Z" fill="#78C8A0" /></marker>
          </defs>
          {NODES.map((n) => <path key={n.id} d={`M${n.x + W / 2} ${n.y + H} L${n.x + W / 2} 440`} stroke="rgba(120,200,160,0.18)" strokeDasharray="2 6" />)}
          <path d="M820 150 L820 440" stroke="rgba(120,200,160,0.18)" strokeDasharray="2 6" />
          {FLOW.map((p, i) => (
            <motion.path key={p} d={p} stroke="#78C8A0" strokeWidth="1.6" fill="none" markerEnd="url(#arr)"
              initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.25, ease: EASE }} />
          ))}
          <path d={NURTURE} stroke="#10B981" strokeWidth="1.4" fill="none" className="dash-flow" markerEnd="url(#arr)" />
          <text x="582" y="14" textAnchor="middle" fill="#A9B8AF" fontSize="13" fontFamily="JetBrains Mono, monospace">not yet: nurture sequence on WhatsApp</text>
          <text x="832" y="226" fill="#78C8A0" fontSize="13" fontFamily="JetBrains Mono, monospace">yes</text>
          {FLOW.map((p, i) => <Pulse key={`p${i}`} path={p} delay={i * 0.4} />)}
          <Pulse path={NURTURE} delay={0.8} />

          {NODES.map((n, i) => (
            <motion.g key={n.id} data-testid={`journey-node-${n.id}`} onMouseEnter={() => setActive(n.id)} onClick={() => setActive(n.id)} style={{ cursor: "pointer" }}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: 0.2 + i * 0.12, duration: 0.6 }}>
              <rect x={n.x} y={n.y} width={W} height={H} rx="18" fill={active === n.id ? "rgba(120,200,160,0.18)" : "#0D1410"} stroke={active === n.id ? "#78C8A0" : "rgba(120,200,160,0.3)"} strokeWidth="1.2" />
              <text x={n.x + W / 2} y={n.y + 36} textAnchor="middle" fill="#F1F7F3" fontSize="16" fontFamily="Manrope, sans-serif" fontWeight="600">{n.t}</text>
              <text x={n.x + W / 2} y={n.y + 58} textAnchor="middle" fill="#A9B8AF" fontSize="13" fontFamily="Manrope, sans-serif">{n.s}</text>
            </motion.g>
          ))}
          <g data-testid="journey-node-q" onMouseEnter={() => setActive("q")} onClick={() => setActive("q")} style={{ cursor: "pointer" }}>
            <path d="M820 50 L880 100 L820 150 L760 100 Z" fill={active === "q" ? "#78C8A0" : "#1F5A3D"} stroke="#78C8A0" />
            <text x="820" y="105" textAnchor="middle" fill={active === "q" ? "#070B08" : "#F1F7F3"} fontSize="14" fontWeight="700" fontFamily="Manrope, sans-serif">Qualified?</text>
          </g>
          <g data-testid="journey-node-dash" onMouseEnter={() => setActive("dash")} onClick={() => setActive("dash")} style={{ cursor: "pointer" }}>
            <rect x="20" y="440" width="960" height="60" rx="18" fill={active === "dash" ? "rgba(120,200,160,0.2)" : "rgba(31,90,61,0.35)"} stroke="#78C8A0" strokeOpacity="0.6" />
            <text x="500" y="476" textAnchor="middle" fill="#F1F7F3" fontSize="15" fontFamily="Manrope, sans-serif" fontWeight="600">Live dashboard: leads, response time, conversion, sales</text>
          </g>
        </svg>
      </div>

      <ol className="space-y-2 md:hidden">
        {NODES.slice(0, 3).map((n, i) => <MobileNode key={n.id} n={n} i={i} />)}
        <li className="rounded-2xl bg-forest/50 p-4 text-center text-sm font-semibold text-bone">Qualified? <span className="block font-normal text-sage">yes → your team · not yet → nurture sequence on WhatsApp</span></li>
        {[NODES[3], NODES[4], NODES[5]].map((n, i) => <MobileNode key={n.id} n={n} i={i + 3} />)}
        <li className="rounded-2xl border border-mint/50 p-4 text-sm text-bone">Live dashboard: leads, response time, conversion, sales</li>
      </ol>

      <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-6 hidden md:flex items-start gap-4 rounded-2xl border border-line bg-ink/60 p-5">
        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-mint shadow-[0_0_12px_#10B981]" />
        <p className="text-sm text-sage"><span className="font-semibold text-bone">{current.t}. </span>{current.d}</p>
      </motion.div>
    </div>
  );
};

const MobileNode = ({ n, i }) => (
  <li className="flex gap-3 rounded-2xl border border-line bg-ink/50 p-4">
    <span className="font-mono text-xs text-mint">{String(i + 1).padStart(2, "0")}</span>
    <div><p className="text-sm font-semibold text-bone">{n.t}</p><p className="text-xs text-sage">{n.s}</p></div>
  </li>
);
