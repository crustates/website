import { defineSingleton } from "@content-collections/core";
import * as z from "zod";

export const roadmapSchema = z.strictObject({
  milestones: z
    .array(
      z.strictObject({
        id: z.string().regex(/^M\d+$/),
        title: z.string(),
        status: z.enum(["shipped", "in-progress", "planned"]),
        items: z.array(z.string()).min(1),
      }),
    )
    .min(1),
  later: z.array(z.string()).default([]),
});

// The roadmap: content/roadmap.yaml, milestones M0 to M6 plus "later".
export const roadmap = defineSingleton({
  name: "roadmap",
  filePath: "content/roadmap.yaml",
  parser: "yaml",
  schema: roadmapSchema,
});
