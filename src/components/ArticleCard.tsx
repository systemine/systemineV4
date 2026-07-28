import Image from "next/image";
import Link from "next/link";
import type { Article } from "@/types/content";

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (Number.isNaN(date.getTime())) return dateStr;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col gap-4 sm:flex-row sm:items-center"
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl2 bg-paper-alt sm:w-48">
        {article.cover ? (
          <Image
            src={article.cover}
            alt=""
            fill
            sizes="192px"
            className="object-cover transition-transform duration-500 ease-gentle group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-ink-soft/50">
            <span className="font-display text-2xl">S.</span>
          </div>
        )}
      </div>
      <div className="flex-1">
        <p className="font-body text-xs uppercase tracking-wide text-ink-soft/70">
          {formatDate(article.date)} &middot; {article.author}
        </p>
        <h3 className="mt-1 font-display text-xl text-ink underline-grow decoration-line">
          {article.title}
        </h3>
        <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-ink-soft">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
