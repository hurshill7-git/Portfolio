/**
 * About-page narrative. Experience and skills now live in lib/resume.ts and are
 * shared between /about and /resume; this file holds the bio voice and the
 * "Beyond product" gallery.
 */

export const bio = [
  "I'm a product designer who likes the messy middle: the part where a vague, slightly intimidating problem slowly turns into something a real person can actually use. I came up through visual and brand design, which is why I care as much about how a thing feels as how it works.",
  "These days I'm at 314e Corp, mostly in healthcare software. That's a fancy way of saying high-stakes products where good design genuinely lowers the cost of getting things wrong. I work across product UX, design systems, brand, motion, and 3D, and increasingly I build the tools and AI pipelines that make the work faster, from internal deck and chart generators to video systems that turn a script into a finished, voice-synced film.",
  "Before all this I shot products, cut cinematic promos, and made memes for brands like Flipkart and Truecaller, so I'm equally happy in a Figma file or behind a camera. I'm happiest when a hard problem finally gets simple enough that it just clicks.",
];

export type BeyondImage = { src: string; width: number; height: number };

export type BeyondCategory = {
  slug: string;
  title: string;
  kind: string;
  /** Card-thumbnail image for the homepage/about carousel. Falls back to images[0] if unset. */
  cover?: string;
  /** Images under public/beyond/<slug>/, in display order, at their real dimensions. */
  images: BeyondImage[];
  /** "stack" (default) — full-width, one below another. "grid" — for many small individual tiles. */
  layout?: "stack" | "grid";
};

/** "Beyond product" — visual range shown as a carousel; each card opens a gallery. */
export const beyond: BeyondCategory[] = [
  {
    slug: "ux-ui",
    title: "UX & UI",
    kind: "UX/UI",
    cover: "/beyond/ux-ui/cover.png",
    images: Array.from({ length: 19 }, (_, i) => ({
      src: `/beyond/ux-ui/${String(i + 1).padStart(2, "0")}.png`,
      width: 1962,
      height: 1142,
    })),
  },
  {
    slug: "web-design",
    title: "Web Design",
    kind: "Web",
    cover: "/beyond/web-design/cover.png",
    images: [
      { src: "/beyond/web-design/01.png", width: 1440, height: 8782 },
      { src: "/beyond/web-design/02.png", width: 1440, height: 7912 },
    ],
  },
  {
    slug: "mobile-design",
    title: "Mobile Design",
    kind: "Mobile",
    cover: "/beyond/mobile-design/cover.png",
    images: Array.from({ length: 12 }, (_, i) => ({
      src: `/beyond/mobile-design/${String(i + 1).padStart(2, "0")}.png`,
      width: 1962,
      height: 1142,
    })),
  },
  {
    slug: "branding",
    title: "Branding",
    kind: "Brand",
    cover: "/beyond/branding/cover.png",
    images: [
      1101, 1106, 1106, 1106, 1106, 1103, 1103, 1101, 1101, 1101, 1101, 1101,
      1101, 1101, 1101, 1101, 1101, 1101, 1101, 1101, 1101, 1101, 1101, 1101,
    ].map((height, i) => ({
      src: `/beyond/branding/${String(i + 1).padStart(2, "0")}.png`,
      width: 1962,
      height,
    })),
  },
  {
    slug: "static-creative",
    title: "Static Creative",
    kind: "Static",
    cover: "/beyond/static-creative/cover.png",
    images: [{ src: "/beyond/static-creative/01.png", width: 963, height: 3937 }],
  },
  {
    slug: "photography",
    title: "Photography",
    kind: "Photo",
    cover: "/beyond/photography/cover.png",
    images: [{ src: "/beyond/photography/01.png", width: 966, height: 3603 }],
  },
  {
    slug: "artworks",
    title: "Artworks",
    kind: "Art",
    cover: "/beyond/artworks/cover.png",
    images: [{ src: "/beyond/artworks/01.png", width: 966, height: 2552 }],
  },
  {
    slug: "logo-design",
    title: "Logo Design",
    kind: "Logo",
    cover: "/beyond/logo-design/cover.png",
    images: Array.from({ length: 6 }, (_, i) => ({
      src: `/beyond/logo-design/${String(i + 1).padStart(2, "0")}.png`,
      width: 1962,
      height: 1142,
    })),
  },
  {
    slug: "expressive-typography",
    title: "Expressive Typography",
    kind: "Type",
    layout: "grid",
    cover: "/beyond/expressive-typography/cover.png",
    images: [177, 182, 177, 177, 177, 177, 177, 177, 177].map((height, i) => ({
      src: `/beyond/expressive-typography/${String(i + 1).padStart(2, "0")}.png`,
      width: 307,
      height,
    })),
  },
  {
    slug: "3d-design",
    title: "3D Design",
    kind: "3D",
    cover: "/beyond/3d-design/cover.png",
    images: [{ src: "/beyond/3d-design/01.png", width: 929, height: 1163 }],
  },
];

export function getBeyondBySlug(slug: string) {
  return beyond.find((b) => b.slug === slug) ?? null;
}
