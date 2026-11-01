import { createFileRoute } from "@tanstack/react-router";
import { NotFound } from "@/components/not-found";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

// Prerendered to 404.html, which GitHub Pages serves for unknown URLs. The
// root layout leaves out <Scripts/> here: hydrating it at another URL fails.
export const Route = createFileRoute("/404")({
  head: () =>
    seo({
      title: i18n.t("notFound.title"),
      description: i18n.t("notFound.description"),
      path: "/404",
      noindex: true,
    }),
  component: NotFound,
});
