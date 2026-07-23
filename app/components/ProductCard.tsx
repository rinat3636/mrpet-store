'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../lib/cart';
import { formatPriceShort } from '../lib/utils';
import { ShoppingCart } from 'lucide-react';

export function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  const image = product.images?.[0]?.url;
  const price = product.price;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!price) return;
    addItem({
      productId: product.id,
      name: product.name,
      price,
      quantity: 1,
      image,
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link href={`/catalog/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
          {image ? (
            <Image src={image} alt={product.name} fill priority className="object-cover transition duration-700 group-hover:scale-110" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">Нет фото</div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6 pb-20">
          <h3 className="mb-2 text-xl font-bold text-ink transition group-hover:underline">{product.name}</h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted">{product.subtitle || product.description}</p>
          <div>
            <span className="text-xl font-bold text-ink md:text-2xl">{formatPriceShort(price)}</span>
            {product.oldPrice && price && (
              <span className="ml-2 text-sm text-muted line-through">{formatPriceShort(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
      <button
        onClick={handleAdd}
        disabled={!price}
        className="absolute bottom-6 right-6 rounded-full bg-brand p-3 text-ink shadow-sm transition-all duration-200 hover:scale-110 hover:bg-brand-dark disabled:opacity-50 active:scale-95"
        aria-label="В корзину"
      >
        <ShoppingCart className="h-5 w-5" />
      </button>
    </div>
  );
}
