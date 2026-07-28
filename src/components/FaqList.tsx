import type { PortalFaqItem } from "@/types/content";

export default function FaqList({ items }: { items: PortalFaqItem[] }) {
  if (items.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl text-ink">Frequently asked</h2>
      <div className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-xl2 border border-line/70 bg-paper-alt px-5 py-4 open:pb-4"
          >
            <summary className="cursor-pointer list-none font-body text-sm font-medium text-ink marker:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-ink-soft transition-transform duration-200 ease-gentle group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-3 font-body text-sm leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </div>
  );
}
