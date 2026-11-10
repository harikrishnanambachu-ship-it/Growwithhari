import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CONTACT, NAV, SOCIALS } from "@/lib/content";
import { MagneticButton } from "./MagneticButton";
import { MaskLines, Eyebrow } from "./Reveal";
import { Logo } from "./Logo";

export const Footer = () => (
  <footer data-testid="site-footer" className="relative overflow-hidden border-t border-line bg-moss">
    <div className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-jade/10 blur-[120px]" />
    <div className="relative mx-auto max-w-[1400px] px-5 sm:px-8 pt-24 sm:pt-32">
      <Eyebrow>Ready to grow smarter?</Eyebrow>
      <h2 className="mt-6 font-display text-5xl sm:text-7xl lg:text-8xl font-light leading-[0.95] tracking-tight text-bone">
        <MaskLines lines={["Book a free", <span key="x" className="italic text-mint">Growth Clarity Call.</span>]} />
      </h2>
      <div className="mt-10 flex flex-wrap gap-4">
        <MagneticButton to="/contact" testid="footer-cta-book">Book a Growth Clarity Call</MagneticButton>
        <MagneticButton href={CONTACT.whatsapp} variant="ghost" testid="footer-cta-whatsapp">WhatsApp 7592830276</MagneticButton>
      </div>

      <div className="mt-24 grid gap-12 border-t border-line pt-14 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo className="h-16 w-auto" />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-sage">Helping businesses grow smarter, scale stronger. Strategy. Growth. Impact.</p>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">Explore</p>
          <ul className="mt-5 grid grid-cols-2 gap-y-3 text-sm">
            {[...NAV, { to: "/contact", label: "Contact" }].map((n) => (
              <li key={n.to}><Link to={n.to} data-testid={`footer-link-${n.label.toLowerCase()}`} className="text-sage transition-colors hover:text-bone">{n.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">Contact</p>
          <ul className="mt-5 space-y-3 text-sm">
            <li><a href={`mailto:${CONTACT.email}`} data-testid="footer-email" className="text-bone hover:text-mint">{CONTACT.email}</a></li>
            <li><a href={`tel:${CONTACT.tel}`} data-testid="footer-phone" className="text-bone hover:text-mint">{CONTACT.phone}</a></li>
            <li className="text-sage">Kerala, India</li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">Social</p>
          <ul className="mt-5 space-y-3 text-sm">
            {SOCIALS.map((s) => (
              <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer" data-testid={`footer-social-${s.label.toLowerCase()}`} className="text-sage hover:text-bone">{s.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    <motion.p
      initial={{ y: "40%", opacity: 0 }}
      whileInView={{ y: "0%", opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16 select-none whitespace-nowrap text-center font-display text-[17vw] font-light leading-[0.8] tracking-tighter text-outline"
    >
      Grow With Hari
    </motion.p>
    <div className="relative mx-auto flex max-w-[1400px] flex-col gap-2 px-5 sm:px-8 py-6 text-xs text-sage sm:flex-row sm:justify-between">
      <p>© {new Date().getFullYear()} Grow With Hari · GWH Consulting</p>
      <Link to="/admin" data-testid="footer-owner-login" className="hover:text-bone">Owner login</Link>
    </div>
  </footer>
);
