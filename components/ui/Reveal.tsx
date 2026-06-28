"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_REVEAL, STAGGER } from "@/lib/motion";

/**
 * Scroll-reveal wrapper. Per the motion spec: opacity 0 + translateY(30px) ->
 * opacity 1 + translateY(0), 700ms, cubic-bezier(0.22, 1, 0.36, 1), no bounce.
 * Only transform + opacity animate (no layout repaints). Honors
 * prefers-reduced-motion (renders static, instant, no transform).
 */
export function Reveal({
  children,
  delay = 0,
  y = 30,
  as = "div",
  className,
  once = true,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span";
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, delay, ease: EASE_REVEAL },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Staggered container — direct <RevealItem> children appear in a wave
 * (80-120ms apart). Use for card grids / sibling lists.
 */
export function RevealGroup({
  children,
  className,
  stagger = STAGGER,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: "div" | "ul";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </MotionTag>
  );
}

/** Child of <RevealGroup>; inherits the parent's stagger timing. */
export function RevealItem({
  children,
  className,
  y = 30,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  y?: number;
  as?: "div" | "li";
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.7, ease: EASE_REVEAL },
    },
  };
  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
