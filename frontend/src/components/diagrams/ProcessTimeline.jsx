import { motion } from "framer-motion";
import { Search, Map, Hammer, Rocket, RefreshCw } from "lucide-react";
import { PROCESS } from "@/lib/content";
import { EASE } from "@/components/site/Reveal";
import { useAutoStep, StepPills, glowNode } from "@/lib/useAutoStep";

const ICONS = [Search, Map, Hammer, Rocket, RefreshCw];

const Step = ({ p, i, active, pick }) => {
  const Icon = ICONS[i];
  const on = i === active, done = i < active;
  return (
    <motion.button
      data-testid={`process-step-${i}`}
      onClick={() => pick(i)}
      onMouseEnter={() => pick(i)}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
      className={`relative rounded-2xl border p-4 text-left transition-[border-color,background-color,transform,box-shadow] duration-500 md:border-0 md:p-0 md:pr-3 ${on ? "border-mint/60 bg-mint/[0.06] md:-translate-y-1 md:bg-transparent" : "border-line"}`}
    >
      <span className="relative z-10 grid h-14 w-14 place-items-center">
        {on && <motion.span layoutId="process-halo" className="absolute inset-0 rounded-2xl bg-mint/25 blur-md" />}
        <span className={`relative grid h-12 w-12 rotate-45 place-items-center rounded-xl border transition-[background-color,border-color,box-shadow] duration-500 ${glowNode(on, done)}`}>
          <Icon className={`h-5 w-5 -rotate-45 ${on ? "text-ink" : "text-mint"}`} />
        </span>
      </span>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-sage">Step {i + 1} · {p.time}</p>
      <p className={`mt-1 font-display text-2xl font-light transition-colors ${on ? "text-mint" : "text-bone"}`}>{p.step}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-sage">
        {p.items.map((t) => <li key={t} className="flex gap-2"><span className="text-mint">—</span>{t}</li>)}
      </ul>
    </motion.button>
  );
};

export const ProcessTimeline = () => {
  const { active, pick, release } = useAutoStep(PROCESS.length, 2800);
  return (
    <div data-testid="process-timeline" onMouseLeave={release}
      className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-panel via-moss to-ink p-5 sm:p-10">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-jade/15 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#78C8A0_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mb-8 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint">Engagement process</p>
        <StepPills n={PROCESS.length} active={active} />
      </div>
      <div className="relative grid gap-4 md:grid-cols-5">
        <div className="absolute left-7 right-[10%] top-7 hidden h-[2px] rounded-full bg-line md:block" />
        <motion.div className="absolute left-7 top-7 hidden h-[2px] rounded-full bg-gradient-to-r from-jade to-mint shadow-[0_0_12px_#10B981] md:block"
          animate={{ width: `${(active / 4) * 80}%` }} transition={{ duration: 0.8, ease: EASE }} />
        <motion.span className="absolute top-[25px] hidden h-2 w-2 rounded-full bg-bone shadow-[0_0_14px_#A8E3C5] md:block"
          animate={{ left: ["3%", "83%"] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />
        {PROCESS.map((p, i) => <Step key={p.step} p={p} i={i} active={active} pick={pick} />)}
      </div>
      <div className="relative mt-8 flex items-center gap-3 text-xs sm:text-sm text-mint">
        <RefreshCw className="h-4 w-4 spin-slow" style={{ animationDuration: "8s" }} />
        <span className="font-mono">each review feeds the next round of building</span>
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        data-testid="process-detail" className="relative mt-5 overflow-hidden rounded-2xl border border-mint/25 bg-ink/70 p-5 sm:p-6">
        <motion.span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }} />
        <p className="font-display text-xl text-bone"><span className="font-mono text-sm text-mint">{String(active + 1).padStart(2, "0")} · </span>{PROCESS[active].step}</p>
        <p className="mt-2 text-sm sm:text-base text-sage">{PROCESS[active].text}</p>
      </motion.div>
    </div>
  );
};
