import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/compare")({
  head: () =>
    seo({
      title: i18n.t("meta.compare.title"),
      description: i18n.t("meta.compare.description"),
      path: "/compare",
    }),
  component: ComparePage,
});

// Stub: filled in by the part 2 page port.
function ComparePage() {
  return null;
}
