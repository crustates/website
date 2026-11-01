import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";

/** A route (`to`, client-side navigation) or a plain URL (`href`). */
export type NavTarget = { to: LinkProps["to"] } | { href: string };
export type NavItem = NavTarget & { label: string };

export function NavAnchor({
  target,
  className,
  activeClassName,
  onClick,
  children,
}: {
  target: NavTarget;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if ("to" in target) {
    return (
      <Link
        to={target.to}
        className={className}
        activeProps={{ className: activeClassName }}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }
  return (
    <a href={target.href} className={className} onClick={onClick}>
      {children}
    </a>
  );
}
