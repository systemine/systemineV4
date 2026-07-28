import Link from "next/link";
import Container from "@/components/Container";
import Sprig from "@/components/Sprig";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <Sprig className="mb-8 h-6 w-32 text-line" />
      <p className="font-display text-6xl text-ink">Hm.</p>
      <h1 className="mt-4 font-display text-3xl text-ink sm:text-4xl">
        This shelf must have gotten rearranged.
      </h1>
      <p className="mt-4 max-w-md font-body text-base leading-relaxed text-ink-soft">
        Whatever you were looking for isn&rsquo;t on this page — maybe it
        moved, maybe it never existed, maybe a link got typed wrong. Either
        way, you haven&rsquo;t broken anything.
      </p>
      <div className="mt-9 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-paper transition-transform duration-300 ease-gentle hover:-translate-y-0.5 hover:bg-wood-deep"
        >
          Back to the front porch
        </Link>
        <Link
          href="/shelves"
          className="underline-grow font-body text-sm text-ink-soft transition-colors hover:text-ink"
        >
          Or go browse the shelves
        </Link>
      </div>
    </Container>
  );
}
