import { Truck, CreditCard, RotateCcw, Package } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export default function DeliveryPage() {
  const items = [
    { icon: Truck, title: 'Доставка', text: 'Доставка осуществляется по всей России. Возможна отправка любым удобным способом.', list: ['Авито', 'СДЭК', 'Почта России'] },
    { icon: CreditCard, title: 'Оплата', text: 'Оплата производится через платёжный шлюз ЮKassa. Принимаются банковские карты, СБП, электронные кошельки и другие способы.' },
    { icon: Package, title: 'Сроки', text: 'Обычно заказ обрабатывается в течение 1–2 рабочих дней и отправляется выбранным способом.' },
    { icon: RotateCcw, title: 'Возврат', text: 'Возврат товара надлежащего качества возможен в течение 14 дней с момента получения. Подробности уточняйте у менеджера.' },
  ];

  return (
    <section className="section bg-white">
      <div className="container-site max-w-3xl">
        <ScrollReveal animation="reveal" className="mb-8" threshold={0.1}>
          <h1 className="text-2xl font-bold md:text-3xl">Доставка и оплата</h1>
        </ScrollReveal>

        <div className="space-y-6">
          {items.map((item, idx) => (
            <ScrollReveal key={item.title} animation="reveal-scale" delay={idx * 100} threshold={0.15}>
              <div className="group rounded-2xl border border-gray-100 p-6 shadow-sm transition duration-300 hover:shadow-md">
                <h2 className="mb-4 flex items-center gap-2 text-xl font-bold"><item.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" /> {item.title}</h2>
                <p className="text-muted">{item.text}</p>
                {item.list && (
                  <ul className="mt-4 list-disc pl-5 text-muted">
                    {item.list.map((l) => <li key={l}>{l}</li>)}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
