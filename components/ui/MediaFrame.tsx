import Image from "next/image";
import { cn } from "@/lib/cn";

type Aspect = "video" | "square" | "portrait" | "wide" | "auto";

const aspectClass: Record<Aspect, string> = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[16/7]",
  auto: "",
};

/**
 * A media container that shows a real optimized image when `src` is given,
 * and an intentional labeled placeholder when it is not — so the layout reads
 * as finished while real assets are still being dropped in.
 */
export function MediaFrame({
  src,
  alt,
  aspect = "video",
  rounded = true,
  priority,
  sizes = "(min-width: 1024px) 60vw, 100vw",
  label,
  className,
  onInk,
}: {
  src?: string;
  alt: string;
  aspect?: Aspect;
  rounded?: boolean;
  priority?: boolean;
  sizes?: string;
  /** Placeholder hint, e.g. the expected file path. */
  label?: string;
  className?: string;
  onInk?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden",
        rounded && "rounded-xl",
        aspectClass[aspect],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <Placeholder label={label ?? alt} onInk={onInk} />
      )}
    </div>
  );
}

function Placeholder({ label, onInk }: { label: string; onInk?: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center",
        onInk ? "bg-ink-bg-raised" : "bg-paper-raised",
      )}
      style={{
        backgroundImage: onInk
          ? "repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 1px, transparent 1px 14px)"
          : "repeating-linear-gradient(45deg, rgba(0,0,0,0.035) 0 1px, transparent 1px 14px)",
      }}
    >
      <span
        className={cn(
          "px-4 text-center font-mono text-2xs uppercase tracking-widest",
          onInk ? "text-muted-on-ink" : "text-muted",
        )}
      >
        {label}
      </span>
    </div>
  );
}
