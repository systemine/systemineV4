import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Sprig from "@/components/Sprig";
import ProductCard from "@/components/ProductCard";
import ArticleCard from "@/components/ArticleCard";
import HomeCarousel from "@/components/HomeCarousel";
import EmptyState from "@/components/EmptyState";
import NewsletterForm from "@/components/NewsletterForm";
import { getFeaturedProducts } from "@/lib/products";
import { getAllArticles } from "@/lib/articles";
import { CATEGORY_ORDER } from "@/lib/constants";

const CATEGORY_NOTES: Record<string, string> = {
  "Life Transitions": "Moving out, moving on, starting over.",
  "Mental & Emotional": "For the days your brain won't cooperate.",
  "Creative Survival": "Keep making things without burning out.",
  "Body & Health": "Gentle structure, not another rulebook.",
  "Hyper-Specific Human Experiences": "The oddly specific stuff nobody else made.",
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const articles = getAllArticles();

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Container className="py-20 sm:py-28 lg:py-32">
          <div className="mx-auto max-w-2xl animate-driftIn text-center">
            <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
              Digital systems for real life
            </p>
            <h1 className="mt-5 font-display text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-[3.4rem]">
              You&rsquo;re not behind. You&rsquo;re just carrying too much without a shelf to put it on.
            </h1>
            <p className="mx-auto mt-6 max-w-lg font-body text-lg leading-relaxed text-ink-soft">
              Systemine makes quiet, thoughtfully built templates and tools for
              the parts of adulthood nobody teaches you: the paperwork, the
              spirals, the half-finished projects, the days that need more
              structure than motivation.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/shelves"
                className="rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-paper transition-transform duration-300 ease-gentle hover:-translate-y-0.5 hover:bg-wood-deep"
              >
                Browse the Shelves
              </Link>
              <Link
                href="/about"
                className="underline-grow font-body text-sm text-ink-soft transition-colors hover:text-ink"
              >
                Read how this started
              </Link>
            </div>
          </div>

          <div className="relative mx-auto mt-16 w-full max-w-4xl overflow-hidden rounded-xl2 shadow-lift">
            <Image
              src="/images/brand/hero-cover.png"
              alt="A cozy, plant-filled desk corner — the world of Systemine"
              width={1983}
              height={793}
              priority
              className="h-auto w-full object-cover"
              sizes="(min-width: 1024px) 896px, 100vw"
            />
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* Featured Products */}
      <section className="py-6">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                From the shelves
              </h2>
              <p className="mt-2 font-body text-sm text-ink-soft">
                A few things worth pulling down and looking at closely.
              </p>
            </div>
            <Link
              href="/shelves"
              className="underline-grow hidden font-body text-sm text-wood sm:inline"
            >
              See everything
            </Link>
          </div>

          {featured.length > 0 ? (
           <HomeCarousel
          items={featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
           ))}
        />
       ) : (
            <EmptyState title="The shelves are being built.">
              <p>
                Nothing&rsquo;s stocked here yet — the first products are still
                being written, tested and made properly good before they go
                anywhere near this page. Add a markdown file to{" "}
                <code className="rounded bg-paper px-1.5 py-0.5 text-xs">
                  content/products
                </code>{" "}
                and it&rsquo;ll show up here automatically.
              </p>
            </EmptyState>
          )}
        </Container>
      </section>

      <SectionDivider />

      {/* Latest Articles */}
      <section className="py-6">
        <Container>
          <div className="mb-10 flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl text-ink sm:text-3xl">
                Recent thinking
              </h2>
              <p className="mt-2 font-body text-sm text-ink-soft">
                Notes on the messier parts of being a person.
              </p>
            </div>
            <Link
              href="/articles"
              className="underline-grow hidden font-body text-sm text-wood sm:inline"
            >
              Read more
            </Link>
          </div>

          {articles.length > 0 ? (
            <HomeCarousel
           items={articles.map((article) => (
             <ArticleCard key={article.slug} article={article} />
         ))}
        />
       ) : (
            <EmptyState title="Nothing written yet — on purpose.">
              <p>
                We&rsquo;d rather publish nothing than publish filler. The
                first articles are coming. Drop a markdown file into{" "}
                <code className="rounded bg-paper px-1.5 py-0.5 text-xs">
                  content/articles
                </code>{" "}
                whenever it&rsquo;s ready, and it&rsquo;ll appear here without
                touching a line of code.
              </p>
            </EmptyState>
          )}
        </Container>
      </section>

      <SectionDivider />

      {/* Browse Categories */}
      <section className="py-6">
        <Container>
          <h2 className="font-display text-2xl text-ink sm:text-3xl">
            Wander the shelves by feeling
          </h2>
          <p className="mt-2 max-w-lg font-body text-sm text-ink-soft">
            Everything&rsquo;s organized by what you&rsquo;re going through, not
            what folder it lives in.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORY_ORDER.map((category) => (
              <Link
                key={category}
                href={`/shelves#${category
                  .toLowerCase()
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}`}
                className="group flex flex-col justify-between rounded-xl2 border border-line/70 bg-paper-alt p-6 transition-all duration-300 ease-gentle hover:-translate-y-1 hover:border-wood/60 hover:shadow-soft"
              >
                <h3 className="font-display text-lg text-ink">{category}</h3>
                <p className="mt-2 font-body text-sm text-ink-soft">
                  {CATEGORY_NOTES[category]}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 font-body text-sm text-wood opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Look here &rarr;
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* About Preview */}
      <section className="py-6">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="rounded-xl2 bg-paper-alt p-10">
            <p className="font-display text-2xl leading-snug text-ink">
              &ldquo;I kept wishing someone had already made these things.
              So I started making them.&rdquo;
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              This isn&rsquo;t a company pretending to have it figured out.
            </h2>
            <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
              Systemine started as a handful of personal spreadsheets and
              messy notebooks that eventually got good enough to share. There&rsquo;s
              no team of ten behind this, no growth hacking, no funnel. Just
              someone who got tired of watching capable people fall apart
              over things that should be simpler.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block underline-grow font-body text-sm text-wood"
            >
              Read the whole story
            </Link>
          </div>
        </Container>
      </section>

      <SectionDivider />

      {/* Newsletter */}
      <section className="py-10 pb-24">
        <Container>
          <div className="rounded-xl2 border border-line/70 bg-paper-alt px-8 py-14 text-center sm:px-16">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              A quiet email, now and then
            </h2>
            <p className="mx-auto mt-3 max-w-md font-body text-sm text-ink-soft">
              New shelves, new writing, and the occasional thought that didn&rsquo;t
              fit anywhere else. Nothing daily. Unsubscribe whenever you like.
            </p>
            <div className="mt-7 flex justify-center">
              <NewsletterForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function SectionDivider() {
  return (
    <div className="flex justify-center py-4 text-line">
      <Sprig className="h-6 w-32" />
    </div>
  );
}


