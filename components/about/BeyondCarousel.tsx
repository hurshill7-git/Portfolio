"use client";

import { useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Tag } from "@/components/ui/Tag";
import { Tilt } from "@/components/interactions/Tilt";
import type { beyond as BeyondList } from "@/lib/about";

type BeyondItem = (typeof BeyondList)[number];

const AUTO_SCROLL_PX_PER_SEC = 36;
const RESUME_DELAY_MS = 2200;

/**
 * "Beyond product" — continuously auto-scrolling strip of visual-craft
 * categories (two duplicated copies of the list, wrapping seamlessly at the
 * halfway point — same loop concept as `Testimonials`' CSS marquee, but
 * driven by real `scrollLeft` via rAF instead of a CSS transform, so it can
 * share state with manual controls). Desktop gets prev/next arrows; touch
 * devices get native drag/swipe. Either interaction pauses the drift and
 * resumes it a couple of seconds after the user lets go. Clicking a card
 * opens its full gallery at `/beyond/<slug>`.
 */
export function BeyondCarousel({
  items,
  from,
}: {
  items: BeyondItem[];
  /** Where each card should return to via the detail page's back link. */
  from: "home" | "about";
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  // `scrollLeft` only accepts integer pixels, so each frame's sub-pixel delta
  // must accumulate in a separate float ref rather than being read back from
  // `el.scrollLeft` (which would round the fraction away every frame).
  const posRef = useRef(0);

  useEffect(() => {
    if (reduce || items.length === 0) return;
    const el = trackRef.current;
    if (!el) return;
    posRef.current = el.scrollLeft;

    const tick = (ts: number) => {
      if (!pausedRef.current) {
        const halfWidth = el.scrollWidth / 2;
        const last = lastTsRef.current ?? ts;
        const dt = Math.min(ts - last, 100) / 1000;
        posRef.current += AUTO_SCROLL_PX_PER_SEC * dt;
        if (posRef.current >= halfWidth) posRef.current -= halfWidth;
        el.scrollLeft = posRef.current;
      }
      lastTsRef.current = ts;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduce, items.length]);

  const pause = useCallback(() => {
    pausedRef.current = true;
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  }, []);

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      const el = trackRef.current;
      if (el) posRef.current = el.scrollLeft;
      lastTsRef.current = null;
      pausedRef.current = false;
    }, RESUME_DELAY_MS);
  }, []);

  if (items.length === 0) return null;

  const scrollByCard = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    pause();
    const card = el.querySelector("li");
    const amount = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft >= halfWidth) el.scrollLeft -= halfWidth;
    if (dir === -1 && el.scrollLeft - amount < 0) el.scrollLeft += halfWidth;
    el.scrollBy({ left: dir * amount, behavior: reduce ? "auto" : "smooth" });
    scheduleResume();
  };

  return (
    <Reveal className="mt-12">
      <div className="relative" onMouseEnter={pause} onMouseLeave={scheduleResume}>
        <ul
          ref={trackRef}
          onTouchStart={pause}
          onTouchEnd={scheduleResume}
          className="flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [mask-image:linear-gradient(to_right,transparent,#000_6%,#000_94%,transparent)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((b) => (
            <li key={`a-${b.slug}`} className="w-[60vw] shrink-0 sm:w-[16rem]">
              <BeyondCard item={b} from={from} />
            </li>
          ))}
          {items.map((b) => (
            <li key={`b-${b.slug}`} className="w-[60vw] shrink-0 sm:w-[16rem]" aria-hidden>
              <BeyondCard item={b} from={from} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          aria-label="Previous category"
          onClick={() => scrollByCard(-1)}
          className="absolute left-2 top-[35%] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper-raised text-ink shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)] transition-colors duration-200 hover:border-accent md:left-3 md:flex"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next category"
          onClick={() => scrollByCard(1)}
          className="absolute right-2 top-[35%] hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-strong bg-paper-raised text-ink shadow-[0_16px_40px_-16px_rgba(0,0,0,0.45)] transition-colors duration-200 hover:border-accent md:right-3 md:flex"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </Reveal>
  );
}

function BeyondCard({ item, from }: { item: BeyondItem; from: "home" | "about" }) {
  const cover = item.images[0]?.src;

  return (
    <Link
      href={`/beyond/${item.slug}?from=${from}`}
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
