import { Container } from "@/components/ui/Container";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Tag } from "@/components/ui/Tag";
import type { Work } from "@/lib/work";

function MetaItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <dt className="label mb-1">{label}</dt>
      <dd className="text-sm text-ink">{value}</dd>
    </div>
  );
}

/** Top-of-page header for a case study: title, meta strip, cover, metrics. */
export function CaseHero({ work }: { work: Work }) {
  const [titleMain, titleSub] = work.title.split(" — ");

  return (
    <header>
      <Container className="pb-12 pt-16 md:pt-24">
        <div className="flex flex-wrap gap-2">
          {work.tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>

        <h1 className="mt-6 max-w-4xl font-display text-4xl text-ink">
          {titleMain}
          {titleSub && (
            <span className="mt-3 block text-2xl text-muted">{titleSub}</span>
          )}
        </h1>

        {work.impact && (
          <p className="mt-6 max-w-2xl text-lg text-ink-soft">{work.impact}</p>
        )}

        <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-line pt-8 md:grid-cols-4">
          <MetaItem label="Role" value={work.role} />
          <MetaItem label="Team" value={work.team} />
          <MetaItem label="Timeline" value={work.timeline} />
          <MetaItem label="Platform" value={work.platform} />
        </dl>

        {work.metrics && work.metrics.length > 0 && (
          <dl className="mt-8 grid grid-cols-2 gap-8 border-t border-line pt-8 md:grid-cols-3">
            {work.metrics.map((m) => (
              <div key={m.label}>
                <dt className="font-display text-4xl text-ink">{m.value}</dt>
                <dd className="mt-2 text-sm text-muted">{m.label}</dd>
              </div>
            ))}
          </dl>
        )}
      </Container>

      <Container>
        <MediaFrame
          src={work.cover || undefined}
          alt={`${work.title} — cover`}
          aspect="wide"
          priority
          parallax
          label={`${work.client ?? work.slug} — hero cover`}
          sizes="(min-width: 1216px) 1216px, 100vw"
        />
      </Container>
    </header>
  );
}
