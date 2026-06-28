# Image Prompt Kit — Consistent Visual Theme

A consistent **abstract 3D / material** look for every generated image, tuned for
**ChatGPT / DALL·E 3 (GPT-4o image generation)** used **with your reference image**.

**Scope:** generate the **11 case-study covers** + **4 "Beyond product" tiles** (+ optional
atmosphere art). **Keep your real product screenshots as real screenshots** — the in-case `<Figure>`
slots are for your actual captures, not invented UI (fabricated "ZSegment / Jeeves" screens are a
credibility risk in interviews).

---

## Image manifest — every file, its location, and the size to export

**The two rules:** `16:9 → 1920×1080` · `3:4 → 1200×1600`. Always keep the subject **centered with
calm margins** — the site fills slots with `object-cover`, so edges may crop (covers also crop to
16:7 on the case-study hero). Export optimized **JPG**; `next/image` makes the AVIF/WebP + responsive
sizes automatically.

### Case-study covers — 11 files · 16:9 · **1920×1080**
Path pattern: `public/work/<slug>/cover.jpg`
`internal-ai-tools` · `zsegment` · `jeeves` · `veritable` · `jeeves-brand-guidelines` · `ragam` ·
`penknife` · `himss-2026` · `packaging-branding` · `photography` · `product-shoots`

### In-case figures — 23 files (paths under `public/work/<slug>/`)
| Case study | Files | Aspect | Export |
|---|---|---|---|
| internal-ai-tools | `chart-builder.jpg`, `deck-automation.jpg` | 16:9 | 1920×1080 |
| zsegment | `messages-module.jpg` *(full-bleed)* | 16:9 | 1920×1080 |
| jeeves | `tutorial-system.jpg`, `assets-screen.jpg` | 16:9 | 1920×1080 |
| veritable | `pricing-checkout.jpg` *(full-bleed)* | 16:9 | 1920×1080 |
| jeeves-brand-guidelines | `color-typography.jpg`, `icons-components.jpg` | 16:9 | 1920×1080 |
| ragam | `discovery.jpg`, `show-detail.jpg`, `producer-dashboard.jpg` | 3:4 | 1200×1600 |
| penknife | `ats-page.jpg`, `crm-page.jpg`, `sourcing-page.jpg` | 3:4 | 1200×1600 |
| himss-2026 | `booth-3d-render.jpg`, `campaign-system.jpg` | 16:9 | 1920×1080 |
| packaging-branding | `packaging-system.jpg`, `unboxing-collateral.jpg` | 16:9 | 1920×1080 |
| photography | `light-study.jpg`, `architecture.jpg`, `human-presence.jpg` | 3:4 | 1200×1600 |
| product-shoots | `lifestyle-setup.jpg`, `detail-shot.jpg` | 16:9 | 1920×1080 |

### About page — 5 files (in `public/`)
| File | Aspect | Export |
|---|---|---|
| `public/portrait.jpg` | 3:4 | 1200×1600 |
| `public/beyond-3d-product-viz.jpg` | 3:4 | 1200×1600 |
| `public/beyond-photography.jpg` | 3:4 | 1200×1600 |
| `public/beyond-branding-packaging.jpg` | 3:4 | 1200×1600 |
| `public/beyond-motion-film.jpg` | 3:4 | 1200×1600 |

**Total: 39 images** — 11 covers + 23 figures + 1 portrait + 4 Beyond tiles.

---

## Universal styling prompt (for all mockups + thumbnails)

Use the **same style layer** every time — identical wording is what makes 39 images read as one
family. Attach your reference image, then pick a mode.

