import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  METHOD_OPTIONS,
  SUPPORT_TYPE_OPTIONS,
  type ConsultingMethod,
  type SupportType,
} from "@/data/content";
import { IMG } from "@/lib/images";
import { useInquiry } from "@/lib/inquiry";
import { cn } from "@/utils/cn";
import { Reveal, SectionLabel } from "@/components/ui/primitives";

type Errors = Partial<
  Record<"fullName" | "email" | "method" | "supportType" | "description", string>
>;

type Status = "idle" | "submitting" | "success";

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  method: ConsultingMethod | "";
  supportType: SupportType | "";
  description: string;
  contactPreference: "email" | "phone";
}

const EMPTY: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  method: "",
  supportType: "",
  description: "",
  contactPreference: "email",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

const inputBase =
  "w-full border bg-white/[0.04] px-4 py-3.5 font-sans text-[0.9375rem] text-white placeholder:text-steel/45 transition-colors duration-200 focus:outline-none focus:ring-0 focus-visible:outline-none";

function FieldLabel({
  htmlFor,
  children,
  hint,
}: {
  htmlFor: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 flex items-baseline justify-between gap-3"
    >
      <span className="font-display text-[0.75rem] font-medium uppercase tracking-[0.14em] text-steel-300">
        {children}
      </span>
      {hint ? (
        <span className="text-[0.6875rem] text-steel/55">{hint}</span>
      ) : null}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -4, height: 0 }}
          transition={{ duration: 0.22 }}
          className="flex items-center gap-2 overflow-hidden pt-2 text-[0.75rem] text-ember"
        >
          <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          {message}
        </motion.p>
      ) : null}
    </AnimatePresence>
  );
}

