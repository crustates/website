import { defineCollection } from "@content-collections/core";
import * as z from "zod";

export const faqSchema = z.strictObject({
  title: z.string(),
  order: z.number().int(),
  items: z
    .array(
      z.strictObject({
        q: z.string(),
        a: z.string(),
        link: z.strictObject({ label: z.string(), to: z.string().startsWith("/") }).optional(),
      }),
    )
    .min(1),
});

// FAQ: one YAML file per topic in content/faq, shown in `order`. Answers may
// contain `code` spans in backticks; `link` adds a "more" link to a page of this site.
export const faq = defineCollection({
  name: "faq",
  directory: "content/faq",
  include: "*.yaml",
  parser: "yaml",
  schema: faqSchema,
  transform: (topic) => ({ ...topic, id: topic._meta.path }),
});
