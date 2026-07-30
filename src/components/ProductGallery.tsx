"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        setSelectedIndex(null);
      }

      if (e.key === "ArrowRight") {
        setSelectedIndex((selectedIndex + 1) % images.length);
      }

      if (e.key === "ArrowLeft") {
        setSelectedIndex(
          (selectedIndex - 1 + images.length) % images.length
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex, images.length]);

  if (images.length === 0) return null;

  return (
    <>
      <div>
        <h2 className="font-display text-xl text-ink">
          A closer look
        </h2>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              onClick={() => setSelectedIndex(i)}
              className="relative aspect-square overflow-hidden rounded-xl2 bg-paper-alt cursor-pointer"
            >
              <Image
                src={src}
                alt={`${title} — preview ${i + 1}`}
                fill
                sizes="(min-width: 640px) 200px, 45vw"
                className="object-cover transition-transform duration-500 ease-gentle hover:scale-[1.05]"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-white px-3 py-2 text-black shadow"
            >
              ✕
            </button>

            <button
              onClick={() =>
                setSelectedIndex(
                  (selectedIndex - 1 + images.length) %
                    images.length
                )
              }
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-black shadow"
            >
              ←
            </button>

            <button
              onClick={() =>
                setSelectedIndex(
                  (selectedIndex + 1) % images.length
                )
              }
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white px-3 py-2 text-black shadow"
            >
              →
            </button>

            <div className="relative aspect-square w-full">
              <Image
                src={images[selectedIndex]}
                alt={title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}