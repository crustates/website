import { describe, expect, test } from "vite-plus/test";
import { robotsTxt, seo } from "./seo";

describe("seo", () => {
  const head = seo({
    title: "Features",
    description: "Everything in one platform.",
    path: "/features",
  });

  test("titles the page after the site", () => {
    expect(head.meta).toContainEqual({ title: "Features · Crustates" });
    expect(head.meta).toContainEqual({
      name: "description",
      content: "Everything in one platform.",
    });
  });

  test("points canonical and Open Graph URLs at the configured origin and base", () => {
    expect(head.links).toContainEqual({
      rel: "canonical",
      href: "https://crustates.github.io/website/features/",
    });
    expect(head.meta).toContainEqual({
      property: "og:url",
      content: "https://crustates.github.io/website/features/",
    });
    expect(head.meta).toContainEqual({
      property: "og:image",
      content: "https://crustates.github.io/website/brand/og-image.png",
    });
  });

  test("sets a large Twitter card", () => {
    expect(head.meta).toContainEqual({ name: "twitter:card", content: "summary_large_image" });
    expect(head.meta).toContainEqual({ name: "twitter:title", content: "Features · Crustates" });
  });

  test("marks hidden pages noindex and leaves out the canonical link", () => {
    const hidden = seo({
      title: "UI kit",
      description: "Components.",
      path: "/_kit",
      noindex: true,
    });
    expect(hidden.meta).toContainEqual({ name: "robots", content: "noindex" });
    expect(hidden.links).toEqual([]);
  });
});

test("robots.txt allows everything and points at the sitemap", () => {
  expect(robotsTxt()).toBe(
    "User-agent: *\nAllow: /\n\nSitemap: https://crustates.github.io/website/sitemap.xml\n",
  );
});
