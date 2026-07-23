'use client';

import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Bone, Heart, Leaf } from 'lucide-react';
import { ProductWithRelations } from '../lib/types';
import { formatPriceShort } from '../lib/utils';

export function ProductStickyCta({ product }: { product: ProductWithRelations }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cta = document.getElementById('product-cta');
    if (!cta) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0, rootMargin: '0px 0px -80px 0px' }
    );
    observer.observe(cta);
    return () => observer.disconnect();
  }, []);

  const ozonUrl = process.env.NEXT_PUBLIC_OZON_URL;
  const price = product.price ?? null;
  const priceLabel = price ? formatPriceShort(price) : 'Цена на Ozon';

  if (!visible || !ozonUrl) return null;

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand/30 bg-white/95 px-4 py-3 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] backdrop-blur-sm transition-transform duration-300 data-[hidden=true]:translate-y-full"
      data-hidden={!visible}
    >
      <div className="container-site mx-auto flex items-center justify-between gap-4">
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-ink">{product.name}</p>
          <p className="text-xs text-muted">{priceLabel}</p>
        </div>
        <ul className="hidden gap-4 text-sm text-muted md:flex">
          <li className="flex items-center gap-1.5"><Bone className="h-4 w-4 text-brand" /> Суставы</li>
          <li className="flex items-center gap-1.5"><Heart className="h-4 w-4 text-brand" /> Сердце</li>
          <li className="flex items-center gap-1.5"><Leaf className="h-4 w-4 text-brand" /> Кожа</li>
        </ul>
        <a
          href={ozonUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-brand animate-pulse-glow flex-1 px-4 py-2.5 text-sm sm:flex-none"
        >
          <ExternalLink className="mr-2 h-4 w-4" /> Заказать на Ozon
        </a>
      </div>
    </div>
  );
}
