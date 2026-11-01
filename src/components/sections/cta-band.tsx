import type { ReactNode } from "react";
import { Section } from "@/components/ui/section";

/** The rust call-to-action band that closes a page: a heading and its buttons. */
export function CtaBand({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <Section
      tone="rust"
      className="border-t-3 border-line"
      wrapClassName="flex flex-wrap items-center justify-between gap-6"
    >
      <h2 className="min-w-0 flex-[1_1_480px] text-heading-1">{heading}</h2>
      <div className="flex flex-wrap gap-3">{children}</div>
    </Section>
  );
}
