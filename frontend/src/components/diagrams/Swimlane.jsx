import { motion } from "framer-motion";
import { Compass, Layers, Rocket, LineChart, ArrowRight, Building2, User } from "lucide-react";
import { EASE } from "@/components/site/Reveal";
import { useAutoStep, StepPills } from "@/lib/useAutoStep";

const ICONS = [Compass, Layers, Rocket, LineChart];

const StepNode = ({ s, i, active, onPick, id }) => {
  const Icon = ICONS[i % 4];
  const on = i === active, done = i < active;
  return (
    <button data-testid={`swimlane-${id}-step-${i}`} onMouseEnter={() => onPick(i)} onClick={() => onPick(i)} className="relative z-10 flex flex-col items-center gap-3">
      <span className="relative grid h-16 w-16 place-items-center">
        {on && <motion.span layoutId={`halo-${id}`} className="absolute inset-0 rounded-2xl bg-mint/25 blur-md" />}
        <span className={`relative grid h-14 w-14 rotate-45 place-items-center rounded-2xl border transition-[background-color,border-color,box-shadow] duration-500 ${
          on ? "border-mint bg-mint shadow-[0_0_40px_rgba(16,185,129,0.65)]" : done ? "border-mint/70 bg-forest" : "border-mint/30 bg-ink"}`}>
          <Icon className={`h-5 w-5 -rotate-45 ${on ? "text-ink" : "text-mint"}`} />
        </span>
      </span>
      <span className="font-mono text-[10px] tracking-[0.25em] text-sage">STEP {String(i + 1).padStart(2, "0")}</span>
      <span className={`font-display text-xl transition-colors ${on ? "text-mint" : "text-bone"}`}>{s}</span>
    </button>
  );
};

const LaneCell = ({ text, i, active, tone, id, onPick }) => {
  const on = i === active;
  const we = tone === "we";
  return (
    <motion.div
      data-testid={`swimlane-${id}-${tone}-${i}`}
      onMouseEnter={() => onPick(i)}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.2 + i * 0.1 + (we ? 0 : 0.15) }}
      className={`relative min-h-[96px] overflow-hidden rounded-2xl border p-4 text-sm leading-snug transition-[border-color,background-color,transform,box-shadow] duration-500 ${
        on
          ? we ? "-translate-y-1 border-mint bg-gradient-to-br from-mint/25 to-forest/40 text-bone shadow-[0_20px_50px_-20px_rgba(16,185,129,0.7)]" : "-translate-y-1 border-bone/40 bg-white/[0.06] text-bone"
          : we ? "border-mint/20 bg-forest/20 text-bone/80" : "border-line bg-ink/50 text-sage"
      }`}
    >
      {on && <motion.span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />}
      {text}
    </motion.div>
  );
};

