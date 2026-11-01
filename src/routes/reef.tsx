import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reef")({
  head: () =>
    seo({
      title: i18n.t("meta.reef.title"),
      description: i18n.t("meta.reef.description"),
      path: "/reef",
    }),
  component: ReefPage,
});

// Stub: filled in by the part 2 page port.
function ReefPage() {
  return null;
}
