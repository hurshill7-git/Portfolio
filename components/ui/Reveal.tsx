"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

/**
 * Scroll-reveal wrapper. Fades + rises into view once.
 * Honors prefers-reduced-motion (renders static, no transform).
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
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
      transition: {
        duration: 0.7,
        delay,
        ease: EASE_OUT_EXPO,
      },
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

/** Staggered container — children using <Reveal> appear in sequence. */
export function RevealGroup({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger }}
    >
      {children}
    </motion.div>
  );
}
