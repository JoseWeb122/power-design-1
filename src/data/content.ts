import type { LucideIcon } from "lucide-react";
import {
  BookOpenCheck,
  ClipboardList,
  FileText,
  MessagesSquare,
  ScanSearch,
  SlidersHorizontal,
} from "lucide-react";
import { IMG, INDUSTRY_IMAGES } from "@/lib/images";

export const BRAND = "Powder Coating Technical Consulting";

export const NAV_ITEMS = [
  { id: "services", label: "Services" },
  { id: "challenges", label: "Challenges" },
  { id: "process", label: "Process" },
  { id: "methods", label: "On-Site / Remote" },
  { id: "resources", label: "Resources" },
  { id: "about", label: "About" },
  { id: "faq", label: "FAQ" },
] as const;

export type SupportType =
  | "troubleshooting"
  | "process"
  | "training"
  | "documentation"
  | "general"
  | "other";

export type ConsultingMethod = "on-site" | "remote" | "unsure";

export const SUPPORT_TYPE_OPTIONS: { value: SupportType; label: string }[] = [
  { value: "troubleshooting", label: "Powder coating troubleshooting" },
  { value: "process", label: "Process evaluation" },
  { value: "training", label: "Technical training" },
  { value: "documentation", label: "Procedure manuals" },
  { value: "general", label: "General consulting" },
  { value: "other", label: "Other" },
];

export const METHOD_OPTIONS: { value: ConsultingMethod; label: string }[] = [
  { value: "on-site", label: "On-site" },
  { value: "remote", label: "Remote" },
  { value: "unsure", label: "Not sure yet" },
];

export interface Service {
  index: string;
  title: string;
  short: string;
  description: string;
  topics: string[];
  topicsLabel: string;
  image: { src: string; alt: string };
  cta: string;
  supportType: SupportType;
  icon: LucideIcon;
  /** Optional paired notes, used by the on-site / remote service tile. */
  deliveryNotes?: { label: string; text: string }[];
}

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Powder Coating Troubleshooting",
    short: "Investigate imperfections and recurring quality concerns.",
    description:
      "Investigate coating imperfections, inconsistent finishes, recurring quality concerns, and other technical challenges affecting your powder coating operation.",
    topics: [
      "Orange peel and uneven appearance",
      "Adhesion and coverage concerns",
      "Pinholes, craters, and other surface imperfections",
      "Film thickness consistency",
      "Curing and oven-process questions",
      "Application and process troubleshooting",
    ],
    topicsLabel: "Potential topics to investigate",
    image: IMG.serviceTroubleshooting,
    cta: "Discuss a Coating Problem",
    supportType: "troubleshooting",
    icon: ScanSearch,
  },
  {
    index: "02",
    title: "Process Evaluation and Improvement",
    short: "Review the process and look for areas that need attention.",
    description:
      "Review your existing coating process, identify areas that may require attention, and explore practical ways to improve consistency and operational control.",
    topics: [
      "Process review",
      "Application technique",
      "Equipment and workflow considerations",
      "Quality-control practices",
      "Troubleshooting recurring issues",
      "Process consistency",
    ],
    topicsLabel: "Areas a review can cover",
    image: IMG.serviceProcess,
    cta: "Explore Process Support",
    supportType: "process",
    icon: SlidersHorizontal,
  },
  {
    index: "03",
    title: "Technical Training",
    short: "Build a stronger technical understanding across your team.",
    description:
      "Help your team develop a stronger understanding of powder coating principles, troubleshooting methods, application practices, and quality expectations.",
    topics: [
      "Powder coating fundamentals",
      "Recognizing common imperfections",
      "Troubleshooting methods",
      "Process awareness",
      "Quality inspection practices",
      "Understanding operating procedures",
    ],
    topicsLabel: "Potential training topics",
    image: IMG.serviceTraining,
    cta: "Ask About Training",
    supportType: "training",
    icon: MessagesSquare,
  },
  {
    index: "04",
    title: "Procedure Manuals and Documentation",
    short: "Document the process so it can be followed consistently.",
    description:
      "Develop clear, practical procedure manuals that help your team understand processes, follow consistent practices, and document important operating steps.",
    topics: [
      "Standard operating procedures",
      "Process documentation",
      "Work instructions",
      "Inspection checklists",
      "Troubleshooting reference guides",
      "Training documentation",
    ],
    topicsLabel: "Potential deliverables",
    image: IMG.serviceDocs,
    cta: "Discuss Documentation",
    supportType: "documentation",
    icon: FileText,
  },
  {
    index: "05",
    title: "On-Site and Remote Consulting",
    short: "Choose an approach that fits the situation.",
    description:
      "Choose a consulting approach that fits your facility, technical concern, and operational needs.",
    topics: [
      "Direct observation at your facility",
      "Process and equipment walkthroughs",
      "Technical discussions by video or phone",
      "Review of photographs and process notes",
      "Flexible support as the situation requires",
    ],
    topicsLabel: "Ways support can be delivered",
    image: IMG.serviceDelivery,
    cta: "Find the Right Support",
    supportType: "general",
    icon: ClipboardList,
    deliveryNotes: [
      {
        label: "On-site consulting",
        text: "Direct support at your facility to observe processes, review conditions, and discuss practical next steps.",
      },
      {
        label: "Remote consulting",
        text: "Convenient technical discussions and troubleshooting support from a distance, subject to the needs of the issue.",
      },
    ],
  },
];

