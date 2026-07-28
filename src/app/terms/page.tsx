import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Terms",
  description: "The terms for using the Systemine website and products.",
};

export default function TermsPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          The fine print
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink">Terms</h1>
        <p className="mt-3 font-body text-sm text-ink-soft">
          Last updated: [update this date when you publish]
        </p>

        <div className="prose-paper mt-10">
          <p>
            These terms cover the essentials of using this website and
            buying from it. They&rsquo;re written to be readable rather
            than intimidating, but they aren&rsquo;t legal advice — have a
            lawyer review this template before relying on it for a real
            business.
          </p>

          <h2>Using this site</h2>
          <p>
            You&rsquo;re welcome to browse, read, and buy from Systemine.
            Please don&rsquo;t copy, resell, or redistribute our products,
            designs, or writing without permission — a lot of care goes
            into each one.
          </p>

          <h2>Digital products</h2>
          <p>
            Everything sold on Systemine is a digital product delivered
            electronically. You&rsquo;re buying a license to use the
            product for your own personal (or, where stated, commercial)
            use — not the underlying rights to the design or content
            itself.
          </p>

          <h2>Payment</h2>
          <p>
            Payments are processed by a third-party payment provider. By
            purchasing, you also agree to that provider&rsquo;s terms. We
            don&rsquo;t store your payment details.
          </p>

          <h2>No professional advice</h2>
          <p>
            Systemine&rsquo;s products and articles are meant to make
            everyday life feel more manageable. They aren&rsquo;t medical,
            legal, financial, or therapeutic advice, and they&rsquo;re not a
            substitute for a qualified professional when you need one.
          </p>

          <h2>Limitation of liability</h2>
          <p>
            Systemine is provided &ldquo;as is.&rdquo; We do our best to
            make everything accurate, useful and well-built, but we
            can&rsquo;t guarantee it will meet every need or be free of
            every error, and we&rsquo;re not liable for how you choose to
            use it.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these terms occasionally as the business grows.
            We&rsquo;ll update the date at the top of this page when we do.
          </p>

          <h2>Questions</h2>
          <p>
            Email <a href="mailto:systeminestore@gmail.com">systeminestore@gmail.com</a>.
          </p>
        </div>
      </div>
    </Container>
  );
}
