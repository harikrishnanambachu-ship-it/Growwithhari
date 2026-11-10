import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { HeroCanvas } from "@/components/site/HeroCanvas";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Eyebrow, MaskLines, EASE } from "@/components/site/Reveal";
import { introDelay } from "@/components/site/Preloader";
import { CONTACT } from "@/lib/content";
import { CountUp } from "./CountUp";

const STATS = [
  [3, "service tracks"],
  [13, "two-lane engagement charts"],
  [6, "stage automated journey"],
  [5, "step growth process"],
];

export const Hero = () => {
  const ref = useRef(null);
  const d = introDelay();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 120, damping: 20 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 120, damping: 20 });
  const onMove = (e) => { mx.set(e.clientX / window.innerWidth - 0.5); my.set(e.clientY / window.innerHeight - 0.5); };

  return (
    <section ref={ref} onMouseMove={onMove} data-testid="home-hero" className="relative min-h-[100svh] overflow-hidden pt-28 sm:pt-32">
      <HeroCanvas className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute left-1/3 top-1/4 h-[600px] w-[600px] rounded-full bg-jade/[0.12] blur-[140px]" />
      <motion.div style={{ opacity: fade }} className="relative mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <motion.div style={{ y: textY }} className="lg:col-span-7 xl:col-span-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d }}>
            <Eyebrow>Business growth consulting · AI automation · Kerala</Eyebrow>
          </motion.div>
          <h1 className="mt-7 font-display text-[3.4rem] leading-[0.92] sm:text-8xl lg:text-[7.4rem] xl:text-[8.6rem] font-light tracking-[-0.03em] text-bone">
            <MaskLines onMount delay={d + 0.1} lines={["Grow smarter,", <>scale <em className="font-normal italic text-mint">stronger.</em></>]} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.6, duration: 1, ease: EASE }}
            className="mt-8 max-w-xl text-sm sm:text-base md:text-lg leading-relaxed text-sage">
            <span className="text-bone">Business growth consulting and AI automation for Kerala businesses.</span> Grow With Hari helps founders build clear strategy, efficient systems and automated operations, so the business grows without depending on the founder for everything.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.8, duration: 1, ease: EASE }} className="mt-10 flex flex-wrap gap-4">
            <MagneticButton to="/contact" testid="hero-cta-book">Book a Growth Clarity Call</MagneticButton>
            <MagneticButton href={CONTACT.whatsapp} variant="ghost" testid="hero-cta-whatsapp">WhatsApp us on 7592830276</MagneticButton>
          </motion.div>
        </motion.div>

        <div className="lg:col-span-5 xl:col-span-4" style={{ perspective: 1200 }}>
          <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
            initial={{ clipPath: "inset(100% 0% 0% 0% round 999px 999px 32px 32px)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0% round 999px 999px 32px 32px)" }}
            transition={{ duration: 1.6, ease: [0.76, 0, 0.24, 1], delay: d + 0.2 }}
            className="relative mx-auto aspect-[4/5] w-full max-w-[300px] sm:max-w-[380px] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-mint/30 shadow-[0_40px_120px_-40px_rgba(16,185,129,0.55)]">
            <motion.img src="/img/hari2.jpg" alt="Harikrishnan Kalarikkal Joshi, founder of Grow With Hari" style={{ y: imgY, scale: 1.12 }} className="absolute inset-0 h-full w-full object-cover object-[center_20%]" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6" style={{ transform: "translateZ(60px)" }}>
              <p className="font-display text-xl sm:text-2xl font-light italic leading-snug text-bone">"Passion starts the journey. Financial stability and strong systems sustain it."</p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d + 1.1 }}
        className="relative mx-auto mt-16 grid max-w-[1400px] grid-cols-2 gap-px border-y border-line bg-line px-0 sm:grid-cols-4">
        {STATS.map(([n, l], i) => (
          <div key={l} data-testid={`hero-stat-${i}`} className="bg-ink px-5 py-6 sm:px-8">
            <p className="font-display text-4xl sm:text-5xl font-light text-bone"><CountUp to={n} /></p>
            <p className="mt-1 text-xs sm:text-sm text-sage">{l}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
};
