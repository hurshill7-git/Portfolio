"use client";

import { cn } from "@/lib/cn";

/**
 * Light/dark toggle. Flips the `.dark` class on <html> and persists the choice.
 * Icon visibility is CSS-driven (block / dark:hidden), so there is no
 * hydration mismatch and no need to read theme state in React.
 */
export function ThemeToggle({ className }: { className?: string }) {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // localStorage unavailable (private mode) — toggle still works for the session.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:border-ink",
        className,
      )}
    >
      {/* Sun — shown in light mode */}
      <svg
        className="block h-4 w-4 dark:hidden"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
      </svg>
      {/* Moon — shown in dark mode */}
      <svg
        className="hidden h-4 w-4 dark:block"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
