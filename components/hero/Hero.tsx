"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
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

  return (
    <section className="relative overflow-hidden bg-ink-bg text-paper-on-ink">
      {/* Immersive backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-90">
        <HeroScene />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 30%, transparent 0%, var(--ink-bg) 72%)",
        }}
      />

      <div className="container-x relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 md:min-h-[92vh] md:pb-24">
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
          {["Designing clear,", "humane products", "people trust."].map(
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
              className="rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              View selected work
            </Link>
            <a
              href={`mailto:${site.email}`}
              className="link-underline text-sm text-paper-on-ink"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
