import { ArrowRight } from "lucide-react";
import { BRAND, NAV_ITEMS, SERVICES } from "@/data/content";
import { useInquiry } from "@/lib/inquiry";

function FooterLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="group inline-flex items-center gap-2 font-display text-[0.8125rem] font-medium tracking-tight text-steel-300/70 transition-colors duration-300 hover:text-white"
    >
      {children}
      <ArrowRight
        className="h-2.5 w-2.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
        strokeWidth={2}
      />
    </a>
  );
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function Footer() {
  const { openInquiry } = useInquiry();
  const year = new Date().getFullYear();

  const handle = (id: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollTo(id);
  };

  return (
    <footer className="relative overflow-hidden bg-charcoal">
      {/* Final CTA band */}
      <div className="relative border-b border-white/10">
        <div
          aria-hidden="true"
          className="blueprint-grid pointer-events-none absolute inset-0"
        />
        <div className="container-industrial relative">
          <div className="flex flex-col gap-6 py-12 sm:py-14 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
            <h2 className="max-w-xl font-display text-[1.6rem] font-semibold leading-tight tracking-tight text-white sm:text-[2rem]">
              Have a Coating Challenge to Discuss?
            </h2>
            <button
              type="button"
              onClick={() => openInquiry()}
              className="group inline-flex shrink-0 items-center justify-center gap-3 bg-ember px-8 py-4 font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ember-600 active:translate-y-px"
            >
              Start an Inquiry
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="container-industrial">
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8 lg:py-16">
          {/* Identity */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 shrink-0 items-center justify-center bg-ember"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                  <path
                    d="M12 3v7M12 10c-3.3 0-6 2.7-6 6v5M12 10c3.3 0 6 2.7 6 6v5"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="square"
                  />
                  <circle cx="12" cy="3.6" r="1.9" fill="#fff" />
                </svg>
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-display text-[0.9375rem] font-semibold tracking-tight text-white">
                  Powder Coating
                </span>
                <span className="mt-1 font-display text-[0.5625rem] font-medium uppercase tracking-[0.28em] text-steel/70">
                  Technical Consulting
                </span>
              </span>
            </div>

            <p className="mt-6 max-w-sm text-[0.8125rem] leading-[1.8] text-steel/60">
              Powder coating consulting, technical troubleshooting, process support,
              training, and procedure documentation for manufacturing and industrial
              finishing operations.
            </p>

            <div className="mt-7 space-y-2.5">
              <p className="flex items-center gap-2.5 text-[0.75rem] text-steel/55">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 shrink-0 bg-ember"
                />
                On-site consulting available
              </p>
              <p className="flex items-center gap-2.5 text-[0.75rem] text-steel/55">
                <span
                  aria-hidden="true"
                  className="h-1 w-1 shrink-0 bg-ember"
                />
                Remote consultation available
              </p>
            </div>

            <div className="mt-7 border border-white/10 bg-white/[0.02] px-4 py-3">
              <p className="font-display text-[0.5625rem] uppercase tracking-[0.2em] text-steel/45">
                Contact details
              </p>
              <p className="mt-2 text-[0.6875rem] leading-relaxed text-steel/45">
                Email and telephone placeholders — to be replaced with the confirmed
                business contact information.
              </p>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Services" className="lg:col-span-3">
            <h3 className="font-display text-[0.625rem] font-medium uppercase tracking-[0.22em] text-steel/50">
              Services
            </h3>
            <ul className="mt-5 space-y-3">
              {SERVICES.map((service) => (
                <li key={service.index}>
                  <FooterLink
                    href="#services"
                    onClick={handle("services")}
                  >
                    {service.title}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Site */}
          <nav aria-label="Site" className="lg:col-span-2">
            <h3 className="font-display text-[0.625rem] font-medium uppercase tracking-[0.22em] text-steel/50">
              Site
            </h3>
            <ul className="mt-5 space-y-3">
              <li>
                <FooterLink href="#about" onClick={handle("about")}>
                  About
                </FooterLink>
              </li>
              <li>
                <FooterLink href="#resources" onClick={handle("resources")}>
                  Resources
                </FooterLink>
              </li>
              <li>
                <FooterLink href="#faq" onClick={handle("faq")}>
                  FAQ
                </FooterLink>
              </li>
              <li>
                <FooterLink href="#contact" onClick={handle("contact")}>
                  Contact
                </FooterLink>
              </li>
            </ul>
          </nav>

          {/* Consultation */}
          <nav aria-label="Consultation options" className="lg:col-span-3">
            <h3 className="font-display text-[0.625rem] font-medium uppercase tracking-[0.22em] text-steel/50">
              Consultation
            </h3>
            <ul className="mt-5 space-y-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <FooterLink href={`#${item.id}`} onClick={handle(item.id)}>
                    {item.label}
                  </FooterLink>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => openInquiry()}
              className="mt-6 inline-flex w-full items-center justify-between gap-3 border border-white/15 px-4 py-3 font-display text-[0.6875rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-ember hover:bg-ember"
            >
              Start an Inquiry
              <ArrowRight />
            </button>
          </nav>
        </div>
      </div>

      {/* Baseline */}
      <div className="border-t border-white/10">
        <div className="container-industrial">
          <div className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.6875rem] text-steel/45">
              © {year} {BRAND}. All rights reserved.
            </p>
            <p className="text-[0.6875rem] text-steel/40">
              {BRAND} is a temporary placeholder identity for this demonstration
              website.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
