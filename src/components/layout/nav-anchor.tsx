import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** A route (`to`, client-side navigation) or a plain URL (`href`). */
export type NavTarget = { to: LinkProps["to"]; hash?: string } | { href: string };
export type NavItem = NavTarget & {
  label: string;
  /** Route paths that belong to this item's section, so it shows as current there. */
  section?: readonly string[];
};

export function NavAnchor({
  target,
  className,
  activeClassName,
  active = false,
  onClick,
  children,
}: {
  target: NavTarget;
  className?: string;
  activeClassName?: string;
  /** Show as current even when the URL is another page in the section. */
  active?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  if ("to" in target) {
    return (
      <Link
        to={target.to}
        hash={target.hash}
        className={cn(className, active && activeClassName)}
        aria-current={active ? "true" : undefined}
        activeProps={{ className: activeClassName }}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={target.href}
      className={cn(className, active && activeClassName)}
      aria-current={active ? "true" : undefined}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
