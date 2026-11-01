import { expect, test } from "vite-plus/test";
import { rssXml } from "./rss";

const feed = rssXml({
  title: "Crustates blog",
  description: "Notes from the reef.",
  path: "/blog",
  items: [
    {
      title: "ZFS & Btrfs <side by side>",
      path: "/blog/zfs",
      date: "2026-11-05",
      description: "Pools",
    },
    { title: "Draft", path: "/blog/draft", date: "[DATE]", description: "Soon" },
  ],
});

test("links the channel, its own feed and each item under the site URL", () => {
  expect(feed).toContain("<link>https://crustates.github.io/website/blog/</link>");
  expect(feed).toContain(
    '<atom:link href="https://crustates.github.io/website/blog/rss.xml" rel="self" type="application/rss+xml"/>',
  );
  expect(feed).toContain("<guid>https://crustates.github.io/website/blog/zfs/</guid>");
});

test("escapes text and dates items in RFC 822", () => {
  expect(feed).toContain("<title>ZFS &amp; Btrfs &lt;side by side&gt;</title>");
  expect(feed).toContain("<pubDate>Thu, 05 Nov 2026 00:00:00 GMT</pubDate>");
});

test("leaves the date off an undated draft", () => {
  const draft = feed.slice(feed.indexOf("<title>Draft</title>"));
  expect(draft.slice(0, draft.indexOf("</item>"))).not.toContain("<pubDate>");
});
