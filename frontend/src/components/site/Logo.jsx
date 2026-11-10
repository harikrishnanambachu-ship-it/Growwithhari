import { motion } from "framer-motion";

const draw = (delay) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1], delay },
});

export const Logo = ({ className = "", tag = true, delay = 0 }) => (
  <svg viewBox="0 0 260 124" className={className} role="img" aria-label="GWH Consulting">
    <defs>
      <linearGradient id="gwh-leaf" x1="0" y1="1" x2="1" y2="0">
        <stop offset="0%" stopColor="#10B981" />
        <stop offset="100%" stopColor="#A8E3C5" />
      </linearGradient>
    </defs>
    <text x="128" y="86" textAnchor="middle" fontFamily="Fraunces, Georgia, serif" fontSize="86" fontWeight="500" fill="#F1F7F3" letterSpacing="-2">
      GWH
    </text>
    <motion.path d="M94 96 C118 84 150 66 168 44 C176 34 182 26 186 20" stroke="url(#gwh-leaf)" strokeWidth="3" fill="none" strokeLinecap="round" {...draw(delay)} />
    <motion.path
      d="M186 20 C190 6 210 -2 232 2 C230 18 212 30 186 20 Z"
      fill="url(#gwh-leaf)"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      style={{ originX: "186px", originY: "20px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: delay + 1 }}
    />
    <motion.path d="M190 18 C202 12 214 8 226 5" stroke="#070B08" strokeWidth="1.2" fill="none" opacity="0.5" {...draw(delay + 1.3)} />
    {tag && (
      <text x="130" y="118" textAnchor="middle" fontFamily="Manrope, sans-serif" fontSize="15" fontWeight="600" letterSpacing="6" fill="#78C8A0">
        CONSULTING
      </text>
    )}
  </svg>
);
