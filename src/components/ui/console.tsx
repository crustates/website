import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * A terminal session. The frame takes the page's line colour; the inside is
 * always dark (.theme-dark), so the console reads the same in both themes.
 */
export function Console({
  framed = true,
  className,
  children,
  ...props
}: ComponentProps<"pre"> & { framed?: boolean }) {
  return (
    <div
      className={cn(
        "overflow-hidden border-thick border-line",
        framed && "rounded-md shadow-md",
        className,
      )}
    >
      <pre
        className="theme-dark m-0 overflow-x-auto whitespace-pre bg-surface-sunken p-4 font-mono text-[13px] leading-5"
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
