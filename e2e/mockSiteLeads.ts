import type { Page } from '@playwright/test';

/** Подмена tipa: успешный ответ на POST site/leads (без реального nginx). */
export async function mockSiteLeadsOk(page: Page): Promise<void> {
  await page.route('**/api/integrations/site/leads', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: '{}',
    });
  });
}