export interface Problem {
  id: string;
  title: string;
  explanation: string;
  supportType: SupportType;
}

export const PROBLEMS: Problem[] = [
  {
    id: "recurring-defects",
    title: "Coating imperfections that continue to appear",
    explanation:
      "When the same imperfection returns run after run, the cause is often somewhere in the chain of pretreatment, application settings, material handling, or cure conditions. A structured look at what changes between good and bad parts is usually the most useful starting point.",
    supportType: "troubleshooting",
  },
  {
    id: "inconsistent-results",
    title: "Inconsistent finish quality between parts or production runs",
    explanation:
      "Variation between parts, shifts, or runs usually points to differences in how the process is being carried out rather than a single fault. Documenting the actual conditions for each run helps show where the variation enters.",
    supportType: "process",
  },
  {
    id: "cure-questions",
    title: "Questions about curing or application conditions",
    explanation:
      "Time, temperature, part mass, gun settings, and booth environment all interact. Reviewing the numbers you are actually achieving — rather than the numbers you intend to achieve — is often where the useful answers appear.",
    supportType: "troubleshooting",
  },
  {
    id: "unknown-source",
    title: "Difficulty identifying the source of a recurring issue",
    explanation:
      "When several variables could be responsible, the fastest route is usually a deliberate process of elimination. Narrowing the list of possibilities before changing anything helps avoid solving the wrong problem.",
    supportType: "troubleshooting",
  },
  {
    id: "training-gaps",
    title: "Operators who need additional technical training",
    explanation:
      "Many finish problems are reduced when operators understand why each step matters. Training built around your own equipment, parts, and quality expectations tends to be far more effective than generic material.",
    supportType: "training",
  },
  {
    id: "missing-sops",
    title: "Missing, unclear, or outdated procedure manuals",
    explanation:
      "Without documented procedures, consistency depends on individual memory. Clear work instructions, checklists, and troubleshooting references make the process repeatable across shifts and new team members.",
    supportType: "documentation",
  },
];

export const PROCESS_STEPS = [
  {
    index: "01",
    title: "Tell Us About Your Challenge",
    body:
      "Share the coating issue, process concern, training need, or documentation project you're dealing with.",
  },
  {
    index: "02",
    title: "Discuss the Situation",
    body:
      "Review the problem, relevant operating conditions, and the kind of support your operation may need.",
  },
  {
    index: "03",
    title: "Determine the Right Approach",
    body:
      "Explore whether remote consultation, on-site support, technical training, or documentation is the most appropriate next step.",
  },
  {
    index: "04",
    title: "Move Forward With a Plan",
    body:
      "Establish the scope of support and agree on practical next steps based on the needs of your operation.",
  },
];

export const INDUSTRIES = [
  {
    key: "coaters",
    title: "Powder Coating Companies",
    body: "Job shops and coating businesses running daily production work.",
  },
  {
    key: "finishing",
    title: "Industrial Finishing Operations",
    body: "Teams responsible for surface preparation, application, and cure.",
  },
  {
    key: "fabricators",
    title: "Metal Fabricators",
    body: "Fabricators finishing their own parts or preparing them for coating.",
  },
  {
    key: "manufacturing",
    title: "Manufacturing Facilities",
    body: "Plants where the coating line is one part of a larger process.",
  },
  {
    key: "teams",
    title: "Production and Quality Teams",
    body: "Supervisors, quality staff, and operators working to hold a standard.",
  },
  {
    key: "procedures",
    title: "Teams Building Procedures",
    body: "Operations formalising how their finishing process should be run.",
  },
];

