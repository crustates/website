import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/barnacle")({
  head: () =>
    seo({
      title: i18n.t("meta.barnacle.title"),
      description: i18n.t("meta.barnacle.description"),
      path: "/barnacle",
    }),
  component: BarnaclePage,
});

// Stub: filled in by the part 2 page port.
function BarnaclePage() {
  return null;
}
