import Link from 'next/link';

export default function OrderCancelPage() {
  return (
    <section className="section bg-white">
      <div className="container-site text-center">
        <h1 className="mb-4 text-3xl font-bold">Оплата не завершена</h1>
        <p className="mb-8 text-muted">Попробуйте снова или свяжитесь с нами для помощи.</p>
        <Link href="/checkout" className="btn-brand mr-4">Повторить</Link>
        <Link href="/catalog" className="btn-outline">В каталог</Link>
      </div>
    </section>
  );
}
