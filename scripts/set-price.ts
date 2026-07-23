import 'dotenv/config';
import { prisma } from '../app/lib/prisma';

async function main() {
  const product = await prisma.product.update({
    where: { slug: 'mrpet-vitamins-dogs-5in1' },
    data: { price: 199000, oldPrice: 249000 }, // 1990 ₽
  });
  console.log('Updated', product.name, product.price);
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
