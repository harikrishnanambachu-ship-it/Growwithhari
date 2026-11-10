import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const CycleDiagram = ({ steps, id, centerLabel, loop = true }) => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = steps.length;

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % n), 2800);
    return () => clearInterval(t);
  }, [paused, n]);

  const pick = (i) => { setActive(i); setPaused(true); };
  const arc = 2 * Math.PI * 42;

  return (
    <div data-testid={`cycle-${id}`} className="grid items-center gap-10 lg:grid-cols-2">
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(120,200,160,0.15)" strokeWidth="0.4" />
          <motion.circle cx="50" cy="50" r="42" fill="none" stroke="#78C8A0" strokeWidth="0.6" strokeLinecap="round"
            strokeDasharray={arc} animate={{ strokeDashoffset: arc - (arc * (active + 1)) / n }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-[14%] h-[72%] w-[72%] spin-slow">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(120,200,160,0.25)" strokeWidth="0.4" strokeDasharray="1 3" />
        </svg>
        {steps.map((s, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return (
            <button key={s.title} data-testid={`cycle-${id}-node-${i}`} onClick={() => pick(i)}
              style={{ left: `${50 + 42 * Math.cos(a)}%`, top: `${50 + 42 * Math.sin(a)}%` }}
              className={`absolute grid h-10 w-10 sm:h-12 sm:w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border font-mono text-xs transition-[background-color,transform,box-shadow] duration-500 ${
                active === i ? "scale-110 border-mint bg-mint text-ink shadow-[0_0_30px_rgba(16,185,129,0.6)]" : "border-mint/40 bg-ink text-mint hover:bg-forest"
              }`}>
              {i + 1}
            </button>
          );
        })}
        <div className="absolute inset-[22%] grid place-items-center rounded-full text-center">
          <motion.div key={active} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="px-2">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint">{centerLabel} · {active + 1}/{n}</p>
            <p className="mt-2 font-display text-xl sm:text-3xl font-light leading-tight text-bone">{steps[active].title}</p>
            <p className="mt-1 text-xs sm:text-sm text-sage">{steps[active].sub}</p>
          </motion.div>
        </div>
      </div>
      <ol className="space-y-2">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button data-testid={`cycle-${id}-item-${i}`} onClick={() => pick(i)}
              className={`group flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-colors duration-300 ${active === i ? "border-mint/60 bg-mint/[0.08]" : "border-line hover:border-mint/30"}`}>
              <span className={`font-mono text-xs ${active === i ? "text-mint" : "text-sage"}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">
                <span className="block font-semibold text-bone">{s.title}</span>
                <span className="block text-sm text-sage">{s.sub}</span>
              </span>
              {active === i && <motion.span layoutId={`dot-${id}`} className="h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_#10B981]" />}
            </button>
          </li>
        ))}
        {loop && <li className="pt-2 font-mono text-xs text-mint">↻ repeat the cycle</li>}
      </ol>
    </div>
  );
};
