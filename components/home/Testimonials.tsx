import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { featuredTestimonials, type Testimonial } from "@/lib/testimonials";

/**
 * "What people say" — peer testimonials in a continuously-scrolling marquee.
 * The track auto-scrolls (CSS, transform-only), pauses when hovered so a quote
 * can be read, and each card lifts/scales with an accent sheen on hover. Edges
 * fade via a CSS mask. The marquee has vertical padding so the hover lift and
 * shadow aren't clipped by its horizontal overflow. Under prefers-reduced-motion
 * the track stops and becomes horizontally scrollable.
 */
export function Testimonials() {
  if (featuredTestimonials.length === 0) return null;

  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <SectionHeading
          eyebrow="What people say"
          title="Praise I didn't ask for"
        />
      </Container>

      <Reveal className="mt-10 md:mt-14">
        {/* py gives the hover lift/scale/shadow room inside the clip box */}
        <div className="marquee py-12">
          {/* Two identical copies make a seamless -50% loop. */}
          <div className="marquee-track">
            <Row items={featuredTestimonials} />
            <Row items={featuredTestimonials} ariaHidden />
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Row({
  items,
  ariaHidden,
}: {
  items: Testimonial[];
  ariaHidden?: boolean;
}) {
  return (
    <ul className="flex" aria-hidden={ariaHidden}>
      {items.map((t, i) => (
        <li key={`${t.name}-${i}`} className="mr-6 shrink-0">
          <QuoteCard testimonial={t} />
        </li>
      ))}
    </ul>
  );
}

function QuoteCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure className="group relative flex h-full w-[78vw] flex-col justify-between overflow-hidden rounded-xl border border-line bg-paper-raised p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-expo)] will-change-transform hover:-translate-y-2 hover:scale-[1.03] hover:border-accent hover:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.55)] sm:w-[24rem] md:p-8">
      {/* Animated oversized quote glyph (cropped by the card's overflow) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 right-3 select-none font-display text-[10rem] leading-none text-accent opacity-[0.06] transition-[transform,opacity] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:scale-110 group-hover:opacity-20"
      >
        &rdquo;
      </span>
      {/* Accent sheen that blooms from the top on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--accent) 12%, transparent), transparent 60%)",
        }}
      />

      <blockquote className="relative font-display text-xl leading-snug text-ink transition-colors duration-300 md:text-2xl">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="relative mt-6">
        <p className="font-medium text-ink transition-colors duration-300 group-hover:text-accent">
          {t.name}
        </p>
        <p className="mt-1 text-sm text-muted">{t.role}</p>
      </figcaption>
    </figure>
  );
}
