import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Meter } from "@/components/ui/meter";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { i18n } from "@/i18n";
import { links } from "@/lib/links";
import type { ProductId } from "@/lib/products";
import { seo } from "@/lib/seo";
import { absoluteUrl, asset } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () =>
    seo({ title: i18n.t("home:title"), description: i18n.t("home:description"), path: "/" }),
  component: Home,
});

const core = ["tide", "reef", "current"] as const;
const more = ["molt", "cast", "barnacle", "spawn"] as const;

/** Product name linking to its page, followed by the area in muted text. */
function ProductTitle({ product, area }: { product: ProductId; area: string }) {
  const { t } = useTranslation();
  return (
    <h3 className="text-heading-3">
      {/* Plain link until the product pages land in part 2. */}
      <a href={asset(`/${product}`)} className="text-inherit">
        {t(`products.${product}`)}
      </a>{" "}
      <span className="font-medium text-ink-muted">· {area}</span>
    </h3>
  );
}

function Hero() {
  const { t } = useTranslation("home");
  return (
    <Section dots band padded={false}>
      <div className="flex flex-wrap items-center gap-12 pt-[72px] pb-20 max-md:pt-12 max-md:pb-12">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-6">
          <Kicker>{t("hero.kicker")}</Kicker>
          <h1 className="text-display-xl max-sm:text-display-l">{t("hero.heading")}</h1>
          <p className="max-w-[560px] text-body-l">{t("hero.lead")}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="primary">
              <a href={asset("/download")}>{t("hero.download")}</a>
            </Button>
            <Button asChild>
              <a href={links.docs}>{t("hero.docs")}</a>
            </Button>
          </div>
          <Cmd command={`curl -fsSL ${absoluteUrl("/install")} | sh`} className="max-w-[560px]" />
        </div>
        <HeroMock />
      </div>
    </Section>
  );
}

/** Illustration of the console: example apps and a pool, not live data. */
function HeroMock() {
  const { t } = useTranslation("home");
  const apps = [
    {
      name: "jellyfin",
      isolation: "microVM",
      status: <Pill tone="ok">{t("hero.mock.running")}</Pill>,
    },
    {
      name: "immich",
      isolation: "microVM",
      status: <Pill tone="ok">{t("hero.mock.running")}</Pill>,
    },
    {
      name: "home-assistant",
      isolation: "VM",
      status: <Pill tone="warn">{t("hero.mock.updating")}</Pill>,
      selected: true,
    },
    {
      name: "paperless",
      isolation: "shared",
      status: <Pill tone="off">{t("hero.mock.stopped")}</Pill>,
    },
  ];
  return (
    <div className="relative flex min-w-0 flex-[1_1_420px] flex-col gap-6 md:block md:min-h-[440px]">
      <Card
        raised
        padding="none"
        className="overflow-hidden md:absolute md:top-6 md:right-[72px] md:left-0"
      >
        <div className="flex items-center justify-between gap-3 border-b-3 border-line px-[18px] py-3.5">
          <div className="flex items-center gap-2.5">
            <ProductIcon product="tide" size={32} />
            <strong>{t("hero.mock.apps")}</strong>
          </div>
          <Tag>node-1</Tag>
        </div>
        <Table frame="none">
          <thead>
            <tr>
              <Th>{t("hero.mock.name")}</Th>
              <Th>{t("hero.mock.isolation")}</Th>
              <Th>{t("hero.mock.status")}</Th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <Tr key={app.name} selected={app.selected}>
                <Td>
                  <strong>{app.name}</strong>
                </Td>
                <Td className="font-mono">{app.isolation}</Td>
                <Td>{app.status}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Card className="md:absolute md:right-0 md:bottom-0 md:w-[280px]">
        <div className="mb-3 flex items-center gap-2.5">
          <ProductIcon product="reef" size={32} />
          <strong>{t("hero.mock.pool")}</strong>
        </div>
        <Meter value={62} tone="rust" label={t("hero.mock.poolUsage")} />
        <p className="mt-2 text-body-s text-ink-muted">{t("hero.mock.poolCaption")}</p>
      </Card>
    </div>
  );
}

