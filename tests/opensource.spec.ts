import { test, expect } from '@playwright/test';

test.describe('open source & lab section', () => {
  test('section exists with 5 featured repo cards', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#opensource')).toHaveCount(1);
    await expect(page.locator('#opensource .oss-card')).toHaveCount(5);
  });

  test('cheat sheet card has live and GitHub links', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('#opensource .oss-card', { hasText: 'Playwright Commands Cheat Sheet' });
    await expect(
      card.locator('a[href="https://youvegotnigel.github.io/playwright-commands-cheat-sheet/"]')
    ).toBeVisible();
    await expect(
      card.locator('a[href="https://github.com/youvegotnigel/playwright-commands-cheat-sheet"]')
    ).toBeVisible();
  });

  test('every featured card links to GitHub', async ({ page }) => {
    await page.goto('/');
    const cards = page.locator('#opensource .oss-card');
    for (let i = 0; i < 5; i++) {
      await expect(cards.nth(i).locator('a[href^="https://github.com/youvegotnigel/"]')).toHaveCount(1);
    }
  });

  test('lab strip features selenide-mcp', async ({ page }) => {
    await page.goto('/');
    const lab = page.locator('#lab');
    await expect(lab).toHaveCount(1);
    await expect(lab.locator('a[href="https://github.com/youvegotnigel/selenide-mcp"]')).toBeVisible();
  });

  test('nav links to the section and blogs is renumbered to 06', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.nav-links a[href="#opensource"]')).toHaveCount(1);
    await expect(page.locator('#opensource .section-num')).toHaveText('05');
    await expect(page.locator('#blogs .section-num')).toHaveText('06');
  });
});
