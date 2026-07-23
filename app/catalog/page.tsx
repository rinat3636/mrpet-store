import { getProducts } from '../lib/products';
import { ProductCard } from '../components/ProductCard';

export const dynamic = 'force-dynamic';

export default async function CatalogPage() {
  const products = await getProducts();

  return (
    <section className="section bg-white">
      <div className="container-site">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-2xl font-bold md:text-4xl">Каталог</h1>
          <p className="mx-auto max-w-2xl text-muted">Витамины и функциональные снеки Mr.Pet для собак.</p>
        </div>
        {products.length === 0 ? (
          <p className="text-center text-muted">Товары скоро появятся.</p>
        ) : (
          <div className="mx-auto flex max-w-4xl flex-wrap justify-center gap-8">
            {products.map((p) => (
              <div key={p.id} className="w-full sm:w-[360px]">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
