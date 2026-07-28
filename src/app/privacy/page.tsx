import type { Metadata } from "next";
import Container from "@/components/Container";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Systemine collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <Container className="py-16 sm:py-20">
      <div className="mx-auto max-w-2xl">
        <p className="font-body text-sm uppercase tracking-[0.2em] text-moss">
          The fine print
        </p>
        <h1 className="mt-4 font-display text-4xl text-ink">
          Privacy Policy
        </h1>
        <p className="mt-3 font-body text-sm text-ink-soft">
          Last updated: [update this date when you publish]
        </p>

        <div className="prose-paper mt-10">
          <p>
            This page explains what information Systemine collects, why,
            and what you can do about it. We&rsquo;ve tried to write it the
            way we&rsquo;d want it explained to us — plainly, without
            legalese doing the heavy lifting. It isn&rsquo;t legal advice;
            have a lawyer review this template before you rely on it.
          </p>

          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>Newsletter signups.</strong> If you subscribe, we
              store your email address so we can send you updates. Nothing
              else is required to sign up.
            </li>
            <li>
              <strong>Purchases.</strong> When you buy a product, payment
              is handled by our payment processor, not by us directly — we
              don&rsquo;t see or store your card details.
            </li>
            <li>
              <strong>Site analytics.</strong> We may use basic, privacy-
              respecting analytics to understand which pages are useful.
              This doesn&rsquo;t identify you personally.
            </li>
            <li>
              <strong>Messages you send us.</strong> If you email us, we
              keep that conversation so we can help you and follow up if
              needed.
            </li>
          </ul>

          <h2>What we don&rsquo;t do</h2>
          <ul>
            <li>We don&rsquo;t sell your information. Ever.</li>
            <li>We don&rsquo;t share your email with advertisers.</li>
            <li>
              We don&rsquo;t track you across other websites to build an ad
              profile.
            </li>
          </ul>

          <h2>Cookies and local storage</h2>
          <p>
            Systemine uses your browser&rsquo;s local storage to remember
            small preferences — like whether you&rsquo;ve turned on dark
            mode or the ambience sound. This stays on your device and
            isn&rsquo;t sent to us.
          </p>

          <h2>Your choices</h2>
          <p>
            You can unsubscribe from the newsletter at any time using the
            link in any email we send. You can ask us to delete any
            information we hold about you by emailing{" "}
            <a href="mailto:systeminestore@gmail.com">systeminestore@gmail.com</a>.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If this policy changes in a meaningful way, we&rsquo;ll update
            the date at the top of this page. Significant changes may also
            be mentioned in the newsletter.
          </p>

          <h2>Questions</h2>
          <p>
            Email <a href="mailto:systeminestore@gmail.com">systeminestore@gmail.com</a>{" "}
            and a real person will answer.
          </p>
        </div>
      </div>
    </Container>
  );
}