const LaneHead = ({ we, label }) => (
  <div className="flex items-center gap-3">
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${we ? "bg-mint text-ink" : "border border-line text-sage"}`}>
      {we ? <Building2 className="h-4 w-4" /> : <User className="h-4 w-4" />}
    </span>
    <div>
      <p className={`font-mono text-[10px] uppercase tracking-[0.22em] ${we ? "text-mint" : "text-sage"}`}>{we ? "We do" : "You do"}</p>
      <p className="text-sm font-semibold text-bone">{label}</p>
    </div>
  </div>
);

const Desktop = ({ chart, id, active, onPick, youLabel }) => (
  <div className="mt-10 hidden md:block">
    <div className="relative grid grid-cols-[170px_repeat(4,minmax(0,1fr))] gap-4">
      <div />
      <div className="relative col-span-4 grid grid-cols-4 gap-4">
        <div className="absolute left-[12.5%] right-[12.5%] top-8 h-[2px] rounded-full bg-line" />
        <motion.div className="absolute left-[12.5%] top-8 h-[2px] rounded-full bg-gradient-to-r from-jade to-mint shadow-[0_0_12px_#10B981]"
          animate={{ width: `${(active / 3) * 75}%` }} transition={{ duration: 0.8, ease: EASE }} />
        <motion.span className="absolute top-[29px] h-2 w-2 rounded-full bg-bone shadow-[0_0_14px_#A8E3C5]"
          animate={{ left: ["12.5%", "87.5%"] }} transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }} />
        {chart.steps.map((s, i) => <StepNode key={s} s={s} i={i} active={active} onPick={onPick} id={id} />)}
      </div>
      <div className="flex items-center"><LaneHead we label="Grow With Hari" /></div>
      {chart.we.map((t, i) => <LaneCell key={t} text={t} i={i} active={active} tone="we" id={id} onPick={onPick} />)}
      <div className="col-span-5 grid grid-cols-[170px_repeat(4,minmax(0,1fr))] gap-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-sage/80 self-center">handoff</span>
        {chart.steps.map((s, i) => (
          <div key={s} className="flex justify-center">
            <svg width="2" height="26" className="overflow-visible">
              <line x1="1" y1="0" x2="1" y2="26" stroke={i === active ? "#78C8A0" : "rgba(120,200,160,0.25)"} strokeWidth="1.5" className="dash-flow" />
            </svg>
          </div>
        ))}
      </div>
      <div className="flex items-center"><LaneHead label={youLabel} /></div>
      {chart.you.map((t, i) => <LaneCell key={t} text={t} i={i} active={active} tone="you" id={id} onPick={onPick} />)}
    </div>
  </div>
);

const Mobile = ({ chart, active, onPick, youLabel, id }) => (
  <ol className="relative mt-8 space-y-4 pl-8 md:hidden">
    <span className="absolute bottom-2 left-[11px] top-2 w-px bg-line" />
    <motion.span className="absolute left-[11px] top-2 w-px bg-mint" animate={{ height: `${((active + 1) / 4) * 100}%` }} transition={{ duration: 0.6 }} />
    {chart.steps.map((s, i) => (
      <li key={s} onClick={() => onPick(i)} data-testid={`swimlane-${id}-m-step-${i}`} className="relative">
        <span className={`absolute -left-8 top-4 grid h-6 w-6 place-items-center rounded-full border text-[10px] font-mono ${i <= active ? "border-mint bg-mint text-ink" : "border-mint/40 bg-ink text-mint"}`}>{i + 1}</span>
        <div className={`rounded-2xl border p-4 transition-colors ${i === active ? "border-mint/60 bg-mint/[0.07]" : "border-line bg-ink/50"}`}>
          <p className="font-display text-lg text-bone">{s}</p>
          <p className="mt-3 rounded-xl bg-forest/40 p-3 text-sm text-bone/90"><span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-mint">We do</span>{chart.we[i]}</p>
          <p className="mt-2 rounded-xl border border-line p-3 text-sm text-sage"><span className="block font-mono text-[10px] uppercase tracking-[0.2em]">You do · {youLabel}</span>{chart.you[i]}</p>
        </div>
      </li>
    ))}
  </ol>
);

export const Swimlane = ({ chart, id }) => {
  const { active, setActive, setHold } = useAutoStep(chart.steps.length);
  const youLabel = chart.youLabel || "Your team";
  const onPick = (i) => { setActive(i); setHold(true); };
  return (
    <div data-testid={`swimlane-${id}`} onMouseLeave={() => setHold(false)}
      className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-panel via-moss to-ink p-5 sm:p-10">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-jade/15 blur-[90px]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#78C8A0_1px,transparent_1px)] [background-size:22px_22px]" />
      <div className="relative flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint">How you work with us</p>
          <p className="mt-2 font-display text-xl sm:text-3xl font-light leading-tight text-bone">{chart.title}</p>
        </div>
        <StepPills n={chart.steps.length} active={active} />
      </div>
      <div className="relative">
        <Desktop chart={chart} id={id} active={active} onPick={onPick} youLabel={youLabel} />
        <Mobile chart={chart} id={id} active={active} onPick={onPick} youLabel={youLabel} />
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}
        data-testid={`swimlane-${id}-summary`} className="relative mt-8 hidden md:flex items-center gap-4 rounded-2xl border border-mint/25 bg-ink/70 px-6 py-4 text-sm">
        <span className="font-mono text-xs text-mint">{String(active + 1).padStart(2, "0")} · {chart.steps[active]}</span>
        <span className="text-bone">{chart.we[active]}</span>
        <ArrowRight className="h-4 w-4 shrink-0 text-mint" />
        <span className="text-sage">{chart.you[active]}</span>
      </motion.div>
    </div>
  );
};
