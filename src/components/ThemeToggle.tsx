"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "systemine-theme";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
  }

  // Avoid a mismatched icon flash before hydration settles.
  if (!mounted) {
    return (
      <button
        aria-label="Toggle dark mode"
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft"
      >
        <span className="sr-only">Toggle theme</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? "Switch to daylight" : "Switch to evening"}
      title={isDark ? "Switch to daylight" : "Switch to evening"}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors duration-300 hover:border-wood hover:text-wood"
    >
      {isDark ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 3a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 15a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Zm9-6a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM5 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm12.36 6.36a1 1 0 0 1-1.41 0l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41ZM7.76 8.05a1 1 0 0 1-1.41 0l-.71-.7a1 1 0 0 1 1.41-1.42l.71.71a1 1 0 0 1 0 1.41Zm10.24-1.41a1 1 0 0 1 0 1.41l-.71.71a1 1 0 1 1-1.41-1.41l.71-.71a1 1 0 0 1 1.41 0ZM7.05 17.65a1 1 0 0 1 0 1.41l-.7.71a1 1 0 0 1-1.42-1.41l.71-.71a1 1 0 0 1 1.41 0ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Z"
            fill="currentColor"
          />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M20.742 13.045a8.088 8.088 0 0 1-2.077.267c-4.476 0-8.106-3.63-8.106-8.106 0-1.147.238-2.24.668-3.229a.75.75 0 0 0-.937-.995A10.108 10.108 0 0 0 3 12.09C3 17.567 7.433 22 12.91 22a10.108 10.108 0 0 0 9.108-5.71.75.75 0 0 0-.955-.995 8.06 8.06 0 0 1-.32-.25Z"
            fill="currentColor"
          />
        </svg>
      )}
    </button>
  );
}
