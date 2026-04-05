import { test, expect } from '@playwright/test';

test.describe('Language switching', () => {
  test('switches ru → uz → en → ru (document lang + nav labels)', async ({ page }) => {
    await page.goto('/');

    const langMenu = () => page.getByRole('listbox', { name: 'Language' });
    const openLang = () => page.getByTestId('header-lang-trigger').click();

    await expect(page.locator('html')).toHaveAttribute('lang', 'ru-UZ');

    await openLang();
    await langMenu().getByRole('button').nth(1).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'uz');

    await openLang();
    await langMenu().getByRole('button').nth(2).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.getByRole('button', { name: 'Solutions' })).toBeVisible();

    await openLang();
    await langMenu().getByRole('button').nth(0).click();
    await expect(page.locator('html')).toHaveAttribute('lang', 'ru-UZ');
    await expect(page.getByRole('button', { name: 'Решения' })).toBeVisible();
  });
});
