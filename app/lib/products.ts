import { prisma } from './prisma';

export async function getProducts() {
  return prisma.product.findMany({
    where: { isActive: true },
    include: { images: { orderBy: { sortOrder: 'asc' } }, variants: true, attributes: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: { images: { orderBy: { sortOrder: 'asc' } }, variants: true, attributes: true },
  });
}
