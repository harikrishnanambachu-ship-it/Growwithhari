import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { STACK_TYPICAL, STACK_GWH, COSTS } from "@/lib/content";
import { EASE } from "@/components/site/Reveal";

const Layer = ({ l, i, good }) => (
  <motion.div
    initial={{ opacity: 0, y: -24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.14 }}
    className={`relative flex items-center justify-between gap-4 rounded-2xl border px-5 py-4 ${
      good ? "border-mint/40 bg-forest/30" : l.cut ? "border-white/10 bg-white/[0.03]" : "border-line bg-ink/60"
    }`}
  >
    <span className={`font-semibold ${l.cut ? "text-bone/80" : "text-bone"}`}>{l.name}</span>
    <span className={`text-right text-xs sm:text-sm ${good ? "text-mint" : l.cut ? "text-amber-200/80" : "text-sage"}`}>{l.note}</span>
    {l.cut && (
      <motion.span className="absolute left-4 right-4 top-1/2 h-px origin-left bg-amber-200/50"
        initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: 1.2 + i * 0.15, duration: 0.6 }} />
    )}
  </motion.div>
);

export const StackCompare = () => (
  <div data-testid="stack-compare" className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch">
    <div className="rounded-[1.75rem] border border-line bg-panel/50 p-5 sm:p-7">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-sage">Typical third-party setup</p>
      <div className="mt-5 space-y-3">{STACK_TYPICAL.map((l, i) => <Layer key={l.name} l={l} i={i} />)}</div>
    </div>
    <div className="flex items-center justify-center">
      <span className="grid h-14 w-14 place-items-center rounded-full border border-mint/40 font-display italic text-mint">vs</span>
    </div>
    <div className="relative rounded-[1.75rem] border border-mint/40 bg-gradient-to-b from-forest/30 to-panel/50 p-5 sm:p-7 shadow-[0_0_80px_-30px_rgba(16,185,129,0.6)]">
      <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-mint">Grow With Hari setup, direct on Meta</p>
      <div className="mt-5 space-y-3">{STACK_GWH.map((l, i) => <Layer key={l.name} l={l} i={i} good />)}</div>
    </div>
  </div>
);

export const CostTable = () => (
  <div data-testid="cost-table" className="overflow-hidden rounded-[1.75rem] border border-line">
    <div className="hidden md:grid grid-cols-[1fr_1.4fr_1.4fr] bg-panel px-6 py-4 font-mono text-[11px] uppercase tracking-[0.2em]">
      <span className="text-sage">Cost area</span><span className="text-sage">Typical third-party setup</span><span className="text-mint">Grow With Hari direct Meta setup</span>
    </div>
    {COSTS.map(([area, a, b], i) => (
      <motion.div key={area} data-testid={`cost-row-${i}`}
        initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.06, duration: 0.6 }}
        className="group grid gap-2 border-t border-line px-6 py-5 transition-colors hover:bg-mint/[0.05] md:grid-cols-[1fr_1.4fr_1.4fr] md:gap-6">
        <span className="font-semibold text-bone">{area}</span>
        <span className="flex gap-2 text-sm text-sage"><X className="mt-0.5 h-4 w-4 shrink-0 text-amber-200/70" />{a}</span>
        <span className="flex gap-2 text-sm text-bone"><Check className="mt-0.5 h-4 w-4 shrink-0 text-mint transition-transform group-hover:scale-125" />{b}</span>
      </motion.div>
    ))}
  </div>
);
