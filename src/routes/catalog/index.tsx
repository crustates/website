import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/catalog/")({
  head: () =>
    seo({
      title: i18n.t("meta.catalog.title"),
      description: i18n.t("meta.catalog.description"),
      path: "/catalog",
    }),
  component: CatalogPage,
});

// Stub: filled in by the part 3 page port.
function CatalogPage() {
  return null;
}
