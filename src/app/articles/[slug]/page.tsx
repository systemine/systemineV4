import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import VideoEmbed from "@/components/VideoEmbed";
import { getAllArticleSlugs, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return getAllArticleSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: article.cover ? { images: [article.cover] } : undefined,
  };
}

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

export default function ArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  return (
    <article className="py-16 sm:py-20">
      <Container className="max-w-3xl">
        <Link
          href="/articles"
          className="underline-grow font-body text-sm text-ink-soft transition-colors hover:text-ink"
        >
          &larr; Back to articles
        </Link>

        <header className="mt-8">
          <p className="font-body text-xs uppercase tracking-wide text-ink-soft/70">
            {formatDate(article.date)} &middot; {article.author}
          </p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            {article.title}
          </h1>
          {article.excerpt && (
            <p className="mt-5 font-body text-lg text-ink-soft">
              {article.excerpt}
            </p>
          )}
        </header>

        {article.cover && (
          <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-xl2 bg-paper-alt">
            <Image
              src={article.cover}
              alt=""
              fill
              sizes="(min-width: 1024px) 768px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        )}

        {article.video && (
          <div className="mt-10">
            <VideoEmbed url={article.video} title={article.title} />
          </div>
        )}

        <div
          className="prose-paper mt-10 max-w-prose"
          dangerouslySetInnerHTML={{ __html: article.contentHtml }}
        />

        {article.tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-line pt-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-line px-3 py-1 font-body text-xs text-ink-soft"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Container>
    </article>
  );
}
