import { defineCollection } from "@content-collections/core";
import * as z from "zod";
import { showDrafts } from "../drafts";
import { tableOfContents } from "../toc";
import { date, datedUnlessDraft, productKey } from "./shared";

export const postSchema = z
  .strictObject({
    title: z.string(),
    summary: z.string(),
    /** Longer intro under the title on the post page; defaults to the summary. */
    lede: z.string().optional(),
    date,
    product: productKey.optional(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    author: z.strictObject({ name: z.string(), role: z.string() }),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    content: z.string(),
  })
  .refine(datedUnlessDraft, {
    message: 'Published posts need a real date, not "[DATE]"',
    path: ["date"],
  });

// Blog posts: content/blog/<slug>.mdx. The MDX body is compiled by
// @mdx-js/rollup and imported by the post page; this collection holds the
// frontmatter, the table of contents and the reading time.
export const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "*.mdx",
  parser: "frontmatter",
  schema: postSchema,
  transform: (post, { skip }) => {
    if (post.draft && !showDrafts()) return skip("draft");
    const { content, ...meta } = post;
    const toc = tableOfContents(content);
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
      ...meta,
      slug: post._meta.path,
      toc,
      readingMinutes: Math.max(1, Math.round(words / 230)),
    };
  },
});
