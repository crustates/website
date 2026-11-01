import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// The type style names from design/tokens.json (scripts/tokens.test.ts checks
// they match). Without them tailwind-merge reads `text-body-s` as a colour and
// drops it next to `text-ink`.
export const TEXT_STYLES = [
  "display-xl",
  "display-l",
  "heading-1",
  "heading-2",
  "heading-3",
  "heading-4",
  "body-l",
  "body",
  "body-s",
  "label",
  "caption",
  "code",
  "code-s",
  "kicker",
] as const;

// The border width utilities from design/tokens.json (`border-thin`, `border-thick`).
export const BORDER_WIDTHS = ["thin", "thick"] as const;

const twMerge = extendTailwindMerge({
  extend: {
    theme: { text: [...TEXT_STYLES] },
    classGroups: { "border-w": [{ border: [...BORDER_WIDTHS] }] },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
