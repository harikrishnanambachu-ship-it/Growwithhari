import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { PageHero, Section } from "@/components/site/PageBits";
import { Reveal } from "@/components/site/Reveal";
import { FAQS } from "@/lib/content";

export default function Faq() {
  return (
    <>
      <PageHero testid="faq-hero" eyebrow="FAQ"
        lines={["Questions,", <em key="q" className="italic text-mint">answered directly.</em>]}
        text="Answers on growth consulting, WhatsApp automation, funding readiness and how to get started with Grow With Hari." />
      <Section testid="faq-list" className="pt-0 pb-32">
        <Accordion type="single" collapsible defaultValue="q0" className="border-t border-line">
          {FAQS.map(([q, a], i) => (
            <Reveal key={q} delay={Math.min(i, 6) * 0.04}>
              <AccordionItem value={`q${i}`} className="border-line">
                <AccordionTrigger data-testid={`faq-q-${i}`} className="group py-7 text-left font-display text-xl sm:text-2xl font-light text-bone hover:no-underline [&>svg]:text-mint">
                  <span className="flex gap-5"><span className="mt-1.5 font-mono text-xs text-mint">{String(i + 1).padStart(2, "0")}</span><span className="transition-colors group-hover:text-mint">{q}</span></span>
                </AccordionTrigger>
                <AccordionContent className="pb-7 pl-10 text-sm sm:text-base leading-relaxed text-sage">{a}</AccordionContent>
              </AccordionItem>
            </Reveal>
          ))}
        </Accordion>
      </Section>
    </>
  );
}
