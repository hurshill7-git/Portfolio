import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PrintButton } from "@/components/ui/PrintButton";
import { Tag } from "@/components/ui/Tag";
import { site } from "@/lib/site";
import {
  resumeSummary,
  experience,
  education,
  skillGroups,
  languages,
} from "@/lib/resume";

export const metadata: Metadata = {
  title: "Résumé",
  description: `Résumé of ${site.name}, ${site.role} based in ${site.location}.`,
};

const contactLinks = [
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  { label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
  { label: "LinkedIn", value: "in/harshill7", href: site.socials.linkedin },
  { label: "Behance", value: "behance.net/hurshill", href: site.socials.behance },
];

export default function ResumePage() {
  return (
    <Container className="py-16 md:py-24">
      {/* Header */}
      <Reveal>
        <div className="flex flex-col gap-8 border-b border-line pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="label mb-3">Résumé</p>
            <h1 className="font-display text-4xl text-ink">{site.name}</h1>
            <p className="mt-2 text-lg text-muted">
              {site.role} · {site.location}
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-3">
            <PrintButton>Download PDF</PrintButton>
            <Button href="/work" variant="outline">
              View work
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Contact row */}
      <Reveal>
        <dl className="grid grid-cols-2 gap-6 border-b border-line py-8 md:grid-cols-4">
          {contactLinks.map((c) => (
            <div key={c.label}>
              <dt className="label mb-1">{c.label}</dt>
              <dd>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="link-underline break-words text-sm text-ink"
                >
                  {c.value}
                </a>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      {/* Summary */}
      <section className="border-b border-line py-10">
        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h2 className="label">Summary</h2>
          </Reveal>
          <Reveal className="md:col-span-9">
            <p className="max-w-3xl text-lg leading-relaxed text-ink-soft">
              {resumeSummary}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Experience */}
      <section className="border-b border-line py-10">
        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h2 className="label">Experience</h2>
          </Reveal>
          <div className="md:col-span-9">
            {experience.map((e, i) => (
              <Reveal key={e.org + e.period} delay={i * 0.04}>
                <div className="border-t border-line py-7 first:border-t-0 first:pt-0">
                  <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                    <h3 className="font-display text-xl text-ink">
                      {e.role} · <span className="text-muted">{e.org}</span>
                    </h3>
                    <p className="text-sm text-muted">
                      {e.period}
                      {e.location ? ` · ${e.location}` : ""}
                    </p>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {e.bullets.map((b) => (
                      <li
                        key={b}
                        className="relative pl-5 text-ink-soft before:absolute before:left-0 before:top-3 before:h-1 before:w-1 before:rounded-full before:bg-accent"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="border-b border-line py-10">
        <div className="grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h2 className="label">Skills</h2>
          </Reveal>
          <div className="grid gap-8 md:col-span-9 md:grid-cols-2">
            {skillGroups.map((s, i) => (
              <Reveal key={s.group} delay={i * 0.04}>
                <h3 className="mb-3 text-sm font-medium text-ink">{s.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {s.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education + Languages */}
      <section className="py-10">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal className="md:col-span-3">
            <h2 className="label">Education</h2>
          </Reveal>
          <div className="md:col-span-6">
            {education.map((ed) => (
              <div
                key={ed.qualification}
                className="border-t border-line py-5 first:border-t-0 first:pt-0"
              >
                <h3 className="font-display text-lg text-ink">
                  {ed.qualification}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {ed.org} · {ed.period}
                </p>
              </div>
            ))}
          </div>
          <div className="md:col-span-3">
            <h2 className="label mb-5">Languages</h2>
            <ul className="space-y-3">
              {languages.map((l) => (
                <li key={l.name} className="flex items-baseline justify-between">
                  <span className="text-ink">{l.name}</span>
                  <span className="text-sm text-muted">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </Container>
  );
}
