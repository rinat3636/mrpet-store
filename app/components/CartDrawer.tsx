'use client';

import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../lib/cart';
import { formatPrice } from '../lib/utils';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, total, count, updateQuantity, removeItem } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">
      <div className="absolute inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
      <div className="relative flex w-full max-w-md flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-lg font-bold">Корзина ({count})</h2>
          <button onClick={() => setIsOpen(false)} className="rounded-full p-2 hover:bg-gray-100"><X className="h-5 w-5" /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-muted">
              <ShoppingBag className="mb-2 h-12 w-12" />
              <p>Корзина пуста</p>
              <Link href="/catalog" onClick={() => setIsOpen(false)} className="mt-4 text-brand-dark underline">В каталог</Link>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-4 rounded-xl border p-3">
                  <div className="relative h-20 w-20 overflow-hidden rounded-lg bg-gray-100">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted">Нет фото</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="font-medium leading-tight">{item.name}</p>
                      {item.variantName && <p className="text-xs text-muted">{item.variantName}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center rounded-full border">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variantId)} className="p-2 hover:bg-gray-50"><Minus className="h-4 w-4" /></button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variantId)} className="p-2 hover:bg-gray-50"><Plus className="h-4 w-4" /></button>
                      </div>
                      <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  </div>
                  <button onClick={() => removeItem(item.productId, item.variantId)} className="self-start rounded p-1 text-muted hover:bg-gray-100"><X className="h-4 w-4" /></button>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t p-4">
            <div className="mb-4 flex items-center justify-between text-lg font-bold">
              <span>Итого</span>
              <span>{formatPrice(total)}</span>
            </div>
            <Link href="/checkout" onClick={() => setIsOpen(false)} className="btn-brand w-full">
              Оформить заказ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
