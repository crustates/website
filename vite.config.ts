import { defineConfig, lazyPlugins } from "vite-plus";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { site } from "./site.config";
import { absoluteUrl } from "./src/lib/site";

// Routes that are prerendered but kept out of the sitemap.
const hiddenFromSitemap = /^\/(_kit|404)$/;

export default defineConfig({
  base: site.basePath,
  staged: { "*": "vp check --fix" },
  fmt: { ignorePatterns: ["src/routeTree.gen.ts"] },
  lint: {
    ignorePatterns: ["dist/**", "src/routeTree.gen.ts"],
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  resolve: { tsconfigPaths: true },
  plugins: lazyPlugins(() => [
    tanstackStart({
      // Crawling is off: with a base path it doubles the base in the sitemap and
      // renders every page twice (TanStack Router #8516, #6978). Static routes are
      // discovered from the route tree; dynamic ones are listed in `pages`.
      prerender: {
        enabled: true,
        crawlLinks: false,
        autoSubfolderIndex: false,
        failOnError: true,
        onSuccess: ({ page }) =>
          hiddenFromSitemap.test(page.path) ? { sitemap: { exclude: true } } : undefined,
      },
      sitemap: { host: absoluteUrl("/").replace(/\/$/, "") },
    }),
    viteReact(),
  ]),
});
