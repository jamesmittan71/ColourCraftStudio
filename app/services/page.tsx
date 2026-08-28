import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Colour consultation, supply logistics, contractor partnerships, and decorative guidance from Colour Craft Studio in Hermanus.",
};

export default function ServicesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="Services"
        title="Project support that keeps good design decisions practical."
        description="From a one-room refresh to a multi-phase coastal build, we help clients choose the right palette, coating system, and delivery plan."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {services.map((service) => (
          <article
            key={service.slug}
            className="rounded-[1.75rem] border border-[var(--border)] bg-white p-8 shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
              {service.icon}
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.05em]">
              {service.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--muted)]">
              {service.description}
            </p>
            <Link
              href={service.href}
              className="mt-6 inline-flex rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
            >
              {service.cta}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
