import { createElement } from "react";
import { cn } from "@/lib/cn";

/** Centered content column with consistent horizontal gutters. */
export function Container({
  as = "div",
  className,
  children,
}: {
  as?: React.ElementType;
  className?: string;
  children: React.ReactNode;
}) {
  return createElement(
    as,
    { className: cn("container-x", className) },
    children,
  );
}
