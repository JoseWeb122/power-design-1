import { useReducedMotion } from "framer-motion";
import { SERVICES, type Service } from "@/data/content";
import { useInquiry } from "@/lib/inquiry";
import { cn } from "@/utils/cn";
import {
  ArrowRight,
  Reveal,
  SectionLabel,
} from "@/components/ui/primitives";

function ServiceCard({
  service,
  layout,
  index,
}: {
  service: Service;
  layout: "wide" | "tall" | "feature";
  index: number;
}) {
  const { openInquiry } = useInquiry();
  const reduce = useReducedMotion();
  const Icon = service.icon;

  const span =
    layout === "wide"
      ? "lg:col-span-7"
      : layout === "tall"
        ? "lg:col-span-5"
        : "lg:col-span-12";

  return (
    <Reveal
      as="li"
      delay={index * 0.07}
      y={34}
      className={cn("col-span-1", span)}
    >
      <article
        className={cn(
          "group relative flex h-full flex-col overflow-hidden border border-ink/12 bg-white",
          "transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          "hover:-translate-y-1.5 hover:border-ink/35 hover:shadow-[0_28px_60px_-32px_rgba(16,24,32,0.42)]",
          "focus-within:border-ember focus-within:shadow-[0_28px_60px_-32px_rgba(244,119,50,0.4)]",
        )}
      >
        {/* Image */}
        <div
          className={cn(
            "relative overflow-hidden bg-ink",
            layout === "feature" ? "h-56 sm:h-72 lg:h-80" : "h-52 sm:h-60 lg:h-64",
          )}
        >
          <img
            src={service.image.src}
            alt={service.image.alt}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
              reduce
                ? ""
                : "group-hover:scale-[1.06] group-focus-within:scale-[1.06]",
            )}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(16,24,32,0.82),rgba(16,24,32,0.08)_58%)]"
          />

          {/* Number + icon */}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
            <span className="font-display text-[2rem] font-semibold leading-none tracking-tighter text-white/22 sm:text-[2.5rem]">
              {service.index}
            </span>
            <span className="flex h-10 w-10 items-center justify-center border border-white/25 bg-ink/40 text-white backdrop-blur-sm">
              <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.5} />
            </span>
          </div>

          {/* Hover accent line */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100 group-focus-within:scale-x-100"
          />
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <h3 className="font-display text-[1.25rem] font-semibold leading-snug tracking-tight text-ink sm:text-[1.4rem]">
            {service.title}
          </h3>

          <p className="mt-4 text-[0.875rem] leading-[1.75] text-ink/65">
            {service.description}
          </p>

          <div className="mt-6 border-t border-ink/10 pt-5">
            <p className="font-display text-[0.625rem] font-medium uppercase tracking-[0.22em] text-steel">
              {service.topicsLabel}
            </p>
            <ul
              className={cn(
                "mt-4 grid gap-y-2",
                layout === "feature" ? "sm:grid-cols-2 sm:gap-x-8" : "",
              )}
            >
              {service.topics.map((topic) => (
                <li
                  key={topic}
                  className="flex items-start gap-2.5 text-[0.8125rem] leading-relaxed text-ink/70"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[0.5rem] block h-[3px] w-[3px] shrink-0 bg-ember"
                  />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {service.deliveryNotes ? (
            <div className="mt-6 grid gap-4 border-t border-ink/10 pt-5 sm:grid-cols-2 sm:gap-6">
              {service.deliveryNotes.map((note) => (
                <div key={note.label} className="border-l-2 border-ember pl-4">
                  <p className="font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-ink">
                    {note.label}
                  </p>
                  <p className="mt-1.5 text-[0.8125rem] leading-[1.7] text-ink/60">
                    {note.text}
                  </p>
                </div>
              ))}
            </div>
          ) : null}

          {/* CTA */}
          <div className="mt-7 flex items-center justify-between gap-4 pt-1">
            <span className="font-display text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink">
              {service.cta}
            </span>
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center bg-ink text-white transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-ember group-hover:[transform:translateX(2px)]"
            >
              <ArrowRight strokeWidth={1.6} />
            </span>
          </div>
        </div>

        {/* Stretched, keyboard-accessible link covering the whole tile */}
        <a
          href="#contact"
          className="absolute inset-0 z-20"
          onClick={(e) => {
            e.preventDefault();
            openInquiry({ supportType: service.supportType });
          }}
        >
          <span className="sr-only">
            {service.cta} — open the consultation inquiry form with{" "}
            {service.title} selected
          </span>
        </a>
      </article>
    </Reveal>
  );
}

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="container-industrial">
        {/* Section head */}
        <div className="grid gap-8 border-b border-ink/12 pb-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>How We Can Help</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="services-heading"
                className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem] lg:text-[3.15rem]"
              >
                Technical Support for the Challenges{" "}
                <span className="text-steel">Behind the Finish.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.14}>
              <p className="max-w-md text-[0.9375rem] leading-[1.8] text-ink/65">
                From diagnosing coating defects to building stronger procedures and
                more capable teams, get support tailored to your operation.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 font-display text-[0.625rem] uppercase tracking-[0.2em] text-steel">
                Select any service to begin an inquiry
              </p>
            </Reveal>
          </div>
        </div>

        {/* Grid */}
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-12">
          <ServiceCard service={SERVICES[0]} layout="wide" index={0} />
          <ServiceCard service={SERVICES[1]} layout="tall" index={1} />
          <ServiceCard service={SERVICES[2]} layout="tall" index={2} />
          <ServiceCard service={SERVICES[3]} layout="wide" index={3} />
          <ServiceCard service={SERVICES[4]} layout="feature" index={4} />
        </ul>
      </div>
    </section>
  );
}
