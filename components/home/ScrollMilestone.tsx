"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const STORAGE_KEY = "seen-scroll-milestone";
const PARTICLE_COUNT = 10;
const COLORS = ["#d9442a", "#f0d8cf", "#16150f"];

/**
 * Fires once per session when the visitor scrolls the whole homepage and the
 * final CTA band enters view — a small reward (toast + confetti burst) for
 * making it to the end, nudging toward the contact CTA already there.
 */
export function ScrollMilestone() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      // sessionStorage unavailable (private mode) — treat as not yet seen.
    }
    if (alreadySeen) return;

    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShow(true);
        try {
          sessionStorage.setItem(STORAGE_KEY, "1");
        } catch {
          // Best-effort — worst case it can fire again this session.
        }
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(() => setShow(false), 3200);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden="true" />
      <AnimatePresence>
        {show && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-none fixed inset-x-0 bottom-6 z-50 flex justify-center px-4"
          >
            <span className="relative rounded-full border border-line-strong bg-paper-raised px-5 py-2.5 font-mono text-2xs uppercase tracking-wider text-ink shadow-[0_16px_40px_-16px_rgba(0,0,0,0.35)]">
              You made it to the end, let&apos;s talk ↗
              {!reduce && <Confetti />}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Confetti() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-visible"
    >
      {Array.from({ length: PARTICLE_COUNT }, (_, i) => {
        const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
        const dist = 40 + ((i * 37) % 30);
        const x = Math.cos(angle) * dist;
        const y = Math.sin(angle) * dist - 12;
        return (
          <motion.span
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x, y, scale: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full"
            style={{ background: COLORS[i % COLORS.length] }}
          />
        );
      })}
    </span>
  );
}