export const VALUE_PROPS = [
  {
    title: "Problem-Focused Support",
    body:
      "Address the actual coating concern rather than offering a generic, one-size-fits-all approach.",
    icon: ScanSearch,
  },
  {
    title: "Practical Technical Guidance",
    body:
      "Focus on understanding the process, evaluating possible causes, and discussing realistic next steps.",
    icon: SlidersHorizontal,
  },
  {
    title: "Training and Documentation",
    body:
      "Support teams with technical knowledge, clear procedures, and better process understanding.",
    icon: BookOpenCheck,
  },
  {
    title: "Flexible Consultation Options",
    body:
      "Explore on-site and remote support depending on the requirements of the situation.",
    icon: MessagesSquare,
  },
];

export const FAQS = [
  {
    q: "What types of powder coating problems can you help with?",
    a: "Support can cover coating imperfections, process concerns, quality questions, and other technical challenges. The appropriate approach depends on the specific issue and available information.",
  },
  {
    q: "Do you offer on-site consulting?",
    a: "Yes. On-site support can be discussed for businesses that need assistance at their facility.",
  },
  {
    q: "Can I get help remotely?",
    a: "Yes. Remote consultation is available. The suitability of remote support depends on the issue and the information that can be shared.",
  },
  {
    q: "Do you provide technical training for employees?",
    a: "Technical training can be discussed based on your team's knowledge gaps, operating environment, and training objectives.",
  },
  {
    q: "Can you help create procedure manuals?",
    a: "Yes. Procedure documentation and operating manuals are among the service areas to discuss when planning support for your operation.",
  },
  {
    q: "Do I need to know exactly what is causing the problem?",
    a: "No. You can begin by explaining what you are observing, when it happens, and what you have already tried. The initial discussion can help determine the appropriate next steps.",
  },
  {
    q: "How much does consulting cost?",
    a: "Pricing depends on the type of support, project scope, location, and time required. Share a few details about your needs to begin a conversation about the appropriate scope.",
  },
  {
    q: "How do I get started?",
    a: "Complete the consultation inquiry form with a brief description of your situation. The consultant can then review your inquiry and discuss potential next steps.",
  },
];

export interface Article {
  id: string;
  category: string;
  title: string;
  summary: string;
  image: { src: string; alt: string };
  readTime: string;
  sections: { heading: string; body: string[] }[];
}

