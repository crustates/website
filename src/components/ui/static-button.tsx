import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

/** A button drawn inside an illustration: it looks like one but is plain text. */
export function StaticButton({
  variant,
  size,
  className,
  children,
}: {
  variant?: "default" | "primary" | "violet" | "danger";
  size?: "sm";
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn(buttonVariants({ variant, size }), "pointer-events-none", className)}>
      {children}
    </span>
  );
}
