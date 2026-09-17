"use client";

import { useState } from "react";

export default function FreeResourceForm({
  slug,
}: {
  slug: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "error"
  >("idle");
  const [resourceUrl, setResourceUrl] = useState("");
  const [resourceLabel, setResourceLabel] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email) return;

    setStatus("sending");

    try {
      const response = await fetch("/api/free-resource", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          slug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResourceUrl(data.resourceUrl || "");
      setResourceLabel(data.resourceLabel || "Open the resource");
      setEmail("");
      setStatus("idle");
    } catch (error) {
      console.error("Free resource signup error:", error);
      setStatus("error");
    }
  }

  if (resourceUrl) {
    return (
      <div className="mt-8 rounded-xl2 border border-line/70 bg-paper-alt p-7">
        <p className="font-body text-sm leading-relaxed text-ink-soft">
          You&rsquo;re in. Your resource is ready.
        </p>

        <a
          href={resourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block rounded-full bg-ink px-7 py-3.5 font-body text-sm font-medium text-paper transition-transform duration-300 ease-gentle hover:-translate-y-0.5 hover:bg-wood-deep"
        >
          {resourceLabel}
        </a>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <form
        onSubmit={handleSubmit}
        className="flex w-full flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="free-resource-email" className="sr-only">
          Email address
        </label>

        <input
          id="free-resource-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@somewhere-quiet.com"
          className="w-full flex-1 rounded-full border border-line bg-paper px-5 py-3 text-sm text-ink placeholder:text-ink-soft/60 transition-colors duration-200 focus:border-wood"
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="whitespace-nowrap rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-transform duration-200 ease-gentle hover:-translate-y-0.5 hover:bg-wood-deep disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Unlocking..." : "Get the resource"}
        </button>
      </form>

      {status === "error" && (
        <p className="mt-3 font-body text-sm text-wood">
          Something went wrong. Please try again.
        </p>
      )}

      <p className="mt-3 font-body text-xs leading-relaxed text-ink-soft/70">
        Your email is used to give you access to this resource and keep you
        posted about occasional Systemine updates. Unsubscribe whenever you
        like.
      </p>
    </div>
  );
}