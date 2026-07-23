'use client';

import { useState } from 'react';
import { useCart } from '../lib/cart';
import { formatPrice } from '../lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { ScrollReveal } from '../components/ScrollReveal';

export default function CheckoutPage() {
  const { items, total, clear } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    delivery: 'avito',
    comment: '',
  });

  if (items.length === 0) {
    return (
      <section className="section bg-white">
        <div className="container-site text-center">
          <h1 className="mb-4 text-2xl font-bold">Корзина пуста</h1>
          <p className="text-muted">Добавьте товары, чтобы оформить заказ.</p>
        </div>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customer: form, items }),
      });
      const data = await res.json();
      if (!res.ok || !data.confirmation_url) {
        throw new Error(data.error || 'Ошибка создания платежа');
      }
      clear();
      window.location.href = data.confirmation_url;
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Не удалось создать платёж');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section bg-gray-50">
      <div className="container-site">
        <ScrollReveal animation="reveal" className="mb-8" threshold={0.1}>
          <h1 className="text-2xl font-bold md:text-3xl">Оформление заказа</h1>
        </ScrollReveal>
        <div className="grid gap-8 lg:grid-cols-3">
          <ScrollReveal animation="reveal-left" className="space-y-4 lg:col-span-2" threshold={0.1}>
            <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="rounded-xl bg-red-50 p-4 text-red-700">{error}</div>}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Контактные данные</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Имя</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border p-3 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Телефон</label>
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border p-3 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
                </div>
                <div className="md:col-span-2">
                  <label className="mb-1 block text-sm font-medium">Email</label>
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-xl border p-3 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-4 text-xl font-bold">Доставка</h2>
              <div className="mb-4 flex flex-wrap gap-2">
                {[
                  { id: 'avito', label: 'Авито' },
                  { id: 'cdek', label: 'СДЭК' },
                  { id: 'post', label: 'Почта России' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setForm({ ...form, delivery: d.id })}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 active:scale-95 ${form.delivery === d.id ? 'border-brand bg-brand text-ink shadow-sm' : 'hover:border-brand hover:bg-gray-50'}`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              <label className="mb-1 block text-sm font-medium">Адрес / пункт выдачи</label>
              <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} className="w-full rounded-xl border p-3 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" rows={3} />
              <label className="mb-1 mt-4 block text-sm font-medium">Комментарий</label>
              <textarea value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} className="w-full rounded-xl border p-3 transition focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/30" rows={2} />
            </div>

            <button type="submit" disabled={loading} className="btn-brand w-full text-lg">
              {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Перейти к оплате через ЮKassa'}
            </button>
            </form>
          </ScrollReveal>

          <ScrollReveal animation="reveal-right" threshold={0.1}>
          <div className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:shadow-md">
            <h2 className="mb-4 text-xl font-bold">Ваш заказ</h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={`${item.productId}-${item.variantId}`} className="flex gap-3">
                  <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-gray-100">
                    {item.image ? <Image src={item.image} alt={item.name} fill className="object-cover" /> : <div className="flex h-full items-center justify-center text-xs">Нет фото</div>}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    {item.variantName && <p className="text-xs text-muted">{item.variantName}</p>}
                    <p className="text-sm text-muted">{item.quantity} × {formatPrice(item.price)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 border-t pt-4">
              <div className="flex justify-between text-xl font-bold">
                <span>Итого</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
