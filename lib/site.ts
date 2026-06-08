/**
 * Central site configuration — single source of truth for identity,
 * navigation, and contact links. Update once, reflected everywhere.
 */
export const site = {
  name: "Harshil Malakar",
  shortName: "Harshil",
  role: "Experience Designer",
  // One-liner used in hero + meta description.
  tagline:
    "Experience designer crafting clear, humane products — from B2B healthcare SaaS to brand and motion.",
  location: "Indore, India",
  email: "harshil.malakar@314ecorp.com",
  url: "https://harshilmalakar.com",
  resume: "/resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/harshil-malakar",
    behance: "https://www.behance.net/hurshill",
    framer: "https://harshill.framer.website",
  },
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: site.resume, label: "Résumé", external: true },
] as const;

/** Tools surfaced in the toolkit strip (mirrors the current Framer site). */
export const toolkit = [
  "Figma",
  "Spline",
  "Framer",
  "Lovable",
  "Notion",
  "After Effects",
] as const;
