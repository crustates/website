import type { ComponentProps } from "react";
import { asset } from "@/lib/site";

export type BadgeName =
  | "built-in-rust"
  | "cluster-cast"
  | "compute-tide"
  | "gitops-spawn"
  | "made-in-nl"
  | "network-current"
  | "open-source"
  | "os-molt"
  | "plugins-barnacle"
  | "powered-by"
  | "runs-on"
  | "self-hosted"
  | "storage-reef";

/** A brand badge SVG. Pass width and height to reserve its space. */
export function Badge({
  name,
  alt,
  ...props
}: Omit<ComponentProps<"img">, "src"> & { name: BadgeName; alt: string }) {
  return <img src={asset(`/brand/badge-${name}.svg`)} alt={alt} {...props} />;
}
