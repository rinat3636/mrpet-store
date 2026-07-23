import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { yookassa } from '../../lib/yookassa';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { customer, items } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Корзина пуста' }, { status: 400 });
  }

  const missingPrice = items.some((i: any) => !i.price || i.price <= 0);
  if (missingPrice) {
    return NextResponse.json({ error: 'Цена одного из товаров не установлена' }, { status: 400 });
  }

  const amountKopecks = items.reduce((sum: number, i: any) => sum + i.price * i.quantity, 0);
  const amountRub = (amountKopecks / 100).toFixed(2);

  const order = await prisma.order.create({
    data: {
      amount: amountKopecks,
      currency: 'RUB',
      customerName: customer.name,
      customerPhone: customer.phone,
      customerEmail: customer.email,
      address: customer.address,
      delivery: customer.delivery,
      comment: customer.comment,
      items: {
        create: items.map((i: any) => ({
          productId: i.productId,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          variantId: i.variantId,
        })),
      },
    },
  });

  try {
    const payment = await yookassa.payments.create({
      amount: { value: amountRub, currency: 'RUB' as any },
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.YOOKASSA_RETURN_URL || 'http://localhost:3000'}/order/success`,
        locale: 'ru_RU' as any,
      },
      capture: true,
      description: `Заказ ${order.id} в Mr.Pet`,
      metadata: { order_id: order.id },
      receipt: {
        customer: { email: customer.email, phone: customer.phone },
        items: items.map((i: any) => ({
          description: i.name.slice(0, 128),
          quantity: Number(i.quantity),
          amount: { value: (i.price / 100).toFixed(2), currency: 'RUB' as any },
          vat_code: 1,
          payment_subject: 'commodity' as any,
        })),
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { paymentId: payment.id, paymentStatus: payment.status },
    });

    return NextResponse.json({
      orderId: order.id,
      paymentId: payment.id,
      confirmation_url: (payment.confirmation as any).confirmation_url,
    });
  } catch (err: any) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CANCELLED', paymentStatus: 'error' },
    });
    return NextResponse.json({ error: err.message || 'Ошибка создания платежа' }, { status: 500 });
  }
}
