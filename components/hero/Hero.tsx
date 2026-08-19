"use client";

import { useRef, useState } from "react";
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
const ParticleSphere = dynamic(() => import("./ParticleSphere"), {
  ssr: false,
});

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
  const [sceneReady, setSceneReady] = useState(false);

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
      className="relative -mt-20 overflow-hidden bg-ink-bg text-paper-on-ink sm:-mt-[5.5rem]"
    >
      {/* Immersive backdrop */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-90"
        style={reduce ? undefined : { y: bgY, scale: bgScale }}
      >
        {/* Instant CSS placeholder — the 3D scene's JS chunk (three.js +
            fiber + drei) only starts fetching after hydration, so this
            fills the gap immediately rather than leaving blank space.
            Cross-fades out once the real WebGL scene reports it's ready. */}
        <div
          className="absolute inset-0 flex items-center justify-center transition-opacity duration-700 ease-out"
          style={{ opacity: sceneReady ? 0 : 1 }}
          aria-hidden="true"
        >
          <div
            className="h-[42vmin] w-[42vmin] rounded-full blur-3xl motion-safe:animate-pulse"
            style={{
              background:
                "radial-gradient(circle at 35% 30%, var(--accent), transparent 70%)",
            }}
          />
        </div>
        <ParticleSphere
          onReady={() => setSceneReady(true)}
          sphereColor="#FC5100"
          particlesCount={4120}
          particleScale={1}
          scale={4}
          speed={20}
          cursorRadiusUI={270}
          cursorStrengthUI={2}
          clickForce={10}
        />
      </motion.div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 70% 30%, transparent 0%, var(--ink-bg) 72%)",
        }}
      />

      {/* pointer-events-none so empty space here doesn't block the particle
          sphere behind it — the two CTAs opt back in with pointer-events-auto. */}
      <motion.div
        className="container-x relative flex min-h-[88vh] flex-col justify-end pb-16 pt-32 pointer-events-none md:min-h-[92vh] md:pb-24"
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
              className="pointer-events-auto rounded-full bg-paper px-6 py-3 text-sm font-medium text-ink transition-colors hover:bg-accent hover:text-paper"
            >
              View selected work
            </Link>
            <a
              href={site.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="cta"
              className="pointer-events-auto link-underline text-sm text-paper-on-ink"
            >
              Get in touch
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