### The style layer (always include, verbatim)
> Present this as a premium, editorial product shot. Background: warm bone off-white (#f4f2ec) with a
> soft terracotta-red (#d9442a) glow and a faint paper texture; near-black ink (#16150f) for depth.
> Soft, even studio lighting, a gentle 3D perspective, a soft realistic drop shadow, shallow depth of
> field, fine film grain, generous negative space, centered composition with calm margins. Minimal,
> calm, premium. No added text, no logos, no clutter, no human faces. Match the palette, lighting and
> grain of the attached reference image.

### Mode 1 — Mockup (frame a REAL screenshot)
Attach your screenshot, then:
> Place the attached UI screenshot inside a clean, minimal browser/device frame with softly rounded
> corners, floating at a slight angle with a soft shadow. **[+ paste the style layer]** Wide landscape
> 1792×1024 (or portrait 1024×1792 for phone screens), subject centered.

### Mode 2 — Thumbnail (abstract cover)
No screenshot — use the project's motif from the library below:
> An abstract 3D form of **[motif, e.g. "soft tubes resolving into clean parallel channels"]**.
> **[+ paste the style layer]** Wide landscape 1792×1024, subject centered.

**Aspect cheat-sheet for ChatGPT/DALL·E:** 16:9 slots → ask for **1792×1024**; 3:4 slots → ask for
**1024×1792**. Keep the subject centered so the site's crop stays safe.

---

## How to use this (read once)

1. In ChatGPT, **attach your reference image** to the message.
2. Paste one of the **complete prompts** below (they already include the shared style + the avoid-list).
3. For a tight family look:
   - Use the **same reference image** and keep the wording identical every time.
   - Generate them **in one chat session**, and for images 2+ add: *"Keep the exact same materials,
     lighting, palette and film grain as the previous image."*
4. **Aspect ratios** (DALL·E's sizes don't match the site exactly, so keep the subject centered with
   calm empty margins — the site crops with `object-cover`):
   - **Covers** → request **wide landscape, 1792×1024**.
   - **Beyond tiles** → request **portrait, 1024×1792**.

**Palette (locked):** bone off-white `#f4f2ec` · near-black ink `#16150f` · terracotta accent `#d9442a`.

**Always avoid:** text, watermarks, logos, UI/dashboards/charts, human faces, neon colors, clutter.

---

## Master style block (the shared half of every prompt)

> Using the attached image as the exact style, palette, lighting, material and grain reference,
> create an abstract 3D render with soft studio lighting, matte clay and frosted-glass materials, a
> subtle inner glow, and gentle depth of field. Warm editorial palette ONLY: bone off-white
> background (#f4f2ec), near-black ink details (#16150f), and a single warm terracotta-red accent
> (#d9442a). Smooth organic forms, calm and premium, generous negative space, fine film grain,
> minimalist. No text, no logos, no user interface, no charts, no human faces. Centered composition
> with empty margins.

---

## 1. Case-study covers — wide landscape (1792×1024)

Drop each result at `public/work/<slug>/cover.jpg`. Each prompt below is complete — just attach the
reference and paste.

### internal-ai-tools → `public/work/internal-ai-tools/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of modular rounded blocks and cards smoothly assembling into one neat stack, suggesting effortless automation. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### zsegment → `public/work/zsegment/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of a tangle of soft tubes resolving into clean, orderly parallel channels — messy data becoming structured. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### jeeves → `public/work/jeeves/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of a soft glowing orb gently guiding smaller floating forms along a path — a calm, helpful presence. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### veritable → `public/work/veritable/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of a smooth ribbon curving into a subtle checkmark inside a rounded shield-like form — clarity and trust. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### jeeves-brand-guidelines → `public/work/jeeves-brand-guidelines/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of a tidy arranged kit of material swatches, spheres and rounded chips in the palette — a design system laid out neatly. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### ragam → `public/work/ragam/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of soft stage curtains in gentle folds lit by a single warm spotlight cone — a quiet stage. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### penknife → `public/work/penknife/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of three distinct rounded forms unified beneath one smooth arc — many tools, one product. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### himss-2026 → `public/work/himss-2026/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of a pavilion of soft floating panels with one hanging form — spatial, architectural, dimensional. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### packaging-branding → `public/work/packaging-branding/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of softly stacked tactile boxes with a single ribbon and paper texture — an elegant unboxing. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### photography → `public/work/photography/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of warm light refracting through a smooth glass lens or aperture, with soft beams and gentle bokeh. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

### product-shoots → `public/work/product-shoots/cover.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of a single hero object resting on a soft pedestal under one studio key light, casting a long gentle shadow. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

---

## 2. "Beyond product" tiles — portrait (1024×1792)

Drop each result at the path shown (`public/`).

### `public/beyond-3d-product-viz.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a vertical minimalist abstract 3D render of a glossy abstract product form floating on a soft pedestal. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Portrait 1024×1792.

### `public/beyond-photography.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a vertical minimalist abstract 3D render of a triangular glass prism splitting a single warm beam of light. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Portrait 1024×1792.

### `public/beyond-branding-packaging.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a vertical minimalist abstract 3D render of neatly stacked soft-edged branded boxes with a single ribbon. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Portrait 1024×1792.

### `public/beyond-motion-film.jpg`
> Using the attached image as the exact style, palette, lighting, material and grain reference, create a vertical minimalist abstract 3D render of a flowing, motion-blurred ribbon suggesting film and movement. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Portrait 1024×1792.

---

## 3. Optional — atmosphere / hero fallback (wide 1792×1024)

> Using the attached image as the exact style, palette, lighting, material and grain reference, create a wide minimalist abstract 3D render of a single softly-lit organic blob drifting in empty space. Matte clay and frosted-glass materials, soft studio light, subtle inner glow, gentle depth of field. Warm palette only: bone off-white background (#f4f2ec), near-black ink details (#16150f), one terracotta-red accent (#d9442a). Generous negative space, fine film grain, centered with empty margins. No text, no logos, no UI, no faces. Wide landscape 1792×1024.

---

## After you generate

1. Save files to the paths above (create the `public/work/<slug>/` folders).
2. Tell me and I'll wire them in: set each case study's `cover:` in `content/work/*.mdx`, and point
   the About portrait + `beyond` tiles at their files. Covers then appear on `/work` cards and the
   case-study hero automatically.

**Tip:** export as optimized JPGs (cover ~1600px wide, tiles ~1000px wide). `next/image` handles the
rest (AVIF/WebP, responsive sizes).
