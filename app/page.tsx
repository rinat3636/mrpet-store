import Link from 'next/link';
import Image from 'next/image';
import { getProducts } from './lib/products';
import { ProductCard } from './components/ProductCard';
import { SectionTitle } from './components/SectionTitle';
import { assetUrl } from './lib/assets';
import { Check, X, ArrowRight, ShieldCheck, Award, Truck, Leaf, Heart, Activity, Sparkles } from 'lucide-react';
import { LightboxImage } from './components/LightboxImage';

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
    { icon: Leaf, title: 'Высокое содержание лизина и метионина', text: 'лизин и метионин' },
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
              <Link href={product ? `/catalog/${product.slug}` : '/catalog'} className="btn-brand">
                Перейти к товару <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/catalog" className="btn-outline">В каталог</Link>
            </div>
          </div>
          <div className="flex animate-slide-in-right justify-center">
            <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-xl md:max-w-md md:p-3">
              <div className="relative w-full rounded-2xl bg-white">
                {product?.images[1] ? (
                  <Image src={assetUrl(product.images[1].url)!} alt="Mr.Pet — мощный хондропротектор" width={500} height={650} className="h-auto w-full rounded-xl object-contain transition duration-700 group-hover:scale-[1.02]" priority />
                ) : product?.images[0] ? (
                  <Image src={assetUrl(product.images[0].url)!} alt={product.name} width={500} height={650} className="h-auto w-full rounded-xl object-contain transition duration-700 group-hover:scale-[1.02]" priority />
                ) : (
                  <div className="flex h-96 items-center justify-center text-ink">Mr.Pet</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="grid gap-6 grid-cols-2 lg:grid-cols-4">
            {trustFeatures.map((f) => (
              <div key={f.title} className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm card-hover">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand text-ink shadow-sm transition-transform duration-300 group-hover:scale-110">
                  <f.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
                <p className="text-sm text-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* When to take */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="grid items-center lg:grid-cols-2">
              <LightboxImage src={assetUrl('/images/products/product-main-3.jpg')!} alt="Когда принимать функциональные снеки" className="group flex w-full cursor-zoom-in items-center justify-center bg-gray-50 p-4 md:p-8 lg:p-10">
                <div className="relative w-full max-w-sm transition duration-500 group-hover:scale-[1.02] md:max-w-md">
                  <Image src={assetUrl('/images/products/product-main-3.jpg')!} alt="Когда принимать функциональные снеки" width={400} height={520} className="h-auto w-full rounded-2xl object-contain" />
                </div>
              </LightboxImage>
              <div className="flex flex-col justify-center p-4 md:p-8 lg:p-14">
                <h2 className="mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">Когда принимать?</h2>
                <ul className="space-y-4 text-base text-muted md:text-lg">
                  {['Тяжело встаёт после сна', 'Стал меньше бегать и играть', 'Быстро устаёт на прогулке', 'Не хочет прыгать на диван'].map((t) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink"><Check className="h-4 w-4" /></span>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-2xl bg-brand-light p-5 font-semibold text-ink">Ежедневная поддержка лучше, чем экстренные меры.</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5 in 1 */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <SectionTitle title="5 направлений поддержки в одном снеке" subtitle="Комплексная формула для полноценной заботы о питомце" />
          <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {benefits.map((b, idx) => (
              <div key={b.title} className="group rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm card-hover animate-fade-in-up" style={{ animationDelay: `${idx * 80}ms` }}>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-brand-light text-ink transition-transform duration-300 group-hover:scale-110">
                  <b.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-bold">{b.title}</h3>
                <p className="text-sm text-muted">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Composition */}
      <section className="section bg-white">
        <div className="container-site">
          <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
            <div className="grid items-center lg:grid-cols-2">
              <div className="flex flex-col justify-center p-4 md:p-8 lg:p-14">
                <h2 className="mb-6 text-2xl font-bold md:text-3xl lg:text-4xl">Состав, который работает</h2>
                <p className="mb-8 text-muted">Дегидратированное мясо утки и индейки, овес, горох, льняное семя, кокосовое масло, куркума, Qmin+ (экстракт куркумина), BioPerine, глюкозамин, хондроитин, МСМ, витамины C и D3, бактерии для пищеварения.</p>
                <ul className="space-y-3">
                  {['Высокая дозировка 500 мг', 'Максимальная усвояемость', 'Эффективная формула с куркуминоидами ≥ 95%', 'Не вызывает побочных эффектов и дискомфорта'].map((i) => (
                    <li key={i} className="flex items-center gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-green-100 text-green-600"><Check className="h-4 w-4" /></span><span>{i}</span></li>
                  ))}
                </ul>
              </div>
              <LightboxImage src={assetUrl('/images/products/product-main-1.jpg')!} alt="Состав и питательная ценность Mr.Pet" className="group flex w-full cursor-zoom-in items-center justify-center bg-gray-50 p-4 md:p-8 lg:p-10">
                <div className="relative w-full max-w-sm transition duration-500 group-hover:scale-[1.02] md:max-w-md">
                  <Image src={assetUrl('/images/products/product-main-1.jpg')!} alt="Состав и питательная ценность Mr.Pet" width={400} height={520} className="h-auto w-full rounded-2xl object-contain" />
                </div>
              </LightboxImage>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery stages */}
      <section className="section bg-gray-50">
        <div className="container-site">
          <SectionTitle title="Этапы восстановления активности" subtitle="Результат регулярного приёма натуральных снеков" />
          <div className="grid gap-8 md:grid-cols-2">
            {[
              { img: assetUrl('/images/products/product-recovery.jpg')!, title: 'Динамика улучшений', alt: 'Этапы восстановления до и после' },
              { img: assetUrl('/images/products/product-compare.jpg')!, title: 'Сравнение состояния', alt: 'Сравнение до и после приёма БАД' },
            ].map((b) => (
              <LightboxImage key={b.title} src={b.img} alt={b.alt} className="group block overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm card-hover animate-fade-in-up cursor-zoom-in">
                <div className="relative w-full bg-gray-50">
                  <Image src={b.img} alt={b.alt} width={600} height={780} className="h-auto w-full object-contain p-4 transition duration-500 group-hover:scale-105 md:p-6" />
                </div>
                <div className="border-t border-gray-100 p-6 text-center">
                  <h3 className="font-bold">{b.title}</h3>
                </div>
              </LightboxImage>
            ))}
          </div>
        </div>
      </section>

      {/* Quality */}
      <section className="section bg-white">
        <div className="container-site">
          <SectionTitle title="Выбирайте качество и безопасность" subtitle="Почему Mr.Pet лучше типичных БАД для питомцев" />
          <div className="grid items-center gap-8 md:grid-cols-2">
            <LightboxImage src={assetUrl('/images/products/product-quality.jpg')!} alt="Сравнение Mr.Pet с другим брендом" className="group flex w-full cursor-zoom-in items-center justify-center rounded-3xl border border-gray-100 bg-gray-50 p-4 md:p-8">
              <div className="relative w-full max-w-sm transition duration-500 group-hover:scale-[1.02] md:max-w-md">
                <Image src={assetUrl('/images/products/product-quality.jpg')!} alt="Сравнение Mr.Pet с другим брендом" width={500} height={650} className="h-auto w-full rounded-2xl object-contain" />
              </div>
            </LightboxImage>
            <div className="grid gap-6">
              <div className="rounded-3xl border border-gray-100 bg-green-50/60 p-6 shadow-sm md:p-8">
                <h3 className="mb-5 flex items-center gap-2 text-xl font-bold text-green-800"><Check className="h-6 w-6" /> Mr.Pet</h3>
                <ul className="space-y-3">
                  {['100% натуральный состав', 'Высокая дозировка 500 мг', 'Сертифицированное производство', 'Независимый контроль качества', 'Без побочных эффектов и дискомфорта'].map((i) => (
                    <li key={i} className="flex items-center gap-2"><Check className="h-5 w-5 text-green-600" />{i}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-3xl border border-gray-100 bg-gray-100/60 p-6 shadow-sm md:p-8">
                <h3 className="mb-5 text-xl font-bold text-muted">Другой бренд</h3>
                <ul className="space-y-3 text-muted">
                  {['Синтетический состав', 'Низкая дозировка', 'Нет контроля качества', 'Возможны побочные эффекты', 'Содержит диоксид титана'].map((i) => (
                    <li key={i} className="flex items-center gap-2"><X className="h-5 w-5 flex-shrink-0 text-red-500" />{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Featured product */}
      {product && (
        <section className="section bg-brand-light">
          <div className="container-site">
            <div className="mb-10 text-center animate-fade-in-up">
              <h2 className="text-3xl font-bold">Популярный товар</h2>
              <p className="mt-2 text-muted">Лидер линейки Mr.Pet</p>
            </div>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div className="mx-auto w-full max-w-sm animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <ProductCard product={product} />
              </div>
              <div className="rounded-3xl border border-brand-dark/10 bg-white p-8 shadow-sm lg:p-10 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <h3 className="mb-6 text-xl font-bold">Почему выбирают Mr.Pet?</h3>
                <ul className="space-y-4">
                  {['Натуральный состав без химии', '90 функциональных снеков в одной упаковке', '5 направлений поддержки организма', 'Российский бренд с контролем качества'].map((i) => (
                    <li key={i} className="flex items-center gap-3"><span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand text-ink"><Check className="h-4 w-4" /></span><span>{i}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-ink text-white">
        <div className="container-site animate-fade-in-up text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">Готовы поддержать здоровье питомца?</h2>
          <p className="mb-8 text-base text-gray-300 md:text-lg">Оформите заказ на Ozon — быстро и безопасно.</p>
          <a href={process.env.NEXT_PUBLIC_OZON_URL || '/catalog'} target="_blank" rel="noopener noreferrer" className="btn-brand inline-block px-8 py-4 text-lg">
            Купить Mr.Pet на Ozon
          </a>
        </div>
      </section>
    </>
  );
}
