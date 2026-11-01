import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/cast")({
  head: () =>
    seo({
      title: i18n.t("meta.cast.title"),
      description: i18n.t("meta.cast.description"),
      path: "/cast",
    }),
  component: CastPage,
});

// Stub: filled in by the part 2 page port.
function CastPage() {
  return null;
}
