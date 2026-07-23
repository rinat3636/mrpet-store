import { Mail, Phone, MapPin, Building2, Landmark } from 'lucide-react';
import { ScrollReveal } from '../components/ScrollReveal';

export default function ContactsPage() {
  const companyName = process.env.COMPANY_NAME || 'ООО «Mr.Pet»';
  const fullName = process.env.COMPANY_FULL_NAME || companyName;
  const address = process.env.COMPANY_ADDRESS || 'г. Москва';
  const phone = process.env.COMPANY_PHONE;
  const email = process.env.COMPANY_EMAIL;
  const inn = process.env.COMPANY_INN && !/^[\s_-]+$/.test(process.env.COMPANY_INN) ? process.env.COMPANY_INN : '';
  const kpp = process.env.COMPANY_KPP && !/^[\s_-]+$/.test(process.env.COMPANY_KPP) ? process.env.COMPANY_KPP : '';
  const ogrn = process.env.COMPANY_OGRN && !/^[\s_-]+$/.test(process.env.COMPANY_OGRN) ? process.env.COMPANY_OGRN : '';
  const bankName = process.env.BANK_NAME;
  const bankAccount = process.env.BANK_ACCOUNT;
  const bankBik = process.env.BANK_BIK;
  const bankCorr = process.env.BANK_CORR;

  return (
    <section className="section bg-white">
      <div className="container-site max-w-4xl">
        <ScrollReveal animation="reveal" threshold={0.1}>
          <h1 className="mb-8 text-2xl font-bold md:text-3xl">Контакты</h1>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-2">
          <ScrollReveal animation="reveal-scale" delay={0} threshold={0.15}>
            <div className="h-full rounded-2xl border border-gray-100 p-6 shadow-sm transition duration-300 hover:shadow-md">
              <Phone className="mb-3 h-6 w-6 text-ink" />
              <h3 className="font-bold">Телефон</h3>
              <p className="text-muted">{phone || 'Уточняется'}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="reveal-scale" delay={80} threshold={0.15}>
            <div className="h-full rounded-2xl border border-gray-100 p-6 shadow-sm transition duration-300 hover:shadow-md">
              <Mail className="mb-3 h-6 w-6 text-ink" />
              <h3 className="font-bold">Email</h3>
              <p className="text-muted">{email || 'info@mrpetofficial.ru'}</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="reveal-scale" delay={160} threshold={0.15}>
            <div className="h-full rounded-2xl border border-gray-100 p-6 shadow-sm transition duration-300 hover:shadow-md md:col-span-2">
              <MapPin className="mb-3 h-6 w-6 text-ink" />
              <h3 className="font-bold">Адрес</h3>
              <p className="text-muted">{address}</p>
              <p className="text-muted">{fullName}</p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal animation="reveal" delay={200} threshold={0.1} className="mt-10">
          <h2 className="mb-4 text-xl font-bold">Юридическая информация</h2>
        </ScrollReveal>

        <ScrollReveal animation="reveal-scale" delay={250} threshold={0.1}>
          <div className="rounded-2xl border border-gray-100 bg-gray-50/60 p-6 shadow-sm transition duration-300 hover:shadow-md">
            <Building2 className="mb-3 h-6 w-6 text-ink" />
            <div className="grid gap-2 text-sm text-muted md:grid-cols-2">
              <p><span className="font-semibold text-ink">Полное наименование:</span> {fullName}</p>
              {inn && <p><span className="font-semibold text-ink">ИНН:</span> {inn}</p>}
              {kpp && <p><span className="font-semibold text-ink">КПП:</span> {kpp}</p>}
              {ogrn && <p><span className="font-semibold text-ink">ОГРН:</span> {ogrn}</p>}
              <p><span className="font-semibold text-ink">Адрес:</span> {address}</p>
            </div>
          </div>
        </ScrollReveal>

        {bankName && (
          <ScrollReveal animation="reveal-scale" delay={300} threshold={0.1}>
            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50/60 p-6 shadow-sm transition duration-300 hover:shadow-md">
              <Landmark className="mb-3 h-6 w-6 text-ink" />
              <h3 className="mb-3 font-bold">Банковские реквизиты</h3>
              <div className="grid gap-2 text-sm text-muted md:grid-cols-2">
                <p className="md:col-span-2"><span className="font-semibold text-ink">Получатель:</span> {fullName}</p>
                <p className="md:col-span-2"><span className="font-semibold text-ink">Банк:</span> {bankName}</p>
                {bankAccount && <p><span className="font-semibold text-ink">Р/с:</span> {bankAccount}</p>}
                {bankBik && <p><span className="font-semibold text-ink">БИК:</span> {bankBik}</p>}
                {bankCorr && <p className="md:col-span-2"><span className="font-semibold text-ink">К/с:</span> {bankCorr}</p>}
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
