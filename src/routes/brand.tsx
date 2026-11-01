import { Link, createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Table, Td, Th } from "@/components/ui/table";
import { useCopy } from "@/hooks/use-copy";
import { i18n, usePageCopy } from "@/i18n";
import copy from "@/i18n/en/brand.json";
import { email, links } from "@/lib/links";
import { productIds } from "@/lib/products";
import { seo } from "@/lib/seo";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";
import { color } from "../../design/tokens.json";

export const Route = createFileRoute("/brand")({
  head: () =>
    seo({
      title: i18n.t("meta.brand.title"),
      description: i18n.t("meta.brand.description"),
      path: "/brand",
    }),
  component: BrandPage,
});

type Copy = typeof copy;

/** Logo cards: preview from public/brand, downloads from the brand repo (svg/ and png/). */
const logos = [
  {
    key: "horizontal",
    svg: "logo-horizontal-light",
    png: "logo-horizontal-light",
    size: "max-h-[90px] max-w-[90%]",
  },
  { key: "mark", svg: "mark-light", png: "mark-light-512", size: "max-h-30 max-w-30" },
  { key: "appIcon", svg: "app-icon", png: "app-icon-1024", size: "max-h-30 max-w-30" },
  {
    key: "emblem",
    svg: "emblem-seal",
    png: "emblem-seal-1000",
    size: "max-h-[130px] max-w-[130px]",
  },
  { key: "runsOn", svg: "badge-runs-on", png: "badge-runs-on", size: "max-h-15 max-w-[90%]" },
  {
    key: "barnacle",
    svg: "badge-plugins-barnacle",
    png: "badge-plugins-barnacle",
    size: "max-h-15 max-w-[90%]",
  },
  {
    key: "spawn",
    svg: "badge-gitops-spawn",
    png: "badge-gitops-spawn",
    size: "max-h-15 max-w-[90%]",
  },
] as const;

/**
 * Palette swatches. Ink and cream use the on-fill tokens: same hex as ink and
 * surface-page, but they don't flip in dark mode.
 */
const swatches = [
  { key: "ink", token: "on-fill-dark", fill: "bg-on-fill-dark" },
  { key: "cream", token: "on-fill-light", fill: "bg-on-fill-light" },
  { key: "rust", token: "brand-rust", fill: "bg-brand-rust" },
  { key: "blue", token: "brand-blue", fill: "bg-brand-blue" },
  { key: "teal", token: "brand-teal", fill: "bg-brand-teal" },
  { key: "yellow", token: "accent-yellow", fill: "bg-accent-yellow" },
  { key: "violet", token: "brand-violet", fill: "bg-brand-violet" },
  { key: "brown", token: "brand-brown", fill: "bg-brand-brown" },
  { key: "pink", token: "brand-pink", fill: "bg-brand-pink" },
  { key: "green", token: "status-success", fill: "bg-status-success" },
  { key: "red", token: "status-danger", fill: "bg-status-danger" },
] as const;

const hex = (token: string) => color.tokens.find((t) => t.name === token)?.value.light;

const svgUrl = (file: string) => `${links.brandRepo}/blob/HEAD/svg/${file}.svg`;
const pngUrl = (file: string) => `${links.brandRepo}/blob/HEAD/png/${file}.png`;

function Downloads({ asset: name, svg, png }: { asset: string; svg: string; png: string }) {
  const { t } = useTranslation("brand");
  return (
    <div className="mt-auto flex flex-wrap gap-2">
      {(
        [
          ["SVG", svgUrl(svg)],
          ["PNG", pngUrl(png)],
        ] as const
      ).map(([format, url]) => (
        <Button key={format} asChild size="sm">
          <a href={url} aria-label={t("logos.download", { asset: name, format })}>
            {format}
          </a>
        </Button>
      ))}
    </div>
  );
}

function Logos({ copy }: { copy: Copy["logos"] }) {
  const preview = "flex h-40 items-center justify-center rounded-md border-thick p-4";
  return (
    <Section wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={copy.kicker} heading={copy.heading} lead={copy.lead} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {logos.map(({ key, svg, png, size }) => (
          <Card key={key} className="flex flex-col gap-3">
            {/* Light-variant files need a light backdrop in dark mode too. */}
            <div className={cn(preview, "border-line bg-surface-card dark:bg-on-fill-light")}>
              <img src={asset(`/brand/${svg}.svg`)} alt="" className={size} />
            </div>
            <h3 className="text-heading-4">{copy[key].title}</h3>
            <p className="text-body-s text-ink-muted">{copy[key].body}</p>
            <Downloads asset={copy[key].title} svg={svg} png={png} />
          </Card>
        ))}
        {/* The frame takes the page's line colour; the inside is always dark, like Console. */}
        <Card padding="none">
          <div className="theme-dark flex h-full flex-col gap-3 rounded-[3px] bg-surface-sunken p-6">
            <div className={cn(preview, "border-line")}>
              <img
                src={asset("/brand/logo-horizontal-dark.svg")}
                alt=""
                className="max-h-[90px] max-w-[90%]"
              />
            </div>
            <h3 className="text-heading-4">{copy.dark.title}</h3>
            <p className="text-body-s text-ink-muted">{copy.dark.body}</p>
            <Downloads
              asset={copy.dark.title}
              svg="logo-horizontal-dark"
              png="logo-horizontal-dark"
            />
          </div>
        </Card>
      </div>
    </Section>
  );
}

