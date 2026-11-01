import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      title: i18n.t("meta.faq.title"),
      description: i18n.t("meta.faq.description"),
      path: "/faq",
    }),
  component: FaqPage,
});

// Stub: filled in by the part 3 page port.
function FaqPage() {
  return null;
}
