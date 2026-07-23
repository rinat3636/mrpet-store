import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getProductBySlug, getProducts } from '../../lib/products';
import { ProductActions } from '../../components/ProductActions';
import { ImageGallery } from '../../components/ImageGallery';
import { SectionTitle } from '../../components/SectionTitle';
import { LightboxImage } from '../../components/LightboxImage';
import { Info, Package, FileText, Check } from 'lucide-react';

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const galleryImages = product.images.map((img) => ({ url: img.url, alt: img.alt }));

  return (
    <>
      <section className="section bg-white py-10 md:py-14">
        <div className="container-site">
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            <div className="mx-auto w-full max-w-sm lg:max-w-md">
              <ImageGallery images={galleryImages} />
            </div>

            <div>
              <span className="mb-3 inline-block w-fit rounded-full border border-brand/50 bg-brand/20 px-4 py-1 text-sm font-semibold text-ink">
                90 снеков в упаковке
              </span>
              <h1 className="mb-4 text-2xl font-extrabold text-ink md:text-3xl lg:text-4xl">{product.name}</h1>
              <p className="mb-8 text-base text-muted md:text-lg">{product.subtitle}</p>
              <ProductActions product={product} />
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="grid gap-10 md:grid-cols-2">
            <div className="rounded-3xl bg-white p-8 shadow-sm lg:p-10">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold"><Info className="h-6 w-6 text-ink" /> Описание</h2>
              <p className="whitespace-pre-line break-words leading-relaxed text-muted">{product.description}</p>
            </div>

            <div className="rounded-3xl bg-white p-8 shadow-sm lg:p-10">
              <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold"><Package className="h-6 w-6 text-ink" /> Рекомендации по приёму</h2>
              <p className="mb-6 text-muted">1 снек на 10 кг веса питомца. Подходит для ежедневного применения. Перед использованием рекомендуется проконсультироваться с ветеринаром.</p>
              {product.attributes.length > 0 && (
                <dl className="space-y-3">
                  {product.attributes.map((attr) => (
                    <div key={attr.id} className="flex flex-col gap-1 border-b border-dashed border-gray-200 py-3 text-sm sm:flex-row sm:justify-between">
                      <dt className="font-medium text-ink">{attr.key}</dt>
                      <dd className="break-words text-left text-muted sm:max-w-md sm:pl-4 sm:text-right">{attr.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container-site max-w-6xl">
          <SectionTitle title="Документация и полный состав" subtitle="Предоставленные материалы и состав продукта" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { img: 'page_2.png', title: 'Состав и дозировка' },
              { img: 'page_3.png', title: 'Состав со вкусом утки' },
              { img: 'page_4.png', title: 'Поддержка суставов' },
            ].map((p) => (
              <LightboxImage key={p.img} src={`/images/pdf/${p.img}`} alt={p.title} className="group block overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm card-hover cursor-zoom-in">
                <div className="flex items-center gap-2 border-b border-gray-100 bg-brand/10 px-5 py-3">
                  <FileText className="h-5 w-5 text-ink" />
                  <span className="font-semibold text-ink">{p.title}</span>
                </div>
                <div className="bg-gray-50 p-4">
                  <Image src={`/images/pdf/${p.img}`} alt={p.title} width={1600} height={400} className="h-auto w-full rounded-xl object-contain transition duration-500 group-hover:scale-[1.02]" />
                </div>
              </LightboxImage>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
