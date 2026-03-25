import { defineConfig, devices } from "@playwright/test";

const isCI = process.env.CI === "true";

export default defineConfig({
  testDir: "./e2e/tests",
  snapshotDir: "./e2e/snapshots",
  snapshotPathTemplate: "{snapshotDir}/{testFileDir}/{testFileName}-snapshots/{arg}{-projectName}{ext}",
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? "50%" : undefined,
  timeout: 45_000,
  expect: {
    timeout: 7_500
  },
  reporter: [
    ["html", { outputFolder: "artifacts/playwright/html", open: "never" }],
    ["json", { outputFile: "artifacts/playwright/results.json" }],
    ["junit", { outputFile: "artifacts/playwright/junit.xml" }]
  ],
  outputDir: "artifacts/playwright/test-results",
  use: {
    baseURL: "http://127.0.0.1:4173",
    headless: true,
    video: "retain-on-failure",
    screenshot: "only-on-failure",
    trace: "retain-on-failure"
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] }
    }
  ],
  webServer: {
    command: "npm run preview -- --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173",
    reuseExistingServer: !isCI,
    timeout: 120_000
  }
});
