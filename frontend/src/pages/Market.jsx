import { motion } from "framer-motion";
import { PageHero, Section, Checklist } from "@/components/site/PageBits";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { LensesDiagram, PositioningMap } from "@/components/diagrams/MarketDiagrams";
import { MARKET_RECEIVE, INDUSTRIES, RESULTS } from "@/lib/content";

const IndustryRow = ({ row, i }) => {
  const [name, eg, challenge, help] = row;
  return (
    <motion.li data-testid={`industry-${i}`}
      initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: i * 0.05, duration: 0.6 }}
      className="group relative grid gap-3 border-t border-line px-2 py-7 transition-colors duration-500 hover:bg-mint/[0.05] md:grid-cols-[60px_1.3fr_1fr_1.3fr] md:gap-8 md:px-4">
      <span className="font-mono text-xs text-mint">{String(i + 1).padStart(2, "0")}</span>
      <div>
        <p className="font-display text-xl sm:text-2xl font-light text-bone transition-transform duration-500 group-hover:translate-x-2">{name}</p>
        {eg && <p className="mt-1 text-xs text-sage">{eg}</p>}
      </div>
      <p className="text-sm text-sage"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-sage/80 md:hidden">Typical challenge</span>{challenge}</p>
      <p className="text-sm text-bone/90"><span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-mint md:hidden">How we help</span>{help}</p>
    </motion.li>
  );
};

export default function Market() {
  return (
    <>
      <PageHero testid="market-hero" eyebrow="Market analysis" img="/img/k-market.jpg"
        lines={["Market analysis", <em key="m" className="italic text-mint">for Kerala businesses.</em>]}
        text="Every growth plan starts with a market analysis through five lenses: demand, customers, competitors, pricing and channels. Together they show where you can win and turn into a go-to-market plan." />

      <Section testid="market-lenses">
        <SectionHead eyebrow="Market analysis framework · 5 lenses" lines={["Five lenses feed", <em key="l" className="italic text-mint">one opportunity map.</em>]}
          text="Each lens is researched from your own sales data, customer conversations, competitor offers and online search and ad data." />
        <Reveal className="mt-12"><LensesDiagram /></Reveal>
      </Section>

      <Section testid="market-positioning">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Positioning map" lines={["Where your brand", <em key="w" className="italic text-mint">can win.</em>]}
              text="During the analysis we plot your competitors on this map and choose a position you can defend, usually value leader or a clear premium spot." />
          </div>
          <Reveal className="lg:col-span-7"><PositioningMap /></Reveal>
        </div>
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="What you receive" lines={["A plan, not", <em key="r" className="italic text-mint">a pile of data.</em>]} />
          <Checklist items={MARKET_RECEIVE} testid="market-receive" />
        </div>
      </Section>

      <Section testid="industries">
        <SectionHead eyebrow="Industries we help grow" lines={["Across food, health, fitness,", <em key="i" className="italic text-mint">retail, travel and education.</em>]}
          text="Grow With Hari has worked with businesses across food, health, wellness, fitness, construction, creative services, retail, travel and education in Kerala." />
        <div className="mt-12 hidden md:grid grid-cols-[60px_1.3fr_1fr_1.3fr] gap-8 px-4 pb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-sage">
          <span>#</span><span>Industry</span><span>Typical challenge</span><span className="text-mint">How we help</span>
        </div>
        <ul className="border-b border-line">{INDUSTRIES.map((r, i) => <IndustryRow key={r[0]} row={r} i={i} />)}</ul>
      </Section>

      <Section testid="results" className="pb-32">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Results we focus on" lines={["Numbers that", <em key="n" className="italic text-mint">move the business.</em>]} />
            <Reveal delay={0.2}><p className="mt-6 inline-block rounded-full border border-mint/40 px-4 py-2 font-mono text-xs text-mint">[Client case studies — coming soon]</p></Reveal>
          </div>
          <Checklist items={RESULTS} testid="results-list" />
        </div>
      </Section>
    </>
  );
}
