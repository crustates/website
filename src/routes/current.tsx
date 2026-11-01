import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/current")({
  head: () =>
    seo({
      title: i18n.t("meta.current.title"),
      description: i18n.t("meta.current.description"),
      path: "/current",
    }),
  component: CurrentPage,
});

// Stub: filled in by the part 2 page port.
function CurrentPage() {
  return null;
}
