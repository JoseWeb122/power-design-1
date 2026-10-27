# Powder Coating Technical Consulting — Website

A premium, cinematic, conversion-focused front-end website for a powder coating
consulting, technical troubleshooting, and industrial training business.

> **Temporary identity.** “Powder Coating Technical Consulting” is a placeholder
> brand. No consultant name, company name, credentials, certifications,
> testimonials, client logos, years of experience, or numerical results have been
> invented. Every claim-free wording choice is deliberate and can be swapped for
> confirmed information later.

---

## Stack

| Layer     | Choice                                        |
| --------- | --------------------------------------------- |
| Framework | React 19 + TypeScript                         |
| Build     | Vite 7 (`vite-plugin-singlefile`)             |
| Styling   | Tailwind CSS v4 (theme tokens in `index.css`)  |
| Animation | Framer Motion (motion)                         |
| Icons     | Lucide React                                   |

No backend, database, CRM, payment processing, or user accounts are involved.

---

## Design system

Defined once in `src/index.css` via Tailwind v4 `@theme`:

| Token            | Value     | Use                                             |
| ---------------- | --------- | ----------------------------------------------- |
| `ink`            | `#101820` | Deep midnight navy — cinematic dark sections     |
| `ink-900/800`    | variants  | Deepest backgrounds / raised dark surfaces      |
| `charcoal`       | `#171C22` | Dark panels, footer                             |
| `steel`          | `#87939D` | Metallic steel gray — secondary text            |
| `steel-300/100`  | variants  | Light steel text on dark, hairline borders      |
| `ember`          | `#F47732` | Warm industrial orange — CTAs and accents only  |
| `mist`           | `#F3F5F7` | Light neutral section background                |
| `font-display`   | Space Grotesk | Headlines, labels, numerals                 |
| `font-sans`      | Inter     | Body copy                                       |

Custom utilities: `.container-industrial`, `.eyebrow`, `.blueprint-grid`,
`.blueprint-grid-light`, `.film-grain`, `.marquee-track`, `.clip-corner`.

All animation respects `prefers-reduced-motion` — both via
`useReducedMotion()` in JS and a global CSS media query.

---

## Architecture

```
src/
├─ App.tsx                     Page composition (single-page, anchor sections)
├─ index.css                   Tailwind theme tokens + custom utilities
├─ data/
│  └─ content.ts               All copy, services, problems, FAQs, articles
├─ lib/
│  ├─ images.ts                Central image manifest (CDN stock photography)
│  └─ inquiry.tsx              InquiryProvider — prefills + scrolls the form
├─ components/
│  ├─ Header.tsx               Scroll-aware nav, scroll-spy, mobile drawer
│  ├─ Hero.tsx                 Cinematic hero, parallax, entrance animation
│  ├─ Intro.tsx                Trust-building two-column intro
│  ├─ Services.tsx             Editorial 5-service grid (clickable tiles)
│  ├─ ProblemSelector.tsx      Dark diagnostic issue selector
│  ├─ Process.tsx              4-step timeline (horizontal / vertical)
│  ├─ ConsultingMethods.tsx    On-site vs. remote split panels
│  ├─ Industries.tsx           Audience image grid
│  ├─ Resources.tsx            Article previews + accessible article modals
│  ├─ About.tsx                Consultant positioning
│  ├─ ValueProps.tsx           Four value propositions
│  ├─ FAQ.tsx                  Single-open accordion
│  ├─ ContactSection.tsx       Consultation inquiry form (primary conversion)
│  ├─ Footer.tsx               Final CTA band + link columns
│  └─ ui/primitives.tsx        Reveal, SectionLabel, EmberRule, buttons, etc.
└─ utils/cn.ts                 clsx + tailwind-merge helper
```

### Section IDs / anchors

`#home`, `#intro`, `#services`, `#challenges`, `#process`, `#methods`,
`#industries`, `#resources`, `#about`, `#why`, `#faq`, `#contact`.

Every navigation item, footer link, and in-page CTA resolves to one of these.

---

## The inquiry context (`src/lib/inquiry.tsx`)

A single React context powers the whole conversion path:

- `openInquiry({ supportType, method, note })` — smooth-scrolls to `#contact`,
  applies any prefills, and briefly highlights the form with an orange ring plus
  a “Form updated with your selection” badge.
- Called from: the hero primary CTA, every service tile, every problem-selector
  entry, both consulting-method panels, every industry tile, the About CTA, the
  process CTA, article modals, the FAQ side CTA, the header button, the mobile
  drawer, and the footer.
