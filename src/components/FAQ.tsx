import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { FAQS } from "@/data/content";
import { useInquiry } from "@/lib/inquiry";
import { cn } from "@/utils/cn";
import { ArrowRight, Reveal, SectionLabel } from "@/components/ui/primitives";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openInquiry } = useInquiry();
  const reduce = useReducedMotion();

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="container-industrial">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left column — sticky head */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <Reveal>
                <SectionLabel>Frequently Asked Questions</SectionLabel>
              </Reveal>
              <Reveal delay={0.08}>
                <h2
                  id="faq-heading"
                  className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.35rem]"
                >
                  Questions Worth Asking Before You Get In Touch.
                </h2>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="mt-6 text-[0.9375rem] leading-[1.8] text-ink/65">
                  If something isn't covered here, ask it in the inquiry form — the
                  description field is the right place for it.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <button
                  type="button"
                  onClick={() => openInquiry()}
                  className="group mt-8 inline-flex items-center gap-3 border border-ink/20 px-6 py-3.5 font-display text-[0.75rem] font-medium uppercase tracking-[0.14em] text-ink transition-colors duration-300 hover:border-ink/50 hover:bg-ink/[0.03]"
                >
                  Ask a Different Question
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Reveal>
            </div>
          </div>

          {/* Right column — accordion */}
          <div className="lg:col-span-8">
            <Reveal delay={0.1}>
              <ul className="border-t border-ink/12">
                {FAQS.map((faq, i) => {
                  const isOpen = openIndex === i;
                  return (
                    <li key={faq.q} className="border-b border-ink/12">
                      <h3>
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`faq-panel-${i}`}
                          id={`faq-trigger-${i}`}
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          className={cn(
                            "group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-300 sm:py-6",
                            isOpen ? "text-ink" : "text-ink/80 hover:text-ink",
                          )}
                        >
                          <span className="flex items-baseline gap-4 sm:gap-6">
                            <span
                              className={cn(
                                "font-display text-[0.6875rem] font-medium tabular-nums transition-colors",
                                isOpen ? "text-ember" : "text-steel/60",
                              )}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="font-display text-[1rem] font-medium leading-snug tracking-tight sm:text-[1.0625rem]">
                              {faq.q}
                            </span>
                          </span>

                          {/* Plus / minus indicator */}
                          <span
                            aria-hidden="true"
                            className={cn(
                              "relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border transition-colors duration-300",
                              isOpen
                                ? "border-ember bg-ember text-white"
                                : "border-ink/20 text-ink/60 group-hover:border-ink/45",
                            )}
                          >
                            <span className="absolute h-[1.5px] w-3 bg-current" />
                            <motion.span
                              className="absolute h-3 w-[1.5px] bg-current"
                              initial={false}
                              animate={{ scaleY: isOpen ? 0 : 1 }}
                              transition={{ duration: reduce ? 0 : 0.3 }}
                            />
                          </span>
                        </button>
                      </h3>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            id={`faq-panel-${i}`}
                            role="region"
                            aria-labelledby={`faq-trigger-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: reduce ? 0 : 0.36,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pl-[2.1rem] pr-2 text-[0.875rem] leading-[1.85] text-ink/65 sm:pl-[3rem] sm:pr-12">
                              {faq.a}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
