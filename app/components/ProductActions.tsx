'use client';

import { useState } from 'react';
import { useCart } from '../lib/cart';
import { formatPriceShort } from '../lib/utils';
import { Minus, Plus, ShoppingCart, Package } from 'lucide-react';

export function ProductActions({ product }: { product: any }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0]?.id || '');
  const { addItem, setIsOpen } = useCart();

  const variant = product.variants?.find((v: any) => v.id === selectedVariant);
  const price = variant?.price ?? product.price;

  const handleAdd = () => {
    if (!price) {
      alert('Цена пока не установлена. Заполните цену в админ-панели.');
      return;
    }
    addItem({
      productId: product.id,
      variantId: selectedVariant || undefined,
      variantName: variant?.name,
      name: product.name,
      price,
      quantity,
      image: product.images?.[0]?.url,
    });
    setIsOpen(true);
  };

  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-5 shadow-lg lg:p-6">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="text-xl font-extrabold text-ink md:text-2xl">{formatPriceShort(price)}</span>
        {product.oldPrice && price && (
          <span className="text-base text-muted line-through md:text-lg">{formatPriceShort(product.oldPrice)}</span>
        )}
      </div>

      {product.variants?.length > 0 && (
        <div className="mb-5">
          <label className="mb-2 block text-sm font-medium text-ink">Вкус / вариант</label>
          <div className="flex flex-wrap gap-2">
            {product.variants.map((v: any) => (
              <button
                key={v.id}
                onClick={() => setSelectedVariant(v.id)}
                className={`flex-1 rounded-full border px-3 py-2 text-sm font-semibold transition-all duration-200 sm:flex-none sm:px-4 ${
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
            <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="rounded-l-full p-2.5 hover:bg-gray-50 transition"><Minus className="h-4 w-4" /></button>
            <span className="w-10 text-center font-semibold">{quantity}</span>
            <button onClick={() => setQuantity((q) => q + 1)} className="rounded-r-full p-2.5 hover:bg-gray-50 transition"><Plus className="h-4 w-4" /></button>
          </div>
        </div>
        {product.pieces ? (
          <div className="flex items-center gap-2 rounded-2xl bg-brand-light px-4 py-2 text-sm font-medium text-ink">
            <Package className="h-4 w-4" /> {product.pieces} шт в упаковке
          </div>
        ) : null}
      </div>

      <button onClick={handleAdd} disabled={!price} className="btn-brand w-full text-base md:text-lg disabled:opacity-50">
        <ShoppingCart className="mr-2 h-5 w-5" /> В корзину
      </button>

      {!price && (
        <p className="mt-4 text-sm text-amber-600">Цена не установлена. Укажите её в админ-панели, чтобы товар стал доступен для покупки.</p>
      )}
    </div>
  );
}
