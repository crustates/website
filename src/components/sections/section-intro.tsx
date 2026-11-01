import type { ReactNode } from "react";
import { Kicker } from "@/components/ui/kicker";
import type { ProductKey } from "@/lib/products";
import { cn } from "@/lib/utils";

/** Kicker, heading and optional lead at the top of a section. */
export function SectionIntro({
  kicker,
  heading,
  lead,
  product,
  size = "h1",
  onTint = false,
  className,
}: {
  kicker?: string;
  heading: string;
  lead?: ReactNode;
  product?: ProductKey;
  size?: "h1" | "h2";
  /** On a product tint the kicker is ink: rust and teal text fail AA there. */
  onTint?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex max-w-[760px] flex-col gap-3", className)}>
      {kicker && (
        <Kicker product={onTint ? undefined : product} className={cn(onTint && "text-ink")}>
          {kicker}
        </Kicker>
      )}
      <h2 className={size === "h1" ? "text-heading-1" : "text-heading-2"}>{heading}</h2>
      {lead && <p className="text-body-l text-ink-muted">{lead}</p>}
    </div>
  );
}
