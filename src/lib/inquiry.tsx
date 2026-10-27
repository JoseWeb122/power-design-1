import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { ConsultingMethod, SupportType } from "@/data/content";

export interface InquiryDraft {
  supportType: SupportType | "";
  method: ConsultingMethod | "";
  note: string;
}

interface InquiryContextValue {
  /** Draft values the form should adopt when it is next opened. */
  draft: InquiryDraft;
  /** Monotonic counter — increments every time a new prefilled request is made. */
  requestId: number;
  /** True while the contact section is highlighted by a CTA click. */
  highlight: boolean;
  openInquiry: (next?: Partial<InquiryDraft>) => void;
  clearHighlight: () => void;
}

const InquiryContext = createContext<InquiryContextValue | null>(null);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<InquiryDraft>({
    supportType: "",
    method: "",
    note: "",
  });
  const [requestId, setRequestId] = useState(0);
  const [highlight, setHighlight] = useState(false);
  const timers = useRef<number[]>([]);

  const openInquiry = useCallback((next?: Partial<InquiryDraft>) => {
    if (next) {
      setDraft((prev) => ({
        supportType: next.supportType !== undefined ? next.supportType : prev.supportType,
        method: next.method !== undefined ? next.method : prev.method,
        note: next.note !== undefined ? next.note : prev.note,
      }));
    }
    setRequestId((n) => n + 1);
    setHighlight(true);

    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
    const t = window.setTimeout(() => setHighlight(false), 2600);
    timers.current.push(t);

    // Smooth-scroll to the form (respects reduced motion via CSS).
    const target = document.getElementById("contact");
    if (target) {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block: "start",
      });
    }
  }, []);

  const clearHighlight = useCallback(() => setHighlight(false), []);

  const value = useMemo(
    () => ({ draft, requestId, highlight, openInquiry, clearHighlight }),
    [draft, requestId, highlight, openInquiry, clearHighlight],
  );

  return <InquiryContext.Provider value={value}>{children}</InquiryContext.Provider>;
}

export function useInquiry() {
  const ctx = useContext(InquiryContext);
  if (!ctx) throw new Error("useInquiry must be used inside <InquiryProvider>");
  return ctx;
}

/** Convenience helper used across CTAs. */
export function useOpenInquiry() {
  return useInquiry().openInquiry;
}
