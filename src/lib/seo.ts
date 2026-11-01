import { absoluteUrl } from "./site";

type SeoInput = {
  title: string;
  description: string;
  /** Route path, e.g. "/features". */
  path: string;
  /** Social card image in public/, 1200×630. */
  image?: string;
  noindex?: boolean;
};

/** Title, description, canonical URL, Open Graph and Twitter tags for a route's head(). */
export function seo({
  title,
  description,
  path,
  image = "/brand/og-image.png",
  noindex,
}: SeoInput) {
  const fullTitle = `${title} · Crustates`;
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex" }] : []),
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Crustates" },
      { property: "og:url", content: url },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:image", content: imageUrl },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
    ],
    links: noindex ? [] : [{ rel: "canonical", href: url }],
  };
}
