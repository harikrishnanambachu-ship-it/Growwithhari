import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV, CONTACT } from "@/lib/content";
import { Logo } from "./Logo";

const MobileMenu = ({ onClose }) => (
  <motion.div
    data-testid="mobile-menu"
    className="fixed inset-0 z-[60] flex flex-col bg-ink px-6 pt-28 pb-10 lg:hidden"
    initial={{ clipPath: "circle(0% at 92% 4%)" }}
    animate={{ clipPath: "circle(150% at 92% 4%)" }}
    exit={{ clipPath: "circle(0% at 92% 4%)" }}
    transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
  >
    <nav className="flex flex-col gap-2">
      {[...NAV, { to: "/contact", label: "Contact" }].map((n, i) => (
        <motion.div key={n.to} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.05 }}>
          <NavLink to={n.to} onClick={onClose} data-testid={`mobile-nav-${n.label.toLowerCase()}`}
            className={({ isActive }) => `font-display text-4xl ${isActive ? "text-mint italic" : "text-bone"}`}>
            {n.label}
          </NavLink>
        </motion.div>
      ))}
    </nav>
    <div className="mt-auto space-y-1 text-sm text-sage">
      <p>{CONTACT.email}</p>
      <p>{CONTACT.phone}</p>
    </div>
  </motion.div>
);

export const Nav = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[65] transition-[background-color,border-color] duration-500 ${scrolled || open ? "bg-ink/80 backdrop-blur-xl border-b border-line" : "border-b border-transparent"}`}>
        <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Link to="/" data-testid="nav-logo" className="shrink-0"><Logo className="h-11 w-auto" delay={window.__gwhIntro ? 0 : 0.2} /></Link>
          <nav className="hidden lg:flex items-center gap-1 rounded-full border border-line bg-moss/60 px-2 py-1.5">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} end data-testid={`nav-${n.label.toLowerCase()}`} className="relative px-4 py-2 text-sm">
                {({ isActive }) => (
                  <>
                    {isActive && <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-mint/15 ring-1 ring-mint/40" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                    <span className={`relative transition-colors ${isActive ? "text-bone" : "text-sage hover:text-bone"}`}>{n.label}</span>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/contact" data-testid="nav-cta-book" className="hidden sm:inline-flex rounded-full bg-mint px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-bone">
              Book a Clarity Call
            </Link>
            <button data-testid="nav-menu-toggle" aria-label="Menu" onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-bone lg:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <motion.div style={{ scaleX: progress }} className="absolute bottom-0 left-0 h-px w-full origin-left bg-mint" />
      </header>
      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
};
