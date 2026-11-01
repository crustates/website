import { createFileRoute } from "@tanstack/react-router";
import { releases } from "@/content";
import { i18n } from "@/i18n";
import { rssXml } from "@/lib/rss";

// Prerendered to dist/client/changelog/rss.xml (listed in vite.config.ts `pages`).
export const Route = createFileRoute("/changelog/rss.xml")({
  server: {
    handlers: {
      GET: () =>
        new Response(
          rssXml({
            title: `${i18n.t("meta.changelog.title")} · Crustates`,
            description: i18n.t("meta.changelog.description"),
            path: "/changelog",
            items: releases.map((r) => ({
              title: i18n.t("meta.release.title", { version: r.version }),
              path: `/changelog/${r.version}`,
              date: r.date,
              description: r.summary.replaceAll("`", ""),
            })),
          }),
          { headers: { "content-type": "application/rss+xml; charset=utf-8" } },
        ),
    },
  },
});
