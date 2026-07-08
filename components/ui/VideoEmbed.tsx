"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/**
 * Click-to-play YouTube embed. Shows the video's own thumbnail with a play
 * button first, so the ~1MB+ YouTube embed script only loads once someone
 * actually clicks — an unwatched video costs nothing on page load.
 */
export function VideoEmbed({
  videoId,
  title,
  rounded = true,
  className,
}: {
  videoId: string;
  title: string;
  rounded?: boolean;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden bg-ink-bg",
        rounded && "rounded-xl",
        className,
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          data-cursor="cta"
          className="group absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- third-party thumbnail, not an optimizable local asset */}
          <img
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            onError={(e) => {
              e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
            }}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/10" />
          <span
            className={cn(
              "absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2",
              "items-center justify-center rounded-full bg-paper/95 text-ink shadow-[0_12px_40px_-8px_rgba(0,0,0,0.5)]",
              "transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:scale-110",
            )}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
}
