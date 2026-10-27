import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, type ReactNode } from "react";
import { cn } from "@/utils/cn";

/* ---------------------------------------------------------------- Reveal */

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span";
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Comp = motion[as] as typeof motion.div;

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px 0px -70px 0px" }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Comp>
  );
}

/* ----------------------------------------------------------- SectionLabel */

export function SectionLabel({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        tone === "dark" ? "text-steel-300" : "text-steel",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-px w-8 shrink-0",
          tone === "dark" ? "bg-ember" : "bg-ember",
        )}
      />
      <span className="eyebrow">{children}</span>
    </div>
  );
}

/* ------------------------------------------------------------- DividerBar */

export function DividerBar({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "h-px w-full overflow-hidden",
        tone === "dark" ? "bg-white/10" : "bg-ink/10",
        className,
      )}
    >
      <motion.div
        className="h-full w-full origin-left bg-ember"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{
          duration: reduce ? 0 : 1.1,
          ease: [0.22, 1, 0.36, 1],
        }}
      />
    </div>
  );
}

/** Short animated ember rule used as a section accent divider. */
export function EmberRule({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={cn("h-[2px] w-16 origin-left bg-ember", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: reduce ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}

/* ------------------------------------------------------------------ Button */

type ButtonVariant = "primary" | "secondary" | "ghost" | "dark";

const base =
  "group relative inline-flex items-center justify-center gap-2.5 font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-all duration-300 select-none disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ember text-white hover:bg-ember-600 active:bg-ember-700 active:translate-y-px shadow-[0_1px_0_0_rgba(255,255,255,0.18)_inset] px-7 py-4",
  secondary:
    "border border-white/30 text-white hover:border-white/70 hover:bg-white/5 active:translate-y-px px-7 py-4 backdrop-blur-[2px]",
  ghost:
    "border border-ink/20 text-ink hover:border-ink/50 hover:bg-ink/[0.03] active:translate-y-px px-7 py-4",
  dark: "bg-ink text-white hover:bg-ink-800 active:translate-y-px px-7 py-4",
};

export function ActionButton({
  children,
  variant = "primary",
  className,
  onClick,
  type = "button",
  disabled,
  ariaLabel,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn(base, variants[variant], className)}
    >
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 55%)",
        }}
      />
    </button>
  );
}

/* ------------------------------------------------------------- ArrowLink */

export function ArrowRight({
  className,
  strokeWidth = 1.75,
}: {
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
      className={cn("h-3 w-5 shrink-0", className)}
    >
      <path
        d="M0 6h18M13 1l5 5-5 5"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
      />
    </svg>
  );
}

/* --------------------------------------------------------- ParallaxLayer */

/**
 * Wraps a visual layer and translates it slightly as the element travels
 * through the viewport. Disabled automatically for reduced-motion users.
 */
export function ParallaxLayer({
  children,
  className,
  distance = 46,
}: {
  children: ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [-distance, distance],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute -inset-y-[12%] inset-x-0"
        style={{ y, willChange: "transform" }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* --------------------------------------------------------------- SmartImg */

export function SmartImg({
  src,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes,
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-ink/5", className)}>
      <img
        src={src}
        alt={alt}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : "auto"}
        className={cn(
          "h-full w-full object-cover",
          imgClassName,
        )}
      />
    </div>
  );
}
