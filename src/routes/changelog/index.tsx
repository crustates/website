import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/changelog/")({
  head: () =>
    seo({
      title: i18n.t("meta.changelog.title"),
      description: i18n.t("meta.changelog.description"),
      path: "/changelog",
    }),
  component: ChangelogPage,
});

// Stub: filled in by the part 3 page port.
function ChangelogPage() {
  return null;
}
