"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from "motion/react";

/**
 * Scroll-linked parallax for a `fill` image inside an `overflow-hidden` frame
 * (e.g. MediaFrame). The image layer is scaled up just enough to hide its
 * edges, then drifts vertically as the frame travels through the viewport, so
 * it reads as a deeper plane than the page. Scroll progress is run through a
 * light spring for a fluid, "dynamic" feel rather than a rigid 1:1 scrub.
 *
 * Animates transform only (no layout). Under prefers-reduced-motion it renders
 * a plain, static image. On touch the effect still works (scroll-driven), but
 * `strength` is intentionally subtle.
 */
export function ParallaxImage({
  src,
  alt,
  sizes,
  priority,
  /** Peak drift in each direction, as a % of frame height. */
  strength = 9,
}: {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  strength?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  const y = useTransform(smooth, [0, 1], [`-${strength}%`, `${strength}%`]);

  // Scale up so the ±strength drift never exposes the frame edges, with margin.
  const scale = 1 + (strength * 2.4) / 100;

  if (reduce) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    );
  }

  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div
        className="absolute inset-0"
        style={{ y, scale, willChange: "transform" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </motion.div>
    </div>
  );
}
