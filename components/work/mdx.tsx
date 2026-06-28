import type { MDXComponents } from "mdx/types";
import { MediaFrame } from "@/components/ui/MediaFrame";
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
    <div className="my-8 rounded-xl border border-line bg-paper-raised p-6 md:p-8">
      <div className="mb-4 flex items-baseline gap-3">
        {n && <span className="font-mono text-xs text-accent">{n}</span>}
        <h3 className="font-display text-xl text-ink">{title}</h3>
      </div>
      <div className="decision-body">{children}</div>
    </div>
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
  BeforeAfter,
  Callout,
  InPlainTerms,
  Decision,
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
