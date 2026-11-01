import { createFileRoute } from "@tanstack/react-router";
import { robotsTxt } from "@/lib/seo";

// Prerendered to dist/client/robots.txt (listed in vite.config.ts `pages`).
export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(robotsTxt(), { headers: { "content-type": "text/plain; charset=utf-8" } }),
    },
  },
});
