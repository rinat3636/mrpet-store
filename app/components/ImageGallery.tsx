'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LightboxImage } from './LightboxImage';

export function ImageGallery({ images }: { images: { url: string; alt?: string | null }[] }) {
  const [idx, setIdx] = useState(0);
  if (!images.length) return <div className="aspect-[3/4] rounded-3xl bg-gray-100" />;

  return (
    <div className="flex flex-col gap-4">
      <div className="group relative w-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
        <LightboxImage
          src={images[idx].url}
          alt={images[idx].alt || ''}
          className="relative block h-full w-full cursor-zoom-in"
        >
          <div className="relative aspect-[3/4] w-full">
            <Image
              key={images[idx].url}
              src={images[idx].url}
              alt={images[idx].alt || ''}
              fill
              priority
              className="animate-fade-in object-contain p-2 transition duration-700 group-hover:scale-105 md:p-4"
            />
          </div>
        </LightboxImage>
        {images.length > 1 && (
          <>
            <button
              onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md transition-all duration-200 hover:scale-110 hover:bg-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={() => setIdx((i) => (i + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-3 shadow-md transition-all duration-200 hover:scale-110 hover:bg-white"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`relative aspect-[3/4] overflow-hidden rounded-xl bg-gray-50 p-0.5 ring-2 transition-all duration-200 hover:ring-brand/50 ${idx === i ? 'ring-brand' : 'ring-transparent'}`}
          >
            <Image src={img.url} alt={img.alt || ''} fill className="object-contain transition duration-300 hover:scale-110" />
          </button>
        ))}
      </div>
    </div>
  );
}
