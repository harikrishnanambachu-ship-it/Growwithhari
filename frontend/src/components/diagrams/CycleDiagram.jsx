import { motion } from "framer-motion";
import { useAutoStep, StepPills } from "@/lib/useAutoStep";

const RING = "M50 8 A42 42 0 1 1 49.99 8";

export const CycleDiagram = ({ steps, id, centerLabel, icons = [], loop = true }) => {
  const n = steps.length;
  const { active, pick } = useAutoStep(n, 2800);
  const arc = 2 * Math.PI * 42;
  const angle = (i) => (i / n) * Math.PI * 2 - Math.PI / 2;
  const a = angle(active);

  return (
    <div data-testid={`cycle-${id}`} className="relative grid items-center gap-10 overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-panel via-moss to-ink p-5 sm:p-10 lg:grid-cols-2">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-jade/15 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#78C8A0_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        <div className="absolute inset-[20%] rounded-full bg-jade/10 blur-2xl" />
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full overflow-visible">
          <defs>
            <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#A8E3C5" /></linearGradient>
          </defs>
          <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(120,200,160,0.15)" strokeWidth="0.5" />
          <motion.circle cx="50" cy="50" r="42" fill="none" stroke={`url(#g-${id})`} strokeWidth="1" strokeLinecap="round" transform="rotate(-90 50 50)"
            style={{ filter: "drop-shadow(0 0 2px #10B981)" }}
            strokeDasharray={arc} animate={{ strokeDashoffset: arc - (arc * (active + 1)) / n }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} />
          <motion.line x1="50" y1="50" animate={{ x2: 50 + 34 * Math.cos(a), y2: 50 + 34 * Math.sin(a) }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            stroke="#78C8A0" strokeWidth="0.4" strokeDasharray="1 1.5" opacity="0.7" />
          <circle r="1.1" fill="#F1F7F3" style={{ filter: "drop-shadow(0 0 2px #A8E3C5)" }}>
            <animateMotion dur="7s" repeatCount="indefinite" path={RING} />
          </circle>
        </svg>
        <svg viewBox="0 0 100 100" className="absolute inset-[14%] h-[72%] w-[72%] spin-slow">
          <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(120,200,160,0.25)" strokeWidth="0.4" strokeDasharray="1 3" />
        </svg>
        {steps.map((s, i) => {
          const Icon = icons[i];
          const on = active === i, done = i < active;
          return (
            <button key={s.title} data-testid={`cycle-${id}-node-${i}`} onClick={() => pick(i)} onMouseEnter={() => pick(i)}
              style={{ left: `${50 + 42 * Math.cos(angle(i))}%`, top: `${50 + 42 * Math.sin(angle(i))}%` }}
              className="absolute grid h-12 w-12 sm:h-14 sm:w-14 -translate-x-1/2 -translate-y-1/2 place-items-center">
              {on && <motion.span layoutId={`halo-${id}`} className="absolute inset-0 rounded-2xl bg-mint/30 blur-md" />}
              <span className={`relative grid h-10 w-10 sm:h-12 sm:w-12 rotate-45 place-items-center rounded-xl border transition-[background-color,border-color,box-shadow] duration-500 ${
                on ? "border-mint bg-mint shadow-[0_0_36px_rgba(16,185,129,0.7)]" : done ? "border-mint/70 bg-forest" : "border-mint/35 bg-ink"}`}>
                <span className={`-rotate-45 ${on ? "text-ink" : "text-mint"}`}>
                  {Icon ? <Icon className="h-4 w-4 sm:h-5 sm:w-5" /> : <span className="font-mono text-xs">{i + 1}</span>}
                </span>
              </span>
            </button>
          );
        })}
        <div className="absolute inset-[24%] grid place-items-center rounded-full text-center">
          <motion.div key={active} initial={{ opacity: 0, scale: 0.9, filter: "blur(6px)" }} animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} transition={{ duration: 0.5 }} className="px-1">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint">{centerLabel} · {active + 1}/{n}</p>
            <p className="mt-2 font-display text-lg sm:text-3xl font-light leading-tight text-bone">{steps[active].title}</p>
            <p className="mt-1 text-xs sm:text-sm text-sage">{steps[active].sub}</p>
          </motion.div>
        </div>
      </div>
      <div className="relative">
        <StepPills n={n} active={active} className="mb-5" />
        <ol className="space-y-2">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button data-testid={`cycle-${id}-item-${i}`} onClick={() => pick(i)}
                className={`relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 text-left transition-[border-color,background-color,transform] duration-500 ${active === i ? "translate-x-1 border-mint/60 bg-mint/[0.08]" : "border-line hover:border-mint/30"}`}>
                {active === i && <motion.span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />}
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
    </div>
  );
};
