
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import AmbienceToggle from "./AmbienceToggle";
import { NAV_LINKS } from "@/lib/constants";

type SearchResult = {
  type: string;
  title: string;
  description: string;
  url: string;
};

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setQuery("");
    setResults([]);
    setLoading(false);
    setSearchError(false);
  }, []);

  useEffect(() => {
    if (!searchOpen) return;

    inputRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeSearch();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen, closeSearch]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (
        (event.ctrlKey || event.metaKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setSearchOpen(true);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setResults([]);
      setLoading(false);
      setSearchError(false);
      return;
    }

    let cancelled = false;

    const controller = new AbortController();

    async function search() {
      setLoading(true);
      setSearchError(false);

      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(trimmedQuery)}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Search request failed");
        }

        const data: { results: SearchResult[] } = await response.json();

        if (!cancelled) {
          setResults(data.results);
        }
      } catch (error) {
        if (!cancelled && error instanceof Error && error.name !== "AbortError") {
          setSearchError(true);
          setResults([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    const timer = window.setTimeout(search, 200);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line/70 bg-paper/90 backdrop-blur">
        <Container className="flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href ||
                pathname?.startsWith(link.href + "/");

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`underline-grow font-body text-[0.95rem] transition-colors duration-200 ${
                    active ? "text-wood" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search Systemine"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition-colors hover:bg-paper-alt"
            >
              <SearchIcon />
            </button>
            <AmbienceToggle />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search Systemine"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
            >
              <SearchIcon />
            </button>

            <button
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                {open ? (
                  <path
                    d="M5 5L19 19M19 5L5 19"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                ) : (
                  <path
                    d="M4 7H20M4 12H20M4 17H20"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                )}
              </svg>
            </button>
          </div>
        </Container>

        {open && (
          <div
            id="mobile-nav"
            className="border-t border-line/70 bg-paper md:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 font-body text-ink-soft transition-colors hover:bg-paper-alt hover:text-ink"
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-2 flex items-center justify-between border-t border-line/70 pt-4">
                <AmbienceToggle />
                <ThemeToggle />
              </div>
            </Container>
          </div>
        )}
      </header>

      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/55 px-4 py-[10vh] backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="site-search-title"
            className="w-full max-w-2xl overflow-hidden rounded-2xl border border-line bg-paper text-ink shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-5">
              <SearchIcon />

              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products, articles, resources..."
                aria-label="Search products, articles, and resources"
                className="min-w-0 flex-1 bg-transparent py-5 font-body text-base outline-none placeholder:text-ink-soft/70"
              />

              <button
                type="button"
                onClick={closeSearch}
                aria-label="Close search"
                className="rounded-lg border border-line px-2 py-1 text-xs text-ink-soft transition-colors hover:bg-paper-alt"
              >
                ESC
              </button>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-3 sm:p-4">
              <h2 id="site-search-title" className="sr-only">
                Search Systemine
              </h2>

              {!query.trim() && (
                <p className="px-3 py-8 text-center font-body text-sm text-ink-soft">
                  Find something useful for wherever you are in life.
                </p>
              )}

              {query.trim().length === 1 && (
                <p className="px-3 py-8 text-center font-body text-sm text-ink-soft">
                  Type at least two characters to search.
                </p>
              )}

              {loading && (
                <p className="px-3 py-5 text-center font-body text-sm text-ink-soft">
                  Searching...
                </p>
              )}

              {searchError && !loading && (
                <p className="px-3 py-5 text-center font-body text-sm text-ink-soft">
                  Search couldn&apos;t load just now. Please try again.
                </p>
              )}

              {!loading &&
                !searchError &&
                query.trim().length >= 2 &&
                results.length === 0 && (
                  <p className="px-3 py-8 text-center font-body text-sm text-ink-soft">
                    No matches yet. Try another word or phrase.
                  </p>
                )}

              <div className="space-y-1">
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.url}`}
                    href={result.url}
                    onClick={closeSearch}
                    className="block rounded-xl px-3 py-3 transition-colors hover:bg-paper-alt focus-visible:outline focus-visible:outline-2 focus-visible:outline-wood"
                  >
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <span className="font-body text-sm font-semibold">
                        {result.title}
                      </span>
                      <span className="rounded-full border border-line px-2 py-0.5 font-body text-[0.68rem] text-ink-soft">
                        {result.type}
                      </span>
                    </div>

                    <p className="line-clamp-2 font-body text-sm leading-relaxed text-ink-soft">
                      {result.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-line px-5 py-3">
              <p className="font-body text-xs text-ink-soft">
                Search published products, articles, free resources, and
                selected public tools.
              </p>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="10.8"
        cy="10.8"
        r="6.8"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M16 16L21 21"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}