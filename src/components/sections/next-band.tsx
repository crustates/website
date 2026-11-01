import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { products, type ProductKey } from "@/lib/products";
import { href } from "@/lib/site";

/**
 * The closing band in the page's product colour, pointing at the next product
 * with a button in that product's colour.
 */
export function NextBand({
  product,
  heading,
  next,
  nextLabel,
  extra,
}: {
  product: ProductKey;
  heading: string;
  next: ProductKey;
  nextLabel: string;
  extra?: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <Section
      fill={product}
      className="border-b-3 border-line"
      wrapClassName="flex flex-wrap items-center justify-between gap-6"
    >
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
        <Kicker className="text-current">{t("productPage.next")}</Kicker>
        <h2 className="text-heading-1">{heading}</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild className={products[next].fill}>
          <a href={href(products[next].route)}>{nextLabel}</a>
        </Button>
        {extra}
        <Button asChild>
          <a href={href("/download")}>{t("productPage.download")}</a>
        </Button>
      </div>
    </Section>
  );
}
