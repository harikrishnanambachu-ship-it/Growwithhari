import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

export const SmoothScroll = ({ children }) => {
  const lenis = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const l = new Lenis({ lerp: 0.085, smoothWheel: true });
    lenis.current = l;
    let raf = 0;
    const loop = (t) => { l.raf(t); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    return () => { cancelAnimationFrame(raf); l.destroy(); };
  }, []);

  useEffect(() => {
    if (lenis.current) lenis.current.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  return children;
};
