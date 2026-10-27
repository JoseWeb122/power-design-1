import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { IMG } from "@/lib/images";
import { PROBLEMS, SUPPORT_TYPE_OPTIONS } from "@/data/content";
import { useInquiry } from "@/lib/inquiry";
import { cn } from "@/utils/cn";
import { ArrowRight, Reveal, SectionLabel } from "@/components/ui/primitives";

function labelFor(supportType: string) {
  return (
    SUPPORT_TYPE_OPTIONS.find((o) => o.value === supportType)?.label ??
    "General consulting"
  );
}

export function ProblemSelector() {
  const [activeId, setActiveId] = useState<string>(PROBLEMS[0].id);
  const { openInquiry } = useInquiry();
  const reduce = useReducedMotion();

  const active = PROBLEMS.find((p) => p.id === activeId) ?? PROBLEMS[0];

  return (
    <section
      id="challenges"
      aria-labelledby="challenges-heading"
      className="film-grain relative overflow-hidden bg-ink py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/4 h-[32rem] w-[32rem] rounded-full bg-ember/[0.07] blur-[120px]"
      />

      <div className="container-industrial relative">
        {/* Head */}
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel tone="dark">Common Situations</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="challenges-heading"
              className="mt-6 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.6rem] lg:text-[3.1rem]"
            >
              Recurring Defects? Inconsistent Results?{" "}
              <span className="text-ember">A Team That Needs Technical Guidance?</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-2xl text-[0.9375rem] leading-[1.8] text-steel-300/80 sm:text-base">
              When coating problems keep returning, a closer look at the process can
              help identify what needs attention.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Issue list */}
          <Reveal delay={0.1} className="lg:col-span-6">
            <p className="font-display text-[0.625rem] font-medium uppercase tracking-[0.22em] text-steel/70">
              Select the situation that sounds most like yours
            </p>
            <ul
              role="list"
              className="mt-5 border-t border-white/10"
              aria-label="Common coating challenges"
            >
              {PROBLEMS.map((problem, i) => {
                const isActive = problem.id === activeId;
                return (
                  <li key={problem.id} className="border-b border-white/10">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveId(problem.id)}
                      className={cn(
                        "group flex w-full items-center justify-between gap-5 py-5 text-left transition-colors duration-300",
                        isActive ? "text-white" : "text-steel-300 hover:text-white",
                      )}
                    >
                      <span className="flex items-baseline gap-4 sm:gap-6">
                        <span
                          className={cn(
                            "font-display text-[0.6875rem] font-medium tabular-nums transition-colors",
                            isActive ? "text-ember" : "text-steel/50",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[1rem] font-medium leading-snug tracking-tight sm:text-[1.0625rem]">
                          {problem.title}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cn(
                          "flex h-7 w-7 shrink-0 items-center justify-center border transition-all duration-300",
                          isActive
                            ? "border-ember bg-ember text-white"
                            : "border-white/20 text-steel group-hover:border-white/45",
                        )}
                      >
                        <ArrowRight
                          className={cn(
                            "transition-transform duration-300",
                            isActive ? "rotate-90" : "",
                          )}
                          strokeWidth={1.6}
                        />
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* Detail panel */}
          <Reveal delay={0.16} className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <div className="relative overflow-hidden border border-white/12 bg-charcoal">
                <div className="relative h-44 overflow-hidden sm:h-52">
                  <img
                    src={IMG.problemDetail.src}
                    alt={IMG.problemDetail.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(23,28,34,0.96),rgba(23,28,34,0.15)_60%)]"
                  />
                  <span className="absolute left-5 top-5 font-display text-[0.625rem] uppercase tracking-[0.2em] text-white/60">
                    Selected Concern
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active.id}
                      initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: reduce ? 0 : -8 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <h3 className="font-display text-[1.2rem] font-semibold leading-snug tracking-tight text-white sm:text-[1.35rem]">
                        {active.title}
                      </h3>
                      <p className="mt-4 text-[0.875rem] leading-[1.8] text-steel-300/80">
                        {active.explanation}
                      </p>
                      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                        <span className="text-[0.6875rem] uppercase tracking-[0.18em] text-steel/60">
                          Matching support
                        </span>
                        <span className="border border-ember/40 bg-ember/10 px-3 py-1.5 font-display text-[0.6875rem] uppercase tracking-[0.12em] text-ember">
                          {labelFor(active.supportType)}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  <button
                    type="button"
                    onClick={() =>
                      openInquiry({
                        supportType: active.supportType,
                        note: `Selected concern: ${active.title}. `,
                      })
                    }
                    className="group mt-7 flex w-full items-center justify-between gap-4 bg-ember px-6 py-4 font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ember-600"
                  >
                    Discuss This Challenge
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>

                  <p className="mt-4 text-[0.6875rem] leading-relaxed text-steel/55">
                    A guided way to describe your situation — not an automated
                    diagnosis. Every coating process is different.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
