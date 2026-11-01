import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/assistant")({
  head: () =>
    seo({
      title: i18n.t("meta.assistant.title"),
      description: i18n.t("meta.assistant.description"),
      path: "/assistant",
    }),
  component: AssistantPage,
});

// Stub: filled in by the part 2 page port.
function AssistantPage() {
  return null;
}
