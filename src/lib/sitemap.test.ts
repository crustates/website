import { expect, test } from "vite-plus/test";
import { pagePaths, sitemapXml } from "./sitemap";

test("lists every page route file except hidden ones, as trailing-slash paths", () => {
  const files = [
    "./__root.tsx",
    "./index.tsx",
    "./tide.tsx",
    "./features.tsx",
    "./404.tsx",
    "./[_]kit.tsx",
    "./plugins.tsx",
    "./robots[.]txt.ts",
    "./blog.$slug.tsx",
    "./blog/index.tsx",
    "./blog/$slug.tsx",
    "./blog/rss[.]xml.ts",
  ];
  expect(pagePaths(files)).toEqual(["/", "/blog/", "/features/", "/tide/"]);
});

test("writes absolute URLs under the configured origin and base", () => {
  const xml = sitemapXml(["/", "/tide/"]);
  expect(xml).toContain("<loc>https://crustates.github.io/website/</loc>");
  expect(xml).toContain("<loc>https://crustates.github.io/website/tide/</loc>");
  expect(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')).toBe(true);
});
