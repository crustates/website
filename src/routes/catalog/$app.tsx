import { createFileRoute, notFound } from "@tanstack/react-router";
import { apps } from "@/content";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/catalog/$app")({
  loader: ({ params }) => {
    const app = apps.find((a) => a.slug === params.app);
    if (!app) throw notFound();
    return app;
  },
  head: ({ loaderData: app }) =>
    app
      ? seo({
          title: i18n.t("meta.app.title", { name: app.name }),
          description: app.description,
          path: `/catalog/${app.slug}`,
        })
      : {},
  codeSplitGroupings: [["loader", "component"]],
  component: AppPage,
});

// Stub: filled in by the part 3 page port.
function AppPage() {
  return null;
}
