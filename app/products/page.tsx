import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/section-heading";
import { getProducts } from "@/lib/runtime-data";
import { brands } from "@/lib/site-data";
import { firstParam } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse Colour Craft Studio’s premium paint catalogue by brand, paint type, finish, and budget range.",
};

type PageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedBrand = firstParam(params.brand) ?? "all";
  const selectedType = firstParam(params.type) ?? "all";
  const selectedFinish = firstParam(params.finish) ?? "all";
  const selectedSort = firstParam(params.sort) ?? "newest";

  const products = await getProducts();
  const filtered = products
    .filter((product) => selectedBrand === "all" || product.brandSlug === selectedBrand)
    .filter((product) => selectedType === "all" || product.paintType === selectedType)
    .filter((product) => selectedFinish === "all" || product.finish === selectedFinish)
    .sort((left, right) => {
      if (selectedSort === "brand") {
        return left.brand.localeCompare(right.brand);
      }
      if (selectedSort === "price") {
        return left.sortPrice - right.sortPrice;
      }
      return left.newestRank - right.newestRank;
    });

  const typeOptions = ["all", ...new Set(products.map((product) => product.paintType))];
  const finishOptions = ["all", ...new Set(products.map((product) => product.finish))];

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-10">
      <SectionHeading
        eyebrow="Product catalogue"
        title="Specification-led paint choices with elegant filtering."
        description="A curated, sync-ready catalogue structure for luxury residential interiors, coastal exteriors, decorative finishes, and low-VOC projects."
      />

      <form className="mt-8 grid gap-4 rounded-[1.75rem] border border-[var(--border)] bg-white/75 p-5 backdrop-blur md:grid-cols-4">
        <select
          name="brand"
          defaultValue={selectedBrand}
          className="rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          aria-label="Filter by brand"
        >
          <option value="all">All brands</option>
          {brands.map((brand) => (
            <option key={brand.slug} value={brand.slug}>
              {brand.name}
            </option>
          ))}
        </select>
        <select
          name="type"
          defaultValue={selectedType}
          className="rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          aria-label="Filter by paint type"
        >
          {typeOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All paint types" : option}
            </option>
          ))}
        </select>
        <select
          name="finish"
          defaultValue={selectedFinish}
          className="rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
          aria-label="Filter by finish type"
        >
          {finishOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "All finishes" : option}
            </option>
          ))}
        </select>
        <div className="flex gap-3">
          <select
            name="sort"
            defaultValue={selectedSort}
            className="min-w-0 flex-1 rounded-full border border-[var(--border)] bg-white px-4 py-3 text-sm"
            aria-label="Sort products"
          >
            <option value="newest">Newest</option>
            <option value="brand">Brand</option>
            <option value="price">Price</option>
          </select>
          <button
            type="submit"
            className="rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"
          >
            Apply
          </button>
        </div>
      </form>

      <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {filtered.map((product) => (
          <article
            key={product.slug}
            className="flex h-full flex-col rounded-[1.75rem] border border-[var(--border)] bg-white p-6 shadow-[0_10px_30px_rgba(22,22,22,0.04)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent)]">
                  {product.brand}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                  {product.name}
                </h2>
              </div>
              <div
                className="h-14 w-14 rounded-2xl border border-black/5"
                style={{ backgroundColor: product.swatch }}
                aria-label={`${product.name} sample swatch`}
              />
            </div>

            <p className="mt-4 text-base leading-7 text-[var(--muted)]">
              {product.description}
            </p>

            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--muted)]">
              <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
                <dt>Paint type</dt>
                <dd className="font-medium text-[var(--foreground)]">{product.paintType}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
                <dt>Finish</dt>
                <dd className="font-medium text-[var(--foreground)]">{product.finish}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
                <dt>Stock status</dt>
                <dd className="font-medium text-[var(--foreground)]">{product.stockStatus}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-[var(--border)] pt-4">
                <dt>Pricing</dt>
                <dd className="font-medium text-[var(--foreground)]">{product.priceFrom}</dd>
              </div>
            </dl>

            <ul className="mt-6 space-y-2 text-sm leading-6 text-[var(--muted)]">
              {product.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/contact?service=quote&product=${encodeURIComponent(product.name)}`}
                className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white"
              >
                Request Quote
              </Link>
              <a
                href={product.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-[var(--border)] px-5 py-2.5 text-sm font-semibold"
              >
                View Specs
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
