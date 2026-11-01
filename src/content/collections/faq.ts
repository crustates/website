import { defineCollection } from "@content-collections/core";
import * as z from "zod";

// FAQ: one YAML file per topic in content/faq, shown in `order`. Answers may
// contain inline <code>; `link` adds a "more" link to a page of this site.
export const faq = defineCollection({
  name: "faq",
  directory: "content/faq",
  include: "*.yaml",
  parser: "yaml",
  schema: z.object({
    title: z.string(),
    order: z.number().int(),
    items: z
      .array(
        z.object({
          q: z.string(),
          a: z.string(),
          link: z.object({ label: z.string(), to: z.string().startsWith("/") }).optional(),
        }),
      )
      .min(1),
  }),
  transform: (topic) => ({ ...topic, id: topic._meta.path }),
});
