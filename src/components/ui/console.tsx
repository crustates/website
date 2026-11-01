import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A terminal session. The frame takes the page's line colour; the inside is
 * always dark (.theme-dark), so the console reads the same in both themes.
 */
export function Console({
  framed = true,
  wrap = false,
  className,
  children,
  ...props
}: ComponentProps<"pre"> & {
  framed?: boolean;
  /** Wrap long lines instead of scrolling sideways. */
  wrap?: boolean;
}) {
  return (
    <div
      className={cn(
        "min-w-0 overflow-hidden border-thick border-line",
        framed && "rounded-md shadow-md",
        className,
      )}
    >
      <pre
        // Inset focus ring: the frame clips anything outside (browsers focus scrollers).
        className={cn(
          "theme-dark m-0 overflow-x-auto bg-surface-sunken p-4 font-mono text-[13px] leading-5 focus-visible:outline-offset-[-3px]",
          wrap ? "whitespace-pre-wrap" : "whitespace-pre",
        )}
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

const tones = {
  dim: "text-ink-muted",
  ok: "text-text-success",
  bad: "text-text-danger",
  info: "text-text-link",
  warn: "text-accent-yellow",
};

/** Coloured run of text inside a Console. */
export function Term({ tone, ...props }: ComponentProps<"span"> & { tone: keyof typeof tones }) {
  return <span className={tones[tone]} {...props} />;
}
