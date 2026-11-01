import { absoluteUrl, pageUrl } from "./site";

type Item = { title: string; path: string; date: string; description: string };

const escape = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!,
  );

const pubDate = (date: string) =>
  /^\d{4}-\d{2}-\d{2}$/.test(date)
    ? `<pubDate>${new Date(`${date}T00:00:00Z`).toUTCString()}</pubDate>`
    : "";

/** RSS 2.0 feed for a list page at `path`; the feed itself is at `<path>/rss.xml`. */
export function rssXml({
  title,
  description,
  path,
  items,
}: {
  title: string;
  description: string;
  path: string;
  items: readonly Item[];
}): string {
  const entries = items.map((item) =>
    [
      "    <item>",
      `      <title>${escape(item.title)}</title>`,
      `      <link>${pageUrl(item.path)}</link>`,
      `      <guid>${pageUrl(item.path)}</guid>`,
      `      ${pubDate(item.date)}`,
      `      <description>${escape(item.description)}</description>`,
      "    </item>",
    ]
      .filter((line) => line.trim())
      .join("\n"),
  );
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "  <channel>",
    `    <title>${escape(title)}</title>`,
    `    <link>${pageUrl(path)}</link>`,
    `    <description>${escape(description)}</description>`,
    `    <atom:link href="${absoluteUrl(`${path}/rss.xml`)}" rel="self" type="application/rss+xml"/>`,
    ...entries,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");
}
