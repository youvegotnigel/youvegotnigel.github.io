import { test, expect } from '@playwright/test';

test.describe('seo metadata', () => {
  test('meta description, canonical, OG and twitter tags exist', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Test Automation/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://youvegotnigel.github.io/'
    );
    for (const prop of ['og:title', 'og:description', 'og:image', 'og:url', 'og:type']) {
      await expect(page.locator(`meta[property="${prop}"]`), `${prop} missing`).toHaveCount(1);
    }
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      'content',
      'summary_large_image'
    );
  });

  test('JSON-LD person schema parses and has sameAs profiles', async ({ page }) => {
    await page.goto('/');
    const raw = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(raw!);
    expect(data['@type']).toBe('Person');
    expect(data.name).toBe('Nigel Mulholland');
    expect(data.sameAs).toContain('https://github.com/youvegotnigel');
  });

  test('robots.txt and sitemap.xml are served', async ({ request }) => {
    const robots = await request.get('/robots.txt');
    expect(robots.status()).toBe(200);
    expect(await robots.text()).toContain('Sitemap:');
    const sitemap = await request.get('/sitemap.xml');
    expect(sitemap.status()).toBe(200);
  });

  test('og image exists and is served', async ({ request }) => {
    const res = await request.get('/assets/images/og-image.png');
    expect(res.status()).toBe(200);
    expect(res.headers()['content-type']).toContain('image/png');
  });
});
