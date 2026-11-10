import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

export const CountUp = ({ to }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  const [val, setVal] = useState(to);

  useEffect(() => {
    if (!inView) return undefined;
    const c = animate(0, to, { duration: 1.8, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setVal(Math.round(v)) });
    return () => c.stop();
  }, [inView, to]);

  return <span ref={ref}>{String(val).padStart(2, "0")}</span>;
};
