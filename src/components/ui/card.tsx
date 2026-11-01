import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { products, type ProductKey } from "@/lib/products";
import { cn } from "@/lib/utils";

const cardVariants = cva("rounded-md border-thick border-line bg-surface-card text-ink shadow-md", {
  variants: {
    padding: { default: "p-6", tight: "p-4", none: "p-0" },
    raised: { true: "shadow-lg" },
  },
  defaultVariants: { padding: "default" },
});

type CardProps = ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    asChild?: boolean;
    /** Thick top border in a product colour. */
    accent?: ProductKey;
  };

export function Card({ asChild, padding, raised, accent, className, ...props }: CardProps) {
  const Comp = asChild ? Slot.Root : "div";
  return (
    <Comp
      className={cn(
        cardVariants({ padding, raised }),
        accent && ["border-t-12", products[accent].accent],
        className,
      )}
      {...props}
    />
  );
}
