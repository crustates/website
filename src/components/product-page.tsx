import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { AskAssistant, SameApi } from "@/components/sections/aside-callouts";
import { CardGrid, StepGrid } from "@/components/sections/card-grid";
import { DataTable, SpecsTable } from "@/components/sections/data-table";
import { FaqStrip } from "@/components/sections/faq-strip";
import { NextBand } from "@/components/sections/next-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { links } from "@/lib/links";
import type { ProductId, ProductKey } from "@/lib/products";
import { href } from "@/lib/site";

type Item = { title: string; body: string };

/** The copy every product page namespace provides (src/i18n/en/<product>.json). */
export type ProductCopy = {
  hero: { kicker: string; heading: string; lead: string; tags: readonly string[] };
  capabilities: { heading: string; items: readonly Item[] };
  how: {
    heading: string;
    lead: string;
    steps: readonly Item[];
    table: { columns: readonly string[]; rows: readonly (readonly string[])[] };
  };
  specs: { rows: readonly (readonly string[])[]; ask: { body: string; command: string } };
  faq: readonly Item[];
  next: { heading: string; label: string };
};

/**
 * Tide, Reef, Current, Molt and Cast share this page: hero, what you get, how
 * it works, specs and limits, questions and the next product.
 */
export function ProductPage({
  product,
  copy,
  visual,
  next,
  nextExtra,
  kickerChip,
}: {
  product: ProductId;
  copy: ProductCopy;
  /** The illustration beside the hero copy. */
  visual: ReactNode;
  next: ProductKey;
  nextExtra?: ReactNode;
  /** Hero kicker on a chip in the product colour (Molt). */
  kickerChip?: boolean;
}) {
  const { t } = useTranslation();
  const name = t(`products.${product}`);
  return (
    <>
      <PageHero
        product={product}
        kicker={copy.hero.kicker}
        heading={copy.hero.heading}
        lead={copy.hero.lead}
        tags={copy.hero.tags}
        visual={visual}
        kickerChip={kickerChip}
        actions={
          <>
            <Button asChild variant="primary">
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
          product={product}
          kicker={t("productPage.capabilities")}
          heading={copy.capabilities.heading}
        />
        <CardGrid items={copy.capabilities.items} />
      </Section>
      <Section tone="card" band wrapClassName="flex flex-col gap-8">
        <SectionIntro
          product={product}
          kicker={t("productPage.how")}
          heading={copy.how.heading}
          lead={copy.how.lead}
        />
        <StepGrid items={copy.how.steps} />
        <DataTable
          columns={copy.how.table.columns}
          rows={copy.how.table.rows}
          monoFirst
          mutedLast
        />
      </Section>
      <Section wrapClassName="flex flex-wrap items-start gap-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-3">
          <SectionIntro
            product={product}
            kicker={t("productPage.specs")}
            heading={t("productPage.specsHeading", { name })}
            size="h2"
            className="mb-3"
          />
          <SpecsTable rows={copy.specs.rows} />
        </div>
        <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
          <AskAssistant body={copy.specs.ask.body} command={copy.specs.ask.command} />
          <SameApi />
        </div>
      </Section>
      <FaqStrip heading={t("productPage.faqHeading", { name })} items={copy.faq} />
      <NextBand
        product={product}
        heading={copy.next.heading}
        next={next}
        nextLabel={copy.next.label}
        extra={nextExtra}
      />
    </>
  );
}
