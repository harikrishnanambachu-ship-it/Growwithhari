import { motion } from "framer-motion";
import { PageHero, Section, Checklist } from "@/components/site/PageBits";
import { Reveal, SectionHead, Eyebrow } from "@/components/site/Reveal";
import { JourneyFlow } from "@/components/diagrams/JourneyFlow";
import { StackCompare, CostTable } from "@/components/diagrams/StackCompare";
import { Marquee } from "@/components/site/Marquee";
import { STRATEGIES, TOOLS, ROLLOUT } from "@/lib/content";

const Strategy = ({ s, i }) => (
  <Reveal delay={(i % 3) * 0.1}>
    <motion.div whileHover={{ y: -6 }} data-testid={`strategy-${i}`} className="group h-full rounded-[1.5rem] border border-line bg-panel/60 p-7 transition-colors hover:border-mint/50">
      <span className="font-display text-5xl font-light text-outline transition-colors duration-500 group-hover:text-mint">0{i + 1}</span>
      <h3 className="mt-6 font-display text-2xl font-light text-bone">{s.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-sage">{s.text}</p>
    </motion.div>
  </Reveal>
);

export default function Automation() {
  return (
    <>
      <PageHero testid="automation-hero" eyebrow="Automation strategies" img="/img/laptop.jpg"
        lines={["AI and WhatsApp", <em key="a" className="italic text-mint">automation</em>, "for growing businesses."]}
        text="Business automation means letting software handle repeat work, like answering enquiries, following up leads and sending reminders, so your team spends time on customers, not admin. We design automation around one goal: no lead is missed and no customer is forgotten." />

      <Section testid="automation-journey">
        <SectionHead eyebrow="Automated customer journey · 6 stages, 1 decision" lines={["Every enquiry is answered,", <em key="e" className="italic text-mint">tracked and followed up.</em>]}
          text="Leads from ads, Google and the website land in WhatsApp, get an instant AI reply and go into the CRM. Leads not ready to buy get a nurture sequence; ready leads go to your team, and every step feeds one live dashboard." />
        <Reveal className="mt-12"><JourneyFlow /></Reveal>
      </Section>

      <Section testid="automation-strategies">
        <SectionHead eyebrow="Six strategies we implement" lines={["Six automations,", <em key="s" className="italic text-mint">one goal.</em>]} />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {STRATEGIES.map((s, i) => <Strategy key={s.title} s={s} i={i} />)}
        </div>
      </Section>

      <Marquee items={TOOLS} testid="tools-marquee" />

      <Section testid="automation-rollout">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="How we roll out automation" lines={["Fastest payback", <em key="r" className="italic text-mint">first.</em>]} />
          <Checklist items={ROLLOUT} testid="rollout-list" />
        </div>
      </Section>

      <Section testid="tech-advantage">
        <SectionHead eyebrow="Technology advantage" lines={["Direct Meta integration.", <em key="d" className="italic text-mint">Lower marketing and staffing costs.</em>]}
          text="Grow With Hari builds WhatsApp and Meta automation directly on Meta's official WhatsApp Cloud API and Meta Ads, with no third-party reseller platform or connector tools in between. You pay Meta's own charges and nothing to middlemen." />
        <Reveal className="mt-12"><StackCompare /></Reveal>
        <Reveal><p className="mt-6 text-sm text-sage">A typical setup stacks a reseller platform, connector tools and per-user CRM seats on top of Meta, and still needs staff to follow up by hand. Going direct removes those layers.</p></Reveal>
      </Section>

      <Section testid="cost-section">
        <SectionHead eyebrow="How it reduces your costs" lines={["Where the savings", <em key="c" className="italic text-mint">come from.</em>]} />
        <Reveal className="mt-12"><CostTable /></Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[["Marketing", "Every rupee of ad spend lands in a WhatsApp chat that gets an instant reply, so fewer paid leads are lost."],
            ["Human resources", "Your team stops answering the same questions all day and spends its time closing sales and serving customers. A growing business can handle more enquiries without hiring in step."]].map(([t, d], i) => (
            <Reveal key={t} delay={i * 0.1}>
              <div className="h-full rounded-[1.5rem] border border-mint/30 bg-forest/20 p-7">
                <Eyebrow>{t}</Eyebrow>
                <p className="mt-4 text-bone/90">{d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mt-6 text-xs text-sage">Meta's own conversation charges still apply. Actual savings depend on your volume and current tools.</p>
      </Section>
    </>
  );
}
