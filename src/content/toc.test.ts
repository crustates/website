import { expect, test } from "vite-plus/test";
import { tableOfContents } from "./toc";

test("lists level-2 headings with the ids rehype-slug gives them", () => {
  expect(tableOfContents("## The `shared` problem\ntext\n## What it costs")).toEqual([
    { id: "the-shared-problem", text: "The shared problem" },
    { id: "what-it-costs", text: "What it costs" },
  ]);
});

test("skips lines inside code fences", () => {
  const mdx = "## Real\n```yaml\n## not a heading\n```\n## Also real";
  expect(tableOfContents(mdx).map((h) => h.text)).toEqual(["Real", "Also real"]);
});
