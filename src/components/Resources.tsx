import { AnimatePresence, motion } from "framer-motion";
import { Clock, FileWarning, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ARTICLES, type Article } from "@/data/content";
import { useInquiry } from "@/lib/inquiry";
import { ArrowRight, Reveal, SectionLabel } from "@/components/ui/primitives";

function ArticleModal({
  article,
  onClose,
}: {
  article: Article;
  onClose: () => void;
}) {
  const { openInquiry } = useInquiry();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  // Move focus into the dialog when it opens, and back to the trigger after.
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(
      () => closeRef.current?.focus({ preventScroll: true }),
      60,
    );
    return () => {
      window.clearTimeout(t);
      restoreRef.current?.focus?.({ preventScroll: true });
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-0 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <motion.div
        className="fixed inset-0 bg-ink-900/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
      />
      <motion.article
        className="relative z-10 my-0 w-full max-w-3xl bg-white sm:my-4"
        initial={{ opacity: 0, y: 28, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.99 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Header image */}
        <div className="relative h-52 overflow-hidden bg-ink sm:h-64">
          <img
            src={article.image.src}
            alt={article.image.alt}
            className="h-full w-full object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,24,32,0.95),rgba(16,24,32,0.15)_62%)]"
          />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close article"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center border border-white/25 bg-ink/50 text-white backdrop-blur-sm transition-colors hover:border-ember hover:bg-ember"
          >
            <X className="h-5 w-5" strokeWidth={1.6} />
          </button>
          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
            <span className="inline-flex items-center gap-2 bg-ember px-2.5 py-1 font-display text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white">
              {article.category}
            </span>
            <h2
              id="article-modal-title"
              className="mt-4 font-display text-[1.35rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.75rem]"
            >
              {article.title}
            </h2>
          </div>
        </div>

        {/* Body */}
        <div className="px-5 pb-8 pt-6 sm:px-8 sm:pb-10 sm:pt-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-ink/10 pb-5">
            <span className="flex items-center gap-2 text-[0.75rem] text-ink/50">
              <Clock className="h-3.5 w-3.5" strokeWidth={1.6} />
              {article.readTime}
            </span>
            <span className="flex items-center gap-2 text-[0.75rem] text-ink/50">
              <FileWarning className="h-3.5 w-3.5" strokeWidth={1.6} />
              Draft educational content
            </span>
          </div>

          <p className="mt-6 text-[0.9375rem] leading-[1.85] text-ink/70">
            {article.summary}
          </p>

          {article.sections.map((section, i) => (
            <section key={section.heading} className="mt-9">
              <h3 className="flex items-baseline gap-3 font-display text-[1.0625rem] font-semibold tracking-tight text-ink">
                <span className="font-display text-[0.6875rem] font-medium tabular-nums text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {section.heading}
              </h3>
              <div className="mt-3.5 space-y-4">
                {section.body.map((para, j) => (
                  <p
                    key={j}
                    className="text-[0.875rem] leading-[1.85] text-ink/65"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </section>
          ))}

          <div className="mt-10 border-t border-ink/10 pt-7">
            <p className="text-[0.8125rem] leading-relaxed text-ink/55">
              Recognise something in your own operation? A conversation about the
              specifics is usually more useful than a general article.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                window.setTimeout(
                  () => openInquiry({ note: `Reference: "${article.title}". ` }),
                  220,
                );
              }}
              className="group mt-5 inline-flex items-center gap-3 bg-ink px-6 py-3.5 font-display text-[0.75rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ember"
            >
              Discuss This Topic
              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </motion.article>
    </div>
  );
}

export function Resources() {
  const [openId, setOpenId] = useState<string | null>(null);
  const openArticle = ARTICLES.find((a) => a.id === openId) ?? null;

  return (
    <section
      id="resources"
      aria-labelledby="resources-heading"
      className="relative overflow-hidden bg-mist py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="blueprint-grid-light pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="container-industrial relative">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <SectionLabel>Technical Knowledge</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="resources-heading"
                className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-ink sm:text-[2.6rem] lg:text-[3.15rem]"
              >
                Better Understanding Leads to{" "}
                <span className="text-steel">Better Questions.</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <Reveal delay={0.14}>
              <p className="max-w-md text-[0.9375rem] leading-[1.8] text-ink/65">
                Draft educational notes on troubleshooting, process control, and
                documentation. Read them here — no download required.
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {ARTICLES.map((article, i) => (
            <Reveal as="li" key={article.id} delay={i * 0.08} y={30}>
              <div className="group relative flex h-full w-full flex-col overflow-hidden border border-ink/12 bg-white transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 hover:border-ink/30 hover:shadow-[0_28px_60px_-32px_rgba(16,24,32,0.35)] focus-within:border-ember focus-within:shadow-[0_28px_60px_-32px_rgba(244,119,50,0.3)]">
                <div className="relative h-48 overflow-hidden bg-ink">
                  <img
                    src={article.image.src}
                    alt={article.image.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(to_top,rgba(16,24,32,0.6),rgba(16,24,32,0)_55%)]"
                  />
                  <span className="absolute left-4 top-4 bg-ember px-2.5 py-1 font-display text-[0.5625rem] font-medium uppercase tracking-[0.16em] text-white">
                    {article.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <p className="font-display text-[0.625rem] uppercase tracking-[0.18em] text-steel">
                    {article.readTime}
                  </p>
                  <h3 className="mt-3 font-display text-[1.0625rem] font-semibold leading-snug tracking-tight text-ink">
                    {article.title}
                  </h3>
                  <p className="mt-3 text-[0.8125rem] leading-[1.7] text-ink/60">
                    {article.summary}
                  </p>
                  <span className="mt-auto flex items-center gap-3 pt-6 font-display text-[0.6875rem] font-medium uppercase tracking-[0.16em] text-ink">
                    Read Article
                    <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1.5" />
                  </span>
                </div>

                <a
                  href="#resources"
                  className="absolute inset-0 z-20"
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenId(article.id);
                  }}
                >
                  <span className="sr-only">
                    Read the draft article: {article.title}
                  </span>
                </a>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-8 text-[0.75rem] leading-relaxed text-ink/45">
            These articles are draft educational content prepared for this
            demonstration website. They are not published work, research papers, or
            claims about the consultant's experience.
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {openArticle && (
          <ArticleModal
            article={openArticle}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
