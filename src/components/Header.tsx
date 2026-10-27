import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BRAND, NAV_ITEMS } from "@/data/content";
import { useInquiry } from "@/lib/inquiry";
import { cn } from "@/utils/cn";

function goToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const { openInquiry } = useInquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy across the major sections.
  useEffect(() => {
    const ids = ["home", ...NAV_ITEMS.map((n) => n.id), "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleNav = (id: string) => {
    setOpen(false);
    // Let the drawer close before scrolling on mobile.
    window.setTimeout(() => goToSection(id), 60);
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink focus:shadow-lg"
      >
        Skip to main content
      </a>

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-white/10 bg-ink/92 backdrop-blur-xl"
            : "border-b border-transparent bg-gradient-to-b from-ink/80 via-ink/35 to-transparent",
        )}
      >
        <div className="container-industrial">
          <div
            className={cn(
              "flex items-center justify-between gap-6 transition-all duration-500",
              scrolled ? "h-16" : "h-20",
            )}
          >
            {/* Brand */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNav("home");
              }}
              className="group flex items-center gap-3"
              aria-label={`${BRAND} — back to top`}
            >
              <span
                aria-hidden="true"
                className="relative flex h-9 w-9 shrink-0 items-center justify-center bg-ember"
              >
                <span className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.28),transparent_60%)]" />
                <svg viewBox="0 0 24 24" className="relative h-5 w-5" fill="none">
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
                <span className="font-display text-[0.9375rem] font-semibold tracking-tight text-white sm:text-base">
                  Powder Coating
                </span>
                <span className="mt-1 font-display text-[0.5625rem] font-medium uppercase tracking-[0.28em] text-steel-300">
                  Technical Consulting
                </span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNav(item.id);
                      }}
                      className={cn(
                        "relative block px-3 py-2 font-display text-[0.8125rem] font-medium tracking-tight transition-colors duration-300",
                        active === item.id
                          ? "text-white"
                          : "text-steel-300 hover:text-white",
                      )}
                    >
                      {item.label}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "absolute inset-x-3 bottom-0.5 h-px origin-left bg-ember transition-transform duration-300",
                          active === item.id ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openInquiry()}
                className="hidden bg-ember px-5 py-3 font-display text-[0.75rem] font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-ember-600 active:translate-y-px md:inline-flex"
              >
                Start an Inquiry
              </button>

              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={open}
                aria-controls="mobile-nav"
                className="flex h-11 w-11 items-center justify-center border border-white/20 text-white transition-colors hover:border-white/50 hover:bg-white/5 lg:hidden"
              >
                <Menu className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <div id="mobile-nav" className="fixed inset-0 z-[60] lg:hidden">
            <motion.div
              className="absolute inset-0 bg-ink-900/70 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-ink"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                <span className="font-display text-sm font-medium uppercase tracking-[0.18em] text-steel-300">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close navigation menu"
                  className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors hover:border-white/50 hover:bg-white/5"
                >
                  <X className="h-5 w-5" strokeWidth={1.6} />
                </button>
              </div>

              <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-6">
                <ul className="space-y-1">
                  {[{ id: "home", label: "Home" }, ...NAV_ITEMS].map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, x: 18 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.06 + i * 0.045, duration: 0.4 }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNav(item.id);
                        }}
                        className="flex items-baseline justify-between border-b border-white/[0.07] py-3.5 font-display text-lg font-medium tracking-tight text-white transition-colors hover:text-ember"
                      >
                        {item.label}
                        <span className="font-sans text-[0.625rem] tabular-nums text-steel/60">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/10 p-6">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    window.setTimeout(() => openInquiry(), 120);
                  }}
                  className="w-full bg-ember px-6 py-4 font-display text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-white transition-colors hover:bg-ember-600"
                >
                  Start an Inquiry
                </button>
                <p className="mt-4 text-center text-xs text-steel/70">
                  On-Site &amp; Remote Consulting
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
