// Content for the pages, in display order. Drafts are already left out of
// production builds by the collections (see drafts.ts).
import { allCatalogs, allFaqs, allPosts, allReleases, roadmap } from "content-collections";
import { byDateDesc, byVersionDesc } from "./order";

// Marked pure so bundles that import this module without using a list (route
// files whose server handlers are stripped from the client) drop the content.
const sorted = <T>(items: readonly T[], compare: (a: T, b: T) => number) =>
  [...items].sort(compare);

export const posts = /* @__PURE__ */ sorted(allPosts, byDateDesc);
export const releases = /* @__PURE__ */ sorted(allReleases, byVersionDesc);
export const faqTopics = /* @__PURE__ */ sorted(allFaqs, (a, b) => a.order - b.order);
export const apps = /* @__PURE__ */ sorted(allCatalogs, (a, b) => a.name.localeCompare(b.name));
export { roadmap };

export type Post = (typeof allPosts)[number];
export type Release = (typeof allReleases)[number];
export type FaqTopic = (typeof allFaqs)[number];
export type App = (typeof allCatalogs)[number];

/** Page paths of every entry, for the sitemap. */
export function contentPagePaths(): string[] {
  return [
    ...posts.map((p) => `/blog/${p.slug}/`),
    ...releases.map((r) => `/changelog/${r.version}/`),
    ...apps.map((a) => `/catalog/${a.slug}/`),
  ];
}
