import type { MDXComponents } from "mdx/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { VideoEmbed } from "@/components/ui/VideoEmbed";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/* ---- Case-study building blocks (usable inside MDX) ---------------- */

/** A titled narrative section. Eyebrow numbers the chapters. */
export function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-14 md:py-20">
      {(eyebrow || title) && (
        <div className="mb-8 md:mb-10">
          {eyebrow && <p className="label mb-3">{eyebrow}</p>}
          {title && (
            <h2 className="font-display text-2xl text-ink md:text-3xl">
              {title}
            </h2>
          )}
        </div>
      )}
      <div className="prose-case">{children}</div>
    </section>
  );
}

/** Full-width annotated figure. */
export function Figure({
  src,
  alt,
  caption,
  aspect = "video",
  bleed,
}: {
  src?: string;
  alt: string;
  caption?: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  bleed?: boolean;
}) {
  return (
    <figure className={cn("my-10", bleed && "md:-mx-[6vw]")}>
      <MediaFrame
        src={src}
        alt={alt}
        aspect={aspect}
        parallax
        sizes="(min-width: 768px) 90vw, 100vw"
      />
      {caption && (
        <figcaption className="mt-3 text-sm text-muted">{caption}</figcaption>
      )}
    </figure>
  );
}

/** Responsive grid of figures. */
export function Gallery({
  cols = 2,
  children,
}: {
  cols?: 2 | 3;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "my-10 grid gap-4",
        cols === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {children}
    </div>
  );
}

/** Numbered list of shipped artifacts, each with an optional scaled screenshot
 * directly beneath its text (rather than a separate gallery row). Items with
 * no `image` render as text only, e.g. work still in progress. */
export function Artifacts({ children }: { children: React.ReactNode }) {
  return <div className="my-8 flex flex-col gap-8">{children}</div>;
}

export function Artifact({
  n,
  image,
  imageAlt,
  children,
}: {
  n: string;
  image?: string;
  imageAlt?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 md:gap-5">
      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-strong bg-paper font-mono text-xs text-accent">
        {n}
      </span>
      <div className="artifact-body min-w-0 flex-1">
        {children}
        {image && (
          <div className="mt-4 max-w-xl overflow-hidden rounded-lg border border-line md:max-w-2xl">
            <MediaFrame src={image} alt={imageAlt ?? "Artifact screenshot"} aspect="video" />
          </div>
        )}
      </div>
    </div>
  );
}

