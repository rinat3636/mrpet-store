'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../lib/cart';
import { useState } from 'react';

const nav = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/contacts', label: 'Контакты' },
];

export function Header() {
  const { count, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.svg" alt="Mr.Pet" width={100} height={30} className="h-auto w-24 sm:w-28" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-ink hover:underline">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <button onClick={() => setIsOpen(true)} className="relative rounded-full p-2 hover:bg-gray-50" aria-label="Корзина">
            <ShoppingCart className="h-6 w-6 text-ink" />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-xs font-bold text-ink">
                {count}
              </span>
            )}
          </button>
          <button className="rounded-full p-2 hover:bg-gray-50 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <div className="container-site flex flex-col gap-4 py-4">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="font-medium text-ink" onClick={() => setMobileOpen(false)}>
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
