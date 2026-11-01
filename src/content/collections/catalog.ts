import { defineCollection } from "@content-collections/core";
import * as z from "zod";
import { date } from "./shared";

// App catalog: content/catalog/<slug>.yaml. `detail` holds the extra sections
// of an app page (only some apps have them).
const tile = z.enum(["blue", "rust", "teal", "yellow", "danger", "success", "card"]);

export const catalogSchema = z.strictObject({
  name: z.string(),
  category: z.string(),
  isolation: z.enum(["microvm", "vm", "shared", "database"]),
  /** e.g. "2 vCPU · 4 GiB RAM" */
  resources: z.string().optional(),
  /** What the app needs from the host; drives the catalog filters. */
  needs: z.array(z.enum(["gpu", "usb", "database"])).default([]),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  source: z.enum(["curated", "community"]).default("curated"),
  /** Colour of the letter tile. */
  tile,
  /** Sample entry from the design, not a real template yet. */
  example: z.boolean().default(false),
  detail: z
    .strictObject({
      about: z.string(),
      verified: z.boolean().default(false),
      website: z.strictObject({ label: z.string(), url: z.url() }).optional(),
      version: z.string(),
      template: z.number().int(),
      isolationNote: z.string(),
      architectures: z.array(z.string()),
      licence: z.string(),
      installs: z.string().optional(),
      screenshots: z.array(z.string()).default([]),
      database: z.string().optional(),
      volumes: z.array(z.strictObject({ path: z.string(), description: z.string() })).default([]),
      network: z.string().optional(),
      versions: z
        .array(
          z.strictObject({
            version: z.string(),
            template: z.number().int(),
            released: date,
            notes: z.string(),
            current: z.boolean().default(false),
          }),
        )
        .default([]),
      maintainers: z.array(z.strictObject({ name: z.string(), role: z.string() })).default([]),
      related: z
        .array(
          z.strictObject({
            name: z.string(),
            category: z.string(),
            isolation: z.string(),
            slug: z.string().optional(),
            /** Tile colour for an app that is not in the catalog. */
            tile: tile.optional(),
          }),
        )
        .default([]),
    })
    .optional(),
});

export const catalog = defineCollection({
  name: "catalog",
  directory: "content/catalog",
  include: "*.yaml",
  parser: "yaml",
  schema: catalogSchema,
  transform: (app) => ({ ...app, slug: app._meta.path }),
});
