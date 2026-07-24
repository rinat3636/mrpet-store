import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma';
import { yookassa } from '../../lib/yookassa';
import { CartItem } from '../../lib/types';
import { CurrencyEnum, LocaleEnum, Items, IConfirmationRedirect } from '@webzaytsev/yookassa-ts-sdk';

interface Customer {
  name: string;
  phone: string;
  email: string;
  address: string;
  delivery: string;
  comment: string;
}

interface RequestBody {
  customer: Customer;
  items: CartItem[];
}

export async function POST(req: NextRequest) {
  const body = (await req.json()) as RequestBody;
  const { customer, items } = body;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Корзина пуста' }, { status: 400 });
  }

  const missingPrice = items.some((i) => !i.price || i.price <= 0);
  if (missingPrice) {
    return NextResponse.json({ error: 'Цена одного из товаров не установлена' }, { status: 400 });
  }

  const amountKopecks = items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0);
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
        create: items.map((i: CartItem) => ({
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
      amount: { value: amountRub, currency: CurrencyEnum.RUB },
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.YOOKASSA_RETURN_URL || 'http://localhost:3000'}/order/success`,
        locale: LocaleEnum.ru_RU,
      },
      capture: true,
      description: `Заказ ${order.id} в Mr.Pet`,
      metadata: { order_id: order.id },
      receipt: {
        customer: { email: customer.email, phone: customer.phone },
        tax_system_code: Number(process.env.TAX_SYSTEM_CODE || 1),
        items: items.map((i: CartItem) => ({
          description: i.name.slice(0, 128),
          quantity: Number(i.quantity),
          amount: { value: (i.price / 100).toFixed(2), currency: CurrencyEnum.RUB },
          vat_code: Number(process.env.VAT_CODE || 1),
          payment_subject: 'commodity' as Items.PaymentSubject,
          payment_mode: 'full_payment' as Items.PaymentMode,
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
      confirmation_url: (payment.confirmation as IConfirmationRedirect).confirmation_url,
    });
  } catch (err: unknown) {
    await prisma.order.update({
      where: { id: order.id },
      data: { status: 'CANCELLED', paymentStatus: 'error' },
    });
    const message = err instanceof Error ? err.message : 'Ошибка создания платежа';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
