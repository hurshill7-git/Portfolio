import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Tilt } from "@/components/interactions/Tilt";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center gap-10 py-16 text-center md:flex-row md:gap-16 md:text-left">
      <Reveal>
        <Tilt className="rounded-2xl" max={8}>
          <Image
            src="/profile-styled.png"
            alt={`Portrait of ${site.name}`}
            width={220}
            height={260}
            className="h-56 w-48 rounded-2xl object-cover md:h-64 md:w-56"
          />
        </Tilt>
      </Reveal>
      <Reveal delay={0.08}>
        <p className="label mb-4">404</p>
        <h1 className="font-display text-4xl text-ink md:text-5xl">
          Wrong crop.
        </h1>
        <p className="mt-4 max-w-md text-lg text-ink-soft">
          This frame didn&apos;t make the final edit. The link may be broken,
          or the page moved.
        </p>
        <div className="mt-8 flex gap-4">
          <Button href="/">Home</Button>
          <Button href="/work" variant="outline">
            View work
          </Button>
        </div>
      </Reveal>
    </Container>
  );
}
