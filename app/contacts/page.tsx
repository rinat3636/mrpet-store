import { Mail, Phone, MapPin } from 'lucide-react';

export default function ContactsPage() {
  return (
    <section className="section bg-white">
      <div className="container-site max-w-3xl">
        <h1 className="mb-8 text-2xl font-bold md:text-3xl">Контакты</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <Phone className="mb-3 h-6 w-6 text-ink" />
            <h3 className="font-bold">Телефон</h3>
            <p className="text-muted">{process.env.COMPANY_PHONE || '+7 (___) ___-__-__'}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <Mail className="mb-3 h-6 w-6 text-ink" />
            <h3 className="font-bold">Email</h3>
            <p className="text-muted">{process.env.COMPANY_EMAIL || 'info@mrpetofficial.ru'}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 p-6 shadow-sm md:col-span-2">
            <MapPin className="mb-3 h-6 w-6 text-ink" />
            <h3 className="font-bold">Адрес</h3>
            <p className="text-muted">{process.env.COMPANY_ADDRESS || 'г. Москва'}</p>
            <p className="text-muted">{process.env.COMPANY_NAME || 'ООО «Mr.Pet»'}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
