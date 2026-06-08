"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/cn";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change (render-time state sync, not an effect).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors duration-300",
        scrolled
          ? "border-b border-line bg-paper/80 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <nav className="container-x flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-lg tracking-tight text-ink"
          aria-label={`${site.name} — home`}
        >
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            const isActive =
              !("external" in item && item.external) &&
              pathname.startsWith(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  target={"external" in item && item.external ? "_blank" : undefined}
                  rel={
                    "external" in item && item.external
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className={cn(
                    "link-underline text-sm",
                    isActive ? "text-ink" : "text-muted hover:text-ink",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
          <li>
            <a
              href={`mailto:${site.email}`}
              className="rounded-full bg-ink px-5 py-2 text-sm text-paper transition-colors hover:bg-accent"
            >
              Get in touch
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span
              className={cn(
                "absolute left-0 top-0 h-px w-6 bg-ink transition-transform duration-300",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "absolute bottom-0 left-0 h-px w-6 bg-ink transition-transform duration-300",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="overflow-hidden border-b border-line bg-paper md:hidden"
          >
            <ul className="container-x flex flex-col gap-1 py-4">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    target={
                      "external" in item && item.external ? "_blank" : undefined
                    }
                    className="block py-3 font-display text-2xl text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="block py-3 font-display text-2xl text-accent"
                >
                  Get in touch
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
