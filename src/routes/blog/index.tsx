import { createFileRoute } from "@tanstack/react-router";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: i18n.t("meta.blog.title"),
      description: i18n.t("meta.blog.description"),
      path: "/blog",
    }),
  component: BlogPage,
});

// Stub: filled in by the part 3 page port.
function BlogPage() {
  return null;
}
