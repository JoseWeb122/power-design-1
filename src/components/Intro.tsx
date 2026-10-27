import { IMG } from "@/lib/images";
import { useInquiry } from "@/lib/inquiry";
import {
  ActionButton,
  ArrowRight,
  EmberRule,
  ParallaxLayer,
  Reveal,
  SectionLabel,
} from "@/components/ui/primitives";

const FACTS = [
  { k: "01", label: "Coating imperfections", note: "Investigated with the process in view" },
  { k: "02", label: "Process questions", note: "Reviewed against what the line actually does" },
  { k: "03", label: "Team capability", note: "Training shaped around your equipment" },
  { k: "04", label: "Documentation", note: "Procedures the floor can follow" },
];

export function Intro() {
  const { openInquiry } = useInquiry();

  return (
    <section
      id="intro"
      aria-labelledby="intro-heading"
      className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="container-industrial relative">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy column */}
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <SectionLabel>Technical Know-How. Practical Solutions.</SectionLabel>
            </Reveal>

            <Reveal delay={0.08}>
              <h2
                id="intro-heading"
                className="mt-6 font-display text-[2rem] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.5rem] lg:text-[3rem]"
              >
                When Coating Problems Disrupt Production,{" "}
                <span className="text-steel">Get the Right Support.</span>
              </h2>
            </Reveal>

            <Reveal delay={0.14}>
              <EmberRule className="mt-6" />
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-7 max-w-[36rem] text-[0.9375rem] leading-[1.8] text-ink/70 sm:text-base">
                Powder coating challenges can affect appearance, consistency,
                productivity, and confidence in your finishing process. Whether
                you're dealing with recurring imperfections, need technical
                guidance, or want to strengthen your team's knowledge, specialized
                consulting can help you understand the problem and identify a
                practical path forward.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {FACTS.map((f) => (
                  <li key={f.k} className="flex gap-4">
                    <span className="mt-0.5 font-display text-[0.6875rem] font-medium tabular-nums text-ember">
                      {f.k}
                    </span>
                    <span className="block">
                      <span className="block font-display text-[0.9375rem] font-medium tracking-tight text-ink">
                        {f.label}
                      </span>
                      <span className="mt-1 block text-[0.8125rem] leading-relaxed text-ink/55">
                        {f.note}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-11">
                <ActionButton variant="ghost" onClick={() => openInquiry()}>
                  Talk Through Your Situation
                  <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </ActionButton>
              </div>
            </Reveal>
          </div>

          {/* Image column */}
          <div className="order-1 lg:order-2 lg:col-span-6">
            <Reveal delay={0.1} y={36}>
              <figure className="relative">
                <ParallaxLayer
                  distance={26}
                  className="aspect-[4/5] w-full sm:aspect-[5/4] lg:aspect-[4/5]"
                >
                  <img
                    src={IMG.intro.src}
                    alt={IMG.intro.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </ParallaxLayer>

                {/* Grade + frame */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(16,24,32,0.5),rgba(16,24,32,0)_45%)]"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 border border-ink/10"
                />

                {/* Offset frame accent */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-4 -left-4 hidden h-24 w-24 border-b-2 border-l-2 border-ember sm:block"
                />

                <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                  <span className="max-w-[16rem] font-display text-[0.6875rem] uppercase leading-relaxed tracking-[0.16em] text-white/85">
                    Coating operations reviewed in the conditions they actually run in
                  </span>
                  <span className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-white/50">
                    Fig. 01
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
