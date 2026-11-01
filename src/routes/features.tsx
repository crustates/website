import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { CardGrid } from "@/components/sections/card-grid";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Table, Td, Th } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { i18n, usePageCopy } from "@/i18n";
import features from "@/i18n/en/features.json";
import { links } from "@/lib/links";
import { products, type ProductId, type ProductKey } from "@/lib/products";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/features")({
  head: () =>
    seo({
      title: i18n.t("meta.features.title"),
      description: i18n.t("meta.features.description"),
      path: "/features",
    }),
  component: FeaturesPage,
});

type Copy = typeof features;

/** In-page nav: product and section anchor. Barnacle's section keeps the design's `#plugins`. */
const jumps: readonly [ProductKey, string][] = [
  ["tide", "tide"],
  ["reef", "reef"],
  ["current", "current"],
  ["molt", "molt"],
  ["cast", "cast"],
  ["barnacle", "plugins"],
  ["spawn", "spawn"],
  ["assistant", "assistant"],
];

function Hero({ copy }: { copy: Copy["hero"] }) {
  const { t } = useTranslation();
  return (
    <Section dots band padded={false} wrapClassName="flex flex-col gap-5 py-16 max-md:py-12">
      <Kicker>{copy.kicker}</Kicker>
      <h1 className="max-w-[860px] text-display-l max-sm:text-heading-1">{copy.heading}</h1>
      <p className="max-w-[720px] text-body-l">{copy.lead}</p>
      <nav aria-label={copy.jumpLabel} className="mt-2 flex flex-wrap gap-3">
        {jumps.map(([product, id]) => (
          <Button key={id} asChild size="sm" className={products[product].fill}>
            <a href={`#${id}`}>{t(`products.${product}`)}</a>
          </Button>
        ))}
        <Button asChild size="sm">
          <a href="#api">{copy.api}</a>
        </Button>
      </nav>
    </Section>
  );
}

type AreaCopy = Copy["tide" | "reef" | "current" | "barnacle" | "spawn"];

/** A tinted band for one product: intro and link on the left, feature cards on the right. */
function Area({
  product,
  id = product,
  copy,
  compact = false,
  mutedLead = true,
  extra,
}: {
  product: ProductId;
  id?: string;
  copy: AreaCopy;
  /** Smaller icon, vertically centred, tighter cards (Barnacle, Spawn). */
  compact?: boolean;
  mutedLead?: boolean;
  extra?: ReactNode;
}) {
  return (
    <Section
      id={id}
      band
      className={products[product].tint}
      wrapClassName={cn("flex flex-wrap gap-12", compact ? "items-center" : "items-start")}
    >
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <ProductIcon product={product} size={compact ? 48 : 72} />
        <Kicker product={product}>{copy.kicker}</Kicker>
        <h2 className="text-heading-1">{copy.heading}</h2>
        <p className={cn("text-body-l", mutedLead && "text-ink-muted")}>{copy.lead}</p>
        {extra}
        <Button asChild size="sm" className={cn("self-start", products[product].fill)}>
          <a href={href(products[product].route)}>{copy.link}</a>
        </Button>
      </div>
      <CardGrid
        items={copy.items}
        cols={4}
        className={cn("min-w-0 flex-[1_1_480px]", compact ? "gap-4" : "gap-5")}
      />
    </Section>
  );
}

/** Molt and Cast: two cards filled with the product colour. */
function OsAndClusters({ copy }: { copy: Pick<Copy, "molt" | "cast"> }) {
  return (
    <Section
      tone="card"
      band
      wrapClassName="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-7"
    >
      {(["molt", "cast"] as const).map((product) => (
        <Card
          key={product}
          asChild
          className={cn("flex flex-col gap-3.5", products[product].fill, products[product].ring)}
        >
          <article id={product}>
            <ProductIcon product={product} />
            <Kicker className="text-current">{copy[product].kicker}</Kicker>
            <h2 className="text-heading-2">{copy[product].heading}</h2>
            <p>{copy[product].body}</p>
            <ul className="m-0 list-disc pl-5 text-body-s">
              {copy[product].points.map((point) => (
                <li key={point}>
                  <Rich text={point} />
                </li>
              ))}
            </ul>
            <Button asChild size="sm" className="self-start">
              <a href={href(products[product].route)}>{copy[product].link}</a>
            </Button>
          </article>
        </Card>
      ))}
    </Section>
  );
}

