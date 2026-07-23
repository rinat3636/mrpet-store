import { test } from '@playwright/test';
import path from 'path';

const screenshotsDir = path.join(__dirname, '..', 'screenshots-e2e');

async function screenshot(page: any, name: string, fullPage = true) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve(null);
        }
      }, 30);
    });
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: path.join(screenshotsDir, `${name}.png`), fullPage });
}

test('capture homepage', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await screenshot(page, 'home');
});

test('capture catalog page', async ({ page }) => {
  await page.goto('/catalog');
  await page.waitForLoadState('networkidle');
  await screenshot(page, 'catalog');
});

test('capture product page', async ({ page }) => {
  await page.goto('/catalog/mrpet-vitamins-dogs-5in1');
  await page.waitForLoadState('networkidle');
  await screenshot(page, 'product');
});

test('capture delivery page', async ({ page }) => {
  await page.goto('/delivery');
  await page.waitForLoadState('networkidle');
  await screenshot(page, 'delivery');
});

test('capture contacts page', async ({ page }) => {
  await page.goto('/contacts');
  await page.waitForLoadState('networkidle');
  await screenshot(page, 'contacts');
});
