import { chromium } from '@playwright/test';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 2 });
await page.goto('file://' + path.join(dir, 'og-template.html'));
await page.waitForLoadState('networkidle');
await page.screenshot({ path: path.join(dir, '..', 'assets', 'images', 'og-image.png') });
await browser.close();
console.log('og-image.png generated');
