import { defineConfig, devices } from "@playwright/test";
import * as dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./ui-tests/specs",

  /* Parallel + CI safety */
  fullyParallel: true,
  forbidOnly: !!process.env.CI, // fail build if test.only exists
  retries: process.env.CI ? 2 : 0, // retry only in CI
  workers: process.env.CI ? 1 : undefined, // avoid flaky parallel CI

  /* Reports */
  reporter: [
    ["list"], // nice local terminal output
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],

  /* Where artifacts go */
  outputDir: "test-results",

  /* Shared browser settings */
  use: {
    baseURL: "https://qa-task.demo.kramp.com",

    headless: process.env.HEADLESS !== "false",

    trace: "on-first-retry", // best tradeoff cost/debug
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },

  /* Browser matrix */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
