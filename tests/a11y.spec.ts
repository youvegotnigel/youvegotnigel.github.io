import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page passes axe WCAG 2.1 A/AA scan', async ({ page }) => {
  await page.goto('/');
  // Let the terminal animation finish so scanned DOM is stable.
  await page.waitForTimeout(6000);
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
    .analyze();
  const summary = results.violations.map(
    (v) => `${v.id}: ${v.help} → ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`
  );
  expect(results.violations, summary.join('\n')).toEqual([]);
});
