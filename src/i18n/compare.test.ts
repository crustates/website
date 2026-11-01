import { expect, test } from "vite-plus/test";
import compare from "@/i18n/en/compare.json";

// The matrix keeps statuses as data; a typo would render an unlabelled pill.
test("every matrix cell is a status with a label", () => {
  expect(Object.keys(compare.status)).toEqual(["yes", "partial", "no", "planned"]);
  const columns = ["crustates", "proxmox", "truenas", "unraid", "xcpng", "panels"] as const;
  for (const row of compare.matrix.rows) {
    for (const c of columns) expect(Object.keys(compare.status)).toContain(row[c]);
  }
});
