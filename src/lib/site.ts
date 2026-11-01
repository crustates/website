import { site } from "../../site.config";

type Site = { origin: string; basePath: string };

/** URL of a file in `public/`, with the base path applied. */
export function asset(path: string, { basePath }: Site = site): string {
  return basePath + path.replace(/^\//, "");
}

/** Full URL of a route or file, for canonical links, feeds and the sitemap. */
export function absoluteUrl(path: string, config: Site = site): string {
  return config.origin + asset(path, config);
}
