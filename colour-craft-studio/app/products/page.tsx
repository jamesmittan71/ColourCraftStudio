import type { Metadata } from 'next';
import { initDb, getAllBrands, getAllProducts } from '@/lib/db';
import type { Brand } from '@/lib/brands';
import type { Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import CTA from '@/components/CTA';

export const metadata: Metadata = {
  title: 'Paint Products',
  description:
    'Browse our full range of interior, exterior and specialty paint products from MIDAS, Dekster, Earthcote, Envirolite, Plascon and Dulux.',
};

interface SearchParams {
  brand?: string;
  type?: string;
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  initDb();
  const brands = getAllBrands() as Brand[];
  const brandId = searchParams.brand ? parseInt(searchParams.brand, 10) : undefined;
  const type = searchParams.type ?? undefined;
  const products = getAllProducts(brandId, type) as Product[];

  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 sm:pt-36 sm:pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Paint Products</h1>
          <p className="text-lg text-gray-500 max-w-2xl">
            Browse our curated selection of premium interior, exterior and specialty paints.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap gap-3 items-center">
          <span className="text-sm font-medium text-gray-700">Filter by:</span>

          {/* Brand filter */}
          <div className="flex flex-wrap gap-2">
            <a
              href="/products"
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !brandId
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              All Brands
            </a>
            {brands.map((b) => (
              <a
                key={b.id}
                href={`/products?brand=${b.id}${type ? `&type=${type}` : ''}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  brandId === b.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {b.name}
              </a>
            ))}
          </div>

          <div className="h-4 w-px bg-gray-200" />

          {/* Type filter */}
          <div className="flex flex-wrap gap-2">
            {([
              { value: 'interior', label: 'Interior' },
              { value: 'exterior', label: 'Exterior' },
              { value: 'eco', label: 'Eco-Friendly' },
              { value: 'specialist', label: 'Specialist Finishes' },
            ] as const).map(({ value, label }) => (
              <a
                key={value}
                href={`/products?${brandId ? `brand=${brandId}&` : ''}type=${value}`}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  type === value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-12 pb-24 bg-white" aria-labelledby="products-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-gray-400 mb-8">
            {products.length} product{products.length !== 1 ? 's' : ''} found
          </p>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products match your filters. Try clearing the filters above.</p>
          )}
        </div>
      </section>

      <CTA
        title="Need help choosing the right product?"
        subtitle="Our specialists will match you with the perfect paint for your project."
        ctaLabel="Get Expert Advice"
        ctaHref="/contact"
      />
    </>
  );
}
