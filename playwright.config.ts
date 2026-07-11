import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://localhost:4173',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npx serve -l 4173 .',
    url: 'http://localhost:4173',
    reuseExistingServer: !process.env.CI,
  },
});
