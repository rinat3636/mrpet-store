'use client';

import { Star, ExternalLink } from 'lucide-react';

export function OzonReviewsCta({ url }: { url?: string }) {
  if (!url) return null;

  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="mx-auto max-w-3xl rounded-3xl border border-gray-100 bg-gray-50 p-8 text-center shadow-sm transition duration-300 hover:shadow-md md:p-12">
          <div className="mb-4 flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-6 w-6 fill-brand text-brand" />
            ))}
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">Отзывы покупателей</h2>
          <p className="mt-3 text-muted">Реальные отзывы о товарах Mr.Pet на Ozon</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand mt-6 inline-block"
          >
            Читать отзывы на Ozon <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
