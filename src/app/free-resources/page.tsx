import Link from "next/link";
import Container from "@/components/Container";
import FreeResourceCard from "@/components/FreeResourceCard";
import { getAllFreeResources } from "@/lib/free-resources";

export default function FreeResourcesPage() {
  const resources = getAllFreeResources();

  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-5xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          Free Resources
        </p>

        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          Things that might make life a little easier.
        </h1>

        <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-ink-soft">
          Small, practical tools for difficult moments, complicated feelings,
          and the parts of life that rarely come with instructions.
        </p>

        {resources.length > 0 ? (
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {resources.map((resource) => (
  <FreeResourceCard key={resource.slug} resource={resource} />
))}
          </div>
        ) : (
          <p className="mt-12 font-body text-ink-soft">
            Free resources are on their way.
          </p>
        )}
      </div>
    </Container>
  );
}