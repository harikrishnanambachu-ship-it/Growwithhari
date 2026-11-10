import { motion } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1];

export const Reveal = ({ children, delay = 0, y = 36, className = "", ...rest }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.9, ease: EASE, delay }}
    {...rest}
  >
    {children}
  </motion.div>
);

const lineV = {
  hidden: { y: "110%", rotate: 2 },
  show: (i) => ({ y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE, delay: i } }),
};

export const MaskLines = ({ lines, delay = 0, onMount = false, className = "" }) => {
  const trigger = onMount
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, amount: 0.15 } };
  return (
    <motion.span initial="hidden" {...trigger} className={`block ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.1em] -mb-[0.1em]">
          <motion.span className="block origin-left" variants={lineV} custom={delay + i * 0.1}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
};

export const Eyebrow = ({ children, className = "" }) => (
  <p className={`flex items-center gap-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.28em] text-mint ${className}`}>
    <span className="h-px w-8 bg-mint/60" />
    {children}
  </p>
);

export const SectionHead = ({ eyebrow, lines, text, className = "", testid }) => (
  <div className={`max-w-3xl ${className}`} data-testid={testid}>
    {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
    <h2 className="mt-5 font-display text-4xl sm:text-5xl lg:text-6xl font-light leading-[1.02] tracking-tight text-bone">
      <MaskLines lines={lines} />
    </h2>
    {text && (
      <Reveal delay={0.2}>
        <p className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-sage max-w-2xl">{text}</p>
      </Reveal>
    )}
  </div>
);
