import Link from "next/link";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Tag } from "@/components/ui/Tag";
import type { WorkMeta } from "@/lib/work";
import { cn } from "@/lib/cn";

/** Work-listing card. `size="lg"` is used for featured items on home. */
export function ProjectCard({
  work,
  size = "md",
  priority,
}: {
  work: WorkMeta;
  size?: "md" | "lg";
  priority?: boolean;
}) {
  return (
    <Link
      href={`/work/${work.slug}`}
      className="group block"
      aria-label={`View case study: ${work.title}`}
    >
      <MediaFrame
        src={work.cover || undefined}
        alt={work.title}
        aspect={size === "lg" ? "wide" : "video"}
        priority={priority}
        label={`${work.client ?? work.slug} — cover`}
        className="transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] group-hover:scale-[1.01] group-hover:shadow-[0_24px_60px_-32px_rgba(0,0,0,0.35)]"
      />
      <div className="mt-5 flex flex-col gap-3">
        <div className="flex items-center gap-3">
          {work.client && <p className="label">{work.client}</p>}
          <span className="text-line-strong">·</span>
          <p className="label">{work.timeline}</p>
        </div>
        <h3
          className={cn(
            "font-display text-ink transition-colors group-hover:text-accent",
            size === "lg" ? "text-3xl" : "text-2xl",
          )}
        >
          {work.title.split(" — ")[0]}
        </h3>
        <p
          className={cn(
            "max-w-2xl text-ink-soft",
            size === "lg" ? "text-lg" : "text-base",
          )}
        >
          {work.summary}
        </p>
        <div className="mt-1 flex flex-wrap gap-2">
          {work.tags.slice(0, 4).map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
      </div>
    </Link>
  );
}
