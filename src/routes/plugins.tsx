import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/section";
import { addNamespace, i18n } from "@/i18n";
import barnacle from "@/i18n/en/barnacle.json";
import { seo } from "@/lib/seo";
import { href, pageUrl } from "@/lib/site";

// A static redirect, not redirect(): prerendering would write Barnacle's HTML under /plugins.
export const Route = createFileRoute("/plugins")({
  head: () => {
    const head = seo({
      title: i18n.t("meta.plugins.title"),
      description: i18n.t("meta.plugins.description"),
      path: "/plugins",
      noindex: true,
    });
    return {
      meta: [...head.meta, { httpEquiv: "refresh", content: `0; url=${href("/barnacle")}` }],
      links: [...head.links, { rel: "canonical", href: pageUrl("/barnacle") }],
    };
  },
  component: PluginsPage,
});

function PluginsPage() {
  addNamespace("barnacle", barnacle);
  const { t } = useTranslation("barnacle");
  return (
    <Section wrapClassName="flex flex-col items-start gap-4">
      <h1 className="text-heading-1">{t("redirect.heading")}</h1>
      <a href={href("/barnacle")}>{t("redirect.link")}</a>
    </Section>
  );
}
