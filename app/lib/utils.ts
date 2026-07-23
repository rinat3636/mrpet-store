export function formatPrice(kopecks: number | null | undefined): string {
  if (kopecks === null || kopecks === undefined) return '';
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(kopecks / 100);
}

export function formatPriceShort(kopecks: number | null | undefined): string {
  if (kopecks === null || kopecks === undefined) return 'Цена по запросу';
  return formatPrice(kopecks);
}
