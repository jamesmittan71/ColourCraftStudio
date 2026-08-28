import Link from "next/link";
import { NewsletterForm } from "@/components/newsletter-form";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/60 bg-[#f3eee6]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
        <div>
          <p className="text-lg font-semibold tracking-[0.18em]">
            COLOUR CRAFT STUDIO
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--muted)]">
            Premium paint supply, boutique colour consultancy, and specification
            support for luxury homes and design-led projects in Hermanus and
            Walker Bay.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-[var(--muted)]">
            <span>Hermanus, Western Cape</span>
            <span>hello@colourcraftstudio.co.za</span>
            <span>+27 (0) 28 312 1450</span>
          </div>
        </div>
        <div className="space-y-6">
          <NewsletterForm />
          <div className="flex flex-wrap gap-4 text-sm font-medium text-[var(--muted)]">
            <Link href="/resources">Resources</Link>
            <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
