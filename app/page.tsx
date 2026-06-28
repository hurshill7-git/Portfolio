import Link from "next/link";
import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/ui/Container";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { ScrollTextReveal } from "@/components/interactions/ScrollTextReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/work/ProjectCard";
import { Testimonials } from "@/components/home/Testimonials";
import { Tag } from "@/components/ui/Tag";
import { Button } from "@/components/ui/Button";
import { getFeaturedWork } from "@/lib/work";
import { site, toolkit } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedWork();

  return (
    <>
      <Hero />

      {/* Selected work */}
      <Container as="section" className="py-20 md:py-28">
        <SectionHeading
          eyebrow="Selected work"
          title="Work I'd show you over coffee"
          aside={
            <Link href="/work" className="link-underline">
              View all work ↗
            </Link>
          }
        />
        <RevealGroup className="mt-12 grid gap-x-8 gap-y-16 md:mt-16 md:grid-cols-2">
          {featured.map((w, i) => (
            <RevealItem key={w.slug}>
              <ProjectCard work={w} priority={i === 0} />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>

      {/* About teaser */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <p className="label">About</p>
            </Reveal>
            <div className="md:col-span-9">
              <ScrollTextReveal
                className="font-display text-2xl leading-snug text-ink md:text-3xl"
                text={`I'm ${site.shortName}, an experience designer at 314e Corp. Most days I'm making dense health-tech software make sense to the people who live in it. The rest of the time I'm deep in brand, motion, or a 3D rabbit hole. Happiest when a hard problem gets simple enough that it just clicks.`}
              />
              <Reveal delay={0.1}>
                <div className="mt-8">
                  <Button href="/about" variant="outline">
                    More about me
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* What people say */}
      <Testimonials />

      {/* Toolkit */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <p className="label">What I build with</p>
            </Reveal>
            <Reveal className="md:col-span-9">
              <ul className="flex flex-wrap gap-3">
                {toolkit.map((t) => (
                  <li key={t}>
                    <Tag className="px-4 py-2 text-xs">{t}</Tag>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Contact band */}
      <section className="border-t border-line py-24 md:py-32">
        <Container className="text-center">
          <Reveal>
            <p className="label mb-6">Available for new work</p>
            <h2 className="font-display text-4xl text-ink">
              Got something complex?
              <br />
              Let&apos;s make it simple.
            </h2>
            <div className="mt-10 flex justify-center">
              <Button href={`mailto:${site.email}`}>{site.email}</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
