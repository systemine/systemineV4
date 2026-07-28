import type { Metadata } from "next";
import Container from "@/components/Container";
import Shelf from "@/components/Shelf";
import EmptyState from "@/components/EmptyState";
import { getShelves } from "@/lib/products";

export const metadata: Metadata = {
  title: "Browse the Shelves",
  description:
    "Every Systemine product, organized like a well-loved bookshelf — by what you're going through, not by folder.",
};

export default function ShelvesPage() {
  const shelves = getShelves();
  const hasProducts = shelves.some((s) => s.products.length > 0);

  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          The library
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          Browse the Shelves
        </h1>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
          No categories named &ldquo;Category 1.&rdquo; Everything here is
          grouped the way it actually feels to need it — pull whatever
          shelf matches your week.
        </p>
      </header>

      <div className="mt-16 flex flex-col gap-20">
        {hasProducts ? (
          shelves
            .filter((shelf) => shelf.products.length > 0)
            .map((shelf) => <Shelf key={shelf.category} shelf={shelf} />)
        ) : (
          <EmptyState title="These shelves are freshly built and still empty.">
            <p>
              That&rsquo;s intentional — we&rsquo;d rather launch honest than
              launch full. The first products are on their way. Once a
              markdown file lands in{" "}
              <code className="rounded bg-paper px-1.5 py-0.5 text-xs">
                content/products
              </code>
              , it&rsquo;ll appear here, sorted onto its shelf, with nobody
              needing to touch any code.
            </p>
          </EmptyState>
        )}
      </div>
    </Container>
  );
}
