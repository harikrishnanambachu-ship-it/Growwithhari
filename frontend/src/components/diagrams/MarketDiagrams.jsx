import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { LENSES, QUADRANTS } from "@/lib/content";
import { EASE } from "@/components/site/Reveal";

export const LensesDiagram = () => (
  <div data-testid="lenses-diagram" className="grid items-center gap-6 rounded-[1.75rem] border border-line bg-panel/60 p-5 sm:p-8 lg:grid-cols-[1.1fr_120px_1fr]">
    <ol className="space-y-3">
      {LENSES.map((l, i) => (
        <motion.li key={l.title} data-testid={`lens-${i}`}
          initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.1, duration: 0.7, ease: EASE }}
          className="group flex items-center gap-4 rounded-2xl border border-line bg-ink/60 px-5 py-4 transition-colors hover:border-mint/50">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-mint/40 font-mono text-xs text-mint transition-colors group-hover:bg-mint group-hover:text-ink">{i + 1}</span>
          <span><span className="block font-semibold text-bone">{l.title}</span><span className="block text-sm text-sage">{l.sub}</span></span>
        </motion.li>
      ))}
    </ol>
    <svg viewBox="0 0 120 400" className="hidden h-full w-full lg:block" preserveAspectRatio="none">
      {[40, 120, 200, 280, 360].map((y, i) => (
        <motion.path key={y} d={`M0 ${y} C60 ${y} 60 200 120 200`} stroke="#78C8A0" strokeOpacity="0.6" strokeWidth="1.2" fill="none" vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: 0.5 + i * 0.1, duration: 1 }} />
      ))}
    </svg>
    <ArrowDown className="mx-auto h-6 w-6 text-mint lg:hidden" />
    <div className="space-y-4">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: 1, duration: 0.8 }}
        className="rounded-2xl border border-mint/60 bg-forest/40 p-6 shadow-[0_0_60px_-20px_rgba(16,185,129,0.7)]">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mint">Opportunity map</p>
        <p className="mt-2 font-display text-2xl font-light text-bone">where you can win and what to avoid</p>
      </motion.div>
      <div className="flex justify-center"><ArrowRight className="h-5 w-5 rotate-90 text-mint" /></div>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: 1.3, duration: 0.8 }}
        className="rounded-2xl bg-mint p-6 text-ink">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em]">Go-to-market plan</p>
        <p className="mt-2 font-display text-2xl">offer, price, channel and 90-day actions</p>
      </motion.div>
    </div>
  </div>
);

const POS = { tl: "col-start-1 row-start-1", tr: "col-start-2 row-start-1", bl: "col-start-1 row-start-2", br: "col-start-2 row-start-2" };
const DOTS = [[22, 70], [68, 30], [80, 76], [35, 38], [58, 62]];

export const PositioningMap = () => {
  const [hover, setHover] = useState("value");
  return (
    <div data-testid="positioning-map" className="rounded-[1.75rem] border border-line bg-panel/60 p-5 sm:p-8">
      <div className="flex gap-3 sm:gap-4">
        <div className="flex items-center"><span className="-rotate-180 font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-sage [writing-mode:vertical-rl]">Customer value →</span></div>
        <div className="flex-1">
          <div className="relative grid aspect-square sm:aspect-[4/3] grid-cols-2 grid-rows-2 gap-2">
            {QUADRANTS.map((q) => (
              <button key={q.id} data-testid={`quadrant-${q.id}`} onMouseEnter={() => setHover(q.id)} onClick={() => setHover(q.id)}
                className={`${POS[q.pos]} rounded-2xl border p-3 sm:p-5 text-left transition-colors duration-300 ${hover === q.id ? (q.good ? "border-mint bg-mint/15" : "border-amber-200/40 bg-amber-200/[0.06]") : "border-line bg-ink/50"}`}>
                <p className={`font-display text-lg sm:text-2xl ${q.good ? "text-bone" : "text-bone/80"}`}>{q.title}</p>
                <p className="text-xs sm:text-sm text-sage">{q.sub}</p>
              </button>
            ))}
            {DOTS.map(([x, y], i) => (
              <motion.span key={i} className="pointer-events-none absolute h-2.5 w-2.5 rounded-full bg-sage/60" style={{ left: `${x}%`, top: `${y}%` }}
                initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: 0.4 + i * 0.1 }} />
            ))}
            <motion.span className="pointer-events-none absolute flex items-center gap-2" initial={{ left: "50%", top: "50%" }}
              whileInView={{ left: "24%", top: "34%" }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: 1, duration: 1.6, ease: EASE }}>
              <span className="relative flex h-4 w-4"><span className="absolute inset-0 animate-ping rounded-full bg-mint/60" /><span className="relative h-4 w-4 rounded-full bg-mint" /></span>
              <span className="rounded-full bg-ink/80 px-2 py-0.5 text-[11px] font-semibold text-mint">Your brand</span>
            </motion.span>
          </div>
          <p className="mt-3 text-center font-mono text-[10px] sm:text-xs uppercase tracking-[0.2em] text-sage">Price, low to high →</p>
        </div>
      </div>
      <p className="mt-6 text-xs text-sage">Template · grey dots show where competitors are plotted during each analysis.</p>
    </div>
  );
};
