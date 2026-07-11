import { test, expect } from '@playwright/test';

test('about links the AI claim to the lab section', async ({ page }) => {
  await page.goto('/');
  const link = page.locator('#about a[href="#lab"]');
  await expect(link).toHaveCount(1);
  await expect(page.locator('#lab')).toHaveCount(1);
});
