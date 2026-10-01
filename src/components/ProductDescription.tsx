
"use client";

import { useState } from "react";

type ProductDescriptionProps = {
  description: string;
  previewLength?: number;
};

export default function ProductDescription({
  description,
  previewLength = 220,
}: ProductDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const isLong = description.length > previewLength;

  const visibleDescription =
    isLong && !expanded
      ? `${description.slice(0, previewLength).trimEnd()}…`
      : description;

  return (
    <div className="mt-4">
      <p className="font-body text-lg text-ink-soft">
        {visibleDescription}
      </p>

      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="mt-2 font-body text-sm text-wood underline underline-offset-4 transition-colors hover:text-ink"
        >
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}