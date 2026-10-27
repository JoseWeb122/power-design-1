import { Check } from "lucide-react";
import { IMG } from "@/lib/images";
import { useInquiry } from "@/lib/inquiry";
import {
  ArrowRight,
  EmberRule,
  ParallaxLayer,
  Reveal,
  SectionLabel,
} from "@/components/ui/primitives";

const PRINCIPLES = [
  "Understand the problem before proposing a fix",
  "Work from what the process is actually doing",
  "Explain the reasoning so the team can repeat it",
  "Document what should stay the same",
];

export function About() {
  const { openInquiry } = useInquiry();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="container-industrial">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Portrait / neutral visual treatment */}
          <div className="lg:col-span-5">
            <Reveal y={34}>
              <figure className="relative">
                <ParallaxLayer
                  distance={24}
                  className="aspect-[4/5] w-full bg-ink"
                >
                  <img
                    src={IMG.about.src}
                    alt={IMG.about.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </ParallaxLayer>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(16,24,32,0.72),rgba(16,24,32,0.05)_52%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border border-ink/10"
                />

                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                  <p className="font-display text-[0.6875rem] uppercase leading-relaxed tracking-[0.16em] text-white/85">
                    Consulting focused on the finishing process, not the paperwork
                    around it
                  </p>
                  <p className="mt-2 font-display text-[0.5625rem] uppercase tracking-[0.2em] text-white/45">
                    Representative image — consultant identity to be confirmed
                  </p>
                </div>
              </figure>
            </Reveal>
          </div>

          {/* Copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>About the Consulting</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="about-heading"
                className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem] lg:text-[3.1rem]"
              >
                Practical Technical Support.{" "}
                <span className="text-steel">Focused on Your Operation.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <EmberRule className="mt-7" />
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-7 max-w-2xl space-y-5 text-[0.9375rem] leading-[1.85] text-ink/70 sm:text-base">
                <p>
                  Powder coating challenges can be complex, especially when the same
                  concerns continue to affect finish quality or production
                  consistency. The goal of consulting is to help businesses better
                  understand those challenges, evaluate the available information,
                  and identify practical next steps.
                </p>
                <p>
                  Support is available for companies seeking help with
                  troubleshooting, process questions, technical training, and
                  procedure documentation, either on-site or remotely.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-9 grid gap-x-8 gap-y-3.5 sm:grid-cols-2">
                {PRINCIPLES.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center bg-ember/12 text-ember"
                    >
                      <Check className="h-3 w-3" strokeWidth={2.4} />
                    </span>
                    <span className="text-[0.875rem] leading-relaxed text-ink/70">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-11 flex flex-col gap-4 sm:flex-row sm:items-center">
                <button
                  type="button"
                  onClick={() => openInquiry()}
                  className="group inline-flex items-center justify-center gap-3 bg-ember px-7 py-4 font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ember-600 active:translate-y-px"
                >
                  Start a Conversation
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <p className="text-[0.75rem] leading-relaxed text-ink/45 sm:max-w-[16rem]">
                  Detailed consultant biography, credentials, and background will be
                  added once confirmed.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
