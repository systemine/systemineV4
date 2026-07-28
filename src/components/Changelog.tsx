import type { PortalChangelogEntry } from "@/types/content";

export default function Changelog({ entries }: { entries: PortalChangelogEntry[] }) {
  if (entries.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl text-ink">Version history</h2>
      <ul className="mt-4 flex flex-col gap-4 border-l border-line pl-5">
        {entries.map((entry) => (
          <li key={entry.version} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[1.45rem] top-1.5 h-2 w-2 rounded-full bg-moss"
            />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-base text-ink">
                v{entry.version}
              </span>
              {entry.date && (
                <span className="font-body text-xs text-ink-soft/70">
                  {entry.date}
                </span>
              )}
            </div>
            {entry.notes && (
              <p className="mt-1 font-body text-sm leading-relaxed text-ink-soft">
                {entry.notes}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
