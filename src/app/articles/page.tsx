import type { Metadata } from "next";
import Container from "@/components/Container";
import ArticleCard from "@/components/ArticleCard";
import EmptyState from "@/components/EmptyState";
import { getAllArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Notes on the messier, harder-to-name parts of being a person — from the people making Systemine.",
};

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <Container className="py-16 sm:py-20">
      <header className="max-w-2xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          Reading corner
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          Articles
        </h1>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
          Slower thoughts on the stuff that&rsquo;s hard to put into a
          template — written when we have something worth saying, not on a
          schedule.
        </p>
      </header>

      <div className="mt-16">
        {articles.length > 0 ? (
          <div className="flex flex-col gap-14">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <EmptyState title="Nothing here yet. That's on purpose.">
            <p>
              We didn&rsquo;t want to launch with filler just to fill a
              grid. The first real piece is being written. Once a markdown
              file is added to{" "}
              <code className="rounded bg-paper px-1.5 py-0.5 text-xs">
                content/articles
              </code>
              , it&rsquo;ll show up here on its own.
            </p>
          </EmptyState>
        )}
      </div>
    </Container>
  );
}
