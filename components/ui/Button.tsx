import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-colors duration-200 disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-accent px-6 py-3",
  outline:
    "border border-line-strong text-ink hover:border-ink hover:bg-ink hover:text-paper px-6 py-3",
  ghost: "text-ink hover:text-accent px-2 py-1",
};

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

/** Link-or-button. Pass `href` for a link, otherwise a real <button>. */
export function Button({
  href,
  external,
  variant = "primary",
  className,
  children,
  ...rest
}: CommonProps & {
  href?: string;
  external?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const classes = cn(base, variants[variant], className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
