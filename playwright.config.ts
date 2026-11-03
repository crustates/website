import { defineConfig, devices } from "@playwright/test";
import { site } from "./site.config.ts";

// End-to-end tests against the built site (run `vp build` first), served by
// scripts/serve.ts the way GitHub Pages serves it.
// Its own port, so a `vp run preview` on 4173 (maybe from another checkout) isn't reused.
const port = 4174;
const origin = `http://localhost:${port}`;

export default defineConfig({
  testDir: "e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  reporter: process.env.CI ? [["github"], ["list"]] : [["list"], ["html", { open: "never" }]],
  use: { ...devices["Desktop Chrome"], baseURL: origin },
  webServer: {
    command: "node scripts/serve.ts",
    env: { PORT: String(port) },
    url: `${origin}${site.basePath}`,
    reuseExistingServer: false,
  },
  projects: [
    { name: "e2e", testMatch: "site.spec.ts" },
    // Local only: compares pages with the design kit (DESIGN_KIT_DIR).
    { name: "design", testMatch: "design.spec.ts" },
  ],
});
