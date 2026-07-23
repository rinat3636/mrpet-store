'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { assetUrl } from '../lib/assets';

export function Lightbox({
  src,
  alt,
  isOpen,
  onClose,
}: {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [wide, setWide] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const imageClass = wide
    ? 'h-[90vh] w-auto max-w-none object-contain'
    : 'h-auto max-h-[90vh] max-w-[95vw] w-auto object-contain';

  return createPortal(
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white transition hover:bg-white/40"
        aria-label="Закрыть"
      >
        <X className="h-6 w-6" />
      </button>
      <div
        className="relative max-h-[90vh] max-w-[95vw] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={assetUrl(src)!}
          alt={alt}
          className={imageClass}
          onLoad={(e) => {
            const img = e.currentTarget;
            setWide(img.naturalWidth / img.naturalHeight > 1);
          }}
        />
      </div>
    </div>,
    document.body
  );
}
