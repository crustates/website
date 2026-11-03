import { describe, expect, test } from "vite-plus/test";
import { belowMin, medianRun, scoreTable, type Scores } from "./lighthouse";

const scores = (performance: number, rest = 1): Scores => ({
  performance,
  accessibility: rest,
  "best-practices": rest,
  seo: rest,
});

describe("medianRun", () => {
  test("picks the run with the median performance score", () => {
    expect(medianRun([scores(0.9), scores(0.99), scores(0.95)])).toEqual(scores(0.95));
  });
});

describe("belowMin", () => {
  test("lists every category under the minimum, per page", () => {
    expect(
      belowMin(
        [
          { page: "/", scores: scores(0.96) },
          { page: "/faq/", scores: { ...scores(0.94), seo: 0.9 } },
        ],
        0.95,
      ),
    ).toEqual(["/faq/: performance 94", "/faq/: seo 90"]);
  });
});

describe("scoreTable", () => {
  test("is a Markdown table of scores out of 100", () => {
    expect(scoreTable([{ page: "/", scores: scores(0.97) }])).toBe(
      "| Page | Performance | Accessibility | Best practices | SEO |\n|---|--:|--:|--:|--:|\n| / | 97 | 100 | 100 | 100 |\n",
    );
  });
});
