import { createFileRoute } from "@tanstack/react-router";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/about.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: i18n.t("meta.about.title"),
      description: i18n.t("meta.about.description"),
      path: "/about",
    }),
  component: AboutPage,
});

function AboutPage() {
  addNamespace("about", copy);
  return null;
}
