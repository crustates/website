import { createFileRoute } from "@tanstack/react-router";
import { installScript } from "@/lib/install";

// Prerendered to dist/client/install, the URL behind `curl … | sh` (listed in vite.config.ts `pages`).
export const Route = createFileRoute("/install")({
  server: {
    handlers: {
      GET: () =>
        new Response(installScript(), { headers: { "content-type": "text/plain; charset=utf-8" } }),
    },
  },
});
