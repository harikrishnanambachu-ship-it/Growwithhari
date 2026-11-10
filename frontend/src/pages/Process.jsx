import { PageHero, Section, Checklist } from "@/components/site/PageBits";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { ProcessTimeline } from "@/components/diagrams/ProcessTimeline";
import { CycleDiagram } from "@/components/diagrams/CycleDiagram";
import { Marquee } from "@/components/site/Marquee";
import { RECEIVE, ONBOARDING, NEEDS, CYCLE } from "@/lib/content";

export default function Process() {
  return (
    <>
      <PageHero testid="process-hero" eyebrow="Our process" img="/img/k-process.jpg"
        lines={["How Grow With Hari", <em key="p" className="italic text-mint">works.</em>]}
        text="Every engagement follows five steps: Discover, Plan, Build, Launch, and Review and Scale. You always know what happens next, who owns it and what you will receive." />

      <Section testid="process-steps">
        <SectionHead eyebrow="Engagement process · indicative timings" lines={["Five steps from first call", <em key="f" className="italic text-mint">to a business that runs on systems.</em>]} />
        <Reveal className="mt-12"><ProcessTimeline /></Reveal>
        <Reveal><p className="mt-6 text-sm text-sage">Start with a free Growth Clarity Call; each monthly review then decides what to build or improve next. Timings are indicative and are fixed in the MOU.</p></Reveal>
      </Section>

      <Section testid="process-receive">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="What you receive" lines={["Deliverables", <em key="d" className="italic text-mint">you can hold.</em>]} />
          <Checklist items={RECEIVE} testid="receive-list" />
        </div>
      </Section>

      <Marquee items={["Enquiry", "Clarity Call", "Proposal", "MOU", "Onboarding kit", "Kickoff"]} testid="onboarding-marquee" />

      <Section testid="onboarding">
        <SectionHead eyebrow="Client onboarding" lines={["From first enquiry to kickoff", <em key="o" className="italic text-mint">in six clear steps.</em>]}
          text="New clients go from first enquiry to kickoff in six steps, starting with a free Growth Clarity Call. Nothing starts until scope and fees are agreed in an MOU." />
        <Reveal className="mt-14"><CycleDiagram steps={ONBOARDING} id="onboarding" centerLabel="Step" loop={false} /></Reveal>
        <div className="mt-20 grid gap-12 lg:grid-cols-2">
          <SectionHead eyebrow="What we need from you" lines={["At onboarding."]} text="Once onboarded, you get a shared WhatsApp group with the Grow With Hari team for daily questions and updates." />
          <Checklist items={NEEDS} testid="needs-list" />
        </div>
      </Section>

      <Section testid="process-setting" className="pb-32">
        <SectionHead eyebrow="Process-setting strategy" lines={["How we set up processes", <em key="s" className="italic text-mint">in your business.</em>]}
          text="We set up every business process in a six-step cycle: map it, find the gaps, standardise it, give it an owner, automate the repeat work and measure it every month." />
        <Reveal className="mt-14"><CycleDiagram steps={CYCLE} id="process" centerLabel="Cycle" /></Reveal>
        <Reveal><p className="mt-10 max-w-3xl text-sm sm:text-base text-sage">The cycle repeats, so processes keep improving as the business grows instead of breaking under new volume. Typical processes we set up: lead handling, sales follow-up, order and delivery, customer support, hiring and onboarding, and monthly reporting.</p></Reveal>
      </Section>
    </>
  );
}
