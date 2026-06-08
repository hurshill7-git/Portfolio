import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Tag } from "@/components/ui/Tag";
import { bio, experience, skills, beyond } from "@/lib/about";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — ${site.role} based in ${site.location}.`,
};

export default function AboutPage() {
  return (
    <>
      {/* Intro */}
      <Container className="py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <Reveal>
              <p className="label mb-4">About</p>
              <h1 className="font-display text-4xl text-ink">
                I design experiences that respect people&apos;s time.
              </h1>
            </Reveal>
            <div className="mt-8 space-y-5">
              {bio.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className="text-lg leading-relaxed text-ink-soft">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.2}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button href={site.resume} external>
                  Download résumé
                </Button>
                <Button href={`mailto:${site.email}`} variant="outline">
                  Get in touch
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal delay={0.1}>
              <MediaFrame
                alt={`Portrait of ${site.name}`}
                aspect="portrait"
                label="Portrait — /public/portrait.jpg"
              />
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Experience */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <h2 className="label">Experience</h2>
            </Reveal>
            <ul className="md:col-span-9">
              {experience.map((e, i) => (
                <Reveal as="li" key={e.org + e.period} delay={i * 0.05}>
                  <div className="grid grid-cols-1 gap-2 border-t border-line py-7 md:grid-cols-12 md:gap-6">
                    <p className="text-sm text-muted md:col-span-3">
                      {e.period}
                    </p>
                    <div className="md:col-span-9">
                      <h3 className="font-display text-xl text-ink">
                        {e.role} ·{" "}
                        <span className="text-muted">{e.org}</span>
                      </h3>
                      <p className="mt-2 max-w-2xl text-ink-soft">{e.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Skills */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <Reveal className="md:col-span-3">
              <h2 className="label">Capabilities</h2>
            </Reveal>
            <div className="grid gap-10 md:col-span-9 md:grid-cols-3">
              {skills.map((s, i) => (
                <Reveal key={s.group} delay={i * 0.06}>
                  <h3 className="mb-4 font-display text-xl text-ink">
                    {s.group}
                  </h3>
                  <ul className="space-y-2">
                    {s.items.map((item) => (
                      <li key={item} className="text-ink-soft">
                        {item}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Beyond product */}
      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <Reveal>
            <p className="label mb-3">Beyond product</p>
            <h2 className="max-w-2xl font-display text-3xl text-ink">
              The visual craft I bring to everything else.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {beyond.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.05}>
                <MediaFrame
                  alt={b.title}
                  aspect="portrait"
                  label={`${b.title} — add visuals`}
                />
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-ink">{b.title}</p>
                  <Tag>{b.kind}</Tag>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
