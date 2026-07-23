'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../lib/cart';
import { formatPriceShort } from '../lib/utils';
import { assetUrl } from '../lib/assets';
import { ShoppingCart } from 'lucide-react';
import { ProductWithRelations } from '../lib/types';

export function ProductCard({ product }: { product: ProductWithRelations }) {
  const { addItem } = useCart();
  const image = product.images?.[0]?.url;
  const price = product.price;
  const ozonUrl = process.env.NEXT_PUBLIC_OZON_URL;

  const handleAdd = () => {
    if (!price) return;
    addItem({
      productId: product.id,
      name: product.name,
      price,
      quantity: 1,
      image,
    });
  };

  const priceLabel = price ? formatPriceShort(price) : ozonUrl ? 'Цена на Ozon' : 'Цена по запросу';

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <Link href={`/catalog/${product.slug}`} className="flex flex-1 flex-col">
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
          {image ? (
            <Image src={assetUrl(image)} alt={product.name} fill priority className="object-cover transition duration-700 group-hover:scale-110" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted">Нет фото</div>
          )}
        </div>
        <div className="flex flex-1 flex-col p-6 pb-20">
          <h3 className="mb-2 text-xl font-bold text-ink transition group-hover:underline">{product.name}</h3>
          <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted">{product.subtitle || product.description}</p>
          <div>
            <span className="text-xl font-bold text-ink md:text-2xl">{priceLabel}</span>
            {product.oldPrice && price && (
              <span className="ml-2 text-sm text-muted line-through">{formatPriceShort(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="absolute bottom-6 right-6">
        {ozonUrl ? (
          <a
            href={ozonUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand py-2 px-4 text-sm"
          >
            Заказать
          </a>
        ) : (
          <button
            onClick={handleAdd}
            disabled={!price}
            className="btn-brand py-2 px-4 text-sm disabled:opacity-50"
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> В корзину
          </button>
        )}
      </div>
    </div>
  );
}
