import { getProducts } from '../lib/products';
import { ProductCard } from '../components/ProductCard';
import { ScrollReveal } from '../components/ScrollReveal';

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <section className="section bg-white">
      <div className="container-site">
        <ScrollReveal animation="reveal" className="mb-12 text-center" threshold={0.1}>
          <h1 className="mb-4 text-2xl font-bold md:text-4xl">Каталог</h1>
          <p className="mx-auto max-w-2xl text-muted">Витамины и функциональные снеки Mr.Pet для собак.</p>
        </ScrollReveal>
        {products.length === 0 ? (
          <p className="text-center text-muted">Товары скоро появятся.</p>
        ) : (
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8">
            {products.map((p, idx) => (
              <ScrollReveal key={p.id} animation="reveal-scale" delay={idx * 120} className="w-full sm:w-[360px]" threshold={0.15}>
                <ProductCard product={p} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
