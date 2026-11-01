import { createFileRoute } from "@tanstack/react-router";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/brand.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/brand")({
  head: () =>
    seo({
      title: i18n.t("meta.brand.title"),
      description: i18n.t("meta.brand.description"),
      path: "/brand",
    }),
  component: BrandPage,
});

function BrandPage() {
  addNamespace("brand", copy);
  return null;
}
