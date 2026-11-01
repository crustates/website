import type { ComponentProps, ElementType } from "react";
import { products, type ProductKey } from "@/lib/products";
import { cn } from "@/lib/utils";

/** The centred page column: 1200px wide, 32px gutters (16px on phones). */
export function Wrap({ className, ...props }: ComponentProps<"div">) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-8 max-sm:px-4", className)} {...props} />
  );
}

const tones = {
  page: "bg-surface-page",
  card: "bg-surface-card",
  sunken: "bg-surface-sunken",
  /** Inverted band: dark in both themes. */
  ink: "theme-dark bg-surface-page",
  yellow: "bg-tint-yellow",
  rust: "bg-brand-rust text-on-fill-dark [--focus-ring:var(--on-fill-dark)]",
};

type SectionProps = Omit<ComponentProps<"section">, "className"> & {
  as?: ElementType;
  tone?: keyof typeof tones;
  /** Fill the section with a product colour (the "Next up" bands). */
  fill?: ProductKey;
  /** Thick rules above and below. */
  band?: boolean;
  /** Dotted background, as behind page heroes. */
  dots?: boolean;
  /** Vertical padding: 64px, 48px on phones. */
  padded?: boolean;
  className?: string;
  /** Classes for the inner Wrap. */
  wrapClassName?: string;
};

export function Section({
  as: Comp = "section",
  tone,
  fill,
  band = false,
  dots = false,
  padded = true,
  className,
  wrapClassName,
  children,
  ...props
}: SectionProps) {
  return (
    <Comp
      className={cn(
        tone && tones[tone],
        fill && [products[fill].fill, products[fill].ring],
        band && "border-y-3 border-line",
        dots && "dots",
        padded && "py-16 max-md:py-12",
        className,
      )}
      {...props}
    >
      <Wrap className={wrapClassName}>{children}</Wrap>
    </Comp>
  );
}
