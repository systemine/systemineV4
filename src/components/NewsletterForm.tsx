"use client";

import { useState } from "react";

export default function NewsletterForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
const [email, setEmail] = useState("");

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!email) return;

  setStatus("sending");

  try {
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Newsletter signup failed");
    }

    setStatus("sent");
    setEmail("");
  } catch (error) {
    console.error("Newsletter signup error:", error);
    setStatus("error");
  }
}

  if (status === "sent") {
    return (
      <p className="font-body text-sm text-moss">
        You&rsquo;re on the list. No noise, no daily emails — just something worth opening.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex w-full flex-col gap-3 sm:flex-row ${compact ? "max-w-md" : "max-w-lg"}`}
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@somewhere-quiet.com"
        className="w-full flex-1 rounded-full border border-line bg-paper px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-wood"
      />
       {status === "error" && (
       <p className="text-sm text-wood">
        Something went wrong. Please try again.
       </p>
)}
      <button
        type="submit"
        className="whitespace-nowrap rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-200 ease-gentle hover:-translate-y-0.5 hover:bg-wood-deep"
      >
        {status === "sending" ? "Joining..." : "Keep me posted"}
      </button>
    </form>
  );
}
