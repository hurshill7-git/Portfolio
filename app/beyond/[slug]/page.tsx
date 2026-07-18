import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { BeyondBackLink } from "@/components/about/BeyondBackLink";
import { cn } from "@/lib/cn";
import { beyond, getBeyondBySlug } from "@/lib/about";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return beyond.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getBeyondBySlug(slug);
  if (!category) return {};
  return {
    title: category.title,
    description: `${category.title} work by ${site.name}.`,
  };
}

export default async function BeyondCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getBeyondBySlug(slug);
  if (!category) notFound();

  return (
    <Container className="py-16 md:py-24">
      <Reveal>
        <Suspense fallback={<span className="label link-underline">← Back to about</span>}>
          <BeyondBackLink />
        </Suspense>
        <h1 className="mt-4 font-display text-4xl text-ink">{category.title}</h1>
      </Reveal>

      {category.images.length > 0 ? (
        <RevealGroup
          className={cn(
            "mt-12 md:mt-16",
            category.layout === "grid"
              ? "grid grid-cols-2 gap-4 sm:grid-cols-3"
              : "flex flex-col gap-6",
          )}
        >
          {category.images.map((img) => (
            <RevealItem key={img.src}>
              <Image
                src={img.src}
                alt={`${category.title} work sample`}
                width={img.width}
                height={img.height}
                sizes={
                  category.layout === "grid"
                    ? "(min-width: 640px) 33vw, 50vw"
                    : "(min-width: 1280px) 1216px, 100vw"
                }
                quality={100}
                className="block h-auto w-full"
              />
            </RevealItem>
          ))}
        </RevealGroup>
      ) : (
        <Reveal delay={0.05} className="mt-12 md:mt-16">
          <MediaFrame
            alt={category.title}
            aspect="wide"
            label={`${category.title}: add visuals`}
          />
        </Reveal>
      )}
    </Container>
  );
}
