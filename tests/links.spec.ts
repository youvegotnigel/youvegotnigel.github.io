import { test, expect } from '@playwright/test';

// These hosts block automated requests (LinkedIn returns 999, X blocks bots).
// Their links are still covered by visibility assertions in other specs.
const SKIP_HOSTS = ['www.linkedin.com', 'linkedin.com', 'x.com', 'twitter.com'];

test('all external links resolve', async ({ page, request }) => {
  test.setTimeout(120_000);
  await page.goto('/');
  const urls = await page
    .locator('a[href^="http"]')
    .evaluateAll((anchors) => [...new Set(anchors.map((a) => (a as HTMLAnchorElement).href))]);
  expect(urls.length).toBeGreaterThan(10);

  const failures: string[] = [];
  for (const url of urls) {
    if (SKIP_HOSTS.includes(new URL(url).hostname)) continue;
    const res = await request.get(url, { timeout: 20_000 }).catch(() => null);
    if (!res || res.status() >= 400) {
      failures.push(`${url} → ${res ? res.status() : 'no response'}`);
    }
  }
  expect(failures, `dead links:\n${failures.join('\n')}`).toEqual([]);
});