export const ARTICLES: Article[] = [
  {
    id: "common-imperfections",
    category: "Troubleshooting",
    title: "Common Powder Coating Imperfections: What to Investigate First",
    summary:
      "Surface defects rarely have a single obvious cause. Here is a practical order of investigation that helps narrow the possibilities before anything gets changed on the line.",
    readTime: "Draft article · 4 min read",
    image: IMG.articleDefects,
    sections: [
      {
        heading: "Start with what the defect is telling you",
        body: [
          "Every imperfection carries information about where it came from. The shape, size, distribution, and consistency of a defect across a part often matters more than the defect name itself. A mark that appears on every part in the same location suggests something mechanical or fixturing related. A defect scattered randomly across surfaces points more towards contamination, powder condition, or application environment.",
          "Before changing any setting, it is worth recording what the defect looks like on several parts from the same run, including where it appears, whether it is raised or recessed, and whether it is present before or after cure.",
        ],
      },
      {
        heading: "Work backwards through the process",
        body: [
          "A useful order of investigation is to move backwards from the finished part: cure, application, powder handling, pretreatment, substrate, and finally upstream fabrication. The reason for working backwards is that the most recent process steps are usually the easiest to verify, and confirming them allows the rest of the investigation to be narrowed.",
          "At each stage, ask what evidence is available. Oven logs and part temperature measurements, gun settings and powder lot details, bath or washer condition, and the surface state of the incoming part are all useful reference points.",
        ],
      },
      {
        heading: "Change one variable at a time",
        body: [
          "One of the most common ways a troubleshooting exercise loses its way is by adjusting several parameters at once. If appearance improves, it becomes impossible to know which change was responsible, and the process is left in an unexplained state.",
          "Keeping a simple written log of what was changed, when, and what the result was turns a difficult investigation into a record that can be referred back to later — and it becomes the starting point for a troubleshooting reference guide for the team.",
        ],
      },
      {
        heading: "When to bring in outside support",
        body: [
          "If the same imperfection keeps returning after the obvious variables have been checked, an outside perspective can help by questioning assumptions that have quietly become part of the routine. That is often where a technical consultation adds the most value — not by replacing your team's knowledge, but by helping structure the investigation.",
        ],
      },
    ],
  },
  {
    id: "process-control",
    category: "Process Control",
    title: "Why Consistent Process Control Matters in Powder Coating",
    summary:
      "Coating quality is rarely determined by a single setting. It is the result of many small conditions being held steady across shifts, operators, and part mixes.",
    readTime: "Draft article · 4 min read",
    image: IMG.articleProcess,
    sections: [
      {
        heading: "Variation is the real opponent",
        body: [
          "Most coating operations do not struggle with a single bad setting. They struggle with drift. Line speed, gun distance, powder fluidisation, ambient humidity, part mass, and racking density all shift across a day. Each shift is small enough to ignore on its own, but together they produce the difference between a part that passes and a part that is reworked.",
          "Recognising drift as the main enemy changes what you measure. Instead of chasing a single ideal number, the goal becomes knowing how much your real conditions move and why.",
        ],
      },
      {
        heading: "Measure what you actually achieve",
        body: [
          "There is often a gap between the settings on a control panel and the conditions a part actually experiences. Oven setpoint and part metal temperature are not the same thing. A belt speed dial does not tell you the dwell time of a heavy section. Film thickness readings taken at the same convenient spot every time will not reveal variation across a part.",
          "A small number of honest, repeatable measurements taken in the same way each run is far more useful than a large amount of inconsistent data.",
        ],
      },
      {
        heading: "Make the process readable to the whole team",
        body: [
          "Process control only holds when everyone running the line can see the same picture. That means the conditions worth watching are written down, the acceptable range is understood, and there is a clear response when something moves outside it.",
          "This is also where documentation earns its place. A one-page control sheet that operators actually use will outperform a detailed manual that nobody opens.",
        ],
      },
      {
        heading: "Where an outside review helps",
        body: [
          "A process review is often most valuable when the operation is too close to its own routine to notice what has drifted. An external walkthrough of the line, the settings, and the quality checks can help identify which variables deserve tighter control and which ones are being recorded without purpose.",
        ],
      },
    ],
  },
  {
    id: "clear-sops",
    category: "Documentation",
    title: "Creating Clear Standard Operating Procedures for Coating Teams",
    summary:
      "A procedure that nobody can follow from the floor is not a procedure. Practical documentation is short, specific, and written for the person doing the work.",
    readTime: "Draft article · 5 min read",
    image: IMG.articleSops,
    sections: [
      {
        heading: "Write for the person standing at the line",
        body: [
          "The audience for a work instruction is an operator with gloves on, a part in front of them, and a production target behind them. That means short sentences, photographs of the actual part and the actual fixture, and numbers that are specific rather than general.",
          "Wherever possible, describe the outcome you need as well as the action to take. \"Check that the gun distance is consistent across the part\" is less useful than a photo showing the intended distance with the acceptable range noted.",
        ],
      },
      {
        heading: "Structure the document around decisions",
        body: [
          "Most procedures fail because they describe the happy path and stop. In practice, operators constantly face small decisions: the powder looks different, the part is heavier than usual, the finish does not look right after cure.",
          "Effective documentation includes a short \"if this, then that\" section — a troubleshooting reference that lists the common observations, the most likely influences, and who to tell when something falls outside the normal range.",
        ],
      },
      {
        heading: "Keep it maintainable",
        body: [
          "A document that is hard to update will drift out of date and lose the team's trust. Version, date, and owner on every sheet; one place where the current version lives; and a fixed point in the year where the whole set is reviewed.",
          "Short documents that get updated beat comprehensive documents that get ignored.",
        ],
      },
      {
        heading: "Documentation as a training asset",
        body: [
          "Well-written procedures double as training material. A new operator who learns from the same sheets they will use on the floor starts with a consistent understanding of the process, and the rest of the team benefits from having a shared reference point when opinions differ.",
        ],
      },
    ],
  },
];

export { INDUSTRY_IMAGES };
