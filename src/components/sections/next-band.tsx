import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { products, type ProductKey } from "@/lib/products";

import { cn } from "@/lib/utils";

/**
 * The closing band in the page's product colour. By default it points at the
 * next product (a button in that product's colour) and the download page;
 * `actions` replaces those buttons.
 */
export function NextBand({
  product,
  heading,
  kicker,
  next,
  nextLabel,
  extra,
  actions,
  band = false,
}: {
  product: ProductKey;
  heading: string;
  /** Defaults to "Next up". */
  kicker?: string;
  next?: ProductKey;
  nextLabel?: string;
  /** Added between the next-product and download buttons. */
  extra?: ReactNode;
  actions?: ReactNode;
  /** Rule above as well as below. */
  band?: boolean;
}) {
  const { t } = useTranslation();
  return (
    <Section
      fill={product}
      className={cn("border-line", band ? "border-y-3" : "border-b-3")}
      wrapClassName="flex flex-wrap items-center justify-between gap-6"
    >
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
        <Kicker className="text-current">{kicker ?? t("productPage.next")}</Kicker>
        <h2 className="text-heading-1">{heading}</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        {actions ?? (
          <>
            {next && (
              <Button asChild className={products[next].fill}>
                <Link to={products[next].route}>{nextLabel}</Link>
              </Button>
            )}
            {extra}
            <Button asChild>
              <Link to="/download/">{t("productPage.download")}</Link>
            </Button>
          </>
        )}
      </div>
    </Section>
  );
}
