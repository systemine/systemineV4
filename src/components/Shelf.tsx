import ProductCard from "./ProductCard";
import type { Shelf as ShelfType } from "@/types/content";

export default function Shelf({ shelf }: { shelf: ShelfType }) {
  return (
    <section className="scroll-mt-28" id={slugify(shelf.category)}>
      <div className="mb-6 flex items-end justify-between border-b border-line pb-4">
        <h2 className="font-display text-2xl text-ink sm:text-[1.7rem]">
          {shelf.category}
        </h2>
        <span className="font-body text-xs text-ink-soft">
          {shelf.products.length} {shelf.products.length === 1 ? "item" : "items"}
        </span>
      </div>
            {shelf.products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shelf.products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      ) : (
        <div className="rounded-xl2 border border-line/70 bg-paper-alt px-8 py-12 text-center">
          <h3 className="font-display text-xl text-ink">
            This shelf is being stocked.
          </h3>
          <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-ink-soft">
            We&rsquo;re making things for this part of being human.
            Nothing here yet, but it&rsquo;s coming.
          </p>
        </div>
      )}
      {/* wood-grain shelf ledge */}
      <div
        aria-hidden="true"
        className="mt-6 h-2 rounded-full bg-gradient-to-r from-transparent via-wood/30 to-transparent"
      />
    </section>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
