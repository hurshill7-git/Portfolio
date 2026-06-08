import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/cn";

/** Eyebrow label + large display title, with optional aside link. */
export function SectionHeading({
  eyebrow,
  title,
  aside,
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  aside?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div>
        {eyebrow && <p className="label mb-3">{eyebrow}</p>}
        <h2 className="font-display text-3xl text-ink">{title}</h2>
      </div>
      {aside && <div className="text-sm text-muted md:text-right">{aside}</div>}
    </Reveal>
  );
}
