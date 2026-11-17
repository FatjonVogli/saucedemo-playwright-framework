import { defineConfig, devices } from '@playwright/test';
import { env } from './src/config/env';
import { authFiles } from './src/data/testData';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: env.isCI,
  retries: env.isCI ? 2 : 0,
  workers: env.isCI ? 2 : env.headless ? undefined : 1,
  timeout: env.isDebugging ? 0 : 30_000,
  expect: { timeout: env.isDebugging ? 0 : 5_000 },
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    headless: env.headless,
    launchOptions: { slowMo: env.slowMo },
    testIdAttribute: env.testIdAttribute,
    actionTimeout: env.isDebugging ? 0 : 10_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /[\\/]setup[\\/].*\.setup\.ts$/,
      use: { ...devices['Desktop Chrome'], baseURL: env.baseUrl || undefined },
    },
    {
      name: 'ui',
      testMatch: /[\\/]ui[\\/].*\.spec\.ts$/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        baseURL: env.baseUrl || undefined,
        storageState: authFiles.standard,
      },
    },
    {
      name: 'api',
      testMatch: /[\\/]api[\\/].*\.spec\.ts$/,
      use: {
        baseURL: env.apiUrl || undefined,
        extraHTTPHeaders: { Accept: 'application/json' },
      },
    },
  ],
});
