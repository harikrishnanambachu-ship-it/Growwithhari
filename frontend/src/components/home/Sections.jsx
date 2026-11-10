import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Eyebrow, Reveal, SectionHead } from "@/components/site/Reveal";
import { Section } from "@/components/site/PageBits";
import { WHO, WHY } from "@/lib/content";
import { TRACKS } from "@/lib/services";

const Word = ({ w, range, progress }) => {
  const o = useTransform(progress, range, [0.22, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.25em] inline-block">{w}</motion.span>;
};

export const ScrollQuote = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = "Passion may start the journey, but financial stability and strong systems give a business the strength to sustain it.".split(" ");
  return (
    <Section testid="home-belief" className="py-28 sm:py-40">
      <Eyebrow>Our belief</Eyebrow>
      <p ref={ref} className="relative mt-8 max-w-5xl font-display text-3xl sm:text-5xl lg:text-6xl font-light leading-[1.12] tracking-tight text-bone">
        {words.map((w, i) => <Word key={i} w={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />)}
      </p>
    </Section>
  );
};

const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
const glow = (e) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

export const WhoWeHelp = () => (
  <Section testid="home-who">
    <SectionHead eyebrow="Who we help" lines={["Built for founders", <em key="i" className="italic text-mint">ready for the next level.</em>]} />
    <div className="mt-14 grid gap-4 sm:gap-5 lg:grid-cols-12">
      {WHO.map((w, i) => (
        <Reveal key={w.title} delay={i * 0.08} className={spans[i]}>
          <article data-testid={`who-card-${i}`} onMouseMove={glow}
            className="glow-card group relative h-[340px] sm:h-[400px] overflow-hidden rounded-[1.75rem] border border-line">
            <img src={w.img} alt={w.title} className="img-tone absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
            <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
              <span className="font-mono text-xs text-mint">0{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-bone">{w.title}</h3>
                <p className="mt-3 max-w-md text-sm sm:text-base text-bone/80">{w.text}</p>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </Section>
);

export const WhyUs = () => (
  <Section testid="home-why">
    <div className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-32">
          <SectionHead eyebrow="Why Grow With Hari" lines={["Strategy that", "ships as systems."]} text="Our promise is simple: strategy. growth. impact." />
          <Reveal delay={0.2} className="mt-10 hidden lg:block">
            <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border border-line group">
              <img src="/img/blades.jpg" alt="Leaves growing upward" className="img-tone h-full w-full object-cover" />
            </div>
          </Reveal>
        </div>
      </div>
      <ol className="lg:col-span-7 lg:pt-24">
        {WHY.map((w, i) => (
          <Reveal key={w.title} delay={i * 0.05}>
            <li data-testid={`why-item-${i}`} className="group grid grid-cols-[auto_1fr] gap-6 border-t border-line py-10 sm:py-12">
              <span className="font-display text-5xl sm:text-7xl font-light text-outline transition-colors duration-500 group-hover:text-mint">0{i + 1}</span>
              <div>
                <h3 className="font-display text-2xl sm:text-3xl font-light text-bone">{w.title}</h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-sage">{w.text}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  </Section>
);

export const TracksPreview = () => (
  <Section testid="home-tracks">
    <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <SectionHead eyebrow="Services" lines={["Three tracks.", <em key="o" className="italic text-mint">One growth plan.</em>]} />
      <Reveal><Link to="/services" data-testid="home-tracks-all" className="group inline-flex items-center gap-2 text-sm text-mint hover:text-bone">See all services <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" /></Link></Reveal>
    </div>
    <div className="mt-14 grid gap-5 md:grid-cols-3">
      {TRACKS.map((t, i) => (
        <Reveal key={t.id} delay={i * 0.12}>
          <Link to={`/services#track-${t.id}`} data-testid={`home-track-${t.id}`} onMouseMove={glow}
            className="glow-card group flex h-full flex-col rounded-[1.75rem] border border-line bg-panel/60 p-7 transition-[transform,background-color] duration-500 hover:-translate-y-2 hover:bg-panel">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-mint">{t.code}</span>
              <span className="grid h-10 w-10 place-items-center rounded-full border border-line transition-colors group-hover:border-mint group-hover:bg-mint group-hover:text-ink"><ArrowUpRight className="h-4 w-4" /></span>
            </div>
            <h3 className="mt-10 font-display text-3xl font-light leading-tight text-bone">{t.title}</h3>
            <p className="mt-4 text-sm text-sage">{t.blurb}</p>
            <ul className="mt-8 space-y-2 border-t border-line pt-6 text-sm text-bone/85">
              {t.services.map((s) => <li key={s.id} className="flex gap-2"><span className="text-mint">+</span>{s.name}</li>)}
            </ul>
          </Link>
        </Reveal>
      ))}
    </div>
    <Reveal delay={0.2}><p className="mt-8 text-sm text-sage">Most clients combine one Track A service with one or two Track B automations; founders often join Track C alongside.</p></Reveal>
  </Section>
);
