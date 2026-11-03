import { defineConfig, devices } from "@playwright/test";
import { site } from "./site.config.ts";

// End-to-end tests against the built site (run `vp build` first), served by
// scripts/serve.ts the way GitHub Pages serves it.
const origin = "http://localhost:4173";

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"], ["html", { open: "never" }]],
  use: { ...devices["Desktop Chrome"], baseURL: origin },
  webServer: {
    command: "node scripts/serve.ts",
    url: `${origin}${site.basePath}`,
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "e2e", testMatch: "site.spec.ts" },
    // Local only: compares pages with the design kit (DESIGN_KIT_DIR).
    { name: "design", testMatch: "design.spec.ts" },
  ],
});
