import { createFileRoute } from "@tanstack/react-router";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/legal.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/legal")({
  head: () =>
    seo({
      title: i18n.t("meta.legal.title"),
      description: i18n.t("meta.legal.description"),
      path: "/legal",
    }),
  component: LegalPage,
});

function LegalPage() {
  addNamespace("legal", copy);
  return null;
}
