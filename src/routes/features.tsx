import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/features")({
  head: () =>
    seo({
      title: i18n.t("meta.features.title"),
      description: i18n.t("meta.features.description"),
      path: "/features",
    }),
  component: FeaturesPage,
});

// Stub: filled in by the part 2 page port.
function FeaturesPage() {
  return null;
}
