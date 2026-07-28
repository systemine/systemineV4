import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Systemine — home"
    >
      <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-full transition-transform duration-300 ease-gentle group-hover:scale-105">
        <Image
          src="/images/brand/logo.png"
          alt=""
          fill
          sizes="40px"
          className="object-cover"
          priority
        />
      </span>
      <span className="font-display text-xl tracking-tight text-ink">
        Systemine
      </span>
    </Link>
  );
}
