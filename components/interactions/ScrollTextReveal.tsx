"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
  type MotionValue,
} from "motion/react";

/**
 * Scroll-linked word reveal: each word resolves from dim + blurred to sharp +
 * full-ink as the section scrolls through the viewport (scrubbed to scroll
 * position). Animates only opacity + filter (no layout). Under
 * prefers-reduced-motion it renders plain, fully-visible static text.
 */
export function ScrollTextReveal({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "start 0.3"],
  });

  if (reduce) {
    return <p className={className}>{text}</p>;
  }

  return (
    <motion.p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = (i / words.length) * 0.9;
        const end = start + (0.9 / words.length) * 1.8;
        return (
          <Word key={`${word}-${i}`} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </motion.p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blurPx = useTransform(progress, range, [10, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.span
      style={{
        opacity,
        filter,
        display: "inline-block",
        marginRight: "0.25em",
        paddingBlock: "0.04em",
        willChange: "opacity, filter",
      }}
    >
      {children}
    </motion.span>
  );
}
