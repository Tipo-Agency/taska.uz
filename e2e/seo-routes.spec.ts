import { test, expect } from '@playwright/test';

test.describe('Per-route document title', () => {
  test('home and login titles reflect SPA SEO', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Taska\.uz/);

    await page.goto('/login');
    await expect(page).toHaveTitle(/демо|demo|Taska|kirish/i);
  });
});
