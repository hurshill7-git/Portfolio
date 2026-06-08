"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Tag } from "@/components/ui/Tag";
import type { WorkMeta } from "@/lib/work";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function WorkExplorer({
  work,
  tags,
}: {
  work: WorkMeta[];
  tags: string[];
}) {
  const [active, setActive] = useState<string>("All");
  const filters = ["All", ...tags];

  const filtered = useMemo(
    () =>
      active === "All"
        ? work
        : work.filter((w) => w.tags.includes(active)),
    [active, work],
  );

  return (
    <>
      <div className="mb-12 flex flex-wrap gap-2 border-t border-line pt-8">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            aria-pressed={active === f}
            className="rounded-full"
          >
            <Tag active={active === f}>{f}</Tag>
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((w, i) => (
            <motion.div
              key={w.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
            >
              <ProjectCard work={w} priority={i < 2} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center text-muted">
          No work tagged “{active}” yet.
        </p>
      )}
    </>
  );
}
