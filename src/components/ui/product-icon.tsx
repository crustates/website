import type { ProductId } from "@/lib/products";
import { asset } from "@/lib/site";

/** Product icon from the brand kit. Decorative unless given a label. */
export function ProductIcon({
  product,
  flat = false,
  size = 48,
  label,
  className,
}: {
  product: ProductId;
  flat?: boolean;
  size?: number;
  label?: string;
  className?: string;
}) {
  return (
    <img
      src={asset(`/brand/icon-${product}${flat ? "-flat" : ""}.svg`)}
      alt={label ?? ""}
      width={size}
      height={size}
      className={className}
    />
  );
}
