"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

/**
 * Hardware-accelerated custom cursor: a small dot that tracks the pointer and a
 * larger ring that trails it. Over CTAs (elements marked data-cursor="cta") the
 * ring expands, recolors, and magnetically pulls toward the element center
 * (max 15px). Renders nothing on touch devices or when the user prefers reduced
 * motion, so the native cursor and static layout are preserved.
 *
 * Only transform (via Motion x/y/scale) and paint-only color changes are used.
 */
const MAGNET_PULL = 15;
const CTA_SELECTOR = '[data-cursor="cta"]';

export function CustomCursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  // Raw pointer target; a single spring smooths the motion for a fluid dot.
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 500, damping: 30, mass: 0.3 });
  const dotY = useSpring(y, { stiffness: 500, damping: 30, mass: 0.3 });

  const hoveredEl = useRef<Element | null>(null);

  useEffect(() => {
    // Desktop-only, motion-allowed experience.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduce || !finePointer) return;

    // One-time capability gate: needs `window`, so it can't run at render time.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: MouseEvent) => {
      let tx = e.clientX;
      let ty = e.clientY;

      // Magnetic pull toward the hovered CTA's center (clamped to 15px).
      const el = hoveredEl.current;
      if (el) {
        const r = el.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dx = cx - e.clientX;
        const dy = cy - e.clientY;
        const dist = Math.hypot(dx, dy) || 1;
        const pull = Math.min(MAGNET_PULL, dist);
        tx = e.clientX + (dx / dist) * pull;
        ty = e.clientY + (dy / dist) * pull;
      }
      x.set(tx);
      y.set(ty);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.(CTA_SELECTOR);
      if (el) {
        hoveredEl.current = el;
        setHovering(true);
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element)?.closest?.(CTA_SELECTOR);
      if (el && el === hoveredEl.current) {
        hoveredEl.current = null;
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className={cn("cursor-dot", hovering && "is-hover")}
      style={{ x: dotX, y: dotY }}
      animate={{ scale: hovering ? 2.6 : 1 }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    />
  );
}
