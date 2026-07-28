import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Systemine.",
};

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          Say hello
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-5 font-body text-lg leading-relaxed text-ink-soft">
          Questions about a product, a broken link, a nice thing someone
          made you want to share — all of it welcome. A real person reads
          every message, and answers when they can, without a chatbot in
          between.
        </p>

        <div className="mt-10 rounded-xl2 border border-line/70 bg-paper-alt p-8">
          <h2 className="font-display text-lg text-ink">Email</h2>
          <a
            href="mailto:systeminestore@gmail.com"
            className="mt-1 inline-block font-body text-base text-wood underline underline-offset-2"
          >
            systeminestore@gmail.com
          </a>
          <p className="mt-3 font-body text-sm text-ink-soft">
            Usually a reply within a few days — sooner if it&rsquo;s urgent,
            slower during a real break.
          </p>
        </div>

        <div className="mt-6 rounded-xl2 border border-line/70 bg-paper-alt p-8">
          <h2 className="font-display text-lg text-ink">
            Something not working?
          </h2>
          <p className="mt-2 font-body text-sm leading-relaxed text-ink-soft">
            If a download link is broken or a payment didn&rsquo;t go
            through, email us with the product name and, if you have it, a
            screenshot. We&rsquo;ll sort it out — see our{" "}
            <a
              href="/refund-policy"
              className="text-wood underline underline-offset-2"
            >
              Refund Policy
            </a>{" "}
            for the details.
          </p>
        </div>
      </div>
    </Container>
  );
}
