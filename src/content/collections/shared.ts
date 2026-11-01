import * as z from "zod";

export const productKey = z.enum([
  "tide",
  "reef",
  "current",
  "molt",
  "cast",
  "barnacle",
  "spawn",
  "assistant",
]);

/** ISO date; drafts may keep the designs' "[DATE]" placeholder (see `datedUnlessDraft`). */
export const date = z.union([z.iso.date(), z.literal("[DATE]")]);

/** Published entries need a real date; only drafts may keep "[DATE]". */
export const datedUnlessDraft = (entry: { draft: boolean; date: string }) =>
  entry.draft || entry.date !== "[DATE]";
