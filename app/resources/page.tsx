import type { Metadata } from "next";
import { SectionHeading } from "@/components/section-heading";
import { resources } from "@/lib/site-data";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Colour guidance, trend notes, and paint selection advice from Colour Craft Studio for premium homes in Hermanus.",
};

export default function ResourcesPage() {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="Resources"
        title="Editorial content for search visibility and better client decisions."
        description="A lightweight resources hub for future blog growth, SEO, and client education."
      />
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {resources.map((resource) => (
          <article
            key={resource.slug}
            className="rounded-[1.75rem] border border-[var(--border)] bg-white p-7 shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
              {resource.category}
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
              {resource.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              {resource.excerpt}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
