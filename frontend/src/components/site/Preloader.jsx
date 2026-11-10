import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "./Logo";

export const introDelay = () => (window.__gwhIntro ? 0.15 : 1.9);

export const Preloader = () => {
  const [phase, setPhase] = useState(window.__gwhIntro ? "gone" : "loading");

  useEffect(() => {
    if (phase !== "loading") return undefined;
    const t = setTimeout(() => { window.__gwhIntro = true; setPhase("leaving"); }, 1700);
    return () => clearTimeout(t);
  }, [phase]);

  if (phase === "gone") return null;
  return (
    <motion.div
      data-testid="preloader"
      className="fixed inset-0 z-[100] grid place-items-center bg-ink"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={phase === "leaving" ? { clipPath: "inset(0% 0% 100% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      onAnimationComplete={() => { if (phase === "leaving") setPhase("gone"); }}
    >
      <div className="flex flex-col items-center gap-6">
        <Logo className="w-48 sm:w-60" />
        <div className="h-px w-40 overflow-hidden bg-line">
          <motion.div className="h-full bg-mint" initial={{ x: "-100%" }} animate={{ x: "0%" }} transition={{ duration: 1.5, ease: "easeInOut" }} />
        </div>
      </div>
    </motion.div>
  );
};
