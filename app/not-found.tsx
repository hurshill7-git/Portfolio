import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="label mb-4">404</p>
      <h1 className="font-display text-4xl text-ink">
        This page wandered off.
      </h1>
      <p className="mt-4 max-w-md text-ink-soft">
        The link may be broken or the page moved. Let&apos;s get you back to the
        work.
      </p>
      <div className="mt-8 flex gap-4">
        <Button href="/">Home</Button>
        <Button href="/work" variant="outline">
          View work
        </Button>
      </div>
    </Container>
  );
}
