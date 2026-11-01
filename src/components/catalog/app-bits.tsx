import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Tag } from "@/components/ui/tag";
import type { App } from "@/content";
import { cn } from "@/lib/utils";

const tiles = {
  blue: "bg-brand-blue text-on-fill-light",
  rust: "bg-brand-rust text-on-fill-dark",
  teal: "bg-brand-teal text-on-fill-light",
  yellow: "bg-accent-yellow text-on-fill-dark",
  danger: "bg-status-danger text-on-fill-dark",
  success: "bg-status-success text-on-fill-dark",
  card: "bg-surface-card text-ink",
};

const sizes = {
  sm: "size-10 text-[20px]",
  md: "size-12 text-[24px]",
  lg: "size-16 text-[32px]",
  xl: "size-[88px] text-[44px]",
};

/** The app's initial on a coloured square; decorative, the name is always next to it. */
export function AppTile({
  name,
  tile,
  size = "md",
}: {
  name: string;
  tile: App["tile"];
  size?: keyof typeof sizes;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex flex-none items-center justify-center rounded-md border-thick border-line font-sans leading-none font-bold",
        tiles[tile],
        sizes[size],
      )}
    >
      {name[0]}
    </span>
  );
}

const isolationTones = { microvm: "info", vm: "warn", shared: "off", database: "ok" } as const;

export function IsolationPill({
  isolation,
  className,
}: {
  isolation: App["isolation"];
  className?: string;
}) {
  const { t } = useTranslation("catalog");
  return (
    <Pill tone={isolationTones[isolation]} className={className}>
      {t(`isolation.${isolation}`)}
    </Pill>
  );
}

/** Marks a sample entry from the design, not a real template yet. */
export function ExampleTag() {
  const { t } = useTranslation("catalog");
  return <Tag className="bg-tint-yellow">{t("list.example")}</Tag>;
}

/** A small card for another app: linked when it is in the catalog. */
export function RelatedApp({
  name,
  meta,
  tile,
  slug,
}: {
  name: string;
  meta: string;
  tile: App["tile"];
  slug?: string;
}) {
  const body = (
    <>
      <AppTile name={name} tile={tile} size="sm" />
      <span className="flex min-w-0 flex-col gap-0.5">
        <strong>{name}</strong>
        <span className="text-caption text-ink-muted">{meta}</span>
      </span>
    </>
  );
  const className = "flex items-center gap-3 text-ink no-underline";
  return slug ? (
    <Card asChild padding="tight" className={cn(className, "hover:shadow-lg")}>
      <Link to="/catalog/$app/" params={{ app: slug }}>
        {body}
      </Link>
    </Card>
  ) : (
    <Card padding="tight" className={className}>
      {body}
    </Card>
  );
}
