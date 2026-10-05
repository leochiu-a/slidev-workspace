import { defineConfig, devices } from "@playwright/test";
import { resolve } from "node:path";

export default defineConfig({
  testDir: "./e2e",
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "jiti e2e/serve.ts",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    env: {
      SLIDEV_WORKSPACE_CWD: resolve(
        import.meta.dirname,
        "e2e/fixtures/workspace",
      ),
    },
  },
});
