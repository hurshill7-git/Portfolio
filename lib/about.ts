/** Content for the About page — edit freely as the story evolves. */

export const bio = [
  "I'm an experience designer who likes the messy middle — the part where a vague problem slowly turns into something a person can actually use. I started in visual and brand design, which is why I care as much about how a thing feels as how it works.",
  "Today I'm a UI/UX Designer at 314e Corp, working on B2B healthcare software, brand systems, and the motion and exhibition work around them. I'm drawn to dense, high-stakes products where good design genuinely lowers the cost of getting things right.",
];

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  detail: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "UI/UX Designer",
    org: "314e Corp",
    period: "2023 — Present",
    detail:
      "Product design for healthcare SaaS, plus brand, explainer video systems, and exhibition design for VIVE & HIMSS.",
  },
  {
    role: "UI Designer Intern",
    org: "314e Corp",
    period: "2022 — 2023",
    detail:
      "Shipped interface work across the product and supported the design system.",
  },
  {
    role: "Studio Intern",
    org: "Campus Sutra",
    period: "2021",
    detail:
      "Photography, product shoots, and graphic design for a fashion brand.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Product",
    items: ["UX design", "Interaction design", "Design systems", "Prototyping"],
  },
  {
    group: "Craft",
    items: ["UI design", "Branding", "Typography", "Motion & video"],
  },
  {
    group: "Beyond the screen",
    items: ["3D", "Photography", "Exhibition design"],
  },
];

/** "Beyond product" — visual range shown as a gallery. */
export const beyond: { title: string; kind: string }[] = [
  { title: "3D & product viz", kind: "3D" },
  { title: "Photography", kind: "Photo" },
  { title: "Branding & packaging", kind: "Brand" },
  { title: "Motion & film", kind: "Video" },
];
