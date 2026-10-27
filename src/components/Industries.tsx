import { INDUSTRIES, INDUSTRY_IMAGES } from "@/data/content";
import { useInquiry } from "@/lib/inquiry";
import { ArrowRight, Reveal, SectionLabel } from "@/components/ui/primitives";

export function Industries() {
  const { openInquiry } = useInquiry();

  return (
    <section
      id="industries"
      aria-labelledby="industries-heading"
      className="relative overflow-hidden bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="container-industrial">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Who This Is For</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="industries-heading"
                className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem] lg:text-[3.15rem]"
              >
                Built Around Real{" "}
                <span className="text-steel">Manufacturing Challenges.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.14}>
              <p className="max-w-md text-[0.9375rem] leading-[1.8] text-ink/65">
                Whether you're managing an established coating line or addressing a
                specific technical concern, the first step is understanding the
                challenge and identifying the support you need.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {INDUSTRIES.map((industry, i) => {
            const img = INDUSTRY_IMAGES[industry.key];
            return (
              <Reveal
                as="li"
                key={industry.key}
                delay={i * 0.06}
                y={28}
                className={i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}
              >
                <div className="group relative block h-full w-full overflow-hidden bg-ink">
                  <div className="relative h-56 overflow-hidden sm:h-64">
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,24,32,0.96),rgba(16,24,32,0.25)_58%)] transition-opacity duration-500 group-hover:bg-[linear-gradient(to_top,rgba(16,24,32,0.99),rgba(16,24,32,0.4)_58%)]"
                    />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-white">
                          {industry.title}
                        </h3>
                        <p className="mt-2 max-h-24 overflow-hidden text-[0.8125rem] leading-relaxed text-steel-300/85 opacity-100 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-24 lg:group-hover:opacity-100">
                          {industry.body}
                        </p>
                      </div>
                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-8 w-8 shrink-0 translate-x-0 items-center justify-center border border-white/25 text-white opacity-100 transition-all duration-400 lg:translate-x-2 lg:opacity-0 lg:group-hover:translate-x-0 lg:group-hover:opacity-100"
                      >
                        <ArrowRight strokeWidth={1.6} />
                      </span>
                    </div>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-ember transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <a
                    href="#contact"
                    className="absolute inset-0 z-20"
                    onClick={(e) => {
                      e.preventDefault();
                      openInquiry({ note: `Context: ${industry.title}. ` });
                    }}
                  >
                    <span className="sr-only">
                      Enquire about support for {industry.title}
                    </span>
                  </a>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