- User-typed input is never destroyed — prefills only fill empty fields.

---

## ⚠️ Simulated form submission

**The consultation inquiry form is a front-end demonstration only.**

- Validation, error messages, character counting, and state preservation all run
  entirely in the browser.
- Pressing **Submit Consultation Inquiry** shows a loading state for ~1.5s and
  then a confirmation panel that explicitly states nothing was transmitted and no
  email was sent.
- The confirmation panel restates the submitted values and offers
  **Submit Another Test Inquiry** (resets the form) and **Review the Services**.
- No `fetch`, `XHR`, beacon, analytics event, or storage write is performed.

To connect a real endpoint later, replace the `setTimeout` in
`handleSubmit()` inside `src/components/ContactSection.tsx` with the request call
and adjust the confirmation copy.

---

## Interaction inventory (all verified)

| Interaction | Where | Behaviour |
| --- | --- | --- |
| Scroll-aware header | `Header.tsx` | Transparent → blurred solid, height shrinks |
| Scroll-spy underline | `Header.tsx` | IntersectionObserver over all section IDs |
| Mobile drawer | `Header.tsx` | Slide-in panel, body-scroll lock, Esc to close |
| Cinematic entrance | `Hero.tsx` | Line-masked headline reveal, staggered |
| Background parallax | `Hero.tsx` | `useScroll` + `useTransform`, disabled for reduced motion |
| Scroll reveals | `primitives.tsx` | `Reveal` wrapper with stagger delays |
| Image zoom on hover | `Services`, `Industries`, `Resources`, `ConsultingMethods` | CSS transform, 900–1100ms |
| Service tile select | `Services.tsx` | Stretched accessible anchor; preselects support type |
| Problem selector | `ProblemSelector.tsx` | Click an issue → animated detail panel + prefilled CTA |
| Article modals | `Resources.tsx` | Esc / backdrop / button close, focus restore |
| FAQ accordion | `FAQ.tsx` | One panel open at a time, animated plus/minus |
| Form validation | `ContactSection.tsx` | Required + email format, inline errors, focus first error |
| Simulated submit | `ContactSection.tsx` | Loading → confirmation → reset |
| Footer year | `Footer.tsx` | `new Date().getFullYear()` |

---

## Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav aria-label>`,
  `<section aria-labelledby>`, `<ol>/<ul>` for lists.
- Skip-to-content link, visible `:focus-visible` ember outline site-wide.
- Every form control has a real `<label>` / `<legend>` with `aria-required`,
  `aria-invalid`, and `aria-describedby` wiring errors to inputs.
- Validation summary announced through an `aria-live="polite"` region; the
  confirmation panel uses `role="status"`.
- Service and industry tiles use stretched anchors with descriptive
  screen-reader text (no nested headings inside buttons).
- Article modals are `role="dialog" `+ `aria-modal`, move focus in, restore it on
  close, and close on Escape.
- Decorative layers (`blueprint-grid`, ticker strip, gradients, accent rules)
  carry `aria-hidden="true"`.
- Full `prefers-reduced-motion` support.

---

## SEO & performance

- Descriptive `<title>` and meta description focused on powder coating
  consulting and troubleshooting.
- Open Graph + Twitter card metadata.
- Single `h1` (hero) with a logical `h2 → h3` hierarchy beneath.
- Descriptive `alt` text on every content image; decorative images use empty alt.
- All photography lazy-loaded with `loading="lazy"` + `decoding="async"`; the
  hero uses `fetchpriority="high"`.
- Images are CDN-served, width/height-cropped, and never bundled into the HTML —
  the production build is a single ~553 kB file (~160 kB gzipped).
- `overflow-x: hidden` on `body` plus fluid type scales prevent horizontal
  overflow from 320 px upward.

---

## Responsive behaviour

| Breakpoint | Layout |
| --- | --- |
| `< 640px` | Single column, full-width CTAs, compact nav drawer, vertical timeline |
| `640–1023px` | Two-column grids, split hero CTAs, article grid |
| `1024px+` | 12-column editorial grids, sticky sidebars, horizontal process timeline |
| `1280px+` | Hero technical-readout rail, wider measure, larger display type |

---

## Pending business information

The following are intentionally placeholders awaiting confirmed details:

- Consultant name, biography, and photograph
- Company / trading name
- Email address and telephone number
- Physical address and service regions
- Certifications, accreditations, and client references
- Published articles (current articles are labelled draft educational content)
