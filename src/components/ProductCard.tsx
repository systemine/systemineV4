import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/content";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shelves/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-line/70 bg-paper transition-all duration-300 ease-gentle hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-alt">
        {product.cover ? (
          <Image
            src={product.cover}
            alt=""
            fill
            sizes="(min-width: 1024px) 320px, (min-width: 640px) 45vw, 90vw"
            className="object-cover transition-transform duration-500 ease-gentle group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-soft/50">
            <span className="font-display text-3xl">S.</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <span className="font-body text-xs uppercase tracking-wide text-moss">
          {product.categories.join(" · ")}
        </span>
        <h3 className="font-display text-lg leading-snug text-ink">
          {product.title}
        </h3>
        <p className="line-clamp-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-body text-sm font-medium text-ink">
            {product.price}
          </span>
          <span className="underline-grow font-body text-sm text-wood">
            Take a closer look
          </span>
        </div>
      </div>
    </Link>
  );
}
