'use client';

import { useState } from 'react';
import { Lightbox } from './Lightbox';

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
      <Lightbox src={src} alt={alt} isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
