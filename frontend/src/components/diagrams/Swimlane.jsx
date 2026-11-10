import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/components/site/Reveal";

const Cell = ({ text, i, active, setActive, tone, testid }) => (
  <motion.div
    data-testid={testid}
    onMouseEnter={() => setActive(i)}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, ease: EASE, delay: 0.25 + i * 0.1 + (tone === "you" ? 0.15 : 0) }}
    className={`rounded-2xl border p-4 text-sm leading-snug transition-[background-color,border-color,transform] duration-300 ${
      active === i
        ? "border-mint/70 bg-mint/15 text-bone -translate-y-1"
        : tone === "we"
          ? "border-mint/20 bg-forest/25 text-bone/90"
          : "border-line bg-ink/60 text-sage"
    }`}
  >
    {text}
  </motion.div>
);

const LaneLabel = ({ title, sub, we }) => (
  <div className="flex flex-col justify-center pr-2">
    <span className={`font-mono text-[11px] uppercase tracking-[0.2em] ${we ? "text-mint" : "text-sage"}`}>{title}</span>
    <span className="mt-1 text-sm text-bone">{sub}</span>
  </div>
);

export const Swimlane = ({ chart, id }) => {
  const [active, setActive] = useState(null);
  const youLabel = chart.youLabel || "Your team";
  return (
    <div data-testid={`swimlane-${id}`} className="rounded-[1.75rem] border border-line bg-panel/70 p-5 sm:p-8" onMouseLeave={() => setActive(null)}>
      <p className="font-display text-xl sm:text-2xl font-light text-bone">{chart.title}</p>
      <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-sage">How you work with us</p>

      <div className="mt-8 hidden md:grid grid-cols-[150px_repeat(4,minmax(0,1fr))] gap-3">
        <div />
        <div className="relative col-span-4 grid grid-cols-4 gap-3">
          <motion.div
            className="absolute left-[12.5%] right-[12.5%] top-5 h-px origin-left bg-gradient-to-r from-mint via-jade to-mint"
            initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          {chart.steps.map((s, i) => (
            <button key={s} onMouseEnter={() => setActive(i)} onClick={() => setActive(i)} data-testid={`swimlane-${id}-step-${i}`}
              className="relative flex flex-col items-center gap-2">
              <span className={`grid h-10 w-10 place-items-center rounded-full border font-mono text-xs transition-colors duration-300 ${active === i ? "border-mint bg-mint text-ink" : "border-mint/50 bg-ink text-mint"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-sm font-semibold text-bone">{s}</span>
            </button>
          ))}
        </div>
        <LaneLabel title="We do" sub="Grow With Hari" we />
        {chart.we.map((t, i) => <Cell key={t} text={t} i={i} active={active} setActive={setActive} tone="we" testid={`swimlane-${id}-we-${i}`} />)}
        <LaneLabel title="You do" sub={youLabel} />
        {chart.you.map((t, i) => <Cell key={t} text={t} i={i} active={active} setActive={setActive} tone="you" testid={`swimlane-${id}-you-${i}`} />)}
      </div>

      <ol className="mt-6 space-y-3 md:hidden">
        {chart.steps.map((s, i) => (
          <li key={s} className="relative rounded-2xl border border-line bg-ink/50 p-4">
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-full border border-mint/50 font-mono text-[11px] text-mint">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-semibold text-bone">{s}</span>
            </div>
            <div className="mt-3 grid gap-2 text-sm">
              <p className="rounded-xl bg-forest/30 p-3 text-bone/90"><span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mint">We do</span>{chart.we[i]}</p>
              <p className="rounded-xl border border-line p-3 text-sage"><span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-sage">You do · {youLabel}</span>{chart.you[i]}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};
