import { createFileRoute } from "@tanstack/react-router";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/download.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/download")({
  head: () =>
    seo({
      title: i18n.t("meta.download.title"),
      description: i18n.t("meta.download.description"),
      path: "/download",
    }),
  component: DownloadPage,
});

function DownloadPage() {
  addNamespace("download", copy);
  return null;
}
