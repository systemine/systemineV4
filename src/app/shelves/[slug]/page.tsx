import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import ProductGallery from "@/components/ProductGallery";
import ResourceList from "@/components/ResourceList";
import VideoEmbed from "@/components/VideoEmbed";
import PurchaseButton from "@/components/PurchaseButton";
import { getAllProductSlugs, getAllProducts, getProductBySlug } from "@/lib/products";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: product.title,
    description: product.description,
    openGraph: product.cover ? { images: [product.cover] } : undefined,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProductBySlug(params.slug);

  if (!product) notFound();

  const related = getAllProducts()
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.categories.some((category) => product.categories.includes(category))
    )
    .slice(0, 3);

  const hasVersions = product.versions && product.versions.length > 0;

  return (
    <Container className="py-16 sm:py-20">
      <Link
        href="/shelves"
        className="underline-grow font-body text-sm text-ink-soft transition-colors hover:text-ink"
      >
        &larr; Back to the shelves
      </Link>

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:items-start">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl2 bg-paper-alt lg:sticky lg:top-28">
          {product.cover ? (
            <Image
              src={product.cover}
              alt={product.title}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-ink-soft/50">
              <span className="font-display text-4xl">S.</span>
            </div>
          )}
        </div>

        <div>
          <span className="font-body text-xs uppercase tracking-wide text-moss">
            {product.categories.join(" · ")}
          </span>

          <h1 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
            {product.title}
          </h1>

          <p className="mt-4 font-body text-lg text-ink-soft">
            {product.description}
          </p>

          {product.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-body text-xs text-ink-soft"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {hasVersions ? (
            <div className="mt-8 border-y border-line py-7">
              <div>
                <h2 className="font-display text-2xl text-ink">
                  Choose your version
                </h2>

                <p className="mt-2 font-body text-sm text-ink-soft">
                  Both versions contain the complete core system. Premium adds
                  deeper visual insight and analytical views.
                </p>
              </div>

              <div className="mt-6 grid gap-4">
                {product.versions?.map((version) => (
                  <div
                    key={version.name}
                    className="rounded-xl2 border border-line bg-paper-alt p-5"
                  >
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="font-display text-xl text-ink">
                          {version.name}
                        </h3>

                        <div className="mt-2 flex flex-wrap items-baseline gap-2">
                          <span className="font-display text-2xl text-ink">
                            {version.price}
                          </span>

                          {version.priceIndia && (
                            <span className="font-body text-sm text-ink-soft">
                              · {version.priceIndia} in India
                            </span>
                          )}
                        </div>
                      </div>

                      <PurchaseButton
                        purchaseUrl={version.purchaseUrl}
                        purchaseUrlIndia={version.purchaseUrlIndia}
                        title={`${product.title} — ${version.name}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-8 flex flex-wrap items-center gap-5 border-y border-line py-6">
              <span className="font-display text-2xl text-ink">
                {product.price}
              </span>

              <PurchaseButton
                purchaseUrl={product.purchaseUrl}
                purchaseUrlIndia={product.purchaseUrlIndia}
                title={product.title}
              />
            </div>
          )}

          {product.contentHtml && (
            <div
              className="prose-paper mt-8 max-w-prose"
              dangerouslySetInnerHTML={{ __html: product.contentHtml }}
            />
          )}

          {product.video && (
            <div className="mt-8">
              <VideoEmbed
                url={product.video}
                title={`${product.title} — preview video`}
              />
            </div>
          )}

          {product.gallery.length > 0 && (
            <div className="mt-10">
              <ProductGallery
                images={product.gallery}
                title={product.title}
              />
            </div>
          )}

          {product.resources.length > 0 && (
            <div className="mt-10">
              <ResourceList resources={product.resources} />
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-24 border-t border-line pt-12">
          <h2 className="font-display text-2xl text-ink">
            More from {product.categories[0]}
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/shelves/${p.slug}`}
                className="underline-grow font-body text-sm text-wood"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}