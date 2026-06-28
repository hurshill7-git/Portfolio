"use client";

import { cn } from "@/lib/cn";

/**
 * Triggers the browser's print dialog ("Save as PDF"), which exports the
 * current page using the print stylesheet in globals.css. Styled to match the
 * primary Button. Hidden from the printed output via the `no-print` class.
 */
export function PrintButton({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      data-cursor="cta"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors duration-200 hover:bg-accent",
        className,
      )}
    >
      {children}
    </button>
  );
}
