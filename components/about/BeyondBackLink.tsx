"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Reads `?from=home|about` (set by `BeyondCarousel`'s card links) so the back
 * link returns to wherever the visitor actually came from. Isolated in its
 * own client component + Suspense boundary at the call site so the rest of
 * the category page can stay statically generated instead of the whole
 * route opting into dynamic rendering just for this one link.
 */
export function BeyondBackLink() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const backHref = from === "home" ? "/" : "/about";
  const backLabel = from === "home" ? "← Back to home" : "← Back to about";

  return (
    <Link href={backHref} className="label link-underline">
      {backLabel}
    </Link>
  );
}
