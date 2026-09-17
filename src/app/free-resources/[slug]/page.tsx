import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import FreeResourceForm from "@/components/FreeResourceForm";
import {
  getAllFreeResourceSlugs,
  getFreeResourceBySlug,
} from "@/lib/free-resources";

export function generateStaticParams() {
  return getAllFreeResourceSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const resource = getFreeResourceBySlug(params.slug);

  if (!resource) return {};

  return {
    title: resource.title,
    description: resource.description,
  };
}

export default function FreeResourcePage({
  params,
}: {
  params: { slug: string };
}) {
  const resource = getFreeResourceBySlug(params.slug);

  if (!resource) notFound();

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          {resource.category}
        </p>

        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          {resource.title}
        </h1>

        {resource.description && (
          <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
            {resource.description}
          </p>
        )}

                <div className="mt-10 rounded-xl2 border border-line/70 bg-paper-alt p-7 sm:p-9">
          <p className="font-display text-2xl text-ink">
            Get this resource free.
          </p>

          <p className="mt-3 font-body leading-relaxed text-ink-soft">
            Enter your email and you&rsquo;ll get immediate access. No waiting
            for an email to arrive.
          </p>

          <FreeResourceForm slug={resource.slug} />
        </div>
      </div>
    </Container>
  );
}