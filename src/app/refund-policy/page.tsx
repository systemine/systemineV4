import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "How refunds and returns work for Systemine's digital products.",
};

export default function RefundPolicyPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          The fine print
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink">
          Refund Policy
        </h1>
        <p className="mt-3 font-body text-sm text-ink-soft">
          Last updated: [July 29, 2026]
        </p>

        <div className="prose-paper mt-10">
          <p>
            Because everything sold on Systemine is a digital product
            delivered instantly, we can&rsquo;t offer refunds simply for a
            change of mind once a file has been downloaded. That said, we
            want you to feel good about what you bought — here&rsquo;s where
            we draw the lines.
          </p>

          <h2>When we&rsquo;ll happily refund you</h2>
          <ul>
            <li>The file is broken, missing, or won&rsquo;t open.</li>
            <li>You were charged twice for the same order by mistake.</li>
            <li>
              What you received doesn&rsquo;t match what was described on
              the product page.
            </li>
          </ul>

          <h2>When we generally won&rsquo;t</h2>
          <ul>
            <li>You changed your mind after downloading the product.</li>
            <li>
              You didn&rsquo;t have the software needed to open the file
              (we list requirements on each product page — check before
              buying, or ask us first).
            </li>
          </ul>

          <h2>How to ask</h2>
          <p>
            Email <a href="mailto:systeminestore@gmail.com">systeminestore@gmail.com</a>{" "}
            with your order details and what went wrong. We read every
            message ourselves and will sort it out quickly and fairly —
            no interrogation, no runaround.
          </p>
        </div>
      </div>
    </Container>
  );
}
