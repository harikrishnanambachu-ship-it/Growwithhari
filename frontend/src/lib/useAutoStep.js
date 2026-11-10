import { useEffect, useState } from "react";

export const useAutoStep = (n, ms = 2600) => {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (hold) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % n), ms);
    return () => clearInterval(t);
  }, [hold, n, ms]);
  const pick = (i) => { setActive(i); setHold(true); };
  return { active, setActive, setHold, pick, release: () => setHold(false) };
};

export const StepPills = ({ n, active, className = "" }) => (
  <div className={`flex gap-1.5 ${className}`}>
    {Array.from({ length: n }, (_, i) => (
      <span key={i} className={`h-1.5 rounded-full transition-[width,background-color] duration-500 ${i === active ? "w-8 bg-mint shadow-[0_0_10px_#10B981]" : "w-3 bg-line"}`} />
    ))}
  </div>
);

export const glowNode = (on, done) =>
  on ? "border-mint bg-mint shadow-[0_0_40px_rgba(16,185,129,0.65)]" : done ? "border-mint/70 bg-forest" : "border-mint/30 bg-ink";
