import { useState } from "react";
import { motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
import { PROCESS } from "@/lib/content";
import { EASE } from "@/components/site/Reveal";

export const ProcessTimeline = () => {
  const [active, setActive] = useState(0);
  return (
    <div data-testid="process-timeline" className="rounded-[1.75rem] border border-line bg-panel/60 p-5 sm:p-8">
      <div className="relative grid gap-4 md:grid-cols-5">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-line md:block" />
        <motion.div className="absolute left-0 top-6 hidden h-px bg-mint md:block" animate={{ width: `${(active / 4) * 100}%` }} transition={{ duration: 0.7, ease: EASE }} />
        {PROCESS.map((p, i) => (
          <motion.button
            key={p.step}
            data-testid={`process-step-${i}`}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.12, duration: 0.7, ease: EASE }}
            className={`relative text-left rounded-2xl p-4 md:p-0 md:pr-3 border md:border-0 transition-colors ${active === i ? "border-mint/60 bg-mint/[0.06] md:bg-transparent" : "border-line"}`}
          >
            <span className={`relative z-10 grid h-12 w-12 place-items-center rounded-full border font-mono text-sm transition-colors duration-300 ${active >= i ? "border-mint bg-mint text-ink" : "border-mint/40 bg-ink text-mint"}`}>
              {i + 1}
            </span>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-sage">Step {i + 1} · {p.time}</p>
            <p className="mt-1 font-display text-2xl font-light text-bone">{p.step}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-sage">
              {p.items.map((t) => <li key={t} className="flex gap-2"><span className="text-mint">—</span>{t}</li>)}
            </ul>
          </motion.button>
        ))}
      </div>
      <div className="mt-8 flex items-center gap-3 text-xs sm:text-sm text-mint">
        <RotateCcw className="h-4 w-4 spin-slow" style={{ animationDuration: "8s" }} />
        <span className="font-mono">each review feeds the next round of building</span>
      </div>
      <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        data-testid="process-detail" className="mt-5 rounded-2xl border border-line bg-ink/60 p-5 sm:p-6">
        <p className="font-display text-xl text-bone">{active + 1}. {PROCESS[active].step}</p>
        <p className="mt-2 text-sm sm:text-base text-sage">{PROCESS[active].text}</p>
      </motion.div>
    </div>
  );
};
