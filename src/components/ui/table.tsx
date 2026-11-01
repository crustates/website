import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const frames = {
  thin: "border-thin border-line shadow-md",
  card: "rounded-md border-thick border-line shadow-md",
  none: "",
};

/** A data table; the wrapper scrolls sideways on narrow screens. */
export function Table({
  frame = "thin",
  className,
  ...props
}: Omit<ComponentProps<"table">, "frame"> & { frame?: keyof typeof frames }) {
  return (
    <div
      className={cn(
        "overflow-x-auto bg-surface-card focus-visible:outline-offset-[-3px]",
        frames[frame],
      )}
    >
      <table className={cn("w-full border-collapse text-body-s", className)} {...props} />
    </div>
  );
}

export function Th({ num, className, ...props }: ComponentProps<"th"> & { num?: boolean }) {
  return (
    <th
      className={cn(
        "whitespace-nowrap border-b-2 border-line bg-surface-sunken px-3.5 py-2.5 text-left font-mono text-caption font-bold tracking-[0.06em] uppercase",
        num && "text-right",
        className,
      )}
      {...props}
    />
  );
}

export function Td({ num, className, ...props }: ComponentProps<"td"> & { num?: boolean }) {
  return (
    <td
      className={cn(
        "whitespace-nowrap border-b border-line-soft px-3.5 py-3 align-middle [tr:last-child>&]:border-b-0",
        num && "text-right font-mono",
        className,
      )}
      {...props}
    />
  );
}

export function Tr({
  selected,
  className,
  ...props
}: ComponentProps<"tr"> & { selected?: boolean }) {
  return <tr className={cn(selected && "bg-tint-yellow", className)} {...props} />;
}
