import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  use: {
    ...devices["Desktop Chrome"],
    baseURL: "http://127.0.0.1:3001",
  },
  webServer: [
    {
      command: "npx tsx src/server/index.ts",
      url: "http://127.0.0.1:4000/health",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: "npx next dev -H 127.0.0.1 -p 3001",
      url: "http://127.0.0.1:3001",
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
      env: { CONTENT_API_URL: "http://127.0.0.1:4000" },
    },
  ],
});
