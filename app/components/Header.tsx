'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { assetUrl } from '../lib/assets';

const nav = [
  { href: '/', label: 'Главная' },
  { href: '/catalog', label: 'Каталог' },
  { href: '/delivery', label: 'Доставка и оплата' },
  { href: '/contacts', label: 'Контакты' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const ozonUrl = process.env.NEXT_PUBLIC_OZON_URL;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="container-site flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 transition-transform duration-200 hover:scale-105 active:scale-95">
          <Image src={assetUrl('/images/logo.svg')!} alt="Mr.Pet" width={100} height={30} className="h-auto w-24 sm:w-28" priority />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-ink transition hover:underline hover:scale-105">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          {ozonUrl ? (
            <a
              href={ozonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand py-2 px-4 text-sm"
            >
              <span className="hidden sm:inline">Заказать</span>
              <ExternalLink className="h-4 w-4 sm:hidden" />
            </a>
          ) : null}
          <button className="rounded-full p-2 transition hover:bg-gray-50 active:scale-95 md:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Меню">
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="animate-fade-in border-t border-gray-100 bg-white md:hidden">
          <div className="container-site flex flex-col gap-4 py-4">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="font-medium text-ink" onClick={() => setMobileOpen(false)}>
                {n.label}
              </Link>
            ))}
            {ozonUrl && (
              <a href={ozonUrl} target="_blank" rel="noopener noreferrer" className="btn-brand w-full text-center">
                Заказать
              </a>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
