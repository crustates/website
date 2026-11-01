import { createFileRoute } from "@tanstack/react-router";
import { posts } from "@/content";
import { i18n } from "@/i18n";
import { rssXml } from "@/lib/rss";

// Prerendered to dist/client/blog/rss.xml (listed in vite.config.ts `pages`).
export const Route = createFileRoute("/blog/rss.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          rssXml({
            title: `${i18n.t("meta.blog.title")} · Crustates`,
            description: i18n.t("meta.blog.description"),
            path: "/blog",
            items: posts.map((p) => ({
              title: p.title,
              path: `/blog/${p.slug}`,
              date: p.date,
              description: p.summary.replaceAll("`", ""),
            })),
          }),
          { headers: { "content-type": "application/rss+xml; charset=utf-8" } },
        ),
    },
  },
});
