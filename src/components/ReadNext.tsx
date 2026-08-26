"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Article } from "@/types/content";

type ReadNextProps = {
  articles: Article[];
};

export default function ReadNext({ articles }: ReadNextProps) {
  const [startIndex, setStartIndex] = useState(0);

  if (articles.length === 0) return null;

  const visibleArticles = articles.slice(startIndex, startIndex + 3);
  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + 3 < articles.length;

  return (
    <section className="mt-16 border-t border-line pt-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="font-body text-xs uppercase tracking-wide text-ink-soft/70">
            Keep reading
          </p>
          <h2 className="mt-2 font-display text-3xl text-ink">
            Read Next
          </h2>
        </div>

        {articles.length > 3 && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                setStartIndex((current) => Math.max(0, current - 1))
              }
              disabled={!canGoBack}
              aria-label="Previous articles"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
            >
              &larr;
            </button>

            <button
              type="button"
              onClick={() =>
                setStartIndex((current) =>
                  Math.min(articles.length - 3, current + 1)
                )
              }
              disabled={!canGoForward}
              aria-label="Next articles"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
            >
              &rarr;
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        {visibleArticles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group overflow-hidden rounded-xl2 border border-line bg-paper-alt transition-transform duration-200 hover:-translate-y-1"
          >
            {article.cover && (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={article.cover}
                  alt=""
                  fill
                  sizes="(min-width: 640px) 33vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            )}

            <div className="p-4">
              <p className="font-body text-xs text-ink-soft/70">
                {article.date}
              </p>

              <h3 className="mt-2 font-display text-xl text-ink">
                {article.title}
              </h3>

              {article.excerpt && (
                <p className="mt-2 line-clamp-3 font-body text-sm text-ink-soft">
                  {article.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}