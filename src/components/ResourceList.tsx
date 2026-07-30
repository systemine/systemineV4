"use client";

import { useState } from "react";
import type { ProductResource } from "@/types/content";

export default function ResourceList({ resources }: { resources: ProductResource[] }) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  if (resources.length === 0) return null;

  return (
  <>
    <div>
      <h2 className="font-display text-xl text-ink">What&rsquo;s included</h2>
      <ul className="mt-4 flex flex-col gap-2">
        {resources.map((resource) => (
          <li key={resource.file}>
            <button
              onClick={() => setSelectedFile(resource.file)}
            
              className="flex items-center gap-3 rounded-xl2 border border-line/70 bg-paper-alt px-5 py-3.5 font-body text-sm text-ink transition-colors duration-200 hover:border-wood/60 hover:text-wood"
            >
              <span aria-hidden="true">📄</span>
              {resource.label}
            </button>
          </li>
        ))}
      </ul>
        </div>
{selectedFile && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
    onClick={() => setSelectedFile(null)}
  >
    <div
      className="relative w-full max-w-5xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setSelectedFile(null)}
        className="absolute right-4 top-4 z-10 rounded-full bg-white px-3 py-2 text-black shadow"
      >
        ✕
      </button>

      <div className="relative aspect-[4/3] w-full">
        <img
          src={selectedFile}
          alt="Resource preview"
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  </div>
)}
  </>
);
}
