import { Link, createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { CardGrid } from "@/components/sections/card-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { StaticButton } from "@/components/ui/static-button";
import { Table, Td, Th } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/api.json";
import { links } from "@/lib/links";
import type { ProductId } from "@/lib/products";
import { seo } from "@/lib/seo";
import { asset } from "@/lib/site";

export const Route = createFileRoute("/api")({
  head: () =>
    seo({
      title: i18n.t("meta.api.title"),
      description: i18n.t("meta.api.description"),
      path: "/api",
    }),
  component: ApiPage,
});

/** JSON key and string value in the example response. */
const K = ({ children }: { children: string }) => <Term tone="info">"{children}"</Term>;
const V = ({ children }: { children: string }) => <Term tone="ok">"{children}"</Term>;

function Hero() {
  const { t } = useTranslation("api");
  return (
    <PageHero
      size="l"
      kicker={t("hero.kicker")}
      heading={t("hero.heading")}
      lead={<Rich text={t("hero.lead")} />}
      actions={
        <>
          <Button asChild variant="blue">
            <a href={links.docs}>{t("hero.reference")}</a>
          </Button>
          <Button asChild>
            <a href={links.docs}>{t("hero.guides")}</a>
          </Button>
        </>
      }
      tags={t("hero.tags", { returnObjects: true })}
      visual={
        <Console className="shadow-lg">
          <Term tone="dim">$</Term>
          {" curl -s https://node-1.crust.internal/api/v1/tide/apps/immich \\\n"}
          {'    -H "Authorization: Bearer $CRUST_TOKEN"\n{\n  '}
          <K>kind</K>: <V>App</V>
          {",\n  "}
          <K>metadata</K>
          {": { "}
          <K>name</K>: <V>immich</V>, <K>generation</K>
          {": 7 },\n  "}
          <K>spec</K>
          {": {\n    "}
          <K>catalog</K>: <V>immich</V>
          {",\n    "}
          <K>isolation</K>: <V>microvm</V>
          {",\n    "}
          <K>resources</K>
          {": { "}
          <K>cpu</K>: 2, <K>memory</K>: <V>4Gi</V>
          {" }\n  },\n  "}
          <K>status</K>
          {": {\n    "}
          <K>phase</K>: <V>Running</V>
          {",\n    "}
          <K>url</K>: <V>https://immich.crust.internal</V>
          {",\n    "}
          <K>observedGeneration</K>
          {": 7\n  }\n}"}
        </Console>
      }
    />
  );
}

function HowItWorks() {
  const { t } = useTranslation("api");
  return (
    <Section wrapClassName="flex flex-col gap-10">
      <SectionIntro kicker={t("how.kicker")} heading={t("how.heading")} lead={t("how.lead")} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6">
        {t("how.steps", { returnObjects: true }).map((step) => (
          <Card key={step.title} className="flex flex-col gap-3">
            <Kicker>{step.kicker}</Kicker>
            <h3 className="text-heading-4">{step.title}</h3>
            <p className="text-body-s">
              <Rich text={step.body} />
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const areas: (ProductId | "platform")[] = [
  "tide",
  "reef",
  "current",
  "molt",
  "cast",
  "barnacle",
  "spawn",
  "platform",
];

function AreaIcon({ area }: { area: ProductId | "platform" }) {
  if (area !== "platform") return <ProductIcon product={area} size={24} />;
  return (
    <>
      <img
        src={asset("/brand/mark-light.svg")}
        alt=""
        width={24}
        height={24}
        className="dark:hidden"
      />
      <img
        src={asset("/brand/mark-dark.svg")}
        alt=""
        width={24}
        height={24}
        className="hidden dark:block"
      />
    </>
  );
}

function Resources() {
  const { t } = useTranslation("api");
  const { t: tc } = useTranslation();
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-6">
      <SectionIntro kicker={t("resources.kicker")} heading={t("resources.heading")} />
      <Table>
        <thead>
          <tr>
            {t("resources.columns", { returnObjects: true }).map((c) => (
              <Th key={c}>{c}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {areas.map((area) => (
            <tr key={area}>
              <Td rowHeader>
                <span className="flex items-center gap-2">
                  <AreaIcon area={area} />
                  {area === "platform" ? t("resources.platform") : tc(`products.${area}`)}
                </span>
              </Td>
              <Td className="whitespace-normal">{t(`resources.rows.${area}`)}</Td>
              <Td className="font-mono">/api/v1/{area}/…</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Section>
  );
}

function Client({
  id,
  children,
}: {
  id: "cli" | "tui" | "tofu" | "mcp" | "sdks" | "events";
  children?: ReactNode;
}) {
  const { t } = useTranslation("api");
  return (
    <Card asChild className="flex min-w-0 flex-col gap-3">
      <article>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-heading-3">{t(`clients.${id}.title`)}</h3>
          <Tag>{t(`clients.${id}.tag`)}</Tag>
        </div>
        <p className="text-body-s">
          <Rich text={t(`clients.${id}.body`)} />
        </p>
        {children}
      </article>
    </Card>
  );
}

function Clients() {
  const { t } = useTranslation("api");
  const dollar = <Term tone="dim">$</Term>;
  return (
    <Section wrapClassName="flex flex-col gap-8">
      <SectionIntro kicker={t("clients.kicker")} heading={t("clients.heading")} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-6">
        <Client id="cli">
          <Console framed={false}>
            {dollar}
            {" crust tide vm list -o wide\n"}
            {dollar}
            {" crust reef share create media --smb\n"}
            {dollar}
            {" crust apply -f lab.yaml --dry-run"}
          </Console>
        </Client>
        <Client id="tui">
          <Cmd command="crust tui --context node-1" className="shadow-none" />
        </Client>
        <Client id="tofu">
          <Console framed={false}>
            <Term tone="dim">{'resource "crustates_vm" "ha" {'}</Term>
            {"\n  iso    = "}
            <Term tone="ok">"haos-16.2"</Term>
            {"\n  memory = "}
            <Term tone="ok">"4Gi"</Term>
            {"\n"}
            <Term tone="dim">{"}"}</Term>
          </Console>
        </Client>
        <Client id="mcp">
          <Console framed={false}>
            {dollar}
            {" claude mcp add crustates \\\n    https://node-1.crust.internal/mcp"}
          </Console>
        </Client>
        <Client id="sdks">
          {/* Not published yet: names only, no links. */}
          <div className="flex flex-wrap gap-3">
            {t("clients.sdks.names", { returnObjects: true }).map((name) => (
              <Tag key={name}>{name}</Tag>
            ))}
          </div>
        </Client>
        <Client id="events" />
      </div>
    </Section>
  );
}

function Scalar() {
  const { t } = useTranslation("api");
  return (
    <Section tone="ink" wrapClassName="flex flex-wrap items-center gap-12">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <Kicker className="text-accent-yellow">{t("scalar.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("scalar.heading")}</h2>
        {/* The design's "Open /docs on your node" button pointed at the reader's own node: dropped. */}
        <p className="text-body-l text-ink-muted">
          <Rich text={t("scalar.lead")} />
        </p>
      </div>
      {/* Illustration of a Scalar request card; its buttons are drawings. */}
      <Card raised className="flex min-w-0 flex-[1_1_520px] flex-col gap-3.5">
        <div className="flex flex-wrap items-center gap-2">
          <Pill tone="info">POST</Pill>
          <span className="font-mono text-body-s [overflow-wrap:anywhere]">
            /api/v1/reef/snapshots
          </span>
        </div>
        <p className="text-body-s text-ink-muted">{t("scalar.summary")}</p>
        <div className="border-thin border-line">
          <Table frame="none">
            <thead>
              <tr>
                {t("scalar.columns", { returnObjects: true }).map((c) => (
                  <Th key={c}>{c}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t("scalar.rows", { returnObjects: true }).map(([field, type, required]) => (
                <tr key={field}>
                  <Td rowHeader className="font-mono font-normal">
                    {field}
                  </Td>
                  <Td>{type}</Td>
                  <Td>{required}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <div className="mt-0.5 flex flex-wrap gap-3">
          <StaticButton size="sm" className="bg-brand-blue text-on-fill-light">
            {t("scalar.send")}
          </StaticButton>
          <StaticButton size="sm">{t("scalar.curl")}</StaticButton>
        </div>
      </Card>
    </Section>
  );
}

function Access() {
  const { t } = useTranslation("api");
  return (
    <Section wrapClassName="flex flex-col gap-8">
      <SectionIntro kicker={t("access.kicker")} heading={t("access.heading")} />
      <CardGrid cols={4} items={t("access.items", { returnObjects: true })} />
    </Section>
  );
}

function ApiPage() {
  addNamespace("api", copy);
  const { t } = useTranslation("api");
  return (
    <>
      <Hero />
      <HowItWorks />
      <Resources />
      <Clients />
      <Scalar />
      <Access />
      <CtaBand heading={t("cta.heading")}>
        <Button asChild variant="violet">
          <Link to="/barnacle/">{t("cta.plugin")}</Link>
        </Button>
        <Button asChild>
          <a href={links.docs}>{t("cta.guides")}</a>
        </Button>
      </CtaBand>
    </>
  );
}
