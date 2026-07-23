'use client';

import { useState } from 'react';
import { Lightbox } from './Lightbox';
import { assetUrl } from '../lib/assets';

export function LightboxImage({
  src,
  alt,
  className,
  children,
}: {
  src: string;
  alt: string;
  className?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const resolvedSrc = assetUrl(src) || src;
  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className || 'block w-full text-left'}
        aria-label={alt}
      >
        {children}
      </button>
      <Lightbox src={resolvedSrc} alt={alt} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