function Icons({ copy }: { copy: Copy["icons"] }) {
  const { t } = useTranslation();
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={copy.kicker} heading={copy.heading} lead={copy.lead} />
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(180px,100%),1fr))] gap-5 p-0">
        {productIds.map((id) => (
          <Card
            key={id}
            asChild
            padding="tight"
            className="flex flex-col items-center gap-2 text-center"
          >
            <li>
              <ProductIcon product={id} size={72} />
              <p className="text-heading-4">{t(`products.${id}`)}</p>
              <p className="text-body-s text-ink-muted">{copy.area[id]}</p>
            </li>
          </Card>
        ))}
      </ul>
    </Section>
  );
}

function Palette({ copy }: { copy: Copy["palette"] }) {
  return (
    <Section wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={copy.kicker} heading={copy.heading} lead={copy.lead} />
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(150px,100%),1fr))] gap-4 p-0">
        {swatches.map(({ key, token, fill }) => (
          <Card key={key} asChild padding="none" className="flex flex-col gap-2.5 overflow-hidden">
            <li>
              <div className={cn("h-24 border-b-3 border-line", fill)} />
              <div className="flex flex-col gap-0.5 px-4 pb-4">
                <p className="text-heading-4">{copy[key].name}</p>
                <p className="font-mono text-body-s">{hex(token)}</p>
                <p className="text-body-s text-ink-muted">{copy[key].usage}</p>
              </div>
            </li>
          </Card>
        ))}
      </ul>
    </Section>
  );
}

function Type({ copy }: { copy: Copy["type"] }) {
  const card = "flex flex-col gap-3";
  return (
    <Section
      tone="card"
      band
      wrapClassName="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-7"
    >
      <Card raised className={card}>
        <Kicker>{copy.sans.kicker}</Kicker>
        <p className="text-display-l max-sm:text-heading-1">Space Grotesk</p>
        <p className="text-body-l">{copy.sans.body}</p>
        <p className="font-mono text-body-s text-ink-muted">{copy.sans.sample}</p>
      </Card>
      <Card raised className={card}>
        <Kicker>{copy.mono.kicker}</Kicker>
        <p className="font-mono text-display-l max-sm:text-heading-1">JetBrains Mono</p>
        <p className="text-body-l">{copy.mono.body}</p>
        <Cmd command="crust tide app create immich" />
      </Card>
    </Section>
  );
}

function Usage({ copy }: { copy: Copy["usage"] }) {
  const lists = [
    { list: copy.do, tone: "ok" },
    { list: copy.dont, tone: "bad" },
  ] as const;
  return (
    <Section wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={copy.kicker} heading={copy.heading} />
      <div className="grid gap-6 md:grid-cols-2">
        {lists.map(({ list, tone }) => (
          <Card key={tone} className="flex flex-col gap-3">
            <Pill tone={tone} className="self-start">
              {list.label}
            </Pill>
            <ul className="m-0 list-disc pl-5 text-body-s">
              {list.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Words({ copy }: { copy: Copy["words"] }) {
  const { t } = useTranslation();
  const { mounted, copied, copy: copyText } = useCopy(copy.long);
  return (
    <Section tone="card" band wrapClassName="flex flex-wrap items-start gap-10">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-4">
        <Kicker>{copy.kicker}</Kicker>
        <h2 className="text-heading-1">{copy.heading}</h2>
        <Table>
          <thead>
            <tr>
              <Th>{copy.name}</Th>
              <Th>{copy.what}</Th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <Td rowHeader>Crustates</Td>
              <Td className="whitespace-normal">{copy.platform}</Td>
            </tr>
            {productIds.map((id) => (
              <tr key={id}>
                <Td rowHeader>{t(`products.${id}`)}</Td>
                <Td className="whitespace-normal">{copy.areas[id]}</Td>
              </tr>
            ))}
            <tr>
              <Td rowHeader className="font-mono font-normal">
                crust
              </Td>
              <Td className="whitespace-normal">{copy.cli}</Td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <p className="text-label">{copy.shortLabel}</p>
        <Callout>
          <p className="text-body-s">{copy.short}</p>
        </Callout>
        <p className="text-label">{copy.longLabel}</p>
        <Callout>
          <p className="text-body-s">{copy.long}</p>
        </Callout>
        {mounted && (
          <Button size="sm" className="self-start" onClick={copyText}>
            {copy.copy}
          </Button>
        )}
        <span role="status" className="sr-only">
          {copied ? t("copy.copied") : ""}
        </span>
      </div>
    </Section>
  );
}

function Press({ copy }: { copy: Copy["press"] }) {
  return (
    <Section
      tone="rust"
      className="border-t-3 border-line"
      wrapClassName="flex flex-wrap items-center justify-between gap-6"
    >
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
        <h2 className="text-heading-1">{copy.heading}</h2>
        <p className="text-body-l">{copy.lead}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${email.press}`}>{email.press}</a>
        </Button>
        <Button asChild>
          <Link to="/about/">{copy.about}</Link>
        </Button>
      </div>
    </Section>
  );
}

function BrandPage() {
  const c = usePageCopy("brand", copy);
  return (
    <>
      <PageHero
        size="l"
        kicker={c.hero.kicker}
        heading={c.hero.heading}
        lead={
          <Trans
            defaults={c.hero.lead}
            components={{ trademark: <Link to="/legal/" hash="trademark" /> }}
          />
        }
        actions={
          // The design also had "Open the design system": a private file, so no link.
          <Button asChild variant="primary">
            <a href={links.brandRelease}>{c.hero.kit}</a>
          </Button>
        }
        visual={
          <img
            src={asset("/brand/emblem-seal.svg")}
            alt={c.hero.emblemAlt}
            width={300}
            height={300}
            className="mx-auto"
          />
        }
      />
      <Logos copy={c.logos} />
      <Icons copy={c.icons} />
      <Palette copy={c.palette} />
      <Type copy={c.type} />
      <Usage copy={c.usage} />
      <Words copy={c.words} />
      <Press copy={c.press} />
    </>
  );
}
