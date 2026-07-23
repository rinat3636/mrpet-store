import { test, expect } from '@playwright/test';

test.describe('Mr.Pet storefront', () => {
  test('homepage renders hero, sections and navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mr\.Pet/);
    await expect(page.locator('h1')).toContainText('Mr.Pet');
    await expect(page.locator('text=Когда принимать?')).toBeVisible();
    await expect(page.getByRole('link', { name: 'Купить Mr.Pet на Ozon' })).toBeVisible();
  });

  test('catalog page lists the product', async ({ page }) => {
    await page.goto('/catalog');
    await expect(page.locator('h1')).toContainText('Каталог');
    const links = page.locator('a[href^="/catalog/"]');
    await expect(links.first()).toBeVisible();
  });

  test('product page opens and has Ozon purchase link and variants', async ({ page }) => {
    await page.goto('/catalog/mrpet-vitamins-dogs-5in1');
    await expect(page.locator('h1')).toContainText('Mr.Pet');
    await expect(page.getByRole('link', { name: 'Купить на Ozon' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Поддержка суставов' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Поддержка жизненной силы' })).toBeVisible();
  });

  test('delivery and contacts pages are accessible', async ({ page }) => {
    await page.goto('/delivery');
    await expect(page.locator('h1')).toContainText('Доставка');
    await expect(page.locator('text=Авито')).toBeVisible();
    await expect(page.locator('text=СДЭК')).toBeVisible();
    await expect(page.locator('text=Почта России')).toBeVisible();
    await page.goto('/contacts');
    await expect(page.locator('h1')).toContainText('Контакты');
  });
});
