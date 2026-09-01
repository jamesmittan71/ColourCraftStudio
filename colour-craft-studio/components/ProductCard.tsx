import Link from 'next/link';
import type { Product } from '@/lib/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const typeColour: Record<string, string> = {
    interior: 'bg-blue-50 text-blue-700',
    exterior: 'bg-green-50 text-green-700',
    eco: 'bg-emerald-50 text-emerald-700',
    specialist: 'bg-purple-50 text-purple-700',
  };

  const typeLabel: Record<string, string> = {
    interior: 'Interior',
    exterior: 'Exterior',
    eco: 'Eco-Friendly',
    specialist: 'Specialist',
  };

  return (
    <article className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">
            {product.brand_name}
          </p>
          <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        </div>
        <span
          className={`shrink-0 px-2.5 py-0.5 rounded-full text-xs font-medium ${
            typeColour[product.type] ?? 'bg-gray-100 text-gray-600'
          }`}
        >
          {typeLabel[product.type] ?? product.type}
        </span>
      </div>

      {product.description && (
        <p className="text-sm text-gray-500 leading-relaxed">{product.description}</p>
      )}

      {product.colour_range && (
        <p className="text-xs text-gray-400">
          <span className="font-medium text-gray-600">Colour range:</span> {product.colour_range}
        </p>
      )}

      <Link
        href="/contact"
        className="mt-auto inline-block text-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600 text-sm font-semibold hover:bg-blue-600 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
      >
        Request Quote
      </Link>
    </article>
  );
}
