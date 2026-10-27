import { motion, useReducedMotion } from "framer-motion";
import { PROCESS_STEPS } from "@/data/content";
import { useInquiry } from "@/lib/inquiry";
import {
  ArrowRight,
  Reveal,
  SectionLabel,
} from "@/components/ui/primitives";

const GLYPHS = [
  "M3 17h4l4-10 4 10h4",
  "M4 5h16M4 12h10M4 19h13",
  "M12 3v18M5 8l7-5 7 5",
  "M5 12l5 5L20 7",
];

export function Process() {
  const reduce = useReducedMotion();
  const { openInquiry } = useInquiry();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="container-industrial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>How the Consulting Process Works</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="process-heading"
                className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem] lg:text-[3.15rem]"
              >
                A Clear Path From Problem to{" "}
                <span className="text-steel">Practical Next Steps.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.14}>
              <p className="max-w-md text-[0.9375rem] leading-[1.8] text-ink/65">
                Every engagement starts with a conversation about what you are
                seeing on the line. From there, the right shape of support becomes
                much easier to see.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Desktop horizontal */}
        <div className="relative mt-16 hidden lg:block">
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-[3.25rem] h-px bg-ink/12"
          />
          <motion.div
            aria-hidden="true"
            className="absolute left-0 top-[3.25rem] h-px origin-left bg-ember"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: reduce ? 0 : 1.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%" }}
          />
          <ol className="relative grid grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, i) => (
              <Reveal
                as="li"
                key={step.index}
                delay={0.12 + i * 0.16}
                y={30}
                className="relative pt-[7.5rem]"
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 flex h-[6.5rem] w-[6.5rem] items-center justify-center border border-ink/15 bg-mist"
                >
                  <span className="font-display text-[2rem] font-semibold leading-none tracking-tighter text-ink">
                    {step.index}
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-[6.5rem] top-[3.05rem] h-2 w-2 rotate-45 bg-ember"
                />
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="absolute right-0 top-6 h-6 w-6 text-ink/25"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="square"
                >
                  <path d={GLYPHS[i]} />
                </svg>
                <h3 className="font-display text-[1.15rem] font-semibold leading-snug tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-3.5 text-[0.875rem] leading-[1.75] text-ink/65">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>

        {/* Mobile / tablet vertical timeline */}
        <ol className="relative mt-12 lg:hidden">
          <span
            aria-hidden="true"
            className="absolute left-[1.375rem] top-2 bottom-2 w-px bg-ink/12"
          />
          {PROCESS_STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.index}
              delay={i * 0.08}
              y={22}
              className="relative flex gap-5 pb-10 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center border border-ink/15 bg-mist font-display text-[0.875rem] font-semibold tabular-nums text-ink"
              >
                {step.index}
              </span>
              <div className="pt-1">
                <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[0.875rem] leading-[1.75] text-ink/65">
                  {step.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>

        <Reveal delay={0.1}>
          <div className="mt-20 flex flex-col items-start gap-5 border-t border-ink/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-lg text-[0.8125rem] leading-relaxed text-ink/55">
              The first step costs nothing but a few minutes of description. Share
              what you are seeing and where it appears.
            </p>
            <button
              type="button"
              onClick={() => openInquiry()}
              className="group inline-flex shrink-0 items-center gap-3 bg-ink px-7 py-4 font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ember"
            >
              Start With Step One
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
