import { expect, test } from "vite-plus/test";
import { byDateDesc, byVersionDesc } from "./order";

test("orders versions numerically, newest first", () => {
  const versions = ["0.4.1", "0.10.0", "0.4.0", "1.0.0", "0.9.12"].map((version) => ({ version }));
  expect(versions.sort(byVersionDesc).map((r) => r.version)).toEqual([
    "1.0.0",
    "0.10.0",
    "0.9.12",
    "0.4.1",
    "0.4.0",
  ]);
});

test("orders dates newest first, undated drafts on top", () => {
  const dates = ["2026-10-01", "[DATE]", "2026-11-05"].map((date) => ({ date }));
  expect(dates.sort(byDateDesc).map((p) => p.date)).toEqual(["[DATE]", "2026-11-05", "2026-10-01"]);
});
