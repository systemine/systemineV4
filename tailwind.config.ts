import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx,md}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-alt": "var(--paper-alt)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        wood: "var(--wood)",
        "wood-deep": "var(--wood-deep)",
        moss: "var(--moss)",
        gold: "var(--gold)",
        line: "var(--line)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-karla)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        soft: "0 2px 10px -2px rgba(45, 38, 27, 0.08), 0 8px 30px -12px rgba(45, 38, 27, 0.12)",
        lift: "0 6px 20px -4px rgba(45, 38, 27, 0.16)",
      },
      maxWidth: {
        prose: "68ch",
        shell: "1180px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        driftIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.6s ease-out both",
        driftIn: "driftIn 0.7s ease-out both",
      },
      transitionTimingFunction: {
        gentle: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
