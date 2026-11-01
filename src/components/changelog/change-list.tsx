import { useTranslation } from "react-i18next";
import { InlineCode } from "@/components/inline-code";
import { Tag } from "@/components/ui/tag";
import type { Release } from "@/content";
import { cn } from "@/lib/utils";

const tints = {
  added: "bg-tint-teal",
  changed: "bg-tint-blue",
  fixed: "bg-tint-yellow",
  removed: "bg-tint-violet",
  security: "bg-tint-rust",
} as const;

/** A release's changes, one row per change with its type as a coloured tag. */
export function ChangeList({ changes }: { changes: Release["changes"] }) {
  const { t } = useTranslation("changelog");
  return (
    <ul className="flex flex-col gap-3">
      {changes.map((change) => (
        <li key={`${change.type}:${change.text}`} className="flex items-start gap-3">
          <Tag className={cn("shrink-0", tints[change.type])}>{t(`types.${change.type}`)}</Tag>
          <span className="min-w-0">
            <InlineCode text={change.text} />
          </span>
        </li>
      ))}
    </ul>
  );
}
