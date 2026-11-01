import { defineCollection } from "@content-collections/core";
import GithubSlugger from "github-slugger";
import * as z from "zod";
import { showDrafts } from "../drafts";
import { date, datedUnlessDraft, productKey } from "./shared";

// Blog posts: content/blog/<slug>.mdx. The MDX body is compiled by
// @mdx-js/rollup and imported by the post page; this collection holds the
// frontmatter, the table of contents and the reading time.
export const posts = defineCollection({
  name: "posts",
  directory: "content/blog",
  include: "*.mdx",
  parser: "frontmatter",
  schema: z
    .object({
      title: z.string(),
      summary: z.string(),
      date,
      product: productKey.optional(),
      category: z.string(),
      tags: z.array(z.string()).default([]),
      author: z.object({ name: z.string(), role: z.string() }),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
      content: z.string(),
    })
    .refine(datedUnlessDraft, {
      message: 'Published posts need a real date, not "[DATE]"',
      path: ["date"],
    }),
  transform: (post, { skip }) => {
    if (post.draft && !showDrafts()) return skip("draft");
    const { content, ...meta } = post;
    // Same slugs as rehype-slug gives the rendered headings.
    const slugger = new GithubSlugger();
    const toc = [...content.matchAll(/^## (.+)$/gm)].map(([, heading = ""]) => {
      const text = heading.replace(/[`*_]/g, "");
      return { id: slugger.slug(text), text };
    });
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
      ...meta,
      slug: post._meta.path,
      toc,
      readingMinutes: Math.max(1, Math.round(words / 230)),
    };
  },
});
