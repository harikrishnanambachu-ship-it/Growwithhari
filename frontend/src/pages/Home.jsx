import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ScrollQuote, WhoWeHelp, WhyUs, TracksPreview, MeetHari } from "@/components/home/Sections";
import { Marquee } from "@/components/site/Marquee";
import { Section } from "@/components/site/PageBits";
import { Reveal, SectionHead } from "@/components/site/Reveal";
import { JourneyFlow } from "@/components/diagrams/JourneyFlow";
import { ProcessTimeline } from "@/components/diagrams/ProcessTimeline";

const ParallaxBand = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.88, 1]);
  return (
    <section ref={ref} data-testid="home-band" className="relative px-3 sm:px-6">
      <motion.div style={{ scale }} className="relative mx-auto h-[70vh] max-w-[1500px] overflow-hidden rounded-[2rem] sm:rounded-[3rem]">
        <motion.img src="/img/k-band.jpg" alt="Kerala backwaters with a houseboat, from above" style={{ y }} className="absolute inset-0 h-[130%] w-full object-cover brightness-[0.7]" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent" />
        <div className="relative flex h-full flex-col justify-end p-7 sm:p-14">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mint">Rooted in Kerala · working across India and the Gulf</p>
          <p className="mt-5 max-w-3xl font-display text-4xl sm:text-6xl font-light leading-[1.02] text-bone">Strategy. Growth. <em className="italic text-mint">Impact.</em></p>
        </div>
      </motion.div>
    </section>
  );
};

const MoreLink = ({ to, children, testid }) => (
  <Reveal className="mt-8">
    <Link to={to} data-testid={testid} className="group inline-flex items-center gap-2 text-sm text-mint hover:text-bone">
      {children} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
    </Link>
  </Reveal>
);

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <ScrollQuote />
      <WhoWeHelp />
      <MeetHari />
      <WhyUs />
      <ParallaxBand />
      <TracksPreview />
      <Section testid="home-journey">
        <SectionHead eyebrow="Automation" lines={["Every enquiry answered,", <em key="j" className="italic text-mint">tracked and followed up.</em>]}
          text="Leads from ads, Google and the website land in WhatsApp, get an instant AI reply and go into the CRM. Ready leads go to your team, and every step feeds one live dashboard." />
        <Reveal className="mt-12"><JourneyFlow /></Reveal>
        <MoreLink to="/automation" testid="home-journey-more">Explore automation strategies</MoreLink>
      </Section>
      <Marquee reverse testid="marquee-2" items={["Discover", "Plan", "Build", "Launch", "Review & scale"]} />
      <Section testid="home-process">
        <SectionHead eyebrow="Our process" lines={["Five steps from first call", <em key="p" className="italic text-mint">to a business that runs on systems.</em>]} />
        <Reveal className="mt-12"><ProcessTimeline /></Reveal>
        <MoreLink to="/process" testid="home-process-more">See how we work</MoreLink>
      </Section>
    </>
  );
}
