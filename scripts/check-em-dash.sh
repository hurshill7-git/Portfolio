#!/usr/bin/env bash
# Blocks `git push` if an em-dash (U+2014) shows up in any rendered page.
# Builds the site and scans the actual prerendered HTML output rather than
# source files, so it doesn't false-positive on the title's "Hook: Subtitle"
# separator or on em-dashes inside code comments — only text that would
# really reach a visitor's browser counts.
set -uo pipefail
cd "$(dirname "$0")/.."

if ! command -v npm >/dev/null 2>&1; then
  for candidate in "/c/Program Files/nodejs" "/c/Program Files (x86)/nodejs"; do
    if [ -x "$candidate/npm" ] || [ -f "$candidate/npm.cmd" ]; then
      export PATH="$candidate:$PATH"
      break
    fi
  done
fi

BUILD_LOG="$(mktemp)"
if ! npm run build > "$BUILD_LOG" 2>&1; then
  echo "em-dash check: build failed, cannot verify rendered output." >&2
  tail -n 40 "$BUILD_LOG" >&2
  exit 2
fi

# -F (fixed-string) + bash ANSI-C byte quoting works on both BSD and GNU
# grep, unlike -P (Perl regex), which BSD/macOS grep doesn't support.
HITS="$(grep -rlF $'\xe2\x80\x94' .next/server/app --include="*.html" 2>/dev/null || true)"
if [ -n "$HITS" ]; then
  echo "em-dash check failed: found U+2014 in rendered pages:" >&2
  echo "$HITS" >&2
  echo "Fix these before pushing." >&2
  exit 2
fi

echo "em-dash check passed: no em-dashes in any rendered page." >&2
exit 0
