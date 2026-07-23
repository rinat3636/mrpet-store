# Mr.Pet — интернет-магазин

Полноценный интернет-магазин на Next.js + Prisma + Tailwind CSS с интеграцией **ЮKassa**.

## Особенности

- Дизайн, цвета и контент построены на основе предоставленных макетов Mr.Pet.
- Каталог, карточка товара, корзина, оформление заказа.
- Оплата через **ЮKassa** (перенаправление на платёжный шлюз, webhook-уведомления).
- Админ-панель для управления ценами, остатками и заказами.
- Легко масштабируется: поддержка PostgreSQL через `DATABASE_URL`.

## Быстрый старт

```bash
npm install
cp .env.example .env
# заполните YOOKASSA_SHOP_ID, YOOKASSA_SECRET_KEY, ADMIN_PASSWORD и контактные данные
npx prisma migrate dev
npm run seed
npm run dev
```

Откройте http://localhost:3000.

## Админ-панель

http://localhost:3000/admin  
Пароль задаётся в переменной `ADMIN_PASSWORD`.

## Наполнение и цены

Цены на товары изначально не заполнены (данные отсутствуют в исходных материалах). Установите цены через админ-панель. Пока цена не задана, товар отображается как «Цена по запросу» и не добавляется в корзину.

## ЮKassa

1. Получите `shopId` и `secretKey` в личном кабинете ЮKassa.
2. Укажите их в `.env`.
3. Установите в кабинете ЮKassa webhook URL: `https://ваш-домен.рф/api/webhook`.
4. В `.env` задайте `NEXT_PUBLIC_SITE_URL` и `YOOKASSA_RETURN_URL`.

## Docker

```bash
docker compose up --build -d
```

## Переменные окружения

| Переменная | Описание |
|------------|----------|
| `DATABASE_URL` | SQLite по умолчанию; для PostgreSQL замените строку подключения |
| `NEXT_PUBLIC_SITE_URL` | Публичный URL сайта |
| `YOOKASSA_SHOP_ID` | Идентификатор магазина ЮKassa |
| `YOOKASSA_SECRET_KEY` | Секретный ключ ЮKassa |
| `YOOKASSA_RETURN_URL` | URL возврата после оплаты |
| `ADMIN_PASSWORD` | Пароль входа в админ-панель |
| `COMPANY_*` | Реквизиты и контакты компании |
