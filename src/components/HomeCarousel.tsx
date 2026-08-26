"use client";

import { useState } from "react";
import type { ReactNode } from "react";

type HomeCarouselProps = {
  items: ReactNode[];
};

export default function HomeCarousel({ items }: HomeCarouselProps) {
  const [startIndex, setStartIndex] = useState(0);

  if (items.length === 0) return null;

  const visibleItems = items.slice(startIndex, startIndex + 3);
  const canGoBack = startIndex > 0;
  const canGoForward = startIndex + 3 < items.length;

  return (
    <div>
      {items.length > 3 && (
        <div className="mb-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={() =>
              setStartIndex((current) => Math.max(0, current - 1))
            }
            disabled={!canGoBack}
            aria-label="Previous"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            &larr;
          </button>

          <button
            type="button"
            onClick={() =>
              setStartIndex((current) =>
                Math.min(items.length - 3, current + 1)
              )
            }
            disabled={!canGoForward}
            aria-label="Next"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-opacity disabled:cursor-not-allowed disabled:opacity-30"
          >
            &rarr;
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleItems}
      </div>
    </div>
  );
}