import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CardGrid } from "@/components/sections/card-grid";
import { DataTable } from "@/components/sections/data-table";
import { FaqStrip } from "@/components/sections/faq-strip";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { i18n, usePageCopy } from "@/i18n";
import spawn from "@/i18n/en/spawn.json";
import { links } from "@/lib/links";
import { products } from "@/lib/products";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";

export const Route = createFileRoute("/spawn")({
  head: () =>
    seo({
      title: i18n.t("meta.spawn.title"),
      description: i18n.t("meta.spawn.description"),
      path: "/spawn",
    }),
  component: SpawnPage,
});

type Copy = typeof spawn;

/** Illustration: an example homelab repo and a plan comment on a PR, not live data. */
function RepoVisual({ copy }: { copy: Copy["visual"] }) {
  return (
    <div className="flex flex-col gap-5">
      <Card raised padding="none" className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-line px-[18px] py-3.5">
          <div className="flex items-center gap-2.5">
            <ProductIcon product="spawn" flat size={28} />
            <strong>{copy.repo}</strong>
          </div>
          <Pill tone="ok">{copy.inSync}</Pill>
        </div>
        <pre className="m-0 bg-surface-card px-[18px] py-4 font-mono text-body-s whitespace-pre-wrap">
          {`homelab/
├── apps/
│   ├── immich.yaml
│   ├── jellyfin.yaml
│   └── paperless.yaml
├── vms/
│   └── home-assistant.yaml
├── network/
│   ├── iot-vlan.yaml
│   └── firewall.yaml
├── storage/backups.yaml
└── secrets/immich.sops.yaml`}
        </pre>
      </Card>
      <Card accent="spawn" className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <strong>{copy.comment}</strong>
          <span className="text-caption text-ink-muted">{copy.pr}</span>
        </div>
        <Console wrap framed={false} className="rounded-md">
          <Term tone="dim">Plan for node-1 · dry run</Term>
          {"\n"}
          <Term tone="warn">~</Term>
          {" app/immich   image v1.129 → "}
          <Term tone="info">v1.130</Term>
          {"\n"}
          <Term tone="ok">+</Term>
          {" snapshot     tank/apps/immich "}
          <Term tone="dim">(before rollout)</Term>
          {"\n"}
          <Term tone="dim">{"  1 to change · 0 to delete · health check: /api/ping"}</Term>
          {"\n"}
          <Term tone="ok">✓</Term> Merge to apply
        </Console>
      </Card>
    </div>
  );
}

/** The two ways to use Spawn, each as a card with numbered steps. */
function Tracks({ tracks }: { tracks: Copy["how"]["tracks"] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      {tracks.map((track) => (
        <Card key={track.title} className="flex flex-col gap-3">
          <h3 className="text-heading-3">{track.title}</h3>
          <ol className="m-0 flex list-none flex-col gap-2 p-0">
            {track.steps.map((step, i) => (
              <li key={step} className="flex items-start gap-2.5">
                <Tag>{i + 1}</Tag>
                <span className="text-body-s">{step}</span>
              </li>
            ))}
          </ol>
        </Card>
      ))}
    </div>
  );
}