/** Before / after comparison pair. */
export function BeforeAfter({
  before,
  after,
  beforeAlt = "Before",
  afterAlt = "After",
}: {
  before?: string;
  after?: string;
  beforeAlt?: string;
  afterAlt?: string;
}) {
  return (
    <div className="my-10 grid gap-4 sm:grid-cols-2">
      {[
        { label: "Before", src: before, alt: beforeAlt },
        { label: "After", src: after, alt: afterAlt },
      ].map((c) => (
        <figure key={c.label}>
          <MediaFrame src={c.src} alt={c.alt} aspect="video" />
          <figcaption className="label mt-3">{c.label}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/**
 * Plain-English decoder. Sits near the top of a study (and at jargon moments)
 * to explain, in normal-human language, what the product actually is or does.
 */
export function InPlainTerms({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-8 rounded-xl border border-line bg-paper-raised p-6">
      <p className="label mb-2 flex items-center gap-2 text-accent">
        <span aria-hidden="true">✲</span> In plain terms
      </p>
      <div className="plain-body text-lg leading-relaxed text-ink-soft">
        {children}
      </div>
    </aside>
  );
}

/** Highlighted aside / key insight. */
export function Callout({ children }: { children: React.ReactNode }) {
  return (
    <aside className="my-10 border-l-2 border-accent bg-paper-raised px-6 py-5 font-display text-xl leading-snug text-ink">
      {children}
    </aside>
  );
}

/**
 * A "key decision" card. Author the body with bold leads inside MDX, e.g.
 * **What** … **Why** … **Tradeoff** … **Result** …
 */
export function Decision({
  n,
  title,
  children,
}: {
  n?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative my-8 overflow-hidden rounded-xl border border-line bg-paper-raised p-6 transition-colors duration-300 ease-[var(--ease-out-expo)] hover:border-accent/50 md:p-8">
      {n && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-6 right-2 select-none font-display text-[7rem] leading-none text-accent opacity-[0.05] transition-opacity duration-300 ease-[var(--ease-out-expo)] group-hover:opacity-[0.1] md:text-[9rem]"
        >
          {n}
        </span>
      )}
      <div className="relative mb-5 flex items-center gap-4">
        {n && (
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-paper font-mono text-sm text-accent">
            {n}
          </span>
        )}
        <h3 className="font-display text-xl text-ink md:text-2xl">{title}</h3>
      </div>
      <div className="decision-body relative">{children}</div>
    </div>
  );
}

/**
 * A numbered process / workflow timeline. Authored with child <Step>
 * elements in MDX — a single connecting rail runs behind every badge.
 */
export function ProcessSteps({ children }: { children: React.ReactNode }) {
  return (
    <RevealGroup
      as="div"
      stagger={0.08}
      className="relative my-10 flex flex-col before:absolute before:bottom-5 before:left-5 before:top-5 before:w-px before:bg-line before:content-['']"
    >
      {children}
    </RevealGroup>
  );
}

/**
 * One step of a <ProcessSteps> timeline. `n` is a two-digit label, e.g. "01".
 * Takes an optional second screenshot (`image2`) for steps backed by more
 * than one; MDX's JSX-attribute parser doesn't reliably pass array literals,
 * so this uses two plain string props instead of `image: string[]`.
 */
export function Step({
  n,
  title,
  image,
  imageAlt,
  image2,
  image2Alt,
  children,
}: {
  n: string;
  title: string;
  image?: string;
  imageAlt?: string;
  image2?: string;
  image2Alt?: string;
  children: React.ReactNode;
}) {
  const images = [
    image && { src: image, alt: imageAlt ?? title },
    image2 && { src: image2, alt: image2Alt ?? title },
  ].filter((v): v is { src: string; alt: string } => Boolean(v));

  return (
    <RevealItem as="div" className="group relative flex gap-5 pb-8 last:pb-0">
      <span
        className={cn(
          "relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          "border border-line-strong bg-paper font-mono text-sm text-accent",
          "transition-colors duration-300 ease-[var(--ease-out-expo)]",
          "group-hover:border-accent group-hover:bg-accent group-hover:text-paper",
        )}
      >
        {n}
      </span>
      <div className="min-w-0 flex-1 pt-1.5 transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1.5">
        <h4 className="font-display text-lg text-ink md:text-xl">{title}</h4>
        <p className="mt-1.5 text-base leading-relaxed text-ink-soft md:text-lg">
          {children}
        </p>
        {images.length > 0 && (
          <div className="mt-4 flex max-w-xl flex-col gap-4 md:max-w-2xl">
            {images.map((img) => (
              <div
                key={img.src}
                className="overflow-hidden rounded-lg border border-line"
              >
                <MediaFrame src={img.src} alt={img.alt} aspect="video" />
              </div>
            ))}
          </div>
        )}
      </div>
    </RevealItem>
  );
}

/**
 * Row of headline metrics. Authored with child <Metric> elements in MDX —
 * children compose reliably, unlike array-expression props.
 */
export function Metrics({ children }: { children: React.ReactNode }) {
  return (
    <dl className="my-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
      {children}
    </dl>
  );
}

export function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-paper-raised p-6">
      <dt className="font-display text-4xl text-ink">{value}</dt>
      <dd className="mt-2 text-sm text-muted">{label}</dd>
    </div>
  );
}

/* ---- Base element styling for raw markdown ------------------------- */

const components: MDXComponents = {
  Section,
  Figure,
  Gallery,
  VideoEmbed,
  Artifacts,
  Artifact,
  BeforeAfter,
  Callout,
  InPlainTerms,
  Decision,
  ProcessSteps,
  Step,
  Metrics,
  Metric,
  h2: (props) => (
    <h2 className="mt-12 font-display text-2xl text-ink md:text-3xl" {...props} />
  ),
  h3: (props) => (
    <h3 className="mt-8 text-lg font-medium text-ink" {...props} />
  ),
  p: (props) => (
    <p className="my-5 text-lg leading-relaxed text-ink-soft" {...props} />
  ),
  ul: (props) => (
    <ul className="my-5 list-disc space-y-2 pl-5 text-lg text-ink-soft" {...props} />
  ),
  ol: (props) => (
    <ol
      className="my-5 list-decimal space-y-2 pl-5 text-lg text-ink-soft"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  a: (props) => (
    <a
      className="link-underline text-ink underline-offset-2"
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-8 border-l-2 border-accent pl-5 font-display text-xl text-ink"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-line" />,
};

export const mdxComponents = components;
