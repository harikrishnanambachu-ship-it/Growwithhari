# Grow With Hari — PRD

## Original problem statement
"hello dear give me the best stunnning animated intracttive wesite with contnet anf logo which wshould feel modern and stylish website try to use dark colour alingned to the logo and pictures inncludes all daigrms if possible with minimalistic animations gibe me thee best result its my personal website make it as good as possible" — plus GWH Consulting logo and the "Grow With Hari Website Content (SEO & AEO)" PDF. Follow-up: "make it maximum animated one".

User choices: contact form saved to private inbox AND show email/phone; near-black with green highlights; stock photos for now.

## Architecture
- React (CRA + Tailwind + framer-motion + lenis) multi-page site; FastAPI + MongoDB backend.
- Content lives in `frontend/src/lib/content.js` and `lib/services.js` (from the PDF).
- Diagrams: `components/diagrams/*` (Swimlane x13, JourneyFlow, StackCompare + CostTable, ProcessTimeline, CycleDiagram (onboarding + process-setting), LensesDiagram, PositioningMap).
- Backend: `/api/contact` (public), `/api/auth/*` (JWT httpOnly cookie, single seeded admin, brute-force lockout), `/api/admin/messages` (list/patch/delete).

## Personas
- Kerala founders/SME owners looking for growth consulting & automation.
- Hari (owner) reading enquiries in the private inbox.

## Implemented (2026-11-10)
- All stock photos replaced with AI-generated Kerala-themed images (page heroes, who-we-help cards, tea terraces, backwater band).
- Photos from the content PDF: Hari portraits (home hero arch, new "Meet the founder" home section, About hero + founder card) and team headshots (About team cards).
- Pages: Home, About, Services, Automation (+ Technology advantage & cost table), Process (+ onboarding + process-setting), Market (+ industries, results), FAQ, Contact, Admin login, Admin inbox.
- Preloader with drawn SVG logo, masked line hero reveal, mouse-reactive node network canvas, 3D tilt arch image, parallax, slow editorial marquees, scroll-scrubbed quote, magnetic buttons, glow cards, smooth scrolling, scroll progress bar, mobile menu with circular reveal.
- Recreated GWH SVG logo (dark mode) + SVG favicon; per-page titles/meta descriptions.

## Backlog
- P1: Change-password for owner; email notification on new enquiry.
- P1: Real founder/team photos; case studies; Track C batch dates/fees.
- P2: Blog (topics listed in PDF); JSON-LD schema (Organization, FAQPage, HowTo); sitemap/robots.

## Next tasks
- Replace placeholders: [Batch dates, duration and fees], [Client case studies], social URLs.
