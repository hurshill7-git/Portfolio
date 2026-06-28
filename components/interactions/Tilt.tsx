"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * 3D tilt-toward-cursor for cards. Maps pointer position within the element to
 * rotateX/rotateY (clamped) and moves a specular highlight to the pointer.
 * Writes only CSS custom properties that feed a transform + radial-gradient, so
 * nothing triggers layout. mousemove is throttled to one rAF per frame.
 *
 * No-ops (renders a plain wrapper) under prefers-reduced-motion; on touch
 * devices mousemove never fires, so it stays a clean static card.
 */
export function Tilt({
  children,
  className,
  max = 12,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cx = e.clientX;
    const cy = e.clientY;
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = (cx - r.left) / r.width; // 0..1
      const py = (cy - r.top) / r.height; // 0..1
      const rotX = (0.5 - py) * max * 2;
      const rotY = (px - 0.5) * max * 2;
      el.style.setProperty("--rx", `${rotX.toFixed(2)}deg`);
      el.style.setProperty("--ry", `${rotY.toFixed(2)}deg`);
      el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    });
  };

  const handleLeave = () => {
    if (frame.current) {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
    }
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn("tilt", className)}
    >
      {children}
      <span aria-hidden="true" className="tilt-glow" />
    </div>
  );
}
