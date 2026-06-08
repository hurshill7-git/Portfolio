import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const WORK_DIR = path.join(process.cwd(), "content", "work");

export type Metric = { label: string; value: string };

export type WorkFrontmatter = {
  title: string;
  summary: string;
  /** Short label for the project (cards, nav). */
  client?: string;
  role: string;
  team?: string;
  timeline: string;
  platform?: string;
  /** Disciplines / tags used for filtering. */
  tags: string[];
  /** Path under /public, e.g. /work/zsegment/cover.jpg */
  cover: string;
  /** Headline outcomes shown in the case-study hero + work card. */
  metrics?: Metric[];
  /** Featured studies appear on the home page; lower order = earlier. */
  featured?: boolean;
  order?: number;
  /** Optional one-line impact statement for the hero. */
  impact?: string;
  /** Set false to hide from listings while drafting. */
  published?: boolean;
};

export type Work = WorkFrontmatter & {
  slug: string;
  /** Raw MDX body (rendered with <MDXRemote> downstream). */
  content: string;
};

export type WorkMeta = Omit<Work, "content">;

function readWorkFiles(): string[] {
  if (!fs.existsSync(WORK_DIR)) return [];
  return fs.readdirSync(WORK_DIR).filter((f) => f.endsWith(".mdx"));
}

function parseFile(file: string): Work {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(WORK_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const fm = data as WorkFrontmatter;
  return {
    slug,
    content,
    ...fm,
    tags: fm.tags ?? [],
    order: fm.order ?? 999,
    published: fm.published ?? true,
  };
}

/** All published case studies, sorted by `order`. */
export function getAllWork(): Work[] {
  return readWorkFiles()
    .map(parseFile)
    .filter((w) => w.published)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

/** Lightweight metadata for listing pages (drops the MDX body). */
export function getAllWorkMeta(): WorkMeta[] {
  return getAllWork().map((w) => {
    const { content, ...meta } = w;
    void content;
    return meta;
  });
}

export function getFeaturedWork(): WorkMeta[] {
  return getAllWorkMeta().filter((w) => w.featured);
}

export function getWorkBySlug(slug: string): Work | null {
  const file = `${slug}.mdx`;
  const full = path.join(WORK_DIR, file);
  if (!fs.existsSync(full)) return null;
  return parseFile(file);
}

export function getWorkSlugs(): string[] {
  return readWorkFiles().map((f) => f.replace(/\.mdx$/, ""));
}

/** Unique, sorted discipline tags across all work (for filter UI). */
export function getAllTags(): string[] {
  const set = new Set<string>();
  getAllWorkMeta().forEach((w) => w.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

/** Previous/next case study for end-of-page navigation. */
export function getAdjacentWork(slug: string): {
  prev: WorkMeta | null;
  next: WorkMeta | null;
} {
  const all = getAllWorkMeta();
  const i = all.findIndex((w) => w.slug === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: i > 0 ? all[i - 1] : null,
    next: i < all.length - 1 ? all[i + 1] : null,
  };
}
