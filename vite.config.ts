import { defineConfig, lazyPlugins } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import contentCollections from "@content-collections/vite";
import mdx from "@mdx-js/rollup";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import { site } from "./site.config.ts";
import { draftMdx } from "./src/content/draft-mdx.ts";
import { contentPaths } from "./src/content/paths.ts";

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
      // Validates content/ and writes .content-collections/ (also runs on vp install).
      content: { command: "vpx ./scripts/content.ts", cache: false },
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
    contentCollections(),
    draftMdx(process.env.SHOW_DRAFTS === "true"),
    // Blog bodies: MDX compiled at build time, so the browser never evaluates code.
    { enforce: "pre", ...mdx({ remarkPlugins: [remarkFrontmatter], rehypePlugins: [rehypeSlug] }) },
    tailwindcss(),
    tanstackStart({
      // Crawling is off: with a base path it doubles the base in the sitemap and
      // renders every page twice (TanStack Router #8516, #6978). Static routes are
      // discovered from the route tree; dynamic ones are listed in `pages`.
      prerender: {
        enabled: true,
        crawlLinks: false,
        failOnError: true,
      },
      // src/routes/sitemap[.]xml.ts writes the sitemap instead.
      sitemap: { enabled: false },
      // Server routes that write files; they are not discovered automatically.
      pages: [
        { path: "/robots.txt" },
        { path: "/sitemap.xml" },
        { path: "/blog/rss.xml" },
        { path: "/changelog/rss.xml" },
        // The install script, as an extensionless file for `curl … | sh`.
        { path: "/install", prerender: { outputPath: "/install" } },
        // One page per blog post, release and catalog app. Drafts only with SHOW_DRAFTS=true.
        ...contentPaths("content", process.env.SHOW_DRAFTS === "true").map((path) => ({
          path: `${path}/`,
        })),
        // GitHub Pages serves 404.html at the site root for unknown URLs.
        { path: "/404", prerender: { outputPath: "/404.html" } },
      ],
    }),
    viteReact({ include: /\.(mdx|[jt]sx?)$/ }),
  ]),
});