export function ContactSection() {
  const { draft, requestId, highlight, clearHighlight } = useInquiry();
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const reduce = useReducedMotion();
  const nameRef = useRef<HTMLInputElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
    },
    [],
  );

  // Apply prefilled context whenever a CTA opens the form.
  useEffect(() => {
    if (requestId === 0) return;
    setErrors({});
    setStatus((prev) => (prev === "success" ? "idle" : prev));
    setForm((prev) => ({
      ...prev,
      method: draft.method || prev.method,
      supportType: draft.supportType || prev.supportType,
      description: draft.note && !prev.description.trim() ? draft.note : prev.description,
    }));
    // A short delay lets the smooth scroll finish before focus moves.
    const t = window.setTimeout(() => {
      if (!draft.note) nameRef.current?.focus({ preventScroll: true });
    }, 620);
    timers.current.push(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestId]);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key as keyof Errors]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
    if (status === "success") setStatus("idle");
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!form.fullName.trim()) {
      next.fullName = "Please enter your full name.";
    } else if (form.fullName.trim().length < 2) {
      next.fullName = "Please enter your full name.";
    }
    if (!form.email.trim()) {
      next.email = "Please enter a business email address.";
    } else if (!EMAIL_RE.test(form.email.trim())) {
      next.email = "That email address doesn't look complete.";
    }
    if (!form.method) next.method = "Please choose a preferred consulting method.";
    if (!form.supportType) next.supportType = "Please select the type of support you need.";
    if (!form.description.trim()) {
      next.description = "Please briefly describe the challenge you're facing.";
    } else if (form.description.trim().length < 12) {
      next.description = "Add a little more detail so the inquiry is useful.";
    }
    return next;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "submitting") return;

    const next = validate();
    setErrors(next);

    if (Object.keys(next).length > 0) {
      const firstKey = Object.keys(next)[0];
      const el = document.getElementById(`field-${firstKey}`);
      el?.focus({ preventScroll: false });
      el?.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "center",
      });
      return;
    }

    setStatus("submitting");
    const t = window.setTimeout(() => setStatus("success"), 1500);
    timers.current.push(t);
  };

  const reset = () => {
    setForm(EMPTY);
    setErrors({});
    setStatus("idle");
    nameRef.current?.focus({ preventScroll: true });
  };

  const errorCount = Object.values(errors).filter(Boolean).length;
  const methodLabel = METHOD_OPTIONS.find((m) => m.value === form.method)?.label;
  const supportLabel = SUPPORT_TYPE_OPTIONS.find(
    (s) => s.value === form.supportType,
  )?.label;

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="film-grain relative overflow-hidden bg-ink-900 py-20 sm:py-24 lg:py-32"
      onMouseDown={clearHighlight}
    >
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src={IMG.contactBg.src}
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(115deg,#101820_18%,rgba(16,24,32,0.94)_48%,rgba(16,24,32,0.72)_100%)]" />
        <div className="blueprint-grid absolute inset-0" />
      </div>

      <div className="container-industrial relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left column — pitch */}
          <div className="lg:col-span-5">
            <Reveal>
              <SectionLabel tone="dark">Consultation Inquiry</SectionLabel>
            </Reveal>
            <Reveal delay={0.08}>
              <h2
                id="contact-heading"
                className="mt-6 font-display text-[2rem] font-semibold leading-[1.06] tracking-[-0.02em] text-white sm:text-[2.5rem] lg:text-[2.9rem]"
              >
                Let's Talk About Your{" "}
                <span className="text-ember">Powder Coating Challenge.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-7 max-w-md text-[0.9375rem] leading-[1.85] text-steel-300/80">
                Tell us what you're experiencing, what you need help with, or what
                you'd like to improve. Start with a conversation about the right kind
                of support for your operation.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <ul className="mt-10 space-y-4 border-t border-white/10 pt-8">
                {[
                  "On-site and remote consultation options",
                  "Support for troubleshooting, process, training, and documentation",
                  "No obligation — the first step is a discussion",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-[0.55rem] block h-[3px] w-[3px] shrink-0 bg-ember"
                    />
                    <span className="text-[0.8125rem] leading-relaxed text-steel-300/75">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.26}>
              <div className="mt-10 border border-white/10 bg-white/[0.03] p-5">
                <p className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-steel/70">
                  Contact details
                </p>
                <p className="mt-3 text-[0.8125rem] leading-relaxed text-steel/60">
                  Email and telephone details will be published here once they are
                  supplied. Until then, this inquiry form is the available contact
                  route.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right column — form */}
          <div className="lg:col-span-7">
            <Reveal delay={0.12} y={32}>
              <div
                className={cn(
                  "relative bg-charcoal/95 p-6 backdrop-blur-sm transition-shadow duration-500 sm:p-8 lg:p-10",
                  highlight
                    ? "shadow-[0_0_0_2px_#F47732,0_30px_70px_-30px_rgba(244,119,50,0.5)]"
                    : "shadow-[0_30px_70px_-40px_rgba(0,0,0,0.9)]",
                )}
              >
                <AnimatePresence>
                  {highlight && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="absolute -top-3 left-6 z-10 bg-ember px-3 py-1 font-display text-[0.625rem] font-medium uppercase tracking-[0.16em] text-white"
                    >
                      Form updated with your selection
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                  {status === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      role="status"
                      aria-live="polite"
                    >
                      <span className="flex h-12 w-12 items-center justify-center bg-ember/15 text-ember">
                        <CheckCircle2 className="h-6 w-6" strokeWidth={1.6} />
                      </span>
                      <h3 className="mt-6 font-display text-[1.4rem] font-semibold leading-tight tracking-tight text-white sm:text-[1.6rem]">
                        Inquiry Prepared — Demonstration Only
                      </h3>
                      <p className="mt-4 text-[0.9375rem] leading-[1.8] text-steel-300/80">
                        This is a front-end demonstration, so nothing was transmitted
                        and no email was sent. The details below were validated
                        locally in your browser to show how the inquiry form will
                        behave once it is connected to a live contact process.
                      </p>

                      <dl className="mt-7 divide-y divide-white/10 border-y border-white/10">
                        {[
                          { k: "Name", v: form.fullName },
                          {
                            k: "Company",
                            v: form.company.trim() || "— not provided —",
                          },
                          { k: "Email", v: form.email },
                          {
                            k: "Consulting method",
                            v: methodLabel ?? "—",
                          },
                          { k: "Support type", v: supportLabel ?? "—" },
                          {
                            k: "Contact preference",
                            v:
                              form.contactPreference === "phone"
                                ? "Phone"
                                : "Email",
                          },
                        ].map((row) => (
                          <div
                            key={row.k}
                            className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                          >
                            <dt className="font-display text-[0.6875rem] uppercase tracking-[0.16em] text-steel/60">
                              {row.k}
                            </dt>
                            <dd className="text-[0.875rem] text-white sm:text-right">
                              {row.v}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <div className="mt-7 border-l-2 border-ember bg-white/[0.03] px-5 py-4">
                        <p className="font-display text-[0.625rem] uppercase tracking-[0.18em] text-ember">
                          Challenge description
                        </p>
                        <p className="mt-2 whitespace-pre-line text-[0.8125rem] leading-relaxed text-steel-300/80">
                          {form.description}
                        </p>
                      </div>

                      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <button
                          type="button"
                          onClick={reset}
                          className="group inline-flex items-center justify-center gap-3 bg-ember px-6 py-3.5 font-display text-[0.75rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:bg-ember-600"
                        >
                          <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180" />
                          Submit Another Test Inquiry
                        </button>
                        <a
                          href="#services"
                          onClick={(e) => {
                            e.preventDefault();
                            const el = document.getElementById("services");
                            el?.scrollIntoView({
                              behavior: reduce ? "auto" : "smooth",
                            });
                          }}
                          className="group inline-flex items-center justify-center gap-3 border border-white/25 px-6 py-3.5 font-display text-[0.75rem] font-medium uppercase tracking-[0.14em] text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5"
                        >
                          Review the Services
                          <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      noValidate
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-display text-[1.25rem] font-semibold tracking-tight text-white sm:text-[1.35rem]">
                          Consultation Inquiry Form
                        </h3>
                        <span className="font-display text-[0.625rem] uppercase tracking-[0.18em] text-steel/55">
                          Demonstration form
                        </span>
                      </div>

                      {/* Screen-reader + visible validation summary */}
                      <div aria-live="polite" className="sr-only">
                        {errorCount > 0
                          ? `${errorCount} field${errorCount > 1 ? "s" : ""} need attention before submitting.`
                          : ""}
                      </div>

                      <div className="mt-7 grid gap-5 sm:grid-cols-2">
                        {/* Full name */}
                        <div>
                          <FieldLabel htmlFor="field-fullName">
                            Full name{" "}
                            <span className="text-ember" aria-hidden="true">
                              *
                            </span>
                          </FieldLabel>
                          <input
                            id="field-fullName"
                            ref={nameRef}
                            name="fullName"
                            type="text"
                            autoComplete="name"
                            value={form.fullName}
                            onChange={(e) => set("fullName", e.target.value)}
                            aria-invalid={!!errors.fullName}
                            aria-describedby={
                              errors.fullName ? "err-fullName" : undefined
                            }
                            aria-required="true"
                            placeholder="Jordan Ellis"
                            className={cn(
                              inputBase,
                              errors.fullName
                                ? "border-ember hover:border-ember focus:border-ember"
                                : "border-white/12 hover:border-white/30 focus:border-ember",
                            )}
                          />
                          <FieldError
                            id="err-fullName"
                            message={errors.fullName}
                          />
                        </div>

                        {/* Company */}
                        <div>
                          <FieldLabel htmlFor="field-company" hint="Optional">
                            Company name
                          </FieldLabel>
                          <input
                            id="field-company"
                            name="company"
                            type="text"
                            autoComplete="organization"
                            value={form.company}
                            onChange={(e) => set("company", e.target.value)}
                            placeholder="Company or facility name"
                            className={cn(inputBase, "border-white/12 hover:border-white/30 focus:border-ember")}
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <FieldLabel htmlFor="field-email">
                            Business email{" "}
                            <span className="text-ember" aria-hidden="true">
                              *
                            </span>
                          </FieldLabel>
                          <input
                            id="field-email"
                            name="email"
                            type="email"
                            inputMode="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => set("email", e.target.value)}
                            aria-invalid={!!errors.email}
                            aria-describedby={
                              errors.email ? "err-email" : undefined
                            }
                            aria-required="true"
                            placeholder="you@company.com"
                            className={cn(
                              inputBase,
                              errors.email
                                ? "border-ember hover:border-ember focus:border-ember"
                                : "border-white/12 hover:border-white/30 focus:border-ember",
                            )}
                          />
                          <FieldError id="err-email" message={errors.email} />
                        </div>

                        {/* Phone */}
                        <div>
                          <FieldLabel htmlFor="field-phone" hint="Optional">
                            Phone number
                          </FieldLabel>
                          <input
                            id="field-phone"
                            name="phone"
                            type="tel"
                            inputMode="tel"
                            autoComplete="tel"
                            value={form.phone}
                            onChange={(e) => set("phone", e.target.value)}
                            placeholder="+1 555 000 0000"
                            className={cn(inputBase, "border-white/12 hover:border-white/30 focus:border-ember")}
                          />
                        </div>

                        {/* Consulting method — segmented */}
                        <div className="sm:col-span-2">
                          <fieldset
                            aria-describedby={
                              errors.method ? "err-method" : undefined
                            }
                          >
                            <legend className="mb-2.5 font-display text-[0.75rem] font-medium uppercase tracking-[0.14em] text-steel-300">
                              Preferred consulting method{" "}
                              <span className="text-ember" aria-hidden="true">
                                *
                              </span>
                            </legend>
                            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                              {METHOD_OPTIONS.map((opt) => {
                                const active = form.method === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => set("method", opt.value)}
                                    className={cn(
                                      "border px-4 py-3.5 text-left font-display text-[0.8125rem] font-medium tracking-tight transition-all duration-250",
                                      active
                                        ? "border-ember bg-ember/12 text-white"
                                        : "border-white/12 bg-white/[0.03] text-steel-300 hover:border-white/30 hover:text-white",
                                    )}
                                  >
                                    <span className="flex items-center gap-2.5">
                                      <span
                                        aria-hidden="true"
                                        className={cn(
                                          "flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border",
                                          active
                                            ? "border-ember"
                                            : "border-white/25",
                                        )}
                                      >
                                        <span
                                          className={cn(
                                            "h-1.5 w-1.5 rounded-full transition-opacity",
                                            active
                                              ? "bg-ember opacity-100"
                                              : "opacity-0",
                                          )}
                                        />
                                      </span>
                                      {opt.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </fieldset>
                          <FieldError id="err-method" message={errors.method} />
                        </div>

                        {/* Support type */}
                        <div className="sm:col-span-2">
                          <FieldLabel htmlFor="field-supportType">
                            Type of support needed{" "}
                            <span className="text-ember" aria-hidden="true">
                              *
                            </span>
                          </FieldLabel>
                          <div className="relative">
                            <select
                              id="field-supportType"
                              name="supportType"
                              value={form.supportType}
                              onChange={(e) =>
                                set("supportType", e.target.value as SupportType)
                              }
                              aria-invalid={!!errors.supportType}
                              aria-describedby={
                                errors.supportType ? "err-supportType" : undefined
                              }
                              aria-required="true"
                              className={cn(
                                inputBase,
                                "appearance-none pr-12",
                                form.supportType
                                  ? "text-white"
                                  : "text-steel/45",
                                errors.supportType
                                  ? "border-ember hover:border-ember focus:border-ember"
                                  : "border-white/12 hover:border-white/30 focus:border-ember",
                              )}
                            >
                              <option value="" disabled className="bg-charcoal">
                                Select the type of support…
                              </option>
                              {SUPPORT_TYPE_OPTIONS.map((opt) => (
                                <option
                                  key={opt.value}
                                  value={opt.value}
                                  className="bg-charcoal text-white"
                                >
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ember"
                            >
                              <svg
                                viewBox="0 0 12 8"
                                className="h-2.5 w-3"
                                fill="none"
                              >
                                <path
                                  d="M1 1l5 5 5-5"
                                  stroke="currentColor"
                                  strokeWidth="1.6"
                                />
                              </svg>
                            </span>
                          </div>
                          <FieldError
                            id="err-supportType"
                            message={errors.supportType}
                          />
                        </div>

                        {/* Description */}
                        <div className="sm:col-span-2">
                          <FieldLabel
                            htmlFor="field-description"
                            hint="What you see, when it happens, what you've tried"
                          >
                            Brief description of the challenge{" "}
                            <span className="text-ember" aria-hidden="true">
                              *
                            </span>
                          </FieldLabel>
                          <textarea
                            id="field-description"
                            name="description"
                            rows={5}
                            value={form.description}
                            onChange={(e) => set("description", e.target.value)}
                            aria-invalid={!!errors.description}
                            aria-describedby={
                              errors.description
                                ? "err-description"
                                : "hint-description"
                            }
                            aria-required="true"
                            placeholder="Example: we're seeing craters on flat panels after cure. It started three weeks ago and affects roughly one part in ten…"
                            className={cn(
                              inputBase,
                              "resize-y leading-relaxed",
                              errors.description
                                ? "border-ember hover:border-ember focus:border-ember"
                                : "border-white/12 hover:border-white/30 focus:border-ember",
                            )}
                          />
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <FieldError
                              id="err-description"
                              message={errors.description}
                            />
                            {!errors.description ? (
                              <p
                                id="hint-description"
                                className="pt-2 text-[0.6875rem] text-steel/45"
                              >
                                {form.description.trim().length} characters
                              </p>
                            ) : null}
                          </div>
                        </div>

                        {/* Contact preference */}
                        <div className="sm:col-span-2">
                          <fieldset>
                            <legend className="mb-2.5 font-display text-[0.75rem] font-medium uppercase tracking-[0.14em] text-steel-300">
                              Preferred contact method{" "}
                              <span className="text-steel/50">— optional</span>
                            </legend>
                            <div className="flex flex-wrap gap-2">
                              {(
                                [
                                  { value: "email", label: "Email" },
                                  { value: "phone", label: "Phone" },
                                ] as const
                              ).map((opt) => {
                                const active =
                                  form.contactPreference === opt.value;
                                return (
                                  <button
                                    key={opt.value}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() =>
                                      set("contactPreference", opt.value)
                                    }
                                    className={cn(
                                      "border px-5 py-2.5 font-display text-[0.75rem] font-medium uppercase tracking-[0.12em] transition-all duration-250",
                                      active
                                        ? "border-white/70 bg-white/10 text-white"
                                        : "border-white/12 text-steel-300 hover:border-white/30 hover:text-white",
                                    )}
                                  >
                                    {opt.label}
                                  </button>
                                );
                              })}
                            </div>
                          </fieldset>
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="mt-8 border-t border-white/10 pt-7">
                        <button
                          type="submit"
                          disabled={status === "submitting"}
                          className={cn(
                            "group inline-flex w-full items-center justify-center gap-3 px-7 py-4 font-display text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white transition-all duration-300 sm:w-auto",
                            status === "submitting"
                              ? "cursor-wait bg-ember/70"
                              : "bg-ember hover:bg-ember-600 active:translate-y-px",
                          )}
                        >
                          {status === "submitting" ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Preparing Inquiry…
                            </>
                          ) : (
                            <>
                              Submit Consultation Inquiry
                              <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                          )}
                        </button>

                        <p className="mt-5 flex max-w-md items-start gap-2.5 text-[0.75rem] leading-relaxed text-steel/55">
                          <span
                            aria-hidden="true"
                            className="mt-1 block h-1 w-1 shrink-0 bg-ember/70"
                          />
                          Please share only the information necessary to describe
                          your inquiry.
                        </p>

                        <p className="mt-4 max-w-md text-[0.6875rem] leading-relaxed text-steel/40">
                          Front-end demonstration: submission is simulated in your
                          browser and no data is sent or stored.
                        </p>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
