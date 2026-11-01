import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/roadmap")({
  head: () =>
    seo({
      title: i18n.t("meta.roadmap.title"),
      description: i18n.t("meta.roadmap.description"),
      path: "/roadmap",
    }),
  component: RoadmapPage,
});

// Stub: filled in by the part 3 page port.
function RoadmapPage() {
  return null;
}
