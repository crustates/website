import { cn } from "@/lib/utils";

const tones = {
  blue: "bg-brand-blue",
  rust: "bg-brand-rust",
  teal: "bg-brand-teal",
  violet: "bg-brand-violet",
  warn: "bg-accent-yellow",
  bad: "bg-status-danger",
};

/** A usage bar. `label` is its accessible name, e.g. "Pool usage 62 percent". */
export function Meter({
  value,
  label,
  tone = "blue",
  className,
}: {
  value: number;
  label: string;
  tone?: keyof typeof tones;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "h-3 overflow-hidden rounded-[2px] border-thin border-line bg-surface-card",
        className,
      )}
    >
      <span
        className={cn("block h-full border-r-2 border-line", tones[tone])}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
