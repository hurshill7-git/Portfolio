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

/** "Beyond product" — visual range shown as a gallery. */
export const beyond: { title: string; kind: string }[] = [
  { title: "3D & product viz", kind: "3D" },
  { title: "Photography", kind: "Photo" },
  { title: "Branding & packaging", kind: "Brand" },
  { title: "Motion & film", kind: "Video" },
];
