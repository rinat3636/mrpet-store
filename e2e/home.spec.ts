import { test, expect } from '@playwright/test';

test.describe('Mr.Pet storefront', () => {
  test('homepage renders hero, sections and navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Mr\.Pet/);
    await expect(page.locator('h1')).toContainText('Mr.Pet');
    await expect(page.locator('text=Когда принимать?')).toBeVisible();
    await expect(page.locator('text=Документация и состав')).toBeVisible();
  });

  test('catalog page lists the product', async ({ page }) => {
    await page.goto('/catalog');
    await expect(page.locator('h1')).toContainText('Каталог');
    const links = page.locator('a[href^="/catalog/"]');
    await expect(links.first()).toBeVisible();
  });

  test('product page opens and has an add-to-cart button', async ({ page }) => {
    await page.goto('/catalog/mrpet-vitamins-dogs-5in1');
    await expect(page.locator('h1')).toContainText('Mr.Pet');
    await expect(page.locator('button', { hasText: 'В корзину' })).toBeVisible();
  });

  test('cart opens from header and product can be added only after price', async ({ page }) => {
    await page.goto('/catalog/mrpet-vitamins-dogs-5in1');
    const addBtn = page.locator('button', { hasText: 'В корзину' });
    await expect(addBtn).toBeVisible();
    // Price not set in seed, so the add button must be disabled
    await expect(addBtn).toBeDisabled();
  });

  test('delivery and contacts pages are accessible', async ({ page }) => {
    await page.goto('/delivery');
    await expect(page.locator('h1')).toContainText('Доставка');
    await page.goto('/contacts');
    await expect(page.locator('h1')).toContainText('Контакты');
  });
});
