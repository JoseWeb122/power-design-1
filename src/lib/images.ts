/**
 * Central image manifest.
 * All photography is authentic industrial stock served from a CDN so the
 * single-file build stays lightweight and never ships missing assets.
 */
const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  hero: {
    src: px(36215204, 2000, 1250),
    alt: "Technician in protective equipment applying powder coating to metal piping inside a production facility",
  },
  intro: {
    src: px(36184235, 1200, 1500),
    alt: "Coating technician operating a powder coating gun on a large metal structure in an industrial workshop",
  },
  serviceTroubleshooting: {
    src: px(15016527, 1000, 750),
    alt: "Close-up of freshly coated metal components hanging on a conveyor inside a coating line",
  },
  serviceProcess: {
    src: px(32845674, 1000, 750),
    alt: "Production worker in safety gear inspecting metal sheets on a factory line",
  },
  serviceTraining: {
    src: px(37668423, 1000, 750),
    alt: "Engineer examining industrial machinery while discussing the process with an operator",
  },
  serviceDocs: {
    src: px(3823190, 1000, 750),
    alt: "Technician reviewing process documentation on a tablet inside a workshop",
  },
  serviceDelivery: {
    src: px(36184247, 1000, 750),
    alt: "Worker in protective gear powder coating a large industrial metal structure",
  },
  problemDetail: {
    src: px(36215202, 1200, 900),
    alt: "Macro view of a powder coating gun depositing a controlled cloud of powder onto metal",
  },
  onSite: {
    src: px(36184230, 1000, 1200),
    alt: "On-site consultant observing a coating operation on large fabricated metalwork",
  },
  remote: {
    src: px(7018656, 1000, 1200),
    alt: "Production team member reviewing technical notes and photographs during a remote consultation",
  },
  about: {
    src: px(8986038, 1000, 1250),
    alt: "Industrial operator in protective coveralls working at a finishing station under workshop lighting",
  },
  contactBg: {
    src: px(19544248, 2000, 1200),
    alt: "Industrial facility interior with production personnel at work",
  },
  articleDefects: {
    src: px(14615263, 900, 640),
    alt: "Close-up inspection of a spray-applied finish on a metal automotive component",
  },
  articleProcess: {
    src: px(38867223, 900, 640),
    alt: "Automated manufacturing equipment running inside a modern production facility",
  },
  articleSops: {
    src: px(15546798, 900, 640),
    alt: "Close-up of hands taking precise measurements in a mechanical workshop",
  },
} as const;

export const INDUSTRY_IMAGES: Record<
  string,
  { src: string; alt: string }
> = {
  coaters: {
    src: px(36184247, 800, 600),
    alt: "Powder being applied to fabricated metalwork inside a coating booth",
  },
  finishing: {
    src: px(36215202, 800, 600),
    alt: "Powder coating application in progress at an industrial finishing operation",
  },
  fabricators: {
    src: px(36522037, 800, 600),
    alt: "Metal fabrication weld in progress on an industrial workbench",
  },
  manufacturing: {
    src: px(19544248, 800, 600),
    alt: "Production personnel working across a busy manufacturing floor",
  },
  teams: {
    src: px(32845674, 800, 600),
    alt: "Quality team member examining metal parts for surface finish consistency",
  },
  procedures: {
    src: px(29988963, 800, 600),
    alt: "Precision industrial equipment used in a controlled manufacturing process",
  },
};
