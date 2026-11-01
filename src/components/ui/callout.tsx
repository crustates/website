import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tints = {
  rust: "bg-tint-rust",
  blue: "bg-tint-blue",
  teal: "bg-tint-teal",
  yellow: "bg-tint-yellow",
  violet: "bg-tint-violet",
  brown: "bg-tint-brown",
  pink: "bg-tint-pink",
  card: "bg-surface-card",
};

export function Callout({
  tint,
  className,
  ...props
}: ComponentProps<"div"> & { tint?: keyof typeof tints }) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-md border-thin border-line px-4 py-3.5",
        tint && tints[tint],
        className,
      )}
      {...props}
    />
  );
}
