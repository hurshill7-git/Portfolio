import { cn } from "@/lib/cn";

/** Small pill used for disciplines / tech tags. */
export function Tag({
  children,
  active,
  onInk,
  className,
}: {
  children: React.ReactNode;
  active?: boolean;
  onInk?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 font-mono text-2xs uppercase tracking-wider",
        onInk
          ? "border-line-on-ink text-muted-on-ink"
          : "border-line-strong text-muted",
        active && "border-ink bg-ink text-paper",
        className,
      )}
    >
      {children}
    </span>
  );
}
