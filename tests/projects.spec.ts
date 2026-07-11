import { test, expect } from '@playwright/test';

test.describe('selected work section', () => {
  test('has exactly 4 professional case studies', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#projects .project')).toHaveCount(4);
  });

  test('K6 performance case study exists with a GitHub proof link', async ({ page }) => {
    await page.goto('/');
    const k6Card = page.locator('#projects .project', { hasText: 'K6 Performance Testing Framework' });
    await expect(k6Card).toHaveCount(1);
    await expect(
      k6Card.locator('a[href="https://github.com/youvegotnigel/saucedemo-k6-perf"]')
    ).toBeVisible();
  });

  test('Selenide BDD case study links to its public reference implementation', async ({ page }) => {
    await page.goto('/');
    const card = page.locator('#projects .project', { hasText: 'Selenide BDD Automation Framework' });
    await expect(
      card.locator('a[href="https://github.com/youvegotnigel/selenide-cucumber-framework"]')
    ).toBeVisible();
  });

  test('cheat sheet card is no longer in selected work', async ({ page }) => {
    await page.goto('/');
    await expect(
      page.locator('#projects .project', { hasText: 'Playwright Commands Cheat Sheet' })
    ).toHaveCount(0);
  });
});
