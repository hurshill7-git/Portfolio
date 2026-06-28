# Case-study thumbnail prompts — Freepik (dark hero style)

Match the homepage hero: **one soft 3D form glowing in a near-black void.** Same material,
palette, and lighting every time — only the central form's metaphor changes per case study.
That sameness is what makes 13 thumbnails read as one set.

**Palette (from the site tokens):**
- Void / background: near-black `#0a0906` → `#100f0a`
- Form: deep oxblood `#7c2d26` → brick-red `#d9442a` (hero glow), warm cream specular `#f4f2ec`
- Keep it monochrome-red on black — no other hues.

---

## How to use in Freepik
1. Model: **Mystic** (or Flux). Aspect ratio **16:9**. Resolution 2K+ (export ~1920×1080).
2. Attach the **hero screenshot** (red orb on black) as a **Style reference / image reference**,
   influence ~**55–70%** — this locks the palette, material, and mood.
3. Paste **[SUBJECT] + the STYLE BLOCK** (below) as the prompt. Add the **NEGATIVE** prompt.
4. Generate 4 variations; pick the one with a **centered subject and calm margins** (covers crop to
   16:7 on the case hero and `object-cover` in cards, so don't let the form touch the edges).
5. Drop the result at `public/work/<slug>/cover.jpg` — the code already references that path.

### STYLE BLOCK (append verbatim to every subject)
> rendered as a single soft-bodied translucent 3D form floating in a vast empty near-black void
> (#0a0906), the form in deep oxblood and brick-red (#7c2d26 to #d9442a) with smooth subsurface
> scattering, a gentle internal volumetric glow and one delicate soft specular highlight; cinematic
> low-key studio lighting, soft falloff into pure black, fine film grain, matte finish, generous
> negative space, centered composition, premium editorial minimalism, photoreal Octane/Redshift
> render, ultra-detailed, 8k, 16:9

### NEGATIVE prompt (every time)
> text, words, letters, logos, UI, screens, charts, people, faces, hands, clutter, busy composition,
> harsh edges, bright saturated colors, blue, green, yellow, neon, watermark, signature, low quality

---

## The 13 thumbnails — subject line per case study
(Each = the SUBJECT below + the STYLE BLOCK. File → `public/work/<slug>/cover.jpg`, 16:9.)

1. **internal-ai-tools** — *The Tools Nobody Had to Use*
   > a loose constellation of small glowing oxblood spheres drifting inward and merging into one larger luminous sphere

2. **auto-motion-videos** — *Videos That Edit Themselves*
   > a single oxblood sphere stretching into a long smooth ribbon of liquid light with gentle motion-blur streaks trailing behind it

3. **generative-video** — *AI Video That Doesn't Look Like AI*
   > thousands of fine glowing oxblood particles swirling through the void and coalescing into the smooth surface of a forming sphere

4. **zsegment** — *The Screen That Made New Hires Cry*
   > a dense chaotic tangle of red filament threads on one side gradually untwisting and resolving into one perfectly smooth glowing sphere on the other

5. **jeeves** — *Help Without the Help Desk*
   > a soft glowing oxblood orb cradled within several concentric translucent halo rings, calm and guiding

6. **veritable** — *Before the Surprise Bill Arrives*
   > a smooth translucent dome of soft red light arching protectively over a small glowing sphere beneath it

7. **jeeves-brand-guidelines** — *When One Product Becomes Three Brands*
   > three separate oxblood orbs flowing toward each other and fusing into a single unified glossy sphere mid-merge

8. **ragam** — *The Show Hiding in a PDF*
   > a single warm red spotlight pooling down onto a soft glowing sphere on an empty stage-like plane, theatrical, a faint hanging curtain of light

9. **penknife** — *Three Tools, One Family*
   > three distinct soft forms — a sphere, a rounded cube, and a capsule — sharing one material and the same glow, arranged as a balanced family

10. **himss-2026** — *When the Design Won't Fit Through the Door*
    > a monumental softly glowing red monolithic architectural volume rising in the void, dramatic low angle, vast sense of scale

11. **packaging-branding** — *Winning the Three-Second Shelf Test*
    > a few softly glowing red abstract packaging forms — a tall box and a cylinder — floating together and catching soft light

12. **photography** — *Seeing the Moment Before It Happens*
    > a glowing red camera-aperture iris opening in the void with a single soft beam of light passing through its center

13. **product-shoots** — *Photos That Make People Buy*
    > a single hero object as a smooth glowing red rounded form resting on a subtle reflective pedestal under a focused studio spotlight

---

## Notes
- **Already have real covers:** `zsegment`, `jeeves`, `veritable`, `internal-ai-tools`. Regenerate
  these only if you want full visual consistency with the new dark style; otherwise skip them.
- **3:4 variants:** for any portrait crop, change AR to 3:4 and export 1200×1600 — keep the same
  subject + style block.
- Want matching **in-case figures** or the **About "Beyond product" tiles** in this style too? Say
  the word and I'll add subject lines for those (the file list is in IMAGE-PROMPTS.md).

---

## Option B — feature a REAL product screenshot in the void (image reference)

Use this for the product case studies where you want the actual interface to show
(`zsegment`, `jeeves`, `veritable`, `internal-ai-tools`, `penknife`). It keeps your real
screenshots real — just floats them in the hero's atmosphere. Option A (pure abstract) stays
better for the non-UI studies (photography, packaging, HIMSS, ragam, the videos).

### Wiring in the Freepik flow
- **Image input 1 → the product screenshot** (the subject — give it the higher influence).
- **Image input 2 → the hero screenshot** (atmosphere/palette — medium influence).
- **Text node → the prompt below** (it must *name* the screenshot, or the model ignores it — which
  is exactly why your current run produced just a blob).
- Model: GPT image, **16:9**, 2K.

### Prompt (Option B)
> Take the attached product interface screenshot and present it as a sleek floating glass UI panel,
> slightly angled in 3D space, with a subtle rim light and a soft reflection beneath it, set inside a
> vast near-black void (#0a0906). Surround it with a large soft oxblood-to-brick-red volumetric glow
> (#7c2d26 to #d9442a) and one gentle specular highlight, matching the reference atmosphere.
> Cinematic low-key studio lighting, deep shadows, fine film grain, premium editorial minimalism,
> generous negative space, centered composition, 16:9, ultra-detailed, 8k. Keep the interface
> legible and undistorted; do not invent, add, or alter any UI elements or text.

### Negative (Option B)
> garbled text, distorted UI, warped letters, invented interface, extra logos, duplicated panels,
> busy background, bright saturated colors, blue, green, neon, watermark, low quality

### Tips
- The model can soften tiny UI text — angle the panel and don't rely on micro-legibility; the goal
  is "recognizably your product, on-brand," not a pixel-perfect screen.
- For depth, add: *"a second, smaller, blurred UI panel behind it."*
- Feed each study its matching screenshot: zsegment → messages/mapping screen; jeeves → tutorial
  screen; veritable → pricing/checkout; internal-ai-tools → the chart-builder; penknife → one tool page.
