import { Slot } from "radix-ui";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Tag({
  asChild,
  className,
  ...props
}: ComponentProps<"span"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span";
  return (
    <Comp
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-sm border-thin border-line bg-surface-card px-2 py-0.5 font-mono text-caption font-bold text-ink no-underline",
        className,
      )}
      {...props}
    />
  );
}
