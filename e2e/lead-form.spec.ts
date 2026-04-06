import { test, expect } from '@playwright/test';
import { mockSiteLeadsOk } from './mockSiteLeads';

test.describe('Contact form (#contact)', () => {
  test('shows success after submit when site/leads returns 200', async ({ page }) => {
    await mockSiteLeadsOk(page);

    await page.goto('/');
    await page.locator('#contact').scrollIntoViewIfNeeded();

    await page.getByTestId('contact-inline-form').locator('input[type="text"]').fill('E2E Playwright');
    await page.getByTestId('contact-inline-form').locator('input[type="tel"]').fill('90 123 45 67');

    await page.getByTestId('contact-inline-form').locator('button[type="submit"]').click();

    await expect(page.getByRole('heading', { name: /принята|accepted|qabul/i })).toBeVisible({
      timeout: 15_000,
    });
  });
});
