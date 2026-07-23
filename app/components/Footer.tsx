import Link from 'next/link';

export function Footer() {
  const companyName = process.env.COMPANY_NAME || 'ООО «Mr.Pet»';
  const fullName = process.env.COMPANY_FULL_NAME || companyName;
  const address = process.env.COMPANY_ADDRESS;
  const inn = process.env.COMPANY_INN && !/^[\s_-]+$/.test(process.env.COMPANY_INN) ? process.env.COMPANY_INN : '';
  const kpp = process.env.COMPANY_KPP && !/^[\s_-]+$/.test(process.env.COMPANY_KPP) ? process.env.COMPANY_KPP : '';
  const ogrn = process.env.COMPANY_OGRN && !/^[\s_-]+$/.test(process.env.COMPANY_OGRN) ? process.env.COMPANY_OGRN : '';

  return (
    <footer className="border-t border-gray-100 bg-white py-14">
      <div className="container-site grid gap-10 md:grid-cols-3">
        <div>
          <h3 className="mb-3 text-xl font-bold text-ink">Mr.Pet</h3>
          <p className="max-w-xs text-sm leading-relaxed text-muted">Многофункциональные витамины 5В1 для собак всех пород.</p>
        </div>
        <div>
          <h4 className="mb-4 font-semibold">Разделы</h4>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link href="/" className="transition hover:text-ink hover:underline hover:translate-x-0.5 inline-block">Главная</Link></li>
            <li><Link href="/catalog" className="transition hover:text-ink hover:underline hover:translate-x-0.5 inline-block">Каталог</Link></li>
            <li><Link href="/delivery" className="transition hover:text-ink hover:underline hover:translate-x-0.5 inline-block">Доставка и оплата</Link></li>
            <li><Link href="/contacts" className="transition hover:text-ink hover:underline hover:translate-x-0.5 inline-block">Контакты</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 font-semibold">Юридическая информация</h4>
          <div className="space-y-1 text-sm text-muted">
            <p>{fullName}</p>
            {address && <p>{address}</p>}
            {inn && <p>ИНН: {inn}</p>}
            {kpp && <p>КПП: {kpp}</p>}
            {ogrn && <p>ОГРН: {ogrn}</p>}
          </div>
        </div>
      </div>
      <div className="container-site mt-10 text-center text-xs text-muted">
        © {new Date().getFullYear()} Mr.petofficial. Все права защищены. Товарный знак зарегистрирован.
      </div>
    </footer>
  );
}
