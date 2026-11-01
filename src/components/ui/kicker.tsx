import type { ComponentProps } from "react";
import { products, type ProductKey } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Small uppercase mono label above a heading, in the product's colour. */
export function Kicker({
  product,
  className,
  ...props
}: ComponentProps<"p"> & { product?: ProductKey }) {
  return (
    <p
      className={cn(
        "font-mono text-kicker uppercase",
        product ? products[product].text : "text-text-rust",
        className,
      )}
      {...props}
    />
  );
}
