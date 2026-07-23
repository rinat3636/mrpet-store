import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from './lib/products';
import { ProductCard } from './components/ProductCard';
import { SectionTitle } from './components/SectionTitle';
import { assetUrl } from './lib/assets';
import { Check, X, ArrowRight, ExternalLink, ShieldCheck, Award, Truck, Leaf, Heart, Activity, Sparkles } from 'lucide-react';
import { LightboxImage } from './components/LightboxImage';
import { ScrollReveal } from './components/ScrollReveal';

export default async function HomePage() {
  const products = await getProducts();
  const product = products[0];

  const benefits = [
    { icon: Activity, title: 'Здоровые суставы', text: 'Глюкозамин, хондроитин и МСМ' },
    { icon: Heart, title: 'Здоровое сердце', text: 'Омега 3/6/9' },
    { icon: Sparkles, title: 'Здоровый кишечник', text: 'Бактерии для пищеварения' },
    { icon: ShieldCheck, title: 'Здоровая кожа', text: 'Кокосовое масло, витамин C' },
    { icon: Award, title: 'Здоровая печень', text: 'Куркумин Qmin+ и BioPerine' },
  ];

  const trustFeatures = [
    { icon: ShieldCheck, title: '100% натурально', text: 'Без синтетики и диоксида титана' },
    { icon: Leaf, title: 'Высокое содержание лизина и метионина', text: 'Ключевые аминокислоты для поддержки суставов, кожи и шерсти' },
    { icon: Award, title: 'Сертифицировано', text: 'Многоэтапный контроль качества' },
    { icon: Truck, title: 'Доставка по РФ', text: 'Быстрая отправка удобным способом' },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-white to-brand-light/40">
        <div className="container-site grid items-center gap-12 py-14 md:py-20 lg:grid-cols-2 lg:py-28">
          <div className="animate-fade-in-up">
            <span className="mb-5 inline-block rounded-full border-2 border-brand bg-white px-4 py-1.5 text-sm font-semibold text-ink shadow-sm">
              Товарный знак зарегистрирован
            </span>
            <h1 className="mb-6 text-3xl font-extrabold leading-tight text-ink md:text-4xl xl:text-5xl">
              Mr.Pet — здоровье питомца каждый день
            </h1>
            <p className="mb-8 max-w-xl text-base text-muted md:text-lg">
              Многофункциональные витамины 5В1 для собак всех пород. 90 натуральных снеков для суставов, сердца, кишечника, кожи и печени.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={process.env.NEXT_PUBLIC_OZON_URL || '/catalog'} target="_blank" rel="noopener noreferrer" className="btn-brand animate-pulse-glow">
                Заказать на Ozon <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <Link href={product ? `/catalog/${product.slug}` : '/catalog'} className="btn-outline">
                Подробнее <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
          <ScrollReveal animation="reveal-scale" className="flex justify-center" threshold={0.1}>
            <div className="animate-float">
              <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-xl transition-shadow duration-500 hover:shadow-2xl md:max-w-md md:p-3">
              <div className="relative w-full rounded-2xl bg-white">
                {product?.images[0] ? (
                  <Image src={assetUrl(product.images[0].url)!} alt="Mr.Pet — мощный хондропротектор" width={500} height={650} className="h-auto w-full rounded-xl object-contain transition duration-700 group-hover:scale-[1.02]" priority />
                ) : (
                  <div className="flex h-96 items-center justify-center text-ink">Mr.Pet</div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
      </section>

      {/* Trust */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {trustFeatures.map((f, idx) => (
              <ScrollReveal key={f.title} animation="reveal-scale" delay={idx * 100} threshold={0.2}>
                <div className="group h-full rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm card-hover">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-ink shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                    <f.icon className="h-8 w-8 transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                  <p className="text-sm text-muted">{f.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* When to take */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="grid items-center lg:grid-cols-2">
              <ScrollReveal animation="reveal-left" className="flex w-full" threshold={0.15}>
                <LightboxImage src={assetUrl('/images/products/product-main-3.jpg')!} alt="Когда принимать функциональные снеки" className="group flex w-full cursor-zoom-in items-center justify-center bg-gray-50 p-4 md:p-8 lg:p-10">
                  <div className="relative w-full max-w-sm transition duration-500 group-hover:scale-[1.02] md:max-w-md">
                    <Image src={assetUrl('/images/products/product-main-3.jpg')!} alt="Когда принимать функциональные снеки" width={400} height={520} className="h-auto w-full rounded-2xl object-contain" />
                  </div>
                </LightboxImage>
              </ScrollReveal>
              <ScrollReveal animation="reveal-right" className="flex flex-col justify-center p-4 md:p-8 lg:p-14" threshold={0.15}>
                <h2 className="mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">Когда принимать?</h2>
                <ul className="space-y-4 text-base text-muted md:text-lg">
                  {['Тяжело встаёт после сна', 'Стал меньше бегать и играть', 'Быстро устаёт на прогулке', 'Не хочет прыгать на диван'].map((t, idx) => (
                    <ScrollReveal key={t} as="li" animation="reveal" delay={idx * 80} className="flex items-start gap-3" threshold={0.1}>
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink transition-transform duration-300 hover:scale-110"><Check className="h-4 w-4" /></span>
                      <span>{t}</span>
                    </ScrollReveal>
                  ))}
                </ul>
                <div className="mt-8 rounded-2xl bg-brand-light p-5 font-semibold text-ink transition-transform duration-300 hover:scale-[1.01]">Ежедневная поддержка лучше, чем экстренные меры.</div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5 in 1 */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <ScrollReveal animation="reveal" className="" threshold={0.2}>
            <SectionTitle title="5 направлений поддержки в одном снеке" subtitle="Комплексная формула для полноценной заботы о питомце" />
          </ScrollReveal>
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {benefits.map((b, idx) => (
              <ScrollReveal key={b.title} animation="reveal-scale" delay={idx * 90} threshold={0.2}>
                <div className="group h-full rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm card-hover">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light text-ink transition-all duration-300 group-hover:scale-110 group-hover:bg-brand">
                    <b.icon className="h-7 w-7 transition-transform duration-300 group-hover:rotate-6" />
                  </div>
                  <h3 className="mb-2 font-bold">{b.title}</h3>
                  <p className="text-sm text-muted">{b.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Composition */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="grid items-center lg:grid-cols-2">
              <ScrollReveal animation="reveal-left" className="flex flex-col justify-center p-4 md:p-8 lg:p-14" threshold={0.15}>
                <h2 className="mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">Состав, который работает</h2>
                <p className="mb-8 text-muted">Дегидратированное мясо утки и индейки, овес, горох, льняное семя, кокосовое масло, куркума, Qmin+ (экстракт куркумина), BioPerine, глюкозамин, хондроитин, МСМ, витамины C и D3, бактерии для пищеварения.</p>
                <ul className="space-y-3">
                  {['Высокое содержание лизина и метионина', 'Максимальная усвояемость', 'Эффективная формула с куркуминоидами ≥ 95%', 'Не вызывает побочных эффектов и дискомфорта'].map((i, idx) => (
                    <ScrollReveal key={i} as="li" animation="reveal" delay={idx * 70} className="flex items-center gap-3" threshold={0.1}>
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600 transition-transform duration-300 hover:scale-110"><Check className="h-4 w-4" /></span>
                      <span>{i}</span>
                    </ScrollReveal>
                  ))}
                </ul>
              </ScrollReveal>
              <ScrollReveal animation="reveal-right" className="flex w-full" threshold={0.15}>
                <LightboxImage src={assetUrl('/images/products/product-main-1.jpg')!} alt="Состав и питательная ценность Mr.Pet" className="group flex w-full cursor-zoom-in items-center justify-center bg-gray-50 p-4 md:p-8 lg:p-10">
                  <div className="relative w-full max-w-sm transition duration-500 group-hover:scale-[1.02] md:max-w-md">
                    <Image src={assetUrl('/images/products/product-main-1.jpg')!} alt="Состав и питательная ценность Mr.Pet" width={400} height={520} className="h-auto w-full rounded-2xl object-contain" />
                  </div>
                </LightboxImage>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery stages */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <ScrollReveal animation="reveal" className="" threshold={0.2}>
            <SectionTitle title="Этапы восстановления активности" subtitle="Результат регулярного приёма натуральных снеков" />
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { img: assetUrl('/images/products/product-recovery.jpg')!, title: 'Динамика улучшений', alt: 'Этапы восстановления до и после' },
              { img: assetUrl('/images/products/product-compare.jpg')!, title: 'Сравнение состояния', alt: 'Сравнение до и после приёма БАД' },
            ].map((b, idx) => (
              <ScrollReveal key={b.title} animation="reveal-scale" delay={idx * 150} threshold={0.2}>
                <LightboxImage src={b.img} alt={b.alt} className="group block h-full overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm card-hover cursor-zoom-in">
                  <div className="relative w-full bg-gray-50">
                    <Image src={b.img} alt={b.alt} width={600} height={780} className="h-auto w-full object-contain p-4 transition duration-500 group-hover:scale-105 md:p-6" />
                  </div>
                  <div className="border-t border-gray-100 p-6 text-center">
                    <h3 className="font-bold">{b.title}</h3>
                  </div>
                </LightboxImage>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section bg-white">
        <div className="container-site">
          <ScrollReveal animation="reveal" className="" threshold={0.2}>
            <SectionTitle title="Выбирайте качество и безопасность" subtitle="Почему Mr.Pet лучше типичных БАД для питомцев" />
          </ScrollReveal>
          <div className="grid items-center gap-8 md:grid-cols-2">
            <ScrollReveal animation="reveal-left" className="flex w-full" threshold={0.15}>
              <LightboxImage src={assetUrl('/images/products/product-quality.jpg')!} alt="Сравнение Mr.Pet с другим брендом" className="group flex w-full cursor-zoom-in items-center justify-center rounded-3xl border border-gray-100 bg-gray-50 p-4 transition duration-300 hover:shadow-lg md:p-8">
                <div className="relative w-full max-w-sm transition duration-500 group-hover:scale-[1.02] md:max-w-md">
                  <Image src={assetUrl('/images/products/product-quality.jpg')!} alt="Сравнение Mr.Pet с другим брендом" width={500} height={650} className="h-auto w-full rounded-2xl object-contain" />
                </div>
              </LightboxImage>
            </ScrollReveal>
            <ScrollReveal animation="reveal-right" className="grid gap-6" threshold={0.15}>
              <div className="rounded-3xl border border-gray-100 bg-green-50/60 p-6 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md md:p-8">
                <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-green-800"><Check className="h-6 w-6" /> Mr.Pet</h3>
                <ul className="space-y-3">
                  {['100% натуральный состав', 'Высокое содержание лизина и метионина', 'Сертифицированное производство', 'Независимый контроль качества', 'Без побочных эффектов и дискомфорта'].map((i, idx) => (
                    <li key={i} className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1" style={{ transitionDelay: `${idx * 50}ms` }}><Check className="h-5 w-5 text-green-600" />{i}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-gray-100/60 p-6 shadow-sm transition duration-300 hover:scale-[1.01] hover:shadow-md md:p-8">
                <h3 className="mb-5 text-xl font-bold text-muted">Другой бренд</h3>
                <ul className="space-y-3 text-muted">
                  {['Синтетический состав', 'Низкая дозировка', 'Нет контроля качества', 'Возможны побочные эффекты', 'Содержит диоксид титана'].map((i, idx) => (
                    <li key={i} className="flex items-center gap-2 transition-transform duration-300 hover:translate-x-1" style={{ transitionDelay: `${idx * 50}ms` }}><X className="h-5 w-5 flex-shrink-0 text-red-500" />{i}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* Featured product */}
      {product && (
        <section className="section bg-brand-light">
          <div className="container-site">
            <ScrollReveal animation="reveal" className="mb-10 text-center" threshold={0.2}>
              <h2 className="text-3xl font-bold">Популярный товар</h2>
              <p className="mt-2 text-muted">Лидер линейки Mr.Pet</p>
            </ScrollReveal>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <ScrollReveal animation="reveal-scale" className="mx-auto w-full max-w-sm" threshold={0.2}>
                <ProductCard product={product} />
              </ScrollReveal>
              <ScrollReveal animation="reveal-right" delay={150} threshold={0.2}>
                <div className="rounded-3xl border border-brand-dark/10 bg-white p-8 shadow-sm transition duration-300 hover:shadow-lg lg:p-10">
                  <h3 className="mb-6 text-xl font-bold">Почему выбирают Mr.Pet?</h3>
                  <ul className="space-y-4">
                    {['Натуральный состав без химии', '90 функциональных снеков в одной упаковке', '5 направлений поддержки организма', 'Российский бренд с контролем качества'].map((i, idx) => (
                      <li key={i} className="flex items-center gap-3 transition-transform duration-300 hover:translate-x-1" style={{ transitionDelay: `${idx * 50}ms` }}><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink"><Check className="h-4 w-4" /></span><span>{i}</span></li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-ink text-white">
        <ScrollReveal animation="reveal-scale" className="container-site text-center" threshold={0.2}>
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Готовы поддержать здоровье питомца?</h2>
          <p className="mb-8 text-base text-gray-300 md:text-lg">Оформите заказ на Ozon — быстро и безопасно.</p>
          <a href={process.env.NEXT_PUBLIC_OZON_URL || '/catalog'} target="_blank" rel="noopener noreferrer" className="btn-brand animate-pulse-glow inline-block px-8 py-4 text-lg">
            Заказать на Ozon
          </a>
        </ScrollReveal>
      </section>
    </>
  );
}
