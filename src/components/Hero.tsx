import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG } from "@/lib/images";
import { useInquiry } from "@/lib/inquiry";
import { ActionButton, ArrowRight } from "@/components/ui/primitives";

const HEADLINE_LINES = [
  "Solve Coating Problems.",
  "Improve Your Process.",
  "Move Production Forward.",
];

const SPEC_READOUTS = [
  { k: "Support", v: "Troubleshooting" },
  { k: "Process", v: "Evaluation" },
  { k: "Team", v: "Technical Training" },
  { k: "Docs", v: "Procedures" },
];

const TICKER = [
  "Troubleshooting",
  "Coating Defect Investigation",
  "Process Evaluation",
  "Technical Training",
  "Procedure Documentation",
  "On-Site & Remote Support",
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { openInquiry } = useInquiry();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? ["0%", "0%"] : ["0%", "18%"],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [0, -60],
  );
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, 0.55],
  );

  const goToServices = () => {
    const el = document.getElementById("services");
    if (!el) return;
    el.scrollIntoView({
      behavior: reduce ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="home"
      ref={ref}
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-ink"
      aria-label="Introduction"
    >
      {/* Background plate */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y: bgY, willChange: "transform" }}
      >
        <motion.img
          src={IMG.hero.src}
          alt={IMG.hero.alt}
          fetchPriority="high"
          decoding="sync"
          className="h-[118%] w-full object-cover object-[64%_center] sm:object-[68%_center] lg:object-[66%_center]"
          initial={{ scale: reduce ? 1 : 1.12, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            scale: { duration: reduce ? 0 : 16, ease: [0.22, 1, 0.36, 1] },
            opacity: { duration: 1.1, ease: "easeOut" },
          }}
        />
      </motion.div>

      {/* Cinematic grade */}
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-ink/62"
        style={{ opacity: overlayOpacity }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,#101820_0%,rgba(16,24,32,0.95)_30%,rgba(16,24,32,0.5)_62%,rgba(16,24,32,0.62)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-72 bg-[linear-gradient(to_top,#101820,rgba(16,24,32,0))]"
      />
      <div
        aria-hidden="true"
        className="blueprint-grid absolute inset-0 -z-10 opacity-70"
      />

      {/* Content */}
      <motion.div
        style={{ y: contentY }}
        className="container-industrial relative pb-24 pt-28 sm:pb-28 sm:pt-32 lg:pb-32 lg:pt-36"
      >
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8 xl:col-span-7">
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                aria-hidden="true"
                className="block h-px bg-ember"
                initial={{ width: 0 }}
                animate={{ width: "3.5rem" }}
                transition={{
                  duration: reduce ? 0 : 1.1,
                  delay: 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
              <span className="eyebrow text-steel-300">
                Powder Coating Consulting &amp; Technical Support
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mt-7 font-display text-[2.45rem] font-semibold leading-[1.02] text-white sm:text-[3.25rem] md:text-[3.9rem] lg:text-[4.1rem] xl:text-[4.6rem]">
              {HEADLINE_LINES.map((line, i) => (
                <span key={line} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: reduce ? 0 : "108%" }}
                    animate={{ y: 0 }}
                    transition={{
                      duration: reduce ? 0 : 1.05,
                      delay: 0.4 + i * 0.13,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {i === 2 ? (
                      <span className="text-ember">{line}</span>
                    ) : (
                      line
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Supporting copy */}
            <motion.p
              className="mt-8 max-w-[38rem] text-[0.9375rem] leading-[1.75] text-steel-100/85 sm:text-base sm:leading-[1.8]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              Practical powder coating expertise for manufacturers and coating
              operations. Get help troubleshooting coating imperfections, improving
              processes, training your team, and developing clear, effective
              operating procedures.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <ActionButton
                variant="primary"
                onClick={() => openInquiry()}
                className="w-full sm:w-auto"
              >
                Discuss Your Coating Challenge
                <ArrowRight />
              </ActionButton>
              <button
                type="button"
                onClick={goToServices}
                className="group inline-flex w-full items-center justify-center gap-3 border border-white/25 bg-white/[0.04] px-7 py-4 font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-[2px] transition-all duration-300 hover:border-white/60 hover:bg-white/[0.09] active:translate-y-px sm:w-auto"
              >
                Explore Our Services
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </motion.div>

            <motion.p
              className="mt-6 flex items-center gap-2.5 text-[0.75rem] font-medium uppercase tracking-[0.18em] text-steel/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.25 }}
            >
              <span
                aria-hidden="true"
                className="relative flex h-1.5 w-1.5 shrink-0"
              >
                <span className="absolute inset-0 rounded-full bg-ember" />
                <span className="absolute inset-0 animate-ping rounded-full bg-ember" />
              </span>
              On-Site &amp; Remote Consulting
            </motion.p>
          </div>

          {/* Technical readout rail */}
          <motion.aside
            className="hidden lg:col-span-4 lg:block xl:col-span-5"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="ml-auto max-w-xs border-l border-white/15 pl-6">
              <p className="font-display text-[0.625rem] font-medium uppercase tracking-[0.26em] text-steel/70">
                Support Areas
              </p>
              <ul className="mt-5 space-y-4">
                {SPEC_READOUTS.map((row, i) => (
                  <motion.li
                    key={row.k}
                    className="flex items-baseline justify-between gap-4 border-b border-white/[0.08] pb-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.25 + i * 0.1 }}
                  >
                    <span className="font-display text-[0.6875rem] uppercase tracking-[0.18em] text-steel/70">
                      {row.k}
                    </span>
                    <span className="font-display text-sm font-medium tracking-tight text-white">
                      {row.v}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </motion.div>

      {/* Bottom edge label + scroll cue */}
      <div className="relative z-10 border-t border-white/12 bg-ink/55 backdrop-blur-md">
        <div className="container-industrial">
          <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="eyebrow text-steel/85">
              Troubleshooting / Training / Process Documentation
            </p>
            <div className="hidden items-center gap-2.5 text-steel/70 sm:flex">
              <span className="text-[0.6875rem] uppercase tracking-[0.2em]">
                Scroll
              </span>
              <motion.span
                aria-hidden="true"
                className="block h-8 w-px bg-gradient-to-b from-ember to-transparent"
                animate={reduce ? undefined : { scaleY: [0.25, 1, 0.25], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                style={{ originY: 0 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Ticker strip (decorative, low contrast) */}
      <div
        aria-hidden="true"
        className="relative z-10 overflow-hidden border-t border-white/[0.07] bg-ink-900/70 py-2.5"
      >
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span
              key={`${t}-${i}`}
              className="flex items-center gap-10 font-display text-[0.625rem] uppercase tracking-[0.24em] text-steel/45"
            >
              {t}
              <span aria-hidden="true" className="h-1 w-1 bg-ember/50" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
