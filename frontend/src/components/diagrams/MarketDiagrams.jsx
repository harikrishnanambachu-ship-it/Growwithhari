import { motion } from "framer-motion";
import { ArrowDown, TrendingUp, Users, Swords, Tag, Radio, Crosshair, Flag } from "lucide-react";
import { LENSES, QUADRANTS } from "@/lib/content";
import { EASE } from "@/components/site/Reveal";
import { useAutoStep, StepPills, glowNode } from "@/lib/useAutoStep";

const LENS_ICONS = [TrendingUp, Users, Swords, Tag, Radio];
const YS = [40, 120, 200, 280, 360];
const Shell = ({ children, testid, onMouseLeave }) => (
  <div data-testid={testid} onMouseLeave={onMouseLeave} className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-panel via-moss to-ink p-5 sm:p-10">
    <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-jade/15 blur-[90px]" />
    <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:radial-gradient(#78C8A0_1px,transparent_1px)] [background-size:22px_22px]" />
    <div className="relative">{children}</div>
  </div>
);

const Lens = ({ l, i, active, pick }) => {
  const Icon = LENS_ICONS[i];
  const on = i === active;
  return (
    <motion.li data-testid={`lens-${i}`} onMouseEnter={() => pick(i)} onClick={() => pick(i)}
      initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
      className={`relative flex cursor-pointer items-center gap-4 overflow-hidden rounded-2xl border px-4 py-3.5 transition-[border-color,background-color,transform,box-shadow] duration-500 ${
        on ? "translate-x-1 border-mint bg-gradient-to-r from-mint/20 to-forest/30 shadow-[0_20px_50px_-25px_rgba(16,185,129,0.8)]" : "border-line bg-ink/60"}`}>
      {on && <motion.span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />}
      <span className={`grid h-10 w-10 shrink-0 rotate-45 place-items-center rounded-xl border transition-[background-color,border-color,box-shadow] duration-500 ${glowNode(on, false)}`}>
        <Icon className={`h-4 w-4 -rotate-45 ${on ? "text-ink" : "text-mint"}`} />
      </span>
      <span><span className="block font-semibold text-bone">{l.title}</span><span className="block text-sm text-sage">{l.sub}</span></span>
    </motion.li>
  );
};

export const LensesDiagram = () => {
  const { active, pick, release } = useAutoStep(LENSES.length, 2400);
  return (
    <Shell testid="lenses-diagram" onMouseLeave={release}>
      <div className="mb-8 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint">Lens {active + 1} of 5 · {LENSES[active].title}</p>
        <StepPills n={LENSES.length} active={active} />
      </div>
      <div className="grid items-center gap-6 lg:grid-cols-[1.1fr_120px_1fr]">
        <ol className="space-y-3">{LENSES.map((l, i) => <Lens key={l.title} l={l} i={i} active={active} pick={pick} />)}</ol>
        <svg viewBox="0 0 120 400" className="hidden h-full w-full overflow-visible lg:block" preserveAspectRatio="none">
          {YS.map((y, i) => (
            <motion.path key={y} d={`M0 ${y} C60 ${y} 60 200 120 200`} fill="none" vectorEffect="non-scaling-stroke"
              animate={{ stroke: i === active ? "#78C8A0" : "rgba(120,200,160,0.25)", strokeWidth: i === active ? 2.2 : 1 }}
              style={{ filter: i === active ? "drop-shadow(0 0 4px #10B981)" : "none" }} transition={{ duration: 0.4 }} />
          ))}
          <circle key={active} r="3.5" fill="#F1F7F3" style={{ filter: "drop-shadow(0 0 4px #A8E3C5)" }}>
            <animateMotion dur="1.2s" repeatCount="indefinite" path={`M0 ${YS[active]} C60 ${YS[active]} 60 200 120 200`} />
          </circle>
        </svg>
        <ArrowDown className="mx-auto h-6 w-6 text-mint lg:hidden" />
        <div className="space-y-4">
          <motion.div key={active} initial={{ scale: 0.97 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="relative overflow-hidden rounded-2xl border border-mint/60 bg-forest/40 p-6 shadow-[0_0_60px_-20px_rgba(16,185,129,0.8)]">
            <motion.span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-mint to-transparent" initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />
            <div className="flex items-center gap-3"><Crosshair className="h-5 w-5 text-mint" /><p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint">Opportunity map</p></div>
            <p className="mt-2 font-display text-2xl font-light text-bone">where you can win and what to avoid</p>
            <p className="mt-3 text-xs text-sage">Now feeding in: <span className="text-mint">{LENSES[active].title}</span></p>
          </motion.div>
          <div className="flex justify-center"><ArrowDown className="h-5 w-5 animate-bounce text-mint" /></div>
          <div className="rounded-2xl bg-mint p-6 text-ink shadow-[0_0_50px_-15px_rgba(120,200,160,0.9)]">
            <div className="flex items-center gap-3"><Flag className="h-5 w-5" /><p className="font-mono text-[11px] uppercase tracking-[0.2em]">Go-to-market plan</p></div>
            <p className="mt-2 font-display text-2xl">offer, price, channel and 90-day actions</p>
          </div>
        </div>
      </div>
    </Shell>
  );
};

const POS = { tl: "col-start-1 row-start-1", tr: "col-start-2 row-start-1", bl: "col-start-1 row-start-2", br: "col-start-2 row-start-2" };
const DOTS = [[30, 30], [80, 24], [36, 78], [86, 80], [72, 40]];
const BRAND = { value: ["10%", "36%"], premium: ["60%", "36%"], budget: ["10%", "86%"], over: ["60%", "86%"] };

export const PositioningMap = () => {
  const { active, pick, release } = useAutoStep(QUADRANTS.length, 2600);
  const q = QUADRANTS[active];
  return (
    <Shell testid="positioning-map" onMouseLeave={release}>
      <div className="mb-6 flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-mint">Testing position · {q.title}</p>
        <StepPills n={QUADRANTS.length} active={active} />
      </div>
      <div className="flex gap-3 sm:gap-4">
        <div className="flex items-center"><span className="-rotate-180 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-sage [writing-mode:vertical-rl]">Customer value →</span></div>
        <div className="flex-1">
          <div className="relative grid aspect-square sm:aspect-[4/3] grid-cols-2 grid-rows-2 gap-2">
            {QUADRANTS.map((x, i) => {
              const on = i === active;
              return (
                <button key={x.id} data-testid={`quadrant-${x.id}`} onMouseEnter={() => pick(i)} onClick={() => pick(i)}
                  className={`${POS[x.pos]} relative flex flex-col justify-start overflow-hidden rounded-2xl border p-3 sm:p-5 text-left transition-[border-color,background-color,box-shadow] duration-500 ${
                    on ? (x.good ? "border-mint bg-mint/15 shadow-[inset_0_0_60px_rgba(16,185,129,0.25)]" : "border-amber-200/50 bg-amber-200/[0.07]") : "border-line bg-ink/50"}`}>
                  {on && <motion.span className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent ${x.good ? "via-mint" : "via-amber-200"} to-transparent`} initial={{ x: "-100%" }} animate={{ x: "100%" }} transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }} />}
                  <p className={`font-display text-lg sm:text-2xl ${x.good ? "text-bone" : "text-bone/80"}`}>{x.title}</p>
                  <p className="text-xs sm:text-sm text-sage">{x.sub}</p>
                </button>
              );
            })}
            {DOTS.map(([x, y], i) => (
              <motion.span key={i} className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-sage/60" style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: 0.4 + i * 0.1 }} />
            ))}
            <motion.span className="pointer-events-none absolute flex items-center gap-2" initial={{ left: "50%", top: "50%" }}
              animate={{ left: BRAND[q.id][0], top: BRAND[q.id][1] }} transition={{ duration: 1.1, ease: EASE }}>
              <span className="relative flex h-4 w-4"><span className="absolute inset-0 animate-ping rounded-full bg-mint/60" /><span className="relative h-4 w-4 rounded-full bg-mint shadow-[0_0_14px_#10B981]" /></span>
              <span className="rounded-full bg-ink/80 px-2 py-0.5 text-[11px] font-semibold text-mint">Your brand</span>
            </motion.span>
          </div>
          <p className="mt-3 text-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-sage">Price, low to high →</p>
        </div>
      </div>
      <motion.p key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} data-testid="positioning-summary"
        className={`mt-6 rounded-2xl border px-5 py-3 text-sm ${q.good ? "border-mint/30 bg-ink/70 text-bone" : "border-amber-200/30 bg-ink/70 text-sage"}`}>
        <span className={q.good ? "text-mint" : "text-amber-200/90"}>{q.title}:</span> {q.sub}. {q.good ? "A position you can defend." : "A position to avoid."}
      </motion.p>
      <p className="mt-4 text-xs text-sage">Template · grey dots show where competitors are plotted during each analysis.</p>
    </Shell>
  );
};
