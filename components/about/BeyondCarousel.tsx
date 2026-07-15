import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Tag } from "@/components/ui/Tag";
import { Tilt } from "@/components/interactions/Tilt";
import type { beyond as BeyondList } from "@/lib/about";

type BeyondItem = (typeof BeyondList)[number];

/**
 * "Beyond product" — auto-scrolling marquee of visual-craft categories.
 * Same continuous-loop technique as `Testimonials`/`WorkCarousel` (two
 * duplicate rows, -50% loop, pause on hover, static fallback under reduced
 * motion), but each card uses the same `Tilt` + shadow-on-hover treatment as
 * the case-study `ProjectCard`s rather than the testimonials' lift/scale.
 * Clicking a card opens its full gallery at `/beyond/<slug>`.
 */
export function BeyondCarousel({ items }: { items: BeyondItem[] }) {
  if (items.length === 0) return null;

  return (
    <Reveal className="mt-12">
      <div className="marquee py-4">
        <div className="marquee-track">
          <Row items={items} />
          <Row items={items} ariaHidden />
        </div>
      </div>
    </Reveal>
  );
}

function Row({ items, ariaHidden }: { items: BeyondItem[]; ariaHidden?: boolean }) {
  return (
    <ul className="flex" aria-hidden={ariaHidden}>
      {items.map((b, i) => (
        <li key={`${b.title}-${i}`} className="mr-6 w-[60vw] shrink-0 sm:w-[16rem]">
          <BeyondCard item={b} />
        </li>
      ))}
    </ul>
  );
}

function BeyondCard({ item }: { item: BeyondItem }) {
  const cover = item.images[0]?.src;

  return (
    <Link
      href={`/beyond/${item.slug}`}
      className="group block"
      aria-label={`View ${item.title} work`}
      data-cursor="view"
    >
      <Tilt className="rounded-xl">
        <MediaFrame
          src={cover}
          alt={item.title}
          aspect="portrait"
          label={`${item.title}: add visuals`}
          className="transition-[box-shadow] duration-500 ease-[var(--ease-out-expo)] group-hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)]"
        />
      </Tilt>
      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-ink transition-colors group-hover:text-accent">
          {item.title}
        </p>
        <Tag>{item.kind}</Tag>
      </div>
    </Link>
  );
}
