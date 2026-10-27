import { IMG } from "@/lib/images";
import { useInquiry } from "@/lib/inquiry";
import { ArrowRight, Reveal, SectionLabel } from "@/components/ui/primitives";

const ON_SITE_POINTS = [
  "In-person observation of relevant coating processes",
  "Discussion of production and quality concerns",
  "Practical technical guidance based on the situation",
  "Opportunities to review procedures and team practices",
];

const REMOTE_POINTS = [
  "Convenient technical discussions",
  "Review of available information and photographs",
  "Guidance on troubleshooting and potential next steps",
  "Support for teams that need help without an immediate site visit",
];

function Panel({
  variant,
  eyebrow,
  title,
  points,
  image,
  cta,
}: {
  variant: "on-site" | "remote";
  eyebrow: string;
  title: string;
  points: string[];
  image: { src: string; alt: string };
  cta: string;
}) {
  const { openInquiry } = useInquiry();
  const isOnSite = variant === "on-site";

  return (
    <div className="group relative flex h-full flex-col overflow-hidden bg-ink">
      <div className="relative h-60 overflow-hidden sm:h-72 lg:h-80">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,24,32,0.95),rgba(16,24,32,0.2)_62%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-ember/0 transition-colors duration-700 group-hover:bg-ember/10"
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
          <span className="font-display text-[0.625rem] font-medium uppercase tracking-[0.24em] text-ember">
            {eyebrow}
          </span>
          <h3 className="mt-3 font-display text-[1.5rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.75rem]">
            {title}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <ul className="space-y-3.5">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.55rem] block h-[3px] w-[3px] shrink-0 bg-ember"
              />
              <span className="text-[0.875rem] leading-[1.7] text-steel-300/85">
                {point}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-8">
          <button
            type="button"
            onClick={() =>
              openInquiry({
                method: isOnSite ? "on-site" : "remote",
              })
            }
            className="group/btn flex w-full items-center justify-between gap-4 border border-white/25 px-6 py-4 font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 hover:border-ember hover:bg-ember"
          >
            {cta}
            <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export function ConsultingMethods() {
  return (
    <section
      id="methods"
      aria-labelledby="methods-heading"
      className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="container-industrial relative">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel>Consulting Methods</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="methods-heading"
              className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem] lg:text-[3.15rem]"
            >
              Expertise That Fits the Way{" "}
              <span className="text-steel">Your Operation Works.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-7 max-w-2xl text-[0.9375rem] leading-[1.8] text-ink/65">
              Some concerns are best understood standing at the line. Others can be
              worked through with photographs, notes, and a focused conversation.
              Both routes are available.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <Reveal delay={0.08} y={32}>
            <Panel
              variant="on-site"
              eyebrow="Method 01"
              title="On-Site Consulting"
              points={ON_SITE_POINTS}
              image={IMG.onSite}
              cta="Inquire About On-Site Support"
            />
          </Reveal>
          <Reveal delay={0.16} y={32}>
            <Panel
              variant="remote"
              eyebrow="Method 02"
              title="Remote Consulting"
              points={REMOTE_POINTS}
              image={IMG.remote}
              cta="Inquire About Remote Support"
            />
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 flex items-start gap-3 border-l-2 border-ember bg-white px-5 py-4 text-[0.8125rem] leading-relaxed text-ink/60 sm:items-center sm:px-6">
            <span className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-ember">
              Note
            </span>
            The appropriate consulting method depends on the nature of the issue and
            the information available.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
