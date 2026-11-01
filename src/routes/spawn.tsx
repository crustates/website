import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/spawn")({
  head: () =>
    seo({
      title: i18n.t("meta.spawn.title"),
      description: i18n.t("meta.spawn.description"),
      path: "/spawn",
    }),
  component: SpawnPage,
});

// Stub: filled in by the part 2 page port.
function SpawnPage() {
  return null;
}