function Example({ copy }: { copy: Copy["example"] }) {
  const { t } = useTranslation();
  return (
    <Section wrapClassName="flex flex-wrap items-start gap-12">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-3">
        <Kicker product="spawn">{copy.kicker}</Kicker>
        <h2 className="mb-3 text-heading-2">{copy.heading}</h2>
        <Console wrap>
          <Term tone="dim">{copy.comment}</Term>
          {"\n"}
          <Term tone="info">apiVersion</Term>: crustates.eu/v1{"\n"}
          <Term tone="info">kind</Term>: App{"\n"}
          <Term tone="info">metadata</Term>:{"\n"}
          {"  "}
          <Term tone="info">name</Term>: immich{"\n"}
          <Term tone="info">spec</Term>:{"\n"}
          {"  "}
          <Term tone="info">catalog</Term>: immich{"\n"}
          {"  "}
          <Term tone="info">version</Term>: v1.130{"\n"}
          {"  "}
          <Term tone="info">isolation</Term>: microvm{"\n"}
          {"  "}
          <Term tone="info">resources</Term>: {"{ cpu: 2, memory: 4Gi }"}
          {"\n"}
          {"  "}
          <Term tone="info">volumes</Term>:{"\n"}
          {"    - { name: library, dataset: tank/apps/immich }\n"}
          {"  "}
          <Term tone="info">database</Term>: {"{ postgres: immich-db }"}
          {"\n"}
          {"  "}
          <Term tone="info">route</Term>: {"{ host: immich.crust.internal, tls: local-ca }"}
          {"\n"}
          {"  "}
          <Term tone="info">env</Term>:{"\n"}
          {"    "}
          <Term tone="info">DB_PASSWORD</Term>: {"{ secretRef: immich/db-password }"}
        </Console>
      </div>
      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
        <h2 className="mb-3 text-heading-2">{copy.push}</h2>
        <Console wrap>
          <Term tone="dim">$</Term> git push origin main{"\n"}
          <Term tone="dim">spawn</Term> <Term tone="ok">✓</Term> received push a41c9e2{" "}
          <Term tone="dim">(webhook)</Term>
          {"\n"}
          <Term tone="dim">spawn</Term> <Term tone="ok">✓</Term> build with railpack{" "}
          <Term tone="dim">(node 22, 41 s)</Term>
          {"\n"}
          <Term tone="dim">spawn</Term> <Term tone="ok">✓</Term> rollout blog{" "}
          <Term tone="dim">microVM · health ok</Term>
          {"\n"}
          <Term tone="dim">spawn</Term> <Term tone="ok">✓</Term> https://blog.crust.internal
        </Console>
        <Callout tint="yellow" className="flex-col gap-2">
          <strong>{t("productPage.ask.title")}</strong>
          <p className="text-body-s">{copy.ask}</p>
        </Callout>
        <Callout tint="card" className="flex-col gap-2">
          <strong>{copy.vms.title}</strong>
          <p className="text-body-s">{copy.vms.body}</p>
          {/* Plain link until /api lands in part 4. */}
          <a href={href("/api")} className="text-body-s">
            {t("productPage.api.link")}
          </a>
        </Callout>
      </div>
    </Section>
  );
}

function SpawnPage() {
  const copy = usePageCopy("spawn", spawn);
  const { t } = useTranslation();
  const name = t("products.spawn");
  return (
    <>
      <PageHero
        product="spawn"
        kicker={copy.hero.kicker}
        heading={copy.hero.heading}
        lead={copy.hero.lead}
        tags={copy.hero.tags}
        visual={<RepoVisual copy={copy.visual} />}
        actions={
          <>
            <Button asChild variant="pink">
              <a href={href("/download")}>{t("productPage.download")}</a>
            </Button>
            <Button asChild>
              <a href={links.docs}>{t("productPage.docs", { name })}</a>
            </Button>
          </>
        }
      />
      <Section wrapClassName="flex flex-col gap-9">
        <SectionIntro
          product="spawn"
          kicker={t("productPage.capabilities")}
          heading={copy.capabilities.heading}
        />
        <CardGrid items={copy.capabilities.items} />
      </Section>
      <Section band className={products.spawn.tint} wrapClassName="flex flex-col gap-8">
        <SectionIntro
          product="spawn"
          kicker={t("productPage.how")}
          heading={copy.how.heading}
          lead={copy.how.lead}
        />
        <Tracks tracks={copy.how.tracks} />
        <DataTable
          columns={copy.how.table.columns}
          rows={copy.how.table.rows}
          monoFirst
          mutedLast
        />
      </Section>
      <Example copy={copy.example} />
      <FaqStrip heading={t("productPage.faqHeading", { name })} items={copy.faq} />
      <Section
        fill="spawn"
        className="border-b-3 border-line"
        wrapClassName="flex flex-wrap items-center justify-between gap-6"
      >
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
          <Kicker className="text-current">{t("productPage.next")}</Kicker>
          <h2 className="text-heading-1">{copy.next.heading}</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={href("/features")}>{t("productPage.allFeatures")}</a>
          </Button>
          <Button asChild>
            <a href={href("/download")}>{t("productPage.download")}</a>
          </Button>
        </div>
      </Section>
    </>
  );
}
