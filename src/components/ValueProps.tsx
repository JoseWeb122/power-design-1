import { VALUE_PROPS } from "@/data/content";
import { Reveal, SectionLabel } from "@/components/ui/primitives";

export function ValueProps() {
  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="film-grain relative overflow-hidden bg-ink py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="blueprint-grid pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-ember/[0.06] blur-[110px]"
      />

      <div className="container-industrial relative">
        <div className="max-w-4xl">
          <Reveal>
            <SectionLabel tone="dark">Why Work With a Specialist</SectionLabel>
          </Reveal>
          <Reveal delay={0.08}>
            <h2
              id="why-heading"
              className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-[2.6rem] lg:text-[3.1rem]"
            >
              A Focused Perspective on a{" "}
              <span className="text-ember">Specific Kind of Problem.</span>
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {VALUE_PROPS.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal
                as="li"
                key={item.title}
                delay={i * 0.08}
                y={26}
                className="group relative bg-ink p-7 transition-colors duration-500 hover:bg-charcoal sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-ember transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                />
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-11 w-11 items-center justify-center border border-white/15 text-white transition-colors duration-500 group-hover:border-ember/60 group-hover:text-ember">
                    <Icon className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.4} />
                  </span>
                  <span className="font-display text-[0.625rem] font-medium tabular-nums text-steel/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-3 text-[0.8125rem] leading-[1.75] text-steel-300/75">
                  {item.body}
                </p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
