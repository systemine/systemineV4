import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import Sprig from "./Sprig";
import NewsletterForm from "./NewsletterForm";
import { FOOTER_LINKS, SOCIALS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-line/70 bg-paper-alt">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm font-body text-sm leading-relaxed text-ink-soft">
              A little less to carry. Digital systems for the parts of life
              nobody hands you a manual for.
            </p>
            <div className="mt-6">
              <p className="mb-2 font-body text-sm text-ink-soft">
                One quiet email, now and then.
              </p>
              <NewsletterForm compact />
            </div>
          </div>

          {FOOTER_LINKS.map((group) => (
            <div key={group.heading}>
              <h3 className="font-display text-sm tracking-wide text-ink">
                {group.heading}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="underline-grow font-body text-sm text-ink-soft transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex justify-center text-line">
          <Sprig className="h-5 w-28" />
        </div>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-line/70 pt-8 sm:flex-row sm:justify-between">
          <p className="font-body text-xs text-ink-soft">
            &copy; {new Date().getFullYear()} Systemine. Made with care by Systemine.
          </p>
          <div className="flex items-center gap-5">
            {SOCIALS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                className="font-body text-xs text-ink-soft underline-grow transition-colors hover:text-ink"
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
