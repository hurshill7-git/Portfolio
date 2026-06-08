# Harshil Malakar — Experience Designer Portfolio

A hand-built portfolio (Next.js 16 · React 19 · Tailwind v4 · Motion · React Three Fiber)
designed to lead with deep product case studies. Built to be fast, accessible, and easy
to extend.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (static export of all pages)
npm start        # serve the production build
npm run lint     # ESLint
```

## How it's organized

```
app/                 Routes (App Router)
  page.tsx           Home — hero, selected work, about teaser, toolkit, contact
  work/              Work index + /work/[slug] case-study template
  about/             About — bio, experience, skills, "Beyond product"
  sitemap.ts robots.ts not-found.tsx
components/
  layout/  Nav, Footer
  ui/      Container, Button, Tag, Reveal, SectionHeading, MediaFrame
  work/    ProjectCard, CaseHero, WorkExplorer, mdx.tsx (case-study blocks)
  hero/    Hero + HeroScene (R3F, lazy, client-only)
content/work/        Case studies as .mdx  ← your content lives here
lib/                 site config, content loader, about data, motion easings
public/work/         Case-study images (referenced by `cover:` and <Figure src>)
```

## Add a new case study (no code needed)

1. Drop a file at `content/work/<slug>.mdx`.
2. Fill in the frontmatter (see any existing study for the full shape):

   ```yaml
   ---
   title: "Project — short subtitle"
   client: "Project"
   summary: "One-sentence overview."
   role: "Lead Product Designer"
   team: "1 PM · 3 eng · 1 design"
   timeline: "2024 · 4 months"
   platform: "Responsive web app"
   tags: ["Product Design", "UX"]
   cover: "/work/<slug>/cover.jpg"   # leave "" to show a placeholder
   featured: true                     # appears on the home page
   order: 1                           # listing order (lower = earlier)
   metrics:
     - value: "-40%"
       label: "Time to complete the core task"
   ---
   ```

3. Write the body using the case-study blocks (all available inside MDX):
   `<Section eyebrow title>`, `<Figure src alt caption aspect bleed>`,
   `<Gallery cols>`, `<BeforeAfter before after>`, `<Callout>`,
   `<Metrics><Metric value label /></Metrics>`.

It will automatically appear on `/work`, get its own static page at `/work/<slug>`,
and join the sitemap.

## Drop in real assets

- **Case-study images:** put files under `public/work/<slug>/…` and set `cover:` /
  `<Figure src="…">`. Until then, intentional labeled placeholders are shown.
- **Portrait:** `public/portrait.jpg` (referenced on the About page).
- **Résumé:** `public/resume.pdf` (linked from the nav and About page).

## Notes for big-tech applications

- Each study follows a deliberate narrative: context → role → research →
  explorations → solution → impact → reflection. Replace starred (`*`) placeholder
  metrics with real, measured numbers.
- Motion and the 3D hero respect `prefers-reduced-motion`.
- Identity, nav, and social links live in `lib/site.ts` — update once.

## Deploy

Push to GitHub and import on [Vercel](https://vercel.com) (zero config). Set the custom
domain there. The canonical URL (`site.url`) lives in `lib/site.ts`.
