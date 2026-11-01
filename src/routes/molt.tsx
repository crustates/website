import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/molt")({
  head: () =>
    seo({
      title: i18n.t("meta.molt.title"),
      description: i18n.t("meta.molt.description"),
      path: "/molt",
    }),
  component: MoltPage,
});

// Stub: filled in by the part 2 page port.
function MoltPage() {
  return null;
}
