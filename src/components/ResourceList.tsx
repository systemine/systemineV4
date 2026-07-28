import type { ProductResource } from "@/types/content";

export default function ResourceList({ resources }: { resources: ProductResource[] }) {
  if (resources.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl text-ink">What&rsquo;s included</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {resources.map((resource) => (
          <li key={resource.file}>
            <a
              href={resource.file}
              download
              className="flex items-center gap-3 rounded-xl2 border border-line/70 bg-paper-alt px-5 py-3.5 font-body text-sm text-ink transition-colors duration-200 hover:border-wood/60 hover:text-wood"
            >
              <span aria-hidden="true">📄</span>
              {resource.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
