export function assetUrl(src: string | undefined | null): string | undefined {
  if (!src) return src || undefined;
  if (src.startsWith('http') || src.startsWith('data:')) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (base && src.startsWith(base)) return src;
  return `${base}${src}`;
}
