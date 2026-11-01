import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { AppTile, IsolationPill } from "@/components/catalog/app-bits";
import { CatalogBrowser } from "@/components/catalog/catalog-browser";
import { CardGrid } from "@/components/sections/card-grid";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Section } from "@/components/ui/section";
import { addNamespace, i18n } from "@/i18n";
import catalog from "@/i18n/en/catalog.json";
import { links } from "@/lib/links";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";

export const Route = createFileRoute("/catalog/")({
  head: () =>
    seo({
      title: i18n.t("meta.catalog.title"),
      description: i18n.t("meta.catalog.description"),
      path: "/catalog",
    }),
  component: CatalogPage,
});

/** What an app page shows, using Immich as the example. */
function AppDetailTeaser() {
  const { t } = useTranslation("catalog");
  const facts = t("teaser.facts", { returnObjects: true });
  return (
    <Section tone="card" band wrapClassName="flex flex-wrap items-start gap-12">
      <SectionIntro
        kicker={t("teaser.kicker")}
        heading={t("teaser.heading")}
        lead={t("teaser.lead")}
        className="flex-[1_1_360px]"
      />
      <Card raised className="flex min-w-0 flex-[1_1_640px] flex-col gap-4">
        <div className="flex items-center gap-4">
          <AppTile name="Immich" tile="rust" size="lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h3 className="text-heading-2">
              <Link to="/catalog/$app/" params={{ app: "immich" }} className="text-inherit">
                Immich
              </Link>
            </h3>
            {/* TODO(placeholder): design said "Photos · v2.1.0 · updated 3 days ago · curated" */}
            <span className="text-body-s text-ink-muted">{t("teaser.meta")}</span>
          </div>
          <IsolationPill isolation="microvm" />
        </div>
        <p>{t("teaser.about")}</p>
        <div className="grid gap-4 sm:grid-cols-2">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-1.5 rounded-md border-thin border-line bg-surface-sunken p-3.5"
            >
              <p className="text-label">{fact.label}</p>
              <p className="font-mono text-body-s">
                {fact.lines[0]}
                <br />
                {fact.lines[1]}
              </p>
            </div>
          ))}
        </div>
        <Cmd command="crust tide app create immich --pool tank" />
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <a href={href("/download")}>{t("teaser.install")}</a>
          </Button>
          <Button asChild>
            <Link to="/catalog/$app/" params={{ app: "immich" }}>
              {t("teaser.template")}
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <a href="https://immich.app">{t("teaser.upstream")}</a>
          </Button>
        </div>
      </Card>
    </Section>
  );
}

function CatalogPage() {
  addNamespace("catalog", catalog);
  const { t } = useTranslation("catalog");
  return (
    <>
      <CatalogBrowser />
      <AppDetailTeaser />
      <Section wrapClassName="flex flex-col gap-8">
        <SectionIntro kicker={t("how.kicker")} heading={t("how.heading")} />
        <CardGrid items={t("how.items", { returnObjects: true })} cols={4} />
      </Section>
      <Section
        tone="rust"
        className="border-t-3 border-line"
        wrapClassName="flex flex-wrap items-center justify-between gap-6"
      >
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
          <h2 className="text-heading-1">{t("submit.heading")}</h2>
          <p className="text-body-l">{t("submit.lead")}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={links.github}>{t("submit.submit")}</a>
          </Button>
          <Button asChild>
            <a href={href("/community")}>{t("submit.request")}</a>
          </Button>
        </div>
      </Section>
    </>
  );
}
