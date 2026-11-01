// Content for the pages, in display order. Drafts are already left out of
// production builds by the collections (see drafts.ts).
import { allCatalogs, allFaqs, allPosts, allReleases, roadmap } from "content-collections";
import { byDateDesc, byVersionDesc } from "./order";

export const posts = [...allPosts].sort(byDateDesc);
export const releases = [...allReleases].sort(byVersionDesc);
export const faqTopics = [...allFaqs].sort((a, b) => a.order - b.order);
export const apps = [...allCatalogs].sort((a, b) => a.name.localeCompare(b.name));
export { roadmap };

export type Post = (typeof allPosts)[number];
export type Release = (typeof allReleases)[number];
export type FaqTopic = (typeof allFaqs)[number];
export type App = (typeof allCatalogs)[number];

/** Page paths of every entry, for the sitemap. */
export const contentPagePaths = [
  ...posts.map((p) => `/blog/${p.slug}/`),
  ...releases.map((r) => `/changelog/${r.version}/`),
  ...apps.map((a) => `/catalog/${a.slug}/`),
];
