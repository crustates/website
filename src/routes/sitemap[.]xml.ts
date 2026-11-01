import { createFileRoute } from "@tanstack/react-router";
import { contentPagePaths } from "@/content";
import { pagePaths, sitemapXml } from "@/lib/sitemap";

// Prerendered to dist/client/sitemap.xml (listed in vite.config.ts `pages`).
// TanStack Start's own sitemap drops the trailing slash our page URLs use.
const routeFiles = Object.keys(import.meta.glob("./**/*.tsx"));

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(sitemapXml([...pagePaths(routeFiles), ...contentPagePaths()]), {
          headers: { "content-type": "application/xml; charset=utf-8" },
        }),
    },
  },
});
