"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  type Variants,
} from "motion/react";
import { site } from "@/lib/site";
import { EASE_OUT_EXPO } from "@/lib/motion";

// 3D scene is client-only and kept off the critical path.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const line: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: 0.15 + i * 0.12, ease: EASE_OUT_EXPO },
  }),
};

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress across the hero; spring-smoothed for a fluid drift.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  // Backdrop sinks slower than the page (deep plane); foreground lifts faster.
  const bgY = useTransform(smooth, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(smooth, [0, 1], [1, 1.12]);
  const fgY = useTransform(smooth, [0, 1], ["0%", "-12%"]);
  const fgOpacity = useTransform(smooth, [0, 0.85], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink-bg text-paper-on-ink"
    >
      {/* Immersive backdrop */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
      >
        <HeroScene />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 30%, transparent 0%, var(--ink-bg) 72%)",
        }}
      />

      <motion.div
        className="container-x relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 md:min-h-[92vh] md:pb-24"
        style={reduce ? undefined : { y: fgY, opacity: fgOpacity }}
      >
        <motion.p
          className="label mb-6 text-muted-on-ink"
          custom={0}
          variants={line}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
          {site.role} · {site.location}
        </motion.p>

        <h1 className="font-display text-5xl text-paper-on-ink">
          {["I design the experience,", "then I build it."].map(
            (l, i) => (
              <motion.span
                key={l}
                className="block"
                custom={i}
                variants={line}
                initial={reduce ? "show" : "hidden"}
                animate="show"
              >
                {l}
              </motion.span>
            ),
          )}
        </h1>

        <motion.div
          className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
          custom={4}
          variants={line}
          initial={reduce ? "show" : "hidden"}
          animate="show"
        >
          <p className="max-w-md text-lg text-muted-on-ink">{site.tagline}</p>
          <div className="flex items-center gap-4">
            <Link
              href="/work"
              data-cursor="cta"
              className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              View selected work
            </Link>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="cta"
              className="link-underline text-sm text-paper-on-ink"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
