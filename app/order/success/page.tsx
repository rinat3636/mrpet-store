import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <section className="section bg-white">
      <div className="container-site text-center">
        <h1 className="mb-4 text-3xl font-bold">Спасибо за заказ!</h1>
        <p className="mb-8 text-muted">После подтверждения оплаты мы свяжемся с вами для уточнения доставки.</p>
        <Link href="/catalog" className="btn-brand">Вернуться в каталог</Link>
      </div>
    </section>
  );
}
