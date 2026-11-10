import { MARQUEE } from "@/lib/content";

export const Marquee = ({ items = MARQUEE, reverse = false, testid = "marquee" }) => (
  <div data-testid={testid} className="relative overflow-hidden border-y border-line py-6 sm:py-8 [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
    <div className={`marquee-track flex w-max ${reverse ? "reverse" : ""}`}>
      {[0, 1].map((k) => (
        <div key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
          {items.map((t, i) => (
            <span key={i} className="flex items-center">
              <span className={`px-6 sm:px-10 font-display text-4xl sm:text-6xl lg:text-7xl font-light italic ${i % 2 ? "text-outline" : "text-bone"}`}>{t}</span>
              <svg viewBox="0 0 24 24" className="h-6 w-6 sm:h-8 sm:w-8 text-mint" fill="currentColor"><path d="M4 20 C6 10 12 4 22 2 C21 12 14 19 4 20 Z" /></svg>
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);
