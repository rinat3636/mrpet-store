import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '../../lib/products';
import { ProductActions } from '../../components/ProductActions';
import { ProductStickyCta } from '../../components/ProductStickyCta';
import { OzonReviewsCta } from '../../components/OzonReviewsCta';
import { ImageGallery } from '../../components/ImageGallery';
import { ScrollReveal } from '../../components/ScrollReveal';
import { Info, Package } from 'lucide-react';

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
            <ScrollReveal animation="reveal-left" className="mx-auto w-full max-w-sm lg:max-w-md" threshold={0.1}>
              <ImageGallery images={galleryImages} />
            </ScrollReveal>

            <ScrollReveal animation="reveal-right" threshold={0.1}>
              <div>
                <span className="mb-3 inline-block w-fit rounded-full border border-brand/50 bg-brand/20 px-4 py-1 text-sm font-semibold text-ink">
                  90 снеков в упаковке
                </span>
                <h1 className="mb-4 text-2xl font-extrabold text-ink md:text-3xl lg:text-4xl">{product.name}</h1>
                <p className="mb-8 text-base text-muted md:text-lg">{product.subtitle}</p>
                <ProductActions product={product} />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container-site">
          <div className="grid gap-10 md:grid-cols-2">
            <ScrollReveal animation="reveal-scale" delay={100} threshold={0.15}>
              <div className="h-full rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:shadow-md lg:p-10">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold"><Info className="h-6 w-6 text-ink" /> Описание</h2>
                <p className="whitespace-pre-line break-words leading-relaxed text-muted">{product.description}</p>
              </div>
            </ScrollReveal>

            <ScrollReveal animation="reveal-scale" delay={200} threshold={0.15}>
              <div className="h-full rounded-3xl bg-white p-8 shadow-sm transition duration-300 hover:shadow-md lg:p-10">
                <h2 className="mb-6 flex items-center gap-2 text-2xl font-bold"><Package className="h-6 w-6 text-ink" /> Рекомендации по приёму</h2>
                <p className="mb-6 text-muted">1 снек на 10 кг веса питомца. Подходит для ежедневного применения. Перед использованием рекомендуется проконсультироваться с ветеринаром.</p>
                {product.attributes.length > 0 && (
                  <dl className="space-y-3">
                    {product.attributes.map((attr) => (
                      <div key={attr.id} className="flex flex-col gap-1 border-b border-dashed border-gray-200 py-3 text-sm transition hover:bg-gray-50/50 sm:flex-row sm:justify-between">
                        <dt className="font-medium text-ink">{attr.key}</dt>
                        <dd className="break-words text-left text-muted sm:max-w-md sm:pl-4 sm:text-right">{attr.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <OzonReviewsCta url={process.env.NEXT_PUBLIC_OZON_URL} />
      <ProductStickyCta product={product} />
    </>
  );
}
