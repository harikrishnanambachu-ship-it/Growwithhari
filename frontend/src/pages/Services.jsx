import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { PageHero, Section, Checklist } from "@/components/site/PageBits";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { Swimlane } from "@/components/diagrams/Swimlane";
import { TRACKS, MODULES, ADDONS } from "@/lib/services";

const TrackBlock = ({ track }) => {
  const [sel, setSel] = useState(0);
  const s = track.services[sel];
  return (
    <Section id={`track-${track.id}`} testid={`track-${track.id}`}>
      <SectionHead eyebrow={track.code} lines={[track.title]} text={track.blurb} />
      {track.services.length > 1 && (
        <div className="no-scrollbar mt-10 -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
          {track.services.map((x, i) => (
            <button key={x.id} data-testid={`service-tab-${x.id}`} onClick={() => setSel(i)}
              className={`relative shrink-0 rounded-full border px-4 py-2.5 text-sm transition-colors duration-300 ${sel === i ? "border-mint text-ink" : "border-line text-sage hover:text-bone hover:border-mint/40"}`}>
              {sel === i && <motion.span layoutId={`tab-${track.id}`} className="absolute inset-0 rounded-full bg-mint" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
              <span className="relative">{x.name}</span>
            </button>
          ))}
        </div>
      )}
      <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-8">
        <div className="mb-6 grid gap-4 md:grid-cols-[1fr_1.4fr] md:items-end">
          <h3 className="font-display text-3xl sm:text-4xl font-light text-bone">{s.name}</h3>
          <p className="text-sm sm:text-base text-sage">{s.desc}</p>
        </div>
        <Swimlane chart={s.chart} id={s.id} />
      </motion.div>
    </Section>
  );
};

export default function Services() {
  const { hash } = useLocation();
  useEffect(() => {
    if (!hash) return undefined;
    const t = setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" }), 400);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <PageHero testid="services-hero" eyebrow="Services" img="/img/dashboard.jpg"
        lines={["Growth consulting", <em key="s" className="italic text-mint">and AI automation</em>, "services."]}
        text="Grow With Hari offers three service tracks: Growth and Investor Readiness, AI Build and Automation, and the Founders Training Program. Each service has a chart with two lanes: what Grow With Hari does and what you do at every step, so you know exactly how you will work with us." />
      {TRACKS.map((t) => <TrackBlock key={t.id} track={t} />)}
      <Section testid="founders-modules">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Track C · Modules" lines={["Seven modules,", <em key="m" className="italic text-mint">applied to your business.</em>]}
              text="Format: live sessions, templates, assignments and 1:1 feedback, with a founder community after the program." />
            <Reveal delay={0.2}><p className="mt-6 inline-block rounded-full border border-mint/40 px-4 py-2 font-mono text-xs text-mint">[Batch dates, duration and fees — to be announced]</p></Reveal>
          </div>
          <Checklist items={MODULES} testid="modules-list" />
        </div>
      </Section>
      <Section testid="addons" className="pb-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="Digital growth add-ons" lines={["Get found.", <em key="g" className="italic text-mint">Get chosen.</em>]} />
          <Checklist items={ADDONS} testid="addons-list" />
        </div>
      </Section>
    </>
  );
}
