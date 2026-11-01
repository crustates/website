import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/plugins")({
  head: () =>
    seo({
      title: i18n.t("meta.plugins.title"),
      description: i18n.t("meta.plugins.description"),
      path: "/plugins",
    }),
  component: PluginsPage,
});

// Stub: filled in by the part 2 page port.
function PluginsPage() {
  return null;
}
