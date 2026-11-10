import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, MaskLines, Reveal, EASE } from "./Reveal";
import { introDelay } from "./Preloader";

export const PageHero = ({ eyebrow, lines, text, img, testid }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const d = introDelay();
  return (
    <section ref={ref} data-testid={testid} className="relative overflow-hidden pt-36 sm:pt-44 pb-16 sm:pb-24">
      <div className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-jade/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: d }}><Eyebrow>{eyebrow}</Eyebrow></motion.div>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl font-light tracking-tight text-bone">
            <MaskLines lines={lines} onMount delay={d} />
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: d + 0.5, duration: 0.9, ease: EASE }}
            className="mt-8 max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-sage">
            {text}
          </motion.p>
        </div>
        {img && (
          <motion.div
            className="lg:col-span-5 relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-[2rem] lg:rounded-t-[999px] border border-line"
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0% 0 0 0)" }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: d + 0.2 }}
          >
            <motion.img src={img} alt="" style={{ y }} className="img-tone absolute inset-0 h-[120%] w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
          </motion.div>
        )}
      </div>
    </section>
  );
};

export const Section = ({ children, className = "", testid, id }) => (
  <section id={id} data-testid={testid} className={`relative mx-auto max-w-[1400px] px-5 sm:px-8 py-20 sm:py-28 ${className}`}>
    {children}
  </section>
);

export const Checklist = ({ items, testid }) => (
  <ul data-testid={testid} className="divide-y divide-line border-y border-line">
    {items.map((t, i) => (
      <Reveal key={t} delay={i * 0.06}>
        <li className="group flex items-start gap-5 py-5 transition-colors hover:bg-mint/[0.04]">
          <span className="mt-1 font-mono text-xs text-mint">{String(i + 1).padStart(2, "0")}</span>
          <span className="text-sm sm:text-base text-bone/90 transition-transform duration-500 group-hover:translate-x-2">{t}</span>
        </li>
      </Reveal>
    ))}
  </ul>
);
