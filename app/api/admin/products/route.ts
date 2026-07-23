import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { checkAdmin, unauthorized } from '../../../lib/admin';

export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) return unauthorized();
  const products = await prisma.product.findMany({
    include: { images: true, variants: true, attributes: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(products);
}

export async function PUT(req: NextRequest) {
  if (!checkAdmin(req)) return unauthorized();
  const body = await req.json();
  const { id, price, oldPrice, stock, isActive } = body;
  const product = await prisma.product.update({
    where: { id },
    data: { price, oldPrice, stock, isActive },
  });
  return NextResponse.json(product);
}
