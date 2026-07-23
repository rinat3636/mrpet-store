import 'dotenv/config';
import { PrismaClient } from '../app/generated/prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.upsert({
    where: { slug: 'mrpet-vitamins-dogs-5in1' },
    update: {},
    create: {
      slug: 'mrpet-vitamins-dogs-5in1',
      name: 'Mr.Pet Многофункциональные витамины для собак 5В1',
      subtitle: '90 функциональных снеков. Здоровые суставы, сердце, кишечник, кожа и печень.',
      description: 'Функциональные снеки для собак всех пород и любого возраста. Со вкусом утки. Противоаллергенные, 100% натуральный состав, высокая дозировка 500 мг. Содержат глюкозамин, хондроитин, МСМ, куркумин Qmin+, BioPerine, кокосовое масло, комплекс лактобактерий и витамины C, D3.',
      price: null,
      oldPrice: null,
      sku: 'MR-PET-5B1-90',
      stock: 100,
      pieces: 90,
      weightGrams: null,
      images: {
        create: [
          { url: '/images/products/product-main-1.jpg', alt: 'Mr.Pet витамины 5В1 для собак', sortOrder: 0 },
          { url: '/images/products/product-main-2.jpg', alt: 'Mr.Pet снеки для суставов', sortOrder: 1 },
          { url: '/images/products/product-main-3.jpg', alt: 'Mr.Pet когда принимать', sortOrder: 2 },
          { url: '/images/products/product-recovery.jpg', alt: 'Этапы восстановления', sortOrder: 3 },
          { url: '/images/products/product-compare.jpg', alt: 'Сравнение Mr.Pet с другим брендом', sortOrder: 4 },
          { url: '/images/products/product-quality.jpg', alt: 'Качество и безопасность Mr.Pet', sortOrder: 5 },
        ],
      },
      variants: {
        create: [
          { name: 'Со вкусом утки', sku: 'MR-PET-5B1-DUCK', stock: 50 },
          { name: 'Со вкусом индейки', sku: 'MR-PET-5B1-TURKEY', stock: 50 },
        ],
      },
      attributes: {
        create: [
          { key: 'Форма выпуска', value: 'функциональные снеки' },
          { key: 'Количество', value: '90 шт' },
          { key: 'Дозировка', value: '1 снек на 10 кг веса' },
          { key: 'Состав', value: 'мясо утки/индейки, овес, горох, льняное семя, кокосовое масло, куркума, Qmin+, BioPerine, глюкозамин, хондроитин, МСМ, витамины C и D3, лактобактерии' },
          { key: 'Показания', value: 'поддержка суставов, сердца, кишечника, кожи, печени; снижение усталости; профилактика аллергии' },
          { key: 'Производитель', value: 'ООО Mr. Pet, г. Москва' },
          { key: 'ТУ', value: 'ТУ № 72956661-001-2023' },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
