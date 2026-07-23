'use client';

import { useState } from 'react';
import { formatPriceShort } from '../lib/utils';
import { Minus, Plus, Package, ExternalLink, Bone, Heart, Leaf, ShieldCheck } from 'lucide-react';
import { ProductWithRelations } from '../lib/types';

export function ProductActions({ product }: { product: ProductWithRelations }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id ?? '');

  const variant = product.variants?.find((v) => v.id === selectedVariant);
  const price = variant?.price ?? product.price;
  const ozonUrl = process.env.NEXT_PUBLIC_OZON_URL;
  const priceLabel = price ? formatPriceShort(price) : ozonUrl ? 'Цена на Ozon' : 'Цена по запросу';

  return (
    <div id="product-cta" className="group rounded-3xl border border-gray-100 bg-white p-5 shadow-lg transition-shadow duration-300 hover:shadow-xl lg:p-6">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="text-xl font-extrabold text-ink md:text-2xl">{priceLabel}</span>
        {product.oldPrice && price && (
          <span className="text-base text-muted line-through md:text-lg">{formatPriceShort(product.oldPrice)}</span>
        )}
      </div>

      {!!product.variants?.length && (
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-ink">Вариант</label>
          <div className="flex flex-wrap gap-2">
            {product.variants?.map((v) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v.id)}
                className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition-all duration-200 active:scale-95 sm:flex-none sm:px-4 ${
                  selectedVariant === v.id ? 'border-brand bg-brand text-ink shadow-sm' : 'border-gray-200 bg-white hover:border-brand hover:bg-gray-50'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div>
          <label className="mb-1 block text-sm font-medium text-ink">Количество</label>
          <div className="inline-flex items-center rounded-full border border-gray-200 bg-white">
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="rounded-l-full p-2.5 transition hover:bg-gray-50 active:scale-90"><Minus className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" /></button>
            <span className="w-10 text-center font-semibold">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="rounded-r-full p-2.5 transition hover:bg-gray-50 active:scale-90"><Plus className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" /></button>
          </div>
        </div>
        {product.pieces ? (
          <div className="flex items-center gap-2 rounded-2xl bg-brand-light px-4 py-2 text-sm font-medium text-ink">
            <Package className="h-4 w-4" /> {product.pieces} шт в упаковке
          </div>
        ) : null}
      </div>

      {ozonUrl ? (
        <a
          href={ozonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brand animate-pulse-glow flex w-full items-center justify-center text-base md:text-lg"
        >
          <ExternalLink className="mr-2 h-5 w-5 transition-transform duration-300 group-hover:rotate-12" /> Заказать
        </a>
      ) : (
        <button disabled className="btn-brand w-full text-base md:text-lg disabled:opacity-50">
          Скоро в продаже
        </button>
      )}

      {ozonUrl && (
        <ul className="mt-5 grid grid-cols-2 gap-2 text-sm text-muted">
          <li className="flex items-center gap-2"><Bone className="h-4 w-4 flex-shrink-0 text-brand" /> Здоровые суставы</li>
          <li className="flex items-center gap-2"><Heart className="h-4 w-4 flex-shrink-0 text-brand" /> Крепкое сердце</li>
          <li className="flex items-center gap-2"><Leaf className="h-4 w-4 flex-shrink-0 text-brand" /> Улучшенная кожа</li>
          <li className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 flex-shrink-0 text-brand" /> Иммунитет</li>
        </ul>
      )}
    </div>
  );
}
