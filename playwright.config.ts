import { defineConfig, devices } from '@playwright/test';
import { resolveEnvironment } from './src/utils/envResolver';

// Primary: TEST_ENV (CLI), Secondary: env.config.json
const { envName, baseURL } = resolveEnvironment();

export default defineConfig({
  testDir: './src/tests',

  // Global timeouts
  timeout: 30_000,
  expect: { timeout: 5_000 },

  // Stability & debug defaults
  retries: 1,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }]],

  use: {
    headless: true,
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },

  // Cross-browser projects
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ]
});

// Visibility for runner logs
console.log(`[playwright.config] Using ENV: ${envName}`);
console.log(`[playwright.config] baseURL: ${baseURL}`);