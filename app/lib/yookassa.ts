import { YooKassa } from '@webzaytsev/yookassa-ts-sdk';

export const yookassa = YooKassa({
  shop_id: process.env.YOOKASSA_SHOP_ID || '',
  secret_key: process.env.YOOKASSA_SECRET_KEY || '',
});
