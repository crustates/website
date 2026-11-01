import type { ReactNode } from "react";
import { Kicker } from "@/components/ui/kicker";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import type { ProductId, ProductKey } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Dotted page hero: copy on the left, an illustration on the right. */
export function PageHero({
  product,
  icon = product && product !== "assistant" ? (
    <ProductIcon product={product as ProductId} size={72} />
  ) : null,
  kicker,
  heading,
  lead,
  actions,
  tags,
  visual,
  size = "xl",
}: {
  product?: ProductKey;
  icon?: ReactNode;
  kicker: string;
  heading: string;
  lead: ReactNode;
  actions?: ReactNode;
  tags?: readonly string[];
  visual?: ReactNode;
  size?: "xl" | "l";
}) {
  return (
    <Section dots band padded={false}>
      <div className="flex flex-wrap items-center gap-12 pt-16 pb-[72px] max-md:pt-12 max-md:pb-12">
        <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-[22px]">
          <div className="flex items-center gap-3.5">
            {icon}
            <Kicker product={product}>{kicker}</Kicker>
          </div>
          <h1
            className={cn(
              size === "xl"
                ? "text-display-xl max-sm:text-display-l"
                : "text-display-l max-sm:text-heading-1",
            )}
          >
            {heading}
          </h1>
          <p className="max-w-[560px] text-body-l">{lead}</p>
          {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
          {tags && (
            <div className="flex flex-wrap gap-3">
              {tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
          )}
        </div>
        {visual && <div className="min-w-0 flex-[1_1_520px]">{visual}</div>}
      </div>
    </Section>
  );
}
