import { createFileRoute } from "@tanstack/react-router";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/security.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/security")({
  head: () =>
    seo({
      title: i18n.t("meta.security.title"),
      description: i18n.t("meta.security.description"),
      path: "/security",
    }),
  component: SecurityPage,
});

function SecurityPage() {
  addNamespace("security", copy);
  return null;
}
