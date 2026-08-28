import Link from 'next/link';
import type { Brand } from '@/lib/brands';

interface BrandCardProps {
  brand: Brand;
}

export default function BrandCard({ brand }: BrandCardProps) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 p-8 flex flex-col items-center text-center gap-4 hover:shadow-md hover:-translate-y-1 transition-all duration-200">
      <div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center text-2xl font-bold text-gray-700">
        {brand.name.charAt(0)}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
        {brand.description && (
          <p className="mt-2 text-sm text-gray-500 leading-relaxed">{brand.description}</p>
        )}
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        <Link
          href={`/products?brand=${brand.id}`}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          View Products
        </Link>
        {brand.website && (
          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Website ↗
          </a>
        )}
      </div>
    </article>
  );
}
