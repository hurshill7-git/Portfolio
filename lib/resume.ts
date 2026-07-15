/**
 * Career data — the single source for the /resume page, and reused for the
 * experience + skills sections on /about. Update here, both pages follow.
 */

export const resumeSummary =
  "Product designer with 3+ years turning complex, high-stakes software (mostly healthcare) into something people can actually use without a manual. I live in user flows, interaction patterns, and design systems, and I do my best work shoulder to shoulder with PMs and engineers. Lately I also build the AI-assisted tools and video pipelines that make the work ship faster. I came up through visual, brand, photography, and film, so I am just as comfortable in a Figma file as I am behind a camera or in code.";

export type Experience = {
  role: string;
  org: string;
  period: string;
  location?: string;
  /** One-line version used on the About page timeline. */
  summary: string;
  /** Detailed bullets used on the Resume page. */
  bullets: string[];
};

export const experience: Experience[] = [
  {
    role: "UI & Visual Designer",
    org: "314e Corp",
    period: "2023 to Present",
    location: "Bangalore, India",
    summary:
      "Product UX, design systems, and brand for enterprise healthcare software, plus internal AI tools, automated video pipelines, and event experiences.",
    bullets: [
      "Designed user flows, wireframes, and high-fidelity interfaces for enterprise healthcare platforms (ZSegment, Jeeves, Veritable), balancing usability, accessibility, and real business constraints.",
      "Led end-to-end redesigns of dense data tools, turning expert-only screens into systems a new operator could navigate on day one. ZSegment now runs in production across 8 health systems.",
      "Built and manage 314e's product design system on top of Ant Design, applying color theory and core visual design principles (hierarchy, contrast, rhythm, accessibility) to define component behavior, interaction states, and a consistent visual language across products.",
      "Created the full Jeeves brand guidelines from scratch, logo, color palette, typography, 40+ custom icons, and motion principles, now the reference system for every Jeeves touchpoint.",
      "Led product-explainer and onboarding experiences, including 15+ in-product tutorials, to improve feature discoverability and cut support confusion.",
      "Built internal AI-assisted tools that turned hours of manual deck and chart work into minutes, adopted across the sales team with no mandate.",
      "Designed and built video-production pipelines that cut explainer-video turnaround from three weeks to one (3x faster): a script-and-Figma-to-render motion system with word-synced ElevenLabs voiceover, plus a generative pipeline (Freepik, Veo 3, Grok, Premiere) that produces cinematic product videos in about three days.",
      "Designed AR and exhibition experiences for global healthcare events, including the 314e booth at HIMSS 2026.",
    ],
  },
  {
    role: "Visual Designer",
    org: "Youngun.in",
    period: "Internship · Jun – Dec 2021",
    summary:
      "Meme-marketing and brand content for major consumer brands.",
    bullets: [
      "Designed art memes, promo ads, and brand video bites for major clients including Flipkart, Truecaller, and OkCupid.",
      "Created scroll-stopping visual content built for social and meme-marketing campaigns.",
      "Worked with content and strategy teams to keep every visual on brand and on goal.",
    ],
  },
  {
    role: "Studio Intern",
    org: "Campus Sutra",
    period: "Internship · Jun – Aug 2022",
    summary:
      "Studio product photography and cinematic social videos for Campus Sutra and its sister brands.",
    bullets: [
      "Assisted senior photographers on e-commerce, platform, and creative shoots for Campus Sutra and sister brands including Sohi, Via Tokyo, Blnce, Haute Sauce, and Bon Homie.",
      "Learned studio lighting and metering for e-commerce-ready product shots across categories from jewelry to home decor.",
      "Shot and edited cinematic short-form videos for social media, from concept through post-production.",
    ],
  },
  {
    role: "Freelance Cinematic Creator",
    org: "Various clients",
    period: "Freelance",
    summary:
      "Directed and shot cinematic promos for gyms, salons, and lifestyle brands.",
    bullets: [
      "Directed and shot cinematic promos for gyms, salons, and lifestyle brands, handling everything from the lighting setup to the final color grade.",
      "Delivered crisp edits and photos clients love posting (and their followers love sharing).",
    ],
  },
];

export type Education = {
  qualification: string;
  org: string;
  period: string;
};

export const education: Education[] = [
  {
    qualification: "Bachelor of Design (B.Des)",
    org: "National Institute of Fashion Technology (NIFT)",
    period: "2019 to 2023",
  },
];

export const skillGroups: { group: string; items: string[] }[] = [
  {
    group: "Product & UX",
    items: [
      "UI/UX design",
      "Product design",
      "Design systems",
      "Wireframing & prototyping",
      "A/B testing",
    ],
  },
  {
    group: "Visual & brand",
    items: [
      "Visual design",
      "Visual design principles",
      "Color theory",
      "Branding & identity",
      "Creative direction",
    ],
  },
  {
    group: "Emerging",
    items: [
      "AI tools",
      "AI video pipelines",
      "Generative video workflows",
      "AR tools",
    ],
  },
  {
    group: "Camera & motion",
    items: [
      "Product photography",
      "Creative & conceptual photography",
      "Motion design",
      "Video editing",
      "Meme & trend-driven content",
    ],
  },
  {
    group: "Tools",
    items: [
      "Figma",
      "Ant Design",
      "Adobe Creative Suite",
      "Premiere Pro",
      "ElevenLabs",
      "Spline",
      "Framer",
    ],
  },
];

export const languages: { name: string; level: string }[] = [
  { name: "English", level: "Proficient" },
  { name: "Hindi", level: "Native" },
];
