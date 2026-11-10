import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { PageHero, Section, Checklist } from "@/components/site/PageBits";
import { Reveal, SectionHead, Eyebrow } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { FOUNDER_POINTS, TEAM } from "@/lib/content";

const TeamCard = ({ m, i }) => (
  <Reveal delay={i * 0.1}>
    <motion.div whileHover={{ y: -8 }} transition={{ type: "spring", stiffness: 260, damping: 20 }} data-testid={`team-card-${i}`}
      className="group relative overflow-hidden rounded-[1.75rem] border border-line bg-panel/60 p-6">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-forest/40">
        <img src={m.img} alt={m.name} className="absolute inset-0 h-full w-full object-cover object-top grayscale-[0.35] transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-40" />
        <span className="absolute bottom-3 right-3 h-2 w-2 rounded-full bg-mint shadow-[0_0_12px_#10B981]" />
      </div>
      <p className="mt-5 font-display text-xl text-bone">{m.name}</p>
      <p className="mt-1 text-sm text-sage">{m.role}</p>
    </motion.div>
  </Reveal>
);

export default function About() {
  return (
    <>
      <PageHero testid="about-hero" eyebrow="About Grow With Hari" img="/img/hari1.jpg"
        lines={["Strategy, systems", <em key="a" className="italic text-mint">and automation</em>, "for growing businesses."]}
        text="Grow With Hari is a business growth consulting and AI automation firm based in Kerala, India. We work with founders and business owners to turn scattered effort into a clear growth plan, efficient operations and automated customer journeys." />

      <Section testid="about-founder">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <div className="group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-line">
                <img src="/img/hari2.jpg" alt="Harikrishnan Kalarikkal Joshi, founder of Grow With Hari" className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-[1400ms] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-7">
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">Founder</p>
                  <p className="mt-2 font-display text-3xl font-light text-bone">Harikrishnan Kalarikkal Joshi</p>
                  <p className="text-sm text-sage">Business Growth Consultant</p>
                </div>
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Our founder" lines={["A serial entrepreneur", <em key="f" className="italic text-mint">who builds, not theorises.</em>]}
              text="Harikrishnan Kalarikkal Joshi, Business Growth Consultant and founder of Grow With Hari, is a serial entrepreneur who has built and run several ventures at the same time." />
            <div className="mt-10"><Checklist items={FOUNDER_POINTS} testid="founder-points" /></div>
            <Reveal className="mt-8">
              <div className="flex gap-4 rounded-2xl border border-mint/30 bg-forest/20 p-6">
                <BookOpen className="h-6 w-6 shrink-0 text-mint" />
                <p className="text-sm sm:text-base text-bone/90">Hari's way of working is AI-first: he uses AI tools to research, build and automate faster than a traditional consultancy. Clients get the same advantage.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Marquee items={["BrainCode", "KiddieBite", "Edyugam", "Taught Academy", "The Brain Code Framework"]} testid="about-marquee" />

      <Section testid="about-team">
        <SectionHead eyebrow="Our team" lines={["The people behind", <em key="t" className="italic text-mint">your growth.</em>]} />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => <TeamCard key={m.name} m={m} i={i} />)}
        </div>
      </Section>

      <Section testid="about-belief" className="pb-32">
        <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel/60 p-8 sm:p-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-jade/20 blur-[100px]" />
          <Eyebrow>Our belief</Eyebrow>
          <p className="relative mt-6 max-w-4xl font-display text-3xl sm:text-5xl font-light leading-[1.1] text-bone">
            Passion may start the journey, but financial stability and strong systems give a business the strength to sustain it.
          </p>
          <p className="relative mt-6 text-sage">We help owners build that foundation before they scale.</p>
        </div>
      </Section>
    </>
  );
}
