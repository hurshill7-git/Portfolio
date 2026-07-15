"use client";

import { useEffect } from "react";
import { site } from "@/lib/site";

/** One-time styled console.log for anyone poking around devtools. */
export function ConsoleGreeting() {
  useEffect(() => {
    console.log(
      "%cLooking under the hood?\n%cI like this kind of curiosity, let's talk: %c" +
        site.email,
      "font: bold 14px monospace; color: #d9442a;",
      "font: 12px monospace; color: inherit;",
      "font: 12px monospace; color: #d9442a; text-decoration: underline;",
    );
  }, []);

  return null;
}
