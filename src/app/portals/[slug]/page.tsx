import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import VideoEmbed from "@/components/VideoEmbed";
import FaqList from "@/components/FaqList";
import ResourceList from "@/components/ResourceList";
import Changelog from "@/components/Changelog";
import SupportBlock from "@/components/SupportBlock";
import { getAllPortalSlugs, getPortalBySlug } from "@/lib/portals";

export function generateStaticParams() {
  return getAllPortalSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const portal = getPortalBySlug(params.slug);
  if (!portal) return {};
  return {
    title: portal.title,
    description: portal.welcomeMessage || `Download portal for ${portal.productTitle || portal.title}.`,
    // Portals are for people who've already purchased — keep them out
    // of search results rather than indexing a download page.
    robots: { index: false, follow: false },
  };
}

export default function PortalPage({ params }: { params: { slug: string } }) {
  const portal = getPortalBySlug(params.slug);
  if (!portal) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        {portal.productTitle && (
          <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
            {portal.productTitle}
          </p>
        )}
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          {portal.title}
        </h1>

        {portal.welcomeMessage && (
          <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
            {portal.welcomeMessage}
          </p>
        )}

        {portal.download && (
          <div className="mt-8">
            {portal.download.file ? (
              <a
                href={portal.download.file}
                download
                className="inline-block rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-paper transition-transform duration-300 ease-gentle hover:-translate-y-0.5 hover:bg-wood-deep"
              >
                {portal.download.label}
              </a>
            ) : portal.download.url ? (
              <a
                href={portal.download.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-paper transition-transform duration-300 ease-gentle hover:-translate-y-0.5 hover:bg-wood-deep"
              >
                {portal.download.label}
              </a>
            ) : null}
          </div>
        )}

        {portal.contentHtml && (
          <div
            className="prose-paper mt-10 max-w-prose"
            dangerouslySetInnerHTML={{ __html: portal.contentHtml }}
          />
        )}

        {portal.video && (
          <div className="mt-10">
            <VideoEmbed url={portal.video} title={`${portal.title} — video`} />
          </div>
        )}

        {portal.faq.length > 0 && (
          <div className="mt-12 border-t border-line pt-10">
            <FaqList items={portal.faq} />
          </div>
        )}

        {portal.resources.length > 0 && (
          <div className="mt-12 border-t border-line pt-10">
            <ResourceList resources={portal.resources} />
          </div>
        )}

        {portal.changelog.length > 0 && (
          <div className="mt-12 border-t border-line pt-10">
            <Changelog entries={portal.changelog} />
          </div>
        )}

        {portal.support && (
          <div className="mt-12 border-t border-line pt-10">
            <SupportBlock support={portal.support} />
          </div>
        )}
      </div>
    </Container>
  );
}
