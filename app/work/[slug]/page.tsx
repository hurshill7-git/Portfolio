import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Container } from "@/components/ui/Container";
import { CaseHero } from "@/components/work/CaseHero";
import { mdxComponents } from "@/components/work/mdx";
import {
  getAdjacentWork,
  getWorkBySlug,
  getWorkSlugs,
} from "@/lib/work";

export function generateStaticParams() {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return {};
  return {
    title: work.title.split(" — ")[0],
    description: work.summary,
    openGraph: {
      title: work.title,
      description: work.summary,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  const { prev, next } = getAdjacentWork(slug);

  return (
    <article>
      <CaseHero work={work} />

      <Container className="py-4">
        <div className="max-w-3xl">
          <p className="border-l-2 border-accent py-2 pl-5 font-display text-2xl leading-snug text-ink">
            {work.summary}
          </p>
          <MDXRemote source={work.content} components={mdxComponents} />
        </div>
      </Container>

      {/* Prev / next */}
      <nav className="border-t border-line">
        <Container className="grid grid-cols-2">
          {prev ? (
            <Link
              href={`/work/${prev.slug}`}
              className="group py-10 pr-4"
            >
              <span className="label">← Previous</span>
              <span className="mt-2 block font-display text-xl text-ink group-hover:text-accent">
                {prev.title.split(" — ")[0]}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/work/${next.slug}`}
              className="group border-l border-line py-10 pl-8 text-right"
            >
              <span className="label">Next →</span>
              <span className="mt-2 block font-display text-xl text-ink group-hover:text-accent">
                {next.title.split(" — ")[0]}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </Container>
      </nav>
    </article>
  );
}
