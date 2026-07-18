"use client";

import { useEffect, useState, type ComponentProps } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MediaFrame } from "@/components/ui/MediaFrame";

type MediaFrameProps = ComponentProps<typeof MediaFrame>;

/**
 * Wraps <MediaFrame> with a corner expand button that opens the full,
 * uncropped image in a lightbox. Kept separate from MediaFrame itself (a
 * plain server-friendly component used all over the site) so the many
 * non-interactive usages don't get pulled into a client bundle just because
 * a handful of case-study images want to be zoomable.
 */
export function ExpandableFrame(props: MediaFrameProps) {
  const [open, setOpen] = useState(false);
  const { src, alt } = props;

  return (
    <div className="relative">
      <MediaFrame {...props} />
      {src && (
        <>
          <button
            type="button"
            aria-label="Expand image"
            onClick={() => setOpen(true)}
            className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-ink-bg/70 text-paper-on-ink backdrop-blur-sm transition-opacity duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:hover:opacity-100 [@media(hover:hover)]:focus-visible:opacity-100"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
            </svg>
          </button>
          <Lightbox src={src} alt={alt} open={open} onClose={() => setOpen(false)} />
        </>
      )}
    </div>
  );
}

/** Full-screen, uncropped view of an expanded image. Portaled to escape any
 * transformed/overflow-hidden ancestor. */
function Lightbox({
  src,
  alt,
  open,
  onClose,
}: {
  src: string;
  alt: string;
  open: boolean;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink-bg/95 p-6 backdrop-blur-sm md:p-12"
        >
          <motion.img
            src={src}
            alt={alt}
            initial={{ scale: reduce ? 1 : 0.96 }}
            animate={{ scale: 1 }}
            exit={{ scale: reduce ? 1 : 0.96 }}
            transition={{ duration: reduce ? 0 : 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="h-auto max-h-full w-auto max-w-full rounded-lg object-contain shadow-2xl"
          />
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-ink-bg/70 text-paper-on-ink backdrop-blur-sm transition-colors hover:bg-ink-bg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
