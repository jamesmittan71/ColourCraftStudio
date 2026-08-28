import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { brands } from "@/lib/site-data";
import { firstParam } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Brands",
  description:
    "Explore premium paint brands curated by Colour Craft Studio for luxury interiors, coastal exteriors, and eco-conscious specifications.",
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function BrandsPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const paintType = firstParam(params.paintType) ?? "all";
  const filteredBrands =
    paintType === "all"
      ? brands
      : brands.filter((brand) => brand.paintTypes.includes(paintType));

  const filterOptions = [
    "all",
    ...new Set(brands.flatMap((brand) => brand.paintTypes)),
  ];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="Paint suppliers"
        title="Brand portfolios chosen for finish quality and project confidence."
        description="Use the paint-type filter to narrow the supplier mix for interiors, exteriors, specialist coatings, and low-VOC projects."
        as="h1"
      />

      <form className="mt-8 flex flex-wrap items-center gap-4 rounded-[1.5rem] border border-[var(--border)] bg-white/70 p-4 backdrop-blur">
        <label className="text-sm font-medium text-[var(--muted)]" htmlFor="paintType">
          Filter by paint type
        </label>
        <select
          id="paintType"
          name="paintType"
          defaultValue={paintType}
          className="min-w-52 rounded-full border border-[var(--border)] bg-white px-4 py-2.5 text-sm"
        >
          {filterOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All paint types" : option}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
        >
          Apply
        </button>
      </form>

      <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filteredBrands.map((brand) => (
          <article
            key={brand.slug}
            className="rounded-[1.75rem] border border-[var(--border)] bg-white p-7 shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
          >
            <p className="text-2xl font-semibold tracking-[0.08em]">{brand.logoText}</p>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              {brand.description}
            </p>
            <dl className="mt-6 space-y-4 text-sm leading-7 text-[var(--muted)]">
              <div>
                <dt className="font-semibold text-[var(--foreground)]">
                  Product categories
                </dt>
                <dd>{brand.categories.join(" · ")}</dd>
              </div>
              <div>
                <dt className="font-semibold text-[var(--foreground)]">
                  Product lines
                </dt>
                <dd>{brand.productLines.join(" · ")}</dd>
              </div>
            </dl>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href={`/products?brand=${brand.slug}`}
                className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Explore Products
              </Link>
              <a
                href={brand.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold"
              >
                Visit Brand Website
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