function Assistant({ copy }: { copy: Copy["assistant"] }) {
  return (
    <Section id="assistant" tone="sunken" band wrapClassName="flex flex-wrap items-center gap-12">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <Kicker product="assistant">{copy.kicker}</Kicker>
        <h2 className="text-heading-1">{copy.heading}</h2>
        <p className="text-body-l">{copy.lead}</p>
        <div className="flex flex-wrap gap-3">
          {copy.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        <Button asChild size="sm" variant="primary" className="self-start">
          <a href={href("/assistant")}>{copy.link}</a>
        </Button>
      </div>
      {/* Illustration of a chat, not a live one: its buttons are static. */}
      <Card raised className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5">
        <Callout className="max-w-[80%] self-end">
          <p className="text-body-s">{copy.mock.question}</p>
        </Callout>
        <div className="flex max-w-[92%] flex-col gap-2">
          <p className="text-body-s">
            <strong>{copy.mock.who}</strong> ·{" "}
            <span className="text-ink-muted">{copy.mock.where}</span>
          </p>
          <p className="text-body-s">
            <Rich text={copy.mock.answer} />
          </p>
          <p className="text-body-s">{copy.mock.offer}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="sm" variant="primary" className="pointer-events-none">
            <span>{copy.mock.review}</span>
          </Button>
          <Button asChild size="sm" className="pointer-events-none">
            <span>{copy.mock.notNow}</span>
          </Button>
        </div>
      </Card>
    </Section>
  );
}

function Api({ copy }: { copy: Copy["api"] }) {
  return (
    <Section id="api" tone="ink" wrapClassName="flex flex-wrap items-center gap-12">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <Kicker className="text-accent-yellow">{copy.kicker}</Kicker>
        <h2 className="text-heading-1">{copy.heading}</h2>
        <p className="text-body-l text-ink-muted">
          <Rich text={copy.lead} />
        </p>
        <div className="flex flex-wrap gap-3">
          {copy.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
        {/* Plain link until /api lands in part 4. */}
        <Button asChild size="sm" className="self-start">
          <a href={href("/api")}>{copy.link}</a>
        </Button>
      </div>
      <Console className="flex-[1_1_480px]">
        <Term tone="dim">resource "crustates_app" "immich" {"{"}</Term>
        {"\n"}
        {"  "}catalog{"   "}= <Term tone="ok">"immich"</Term>
        {"\n"}
        {"  "}isolation = <Term tone="ok">"microvm"</Term>
        {"\n"}
        {"  "}pool{"      "}= <Term tone="ok">"tank"</Term>
        {"\n"}
        {"  "}domain{"    "}= <Term tone="ok">"photos.crust.internal"</Term>
        {"\n"}
        <Term tone="dim">{"}"}</Term>
      </Console>
    </Section>
  );
}

function Engines({ copy }: { copy: Copy["engines"] }) {
  return (
    <Section wrapClassName="flex flex-col gap-6">
      <SectionIntro kicker={copy.kicker} heading={copy.heading} lead={copy.lead} />
      <Table>
        <thead>
          <tr>
            {copy.columns.map((column) => (
              <Th key={column} className="whitespace-normal">
                {column}
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {copy.rows.map(([area, engine, does]) => (
            <tr key={engine}>
              <Td>{area}</Td>
              <Td className="whitespace-normal font-mono">{engine}</Td>
              <Td className="whitespace-normal">{does}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Section>
  );
}

function CallToAction({ copy }: { copy: Copy["cta"] }) {
  return (
    <Section
      tone="rust"
      className="border-t-3 border-line"
      wrapClassName="flex flex-wrap items-center justify-between gap-6"
    >
      <h2 className="flex-[1_1_480px] text-heading-1">{copy.heading}</h2>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href={href("/download")}>{copy.download}</a>
        </Button>
        <Button asChild>
          <a href={links.docs}>{copy.docs}</a>
        </Button>
      </div>
    </Section>
  );
}

function FeaturesPage() {
  const copy = usePageCopy("features", features);
  return (
    <>
      <Hero copy={copy.hero} />
      <Area product="tide" copy={copy.tide} />
      <Area product="reef" copy={copy.reef} mutedLead={false} />
      <Area
        product="current"
        copy={copy.current}
        extra={
          // An example address, styled like Cmd but without a prompt or copy button.
          <div className="min-w-0 rounded-md border-thick border-line shadow-md">
            <p className="theme-dark flex flex-wrap gap-x-3 rounded-[3px] bg-surface-sunken px-4 py-3.5 font-mono text-[14px] leading-5">
              <span className="text-accent-yellow">https://</span>
              <span className="[overflow-wrap:anywhere]">jellyfin.crust.internal</span>
            </p>
          </div>
        }
      />
      <OsAndClusters copy={copy} />
      <Area product="barnacle" id="plugins" copy={copy.barnacle} compact />
      <Area product="spawn" copy={copy.spawn} compact />
      <Assistant copy={copy.assistant} />
      <Api copy={copy.api} />
      <Engines copy={copy.engines} />
      <CallToAction copy={copy.cta} />
    </>
  );
}
