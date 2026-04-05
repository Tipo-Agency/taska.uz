import { test, expect } from '@playwright/test';

test.describe('Contact modal', () => {
  test('shows success after submit when /api/deals returns 200', async ({ page }) => {
    await page.route('**/api/deals', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: '{}',
      });
    });

    await page.goto('/');
    await page.getByTestId('header-cta-contact').click();

    await expect(page.getByTestId('contact-modal-form')).toBeVisible({ timeout: 10_000 });

    await page.getByTestId('contact-modal-form').locator('input[type="text"]').fill('E2E Modal');
    await page.getByTestId('contact-modal-form').locator('input[type="tel"]').fill('90 123 45 67');

    await page.getByTestId('contact-modal-form').locator('button[type="submit"]').click();

    await expect(
      page.getByRole('heading', { name: /заявка|yuborildi|Application sent/i }),
    ).toBeVisible({
      timeout: 15_000,
    });
  });
});