function Platform() {
  const { t } = useTranslation("home");
  return (
    <Section wrapClassName="flex flex-col gap-10">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Kicker>{t("platform.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("platform.heading")}</h2>
        <p className="text-body-l text-ink-muted">{t("platform.lead")}</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-7">
        {core.map((product) => (
          <Card key={product} asChild accent={product} className="flex flex-col gap-3.5">
            <article>
              <ProductIcon product={product} />
              <ProductTitle product={product} area={t(`platform.${product}.area`)} />
              <p>{t(`platform.${product}.body`)}</p>
              <ul className="m-0 list-disc pl-5 text-body-s">
                {t(`platform.${product}.points`, { returnObjects: true }).map((point) => (
                  <li key={point}>
                    <Rich text={point} />
                  </li>
                ))}
              </ul>
            </article>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Secure() {
  const { t } = useTranslation("home");
  return (
    <Section tone="ink" wrapClassName="flex flex-col gap-8">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Kicker className="text-accent-yellow">{t("secure.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("secure.heading")}</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-6">
        {t("secure.items", { returnObjects: true }).map((item) => (
          <div key={item.title} className="rounded-md border-thick border-line p-6">
            <h3 className="mb-2 text-heading-4">{item.title}</h3>
            <p className="text-body-s text-ink-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Api() {
  const { t } = useTranslation("home");
  return (
    <Section wrapClassName="flex flex-wrap items-center gap-12">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <Kicker>{t("api.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("api.heading")}</h2>
        <p className="text-body-l text-ink-muted">
          <Rich text={t("api.lead")} />
        </p>
        <div className="flex flex-wrap gap-3">
          {t("api.tags", { returnObjects: true }).map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      <Console className="min-w-0 flex-[1_1_480px]">
        <Term tone="dim">$</Term> crust tide app create immich --from-catalog{"\n"}
        <Term tone="ok">✓</Term> microVM created <Term tone="dim">(2 vCPU · 4 GiB)</Term>
        {"\n"}
        <Term tone="ok">✓</Term> volume immich-data on pool <Term tone="info">tank</Term>
        {"\n"}
        <Term tone="ok">✓</Term> database immich-db <Term tone="dim">(PostgreSQL 17)</Term>
        {"\n"}
        <Term tone="ok">✓</Term> https://immich.crust.internal{"\n"}
        <Term tone="dim">$</Term> crust reef backup run --app immich{"\n"}
        <Term tone="ok">✓</Term> snapshot tank/immich-data@2026-10-30{" "}
        <Term tone="dim">(1.4 GiB)</Term>
      </Console>
    </Section>
  );
}

function Assistant() {
  const { t } = useTranslation("home");
  return (
    <Section tone="yellow" band wrapClassName="flex flex-wrap items-center gap-12">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <Kicker>{t("assistant.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("assistant.heading")}</h2>
        <p className="text-body-l">{t("assistant.body")}</p>
        <Button asChild variant="primary" className="self-start">
          <a href={asset("/assistant")}>{t("assistant.cta")}</a>
        </Button>
      </div>
      <Card raised className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5">
        <Callout className="max-w-[80%] self-end">
          <p className="text-body-s">{t("assistant.question")}</p>
        </Callout>
        <div className="flex flex-col gap-2">
          <p className="text-body-s">
            <strong>{t("assistant.who")}</strong> ·{" "}
            <span className="text-ink-muted">{t("assistant.where")}</span>
          </p>
          <p className="text-body-s">
            <Rich text={t("assistant.answer")} />
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Pill tone="ok">{t("assistant.status")}</Pill>
          <Tag>{t("assistant.sources")}</Tag>
        </div>
      </Card>
    </Section>
  );
}

function CompareStrip() {
  const { t } = useTranslation("home");
  return (
    <Section
      tone="card"
      band
      padded={false}
      wrapClassName="flex flex-wrap items-center justify-between gap-4 py-6"
    >
      <p className="text-heading-4">{t("compare.heading")}</p>
      <Button asChild size="sm">
        <a href={asset("/compare")}>{t("compare.cta")}</a>
      </Button>
    </Section>
  );
}

function More() {
  const { t } = useTranslation("home");
  return (
    <Section tone="card" band wrapClassName="grid gap-7 md:grid-cols-2">
      {more.map((product) => (
        <Card key={product} asChild accent={product} className="flex items-start gap-5">
          <article>
            <ProductIcon product={product} className="shrink-0" />
            <div className="flex flex-col gap-3">
              <ProductTitle product={product} area={t(`more.${product}.area`)} />
              <p>{t(`more.${product}.body`)}</p>
            </div>
          </article>
        </Card>
      ))}
    </Section>
  );
}

function CallToAction() {
  const { t } = useTranslation("home");
  return (
    <Section
      tone="rust"
      className="border-t-3 border-line"
      wrapClassName="flex flex-wrap items-center justify-between gap-10"
    >
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-4">
        <h2 className="text-display-l max-sm:text-heading-1">{t("cta.heading")}</h2>
        <p className="text-body-l">{t("cta.body")}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <a href={asset("/download")}>{t("cta.download")}</a>
          </Button>
          <Button asChild>
            <a href={asset("/community")}>{t("cta.community")}</a>
          </Button>
        </div>
      </div>
      <img
        src={asset("/brand/emblem-seal.svg")}
        alt={t("cta.emblemAlt")}
        width={260}
        height={260}
        loading="lazy"
        className="size-[260px] max-sm:size-[200px]"
      />
    </Section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <Platform />
      <Secure />
      <Api />
      <Assistant />
      <CompareStrip />
      <More />
      <CallToAction />
    </>
  );
}
