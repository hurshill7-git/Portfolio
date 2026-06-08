import Link from "next/link";
import { nav, site } from "@/lib/site";

const socialLinks = [
  { label: "LinkedIn", href: site.socials.linkedin },
  { label: "Behance", href: site.socials.behance },
  { label: "Email", href: `mailto:${site.email}` },
];

export function Footer() {
  return (
    <footer className="bg-ink-bg text-paper-on-ink">
      <div className="container-x py-16 md:py-24">
        <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="label mb-5 text-muted-on-ink">Let&apos;s work together</p>
            <a
              href={`mailto:${site.email}`}
              className="font-display text-4xl leading-[0.95] text-paper-on-ink transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="link-underline text-sm text-muted-on-ink hover:text-paper-on-ink"
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-line-on-ink pt-8 text-sm text-muted-on-ink md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. {site.role}, based in{" "}
            {site.location}.
          </p>
          <nav className="flex gap-6">
            <Link href="/" className="hover:text-paper-on-ink">
              Home
            </Link>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-paper-on-ink"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
