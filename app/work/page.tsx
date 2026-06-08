import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { WorkExplorer } from "@/components/work/WorkExplorer";
import { getAllTags, getAllWorkMeta } from "@/lib/work";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected product, brand, and experience design case studies by Harshil Malakar.",
};

export default function WorkPage() {
  const work = getAllWorkMeta();
  const tags = getAllTags();

  return (
    <Container className="py-20 md:py-28">
      <header className="mb-12 max-w-3xl">
        <p className="label mb-4">Work</p>
        <h1 className="font-display text-4xl text-ink">
          Case studies in product, brand & experience.
        </h1>
        <p className="mt-6 text-lg text-ink-soft">
          A mix of deep product work and the visual craft around it. Each study
          covers the problem, my role, the process, and what shipped.
        </p>
      </header>

      <WorkExplorer work={work} tags={tags} />
    </Container>
  );
}
