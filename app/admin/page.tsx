'use client';

import { useState, useEffect } from 'react';
import { AdminProduct, AdminOrder } from '../lib/types';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authed, setAuthed] = useState(false);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const auth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthed(true);
      localStorage.setItem('mrpet-admin-pw', password);
      loadData(password);
    } else {
      setMsg('Неверный пароль');
    }
    setLoading(false);
  };

  const loadData = (pw: string) => {
    fetch('/api/admin/products', { headers: { Authorization: `Bearer ${pw}` } })
      .then((r) => r.json())
      .then(setProducts);
    fetch('/api/admin/orders', { headers: { Authorization: `Bearer ${pw}` } })
      .then((r) => r.json())
      .then(setOrders);
  };

  useEffect(() => {
    const pw = localStorage.getItem('mrpet-admin-pw');
    if (pw) {
      setPassword(pw);
      setAuthed(true);
      loadData(pw);
    }
  }, []);

  const updateProduct = async (id: string, data: Partial<AdminProduct>) => {
    const pw = localStorage.getItem('mrpet-admin-pw') || password;
    const res = await fetch('/api/admin/products', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${pw}` },
      body: JSON.stringify({ id, ...data }),
    });
    if (res.ok) setMsg('Сохранено');
    else setMsg('Ошибка сохранения');
    loadData(pw);
  };

  const updateOrderStatus = async (id: string, status: string) => {
    const pw = localStorage.getItem('mrpet-admin-pw') || password;
    await fetch('/api/admin/orders', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${pw}` },
      body: JSON.stringify({ id, status }),
    });
    loadData(pw);
  };

  if (!authed) {
    return (
      <section className="section bg-gray-50">
        <div className="container-site max-w-md">
          <h1 className="mb-6 text-2xl font-bold">Вход в панель администратора</h1>
          <form onSubmit={auth} className="rounded-2xl bg-white p-6 shadow-sm space-y-4">
            {msg && <p className="text-red-600 text-sm">{msg}</p>}
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border p-3" placeholder="Пароль" />
            <button type="submit" disabled={loading} className="btn-brand w-full">Войти</button>
          </form>
        </div>
      </section>
    );
  }

  return (
    <section className="section bg-gray-50">
      <div className="container-site">
        <h1 className="mb-6 text-3xl font-bold">Админ-панель</h1>
        {msg && <p className="mb-4 text-green-700">{msg}</p>}

        <h2 className="mb-4 text-xl font-bold">Товары</h2>
        <div className="mb-8 space-y-4">
          {products.map((p) => (
            <ProductEditor key={p.id} product={p} onSave={updateProduct} />
          ))}
        </div>

        <h2 className="mb-4 text-xl font-bold">Заказы</h2>
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Дата</th>
                <th className="p-3 text-left">Клиент</th>
                <th className="p-3 text-left">Сумма</th>
                <th className="p-3 text-left">Статус</th>
                <th className="p-3 text-left">Статус оплаты</th>
                <th className="p-3 text-left">Действие</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t">
                  <td className="p-3">{o.id.slice(0, 8)}</td>
                  <td className="p-3">{new Date(o.createdAt).toLocaleDateString('ru-RU')}</td>
                  <td className="p-3">{o.customerName}<br/>{o.customerPhone}</td>
                  <td className="p-3">{(o.amount / 100).toLocaleString('ru-RU')} ₽</td>
                  <td className="p-3">{o.status}</td>
                  <td className="p-3">{o.paymentStatus || '—'}</td>
                  <td className="p-3">
                    <select
                      value={o.status}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                      className="rounded border p-1"
                    >
                      {['PENDING','PAID','SHIPPED','DELIVERED','CANCELLED'].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function ProductEditor({ product, onSave }: { product: AdminProduct; onSave: (id: string, data: Partial<AdminProduct>) => void }) {
  const [price, setPrice] = useState(product.price != null ? (product.price / 100).toFixed(2) : '');
  const [oldPrice, setOldPrice] = useState(product.oldPrice != null ? (product.oldPrice / 100).toFixed(2) : '');
  const [stock, setStock] = useState<string>(product.stock?.toString() ?? '');
  const [active, setActive] = useState(product.isActive);

  const save = () => {
    onSave(product.id, {
      price: price ? Math.round(parseFloat(price) * 100) : null,
      oldPrice: oldPrice ? Math.round(parseFloat(oldPrice) * 100) : null,
      stock: Number(stock),
      isActive: active,
    });
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm space-y-3">
      <h3 className="font-bold">{product.name}</h3>
      <div className="grid gap-3 md:grid-cols-4">
        <div>
          <label className="text-xs text-muted">Цена, ₽</label>
          <input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="text-xs text-muted">Старая цена, ₽</label>
          <input type="number" step="0.01" value={oldPrice} onChange={(e) => setOldPrice(e.target.value)} className="w-full rounded border p-2" />
        </div>
        <div>
          <label className="text-xs text-muted">Остаток</label>
          <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} className="w-full rounded border p-2" />
        </div>
        <div className="flex items-end gap-2">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={active} onChange={(e) => setActive(e.target.checked)} /> Активен
          </label>
          <button onClick={save} className="btn-brand ml-auto py-2 px-4 text-sm">Сохранить</button>
        </div>
      </div>
    </div>
  );
}
