import { createFileRoute, notFound } from "@tanstack/react-router";
import { releases } from "@/content";
import { i18n } from "@/i18n";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/changelog/$version")({
  loader: ({ params }) => {
    const release = releases.find((r) => r.version === params.version);
    if (!release) throw notFound();
    return release;
  },
  head: ({ loaderData: release }) =>
    release
      ? seo({
          title: i18n.t("meta.release.title", { version: release.version }),
          description: release.description,
          path: `/changelog/${release.version}`,
        })
      : {},
  codeSplitGroupings: [["loader", "component"]],
  component: ReleasePage,
});

// Stub: filled in by the part 3 page port.
function ReleasePage() {
  return null;
}
