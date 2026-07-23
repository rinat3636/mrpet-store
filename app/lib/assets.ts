export function assetUrl(src: string | undefined | null): string {
  if (!src) return '';
  if (src.startsWith('http') || src.startsWith('data:')) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (base && src.startsWith(base)) return src;
  return `${base}${src}`;
}
