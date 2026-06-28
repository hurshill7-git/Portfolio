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
    "A designer who builds — across product, brand, motion, and 3D, taking the whole experience from first idea to shipped.",
  location: "Bangalore, India",
  email: "hurshill7@gmail.com",
  phone: "+91 62616 33569",
  url: "https://harshil-malakar.vercel.app",
  // Downloadable PDF (add the file at /public/resume.pdf); the /resume page renders the live version.
  resume: "/resume.pdf",
  socials: {
    linkedin: "https://www.linkedin.com/in/harshill7/",
    behance: "https://www.behance.net/hurshill",
    framer: "https://harshill.framer.website",
  },
} as const;

export const nav = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Résumé" },
] as const;

/** Tools surfaced in the toolkit strip — drawn from the case studies, ordered
 *  design → 3D/web → motion/video → AI build & media. */
export const toolkit = [
  "Figma",
  "Spline",
  "Framer",
  "React",
  "Adobe Creative Suite",
  "After Effects",
  "Premiere Pro",
  "Claude",
  "Remotion",
  "ElevenLabs",
  "HeyGen",
  "Veo 3",
  "Freepik",
  "Notion",
] as const;
