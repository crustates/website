import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/hardware")({
  head: () =>
    seo({
      title: i18n.t("meta.hardware.title"),
      description: i18n.t("meta.hardware.description"),
      path: "/hardware",
    }),
  component: HardwarePage,
});

// Stub: filled in by the part 2 page port.
function HardwarePage() {
  return null;
}
