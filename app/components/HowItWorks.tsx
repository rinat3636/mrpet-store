import { MousePointerClick, Truck, HeartHandshake } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export function HowItWorks({ url }: { url?: string }) {
  const steps = [
    { icon: MousePointerClick, title: 'Выберите вариант', text: 'Поддержка суставов или жизненной силы — подберите под задачу питомца.' },
    { icon: Truck, title: 'Перейдите на Ozon', text: 'Нажмите «Заказать» — оформление, оплата и доставка проходят на Ozon.' },
    { icon: HeartHandshake, title: 'Получите заказ', text: 'Быстрая доставка Авито, СДЭК или Почтой России по всей РФ.' },
  ];

  return (
    <section className="section bg-gray-50">
      <div className="container-site">
        <ScrollReveal animation="reveal" className="mb-10 text-center" threshold={0.2}>
          <h2 className="text-2xl font-bold md:text-3xl">Как купить Mr.Pet</h2>
          <p className="mt-2 text-muted">3 простых шага до здоровья питомца</p>
        </ScrollReveal>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((s, idx) => (
            <ScrollReveal key={s.title} animation="reveal-scale" delay={idx * 120} threshold={0.2}>
              <div className="group h-full rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-ink transition-all duration-300 group-hover:scale-110">
                  <s.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-bold">{s.title}</h3>
                <p className="text-sm text-muted">{s.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        {url && (
          <ScrollReveal animation="reveal" delay={200} className="mt-10 text-center" threshold={0.2}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="btn-brand animate-pulse-glow inline-block">
              Перейти к покупке на Ozon
            </a>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
