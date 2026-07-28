import type { Metadata } from "next";
import Container from "@/components/Container";
import NewsletterForm from "@/components/NewsletterForm";
import Sprig from "@/components/Sprig";

export const metadata: Metadata = {
  title: "Newsletter",
  description:
    "One quiet email from Systemine, now and then — new shelves, new writing, nothing daily.",
};

export default function NewsletterPage() {
  return (
    <Container className="py-20 sm:py-28">
      <div className="mx-auto max-w-lg text-center">
        <Sprig className="mx-auto mb-8 h-6 w-32 text-line" />
        <h1 className="font-display text-4xl text-ink sm:text-5xl">
          A quiet email, now and then
        </h1>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
          No daily prompts, no funnels, no &ldquo;last chance.&rdquo; Just a
          short note when a new shelf goes up, a new piece is written, or
          something feels worth passing along. You can leave any time, no
          questions asked.
        </p>
        <div className="mt-9 flex justify-center">
          <NewsletterForm />
        </div>
        <p className="mt-6 font-body text-xs text-ink-soft/70">
          By subscribing you agree to our{" "}
          <a href="/privacy" className="underline underline-offset-2">
            Privacy Policy
          </a>
          . Unsubscribe whenever you like.
        </p>
      </div>
    </Container>
  );
}
