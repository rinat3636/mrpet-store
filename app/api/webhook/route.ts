import { NextRequest, NextResponse } from 'next/server';
import { parsePaymentNotification, isYooKassaIP } from '@webzaytsev/yookassa-ts-sdk';
import { prisma } from '../../lib/prisma';

export async function POST(req: NextRequest) {
  const forwarded = req.headers.get('x-forwarded-for');
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : req.ip;
  if (clientIp && !isYooKassaIP(clientIp)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await req.json();
  try {
    const notification = parsePaymentNotification(body);
    const payment = notification.object;
    const orderId = payment.metadata?.order_id;

    if (!orderId) {
      return NextResponse.json({ error: 'order_id not found' }, { status: 400 });
    }

    if (notification.event === 'payment.succeeded') {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'PAID', paymentStatus: payment.status },
      });
    } else if (notification.event === 'payment.canceled') {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: 'CANCELLED', paymentStatus: payment.status },
      });
    } else {
      await prisma.order.updateMany({
        where: { id: orderId },
        data: { paymentStatus: payment.status },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Bad request';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
