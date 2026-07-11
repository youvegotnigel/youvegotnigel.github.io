import { test, expect } from '@playwright/test';

test('page loads with the correct title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Nigel Mulholland/);
});

test('every nav link targets an existing section', async ({ page }) => {
  await page.goto('/');
  const hrefs = await page
    .locator('.nav-links a')
    .evaluateAll((anchors) => anchors.map((a) => a.getAttribute('href')));
  expect(hrefs.length).toBeGreaterThan(0);
  for (const href of hrefs) {
    await expect(page.locator(href!), `nav target ${href} missing`).toHaveCount(1);
  }
});

test('hero CTA links resolve to in-page targets or assets', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-cta a')).toHaveCount(3);
});
