import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../lib/prisma';
import { checkAdmin, unauthorized } from '../../../lib/admin';

export async function GET(req: NextRequest) {
  if (!checkAdmin(req)) return unauthorized();
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(orders);
}

export async function PATCH(req: NextRequest) {
  if (!checkAdmin(req)) return unauthorized();
  const { id, status } = await req.json();
  const order = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json(order);
}
