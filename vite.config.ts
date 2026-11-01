import { defineConfig, lazyPlugins } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { site } from "./site.config.ts";
import { absoluteUrl } from "./src/lib/site.ts";

// Routes that are prerendered but kept out of the sitemap.
const hiddenFromSitemap = /^\/(_kit|404|plugins)$/;

export default defineConfig({
  base: site.basePath,
  staged: { "*": "vp check --fix" },
  fmt: { ignorePatterns: ["src/routeTree.gen.ts", "src/styles/theme.css"] },
  run: {
    tasks: {
      tokens: {
        command: "vpx ./scripts/tokens.ts",
        cache: { input: ["design/tokens.json", "scripts/tokens.ts"] },
      },
      // Builds, then serves dist/client like GitHub Pages at http://localhost:4173/website/.
      preview: { command: ["vp build", "vpx ./scripts/serve.ts"], cache: false },
      // Scans bun.lock for known vulnerabilities (config in trivy.yaml).
      security: { command: "trivy fs --config trivy.yaml .", cache: false },
    },
  },
  lint: {
    ignorePatterns: ["dist/**", "src/routeTree.gen.ts"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  resolve: { tsconfigPaths: true },
  test: {
    projects: [
      { extends: true, test: { name: "unit", include: ["{src,scripts}/**/*.test.ts"] } },
      {
        // Component tests run in Chromium, without the Start plugin.
        extends: false,
        plugins: [tailwindcss(), viteReact()],
        resolve: { tsconfigPaths: true },
        test: {
          name: "browser",
          include: ["src/**/*.test.tsx"],
          browser: {
            enabled: true,
            headless: true,
            provider: playwright(),
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
  plugins: lazyPlugins(() => [
    tailwindcss(),
    tanstackStart({
      // Crawling is off: with a base path it doubles the base in the sitemap and
      // renders every page twice (TanStack Router #8516, #6978). Static routes are
      // discovered from the route tree; dynamic ones are listed in `pages`.
      prerender: {
        enabled: true,
        crawlLinks: false,
        failOnError: true,
        onSuccess: ({ page }) =>
          hiddenFromSitemap.test(page.path) ? { sitemap: { exclude: true } } : undefined,
      },
      sitemap: { host: absoluteUrl("/").replace(/\/$/, "") },
      // Server routes that write files; they are not discovered automatically.
      pages: [
        { path: "/robots.txt", sitemap: { exclude: true } },
        // GitHub Pages serves 404.html at the site root for unknown URLs.
        { path: "/404", prerender: { outputPath: "/404.html" }, sitemap: { exclude: true } },
      ],
    }),
    viteReact(),
  ]),
});
