import { createFileRoute } from "@tanstack/react-router";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/api.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/api")({
  head: () =>
    seo({
      title: i18n.t("meta.api.title"),
      description: i18n.t("meta.api.description"),
      path: "/api",
    }),
  component: ApiPage,
});

function ApiPage() {
  addNamespace("api", copy);
  return null;
}
