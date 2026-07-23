import { Truck, CreditCard, RotateCcw } from 'lucide-react';

export default function DeliveryPage() {
  return (
    <section className="section bg-white">
      <div className="container-site max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl">Доставка и оплата</h1>

        <div className="mb-8 rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><Truck className="h-5 w-5" /> Доставка</h2>
          <p className="text-muted">Доставка осуществляется по всей России. Условия, сроки и стоимость будут указаны после заполнения.</p>
          <ul className="mt-4 list-disc pl-5 text-muted">
            <li>Курьерская доставка</li>
            <li>Самовывоз</li>
            <li>Почта РФ / СДЭК</li>
          </ul>
        </div>

        <div className="mb-8 rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><CreditCard className="h-5 w-5" /> Оплата</h2>
          <p className="text-muted">Оплата производится через платёжный шлюз ЮKassa. Принимаются банковские карты, СБП, электронные кошельки и другие способы.</p>
        </div>

        <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><RotateCcw className="h-5 w-5" /> Возврат</h2>
          <p className="text-muted">Возврат товара надлежащего качества возможен в течение 14 дней с момента получения. Подробности уточняйте у менеджера.</p>
        </div>
      </div>
    </section>
  );
}
