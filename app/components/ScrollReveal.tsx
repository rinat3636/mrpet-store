'use client';

import { useEffect, useRef, useState, ElementType, ComponentPropsWithoutRef } from 'react';

type Animation = 'reveal' | 'reveal-left' | 'reveal-right' | 'reveal-scale';

type ScrollRevealProps<T extends ElementType = 'div'> = {
  children: React.ReactNode;
  className?: string;
  animation?: Animation;
  delay?: number;
  threshold?: number;
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className' | 'style'>;

export function ScrollReveal<T extends ElementType = 'div'>({
  children,
  className = '',
  animation = 'reveal',
  delay = 0,
  threshold = 0.15,
  as,
  ...rest
}: ScrollRevealProps<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const Tag = as || 'div';
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`${animation} ${visible ? 'visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
