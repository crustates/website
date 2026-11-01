import { createFileRoute } from "@tanstack/react-router";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/community.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/community")({
  head: () =>
    seo({
      title: i18n.t("meta.community.title"),
      description: i18n.t("meta.community.description"),
      path: "/community",
    }),
  component: CommunityPage,
});

function CommunityPage() {
  addNamespace("community", copy);
  return null;
}
