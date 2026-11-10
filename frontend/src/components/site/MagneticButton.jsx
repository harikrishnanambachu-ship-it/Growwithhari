import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const styles = {
  solid: "bg-mint text-ink hover:bg-bone",
  ghost: "border border-mint/40 text-bone hover:border-mint hover:bg-mint/10",
};

export const MagneticButton = ({ to, href, children, variant = "solid", className = "", icon = true, testid, ...rest }) => {
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 15 });
  const move = (e) => {
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const leave = () => { x.set(0); y.set(0); };
  const cls = `group/btn relative inline-flex items-center gap-3 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-300 ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      {icon && (
        <span className="relative grid h-6 w-6 place-items-center overflow-hidden rounded-full bg-ink/10">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover/btn:translate-x-5 group-hover/btn:-translate-y-5" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-5 translate-y-5 transition-transform duration-500 group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
        </span>
      )}
    </>
  );
  return (
    <motion.span ref={ref} style={{ x, y }} onMouseMove={move} onMouseLeave={leave} className="inline-block">
      {to ? (
        <Link to={to} className={cls} data-testid={testid} {...rest}>{inner}</Link>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className={cls} data-testid={testid} {...rest}>{inner}</a>
      )}
    </motion.span>
  );
};
