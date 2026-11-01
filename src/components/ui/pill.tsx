import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const tones = {
  ok: "bg-status-success text-on-fill-dark",
  warn: "bg-accent-yellow text-on-fill-dark",
  bad: "bg-status-danger text-on-fill-dark",
  off: "bg-surface-card text-ink",
  info: "bg-brand-blue text-on-fill-light",
};

/** Status pill: a coloured dot plus a label, never colour alone. */
export function Pill({
  tone = "off",
  className,
  ...props
}: ComponentProps<"span"> & { tone?: keyof typeof tones }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill border-thin border-line px-2.5 py-0.5 text-caption font-bold before:size-2 before:rounded-full before:bg-current before:content-['']",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
