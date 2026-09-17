import Image from "next/image";
import Link from "next/link";
import type { FreeResource } from "@/types/content";

export default function FreeResourceCard({
  resource,
}: {
  resource: FreeResource;
}) {
  return (
    <Link
      href={`/free-resources/${resource.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl2 border border-line/70 bg-paper transition-all duration-300 ease-gentle hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper-alt">
        {resource.cover ? (
          <Image
            src={resource.cover}
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
          {resource.category}
        </span>

        <h3 className="font-display text-lg leading-snug text-ink">
          {resource.title}
        </h3>

        <p className="line-clamp-2 flex-1 font-body text-sm leading-relaxed text-ink-soft">
          {resource.description}
        </p>

        <div className="mt-2 flex items-center justify-between">
          <span className="font-body text-sm font-medium text-moss">
            Free
          </span>

          <span className="underline-grow font-body text-sm text-wood">
            Explore →
          </span>
        </div>
      </div>
    </Link>
  );
}