import { defineCollection } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import * as z from "zod";
import { showDrafts } from "../drafts";
import { date, datedUnlessDraft, productKey } from "./shared";

export const releaseSchema = z
  .strictObject({
    date,
    channel: z.enum(["stable", "beta"]).default("stable"),
    security: z.boolean().default(false),
    /** One or two sentences for the changelog list. */
    summary: z.string(),
    /** The lead on the release page. */
    description: z.string(),
    changes: z
      .array(
        z.strictObject({
          type: z.enum(["added", "changed", "fixed", "removed", "security"]),
          text: z.string(),
        }),
      )
      .min(1),
    vulnerabilities: z
      .array(
        z.strictObject({
          component: z.string(),
          advisory: z.string(),
          severity: z.enum(["critical", "high", "medium", "low"]),
          affected: z.string(),
        }),
      )
      .default([]),
    areas: z.partialRecord(productKey, z.array(z.string())).default({}),
    checksums: z
      .array(z.strictObject({ file: z.string(), size: z.string(), sha256: z.string() }))
      .default([]),
    image: z.string().optional(),
    draft: z.boolean().default(false),
    content: z.string(),
  })
  .refine(datedUnlessDraft, {
    message: 'Published releases need a real date, not "[DATE]"',
    path: ["date"],
  });

// Release notes: content/releases/<version>.md. Structured parts (highlights,
// advisories, checksums) are frontmatter; the body is free Markdown.
export const releases = defineCollection({
  name: "releases",
  directory: "content/releases",
  include: "*.md",
  parser: "frontmatter",
  schema: releaseSchema,
  transform: async (release, context) => {
    if (release.draft && !showDrafts()) return context.skip("draft");
    const version = release._meta.path;
    if (!/^\d+\.\d+\.\d+(-[\w.]+)?$/.test(version)) {
      throw new Error(
        `content/releases/${version}.md: the file name must be the version, e.g. 0.4.1.md`,
      );
    }
    const html = await compileMarkdown(context, release);
    const { content: _, ...meta } = release;
    return { ...meta, version, html };
  },
});
