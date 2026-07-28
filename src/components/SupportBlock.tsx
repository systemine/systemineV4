import type { PortalSupport } from "@/types/content";

export default function SupportBlock({ support }: { support: PortalSupport | null }) {
  if (!support) return null;

  return (
    <div className="rounded-xl2 border border-line/70 bg-paper-alt p-8">
      <h2 className="font-display text-xl text-ink">Need a hand?</h2>
      <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
        {support.message}
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        {support.email && (
          <a
            href={`mailto:${support.email}`}
            className="underline-grow font-body text-sm text-wood"
          >
            {support.email}
          </a>
        )}
        {support.link && (
          <a
            href={support.link}
            target="_blank"
            rel="noopener noreferrer"
            className="underline-grow font-body text-sm text-wood"
          >
            {support.linkLabel || "Get help"}
          </a>
        )}
      </div>
    </div>
  );
}
