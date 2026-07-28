import Image from "next/image";

export default function ProductGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  if (images.length === 0) return null;

  return (
    <div>
      <h2 className="font-display text-xl text-ink">A closer look</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((src, i) => (
          <div
            key={src + i}
            className="relative aspect-square overflow-hidden rounded-xl2 bg-paper-alt"
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
  );
}
