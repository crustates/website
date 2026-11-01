import { site } from "../../site.config.ts";

type Site = { origin: string; basePath: string };

/** URL of a file in `public/`, with the base path applied. */
export function asset(path: string, { basePath }: Site = site): string {
  return basePath + path.replace(/^\//, "");
}

/** Full URL of a route or file, for canonical links, feeds and the sitemap. */
export function absoluteUrl(path: string, config: Site = site): string {
  return config.origin + asset(path, config);
}

/**
 * Link to a page. Pages are written as folders with an index.html, which
 * GitHub Pages serves at the URL with a trailing slash.
 */
export function href(path: string, config: Site = site): string {
  return asset(path.replace(/\/?$/, "/"), config);
}

/** Full URL of a page, for canonical and Open Graph links. */
export function pageUrl(path: string, config: Site = site): string {
  return config.origin + href(path, config);
}
