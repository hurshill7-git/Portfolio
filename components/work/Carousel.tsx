"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { cn } from "@/lib/cn";

const AUTO_ADVANCE_MS = 4500;

/**
 * Auto-advancing image carousel for an <Artifact> backed by more than one
 * screenshot. Pauses auto-advance under prefers-reduced-motion; arrows and
 * the progress line still work either way. The timer is keyed off `index`
 * (not a plain interval) so manual navigation restarts the countdown, which
 * keeps the progress-line animation duration truthful.
 */
export function Carousel({
  images,
}: {
  images: { src: string; alt: string }[];
}) {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || images.length <= 1) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % images.length),
      AUTO_ADVANCE_MS,
    );
    return () => clearTimeout(id);
  }, [reduce, images.length, index]);

  if (images.length === 0) return null;

  const go = (delta: number) =>
    setIndex((i) => (i + delta + images.length) % images.length);

  return (
    <div className="relative mt-4 w-full overflow-hidden rounded-lg border border-line">
      <MediaFrame src={images[index].src} alt={images[index].alt} aspect="video" />
      {images.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => go(-1)}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md transition-colors hover:bg-paper"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => go(1)}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-ink shadow-md transition-colors hover:bg-paper"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div className="absolute inset-x-3 bottom-3 flex gap-1.5">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                aria-label={`Go to image ${i + 1}`}
                aria-current={i === index}
                onClick={() => setIndex(i)}
                className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-paper/40"
              >
                <span
                  className={cn(
                    "absolute inset-y-0 left-0 rounded-full bg-paper",
                    i < index && "w-full",
                    i > index && "w-0",
                  )}
                  style={
                    i === index
                      ? {
                          width: reduce ? "100%" : "0%",
                          animation: reduce
                            ? undefined
                            : `carousel-progress ${AUTO_ADVANCE_MS}ms linear forwards`,
                        }
                      : undefined
                  }
                  // Remount on every slide change so the fill animation restarts from 0.
                  key={`${img.src}-${index}`}
                />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
