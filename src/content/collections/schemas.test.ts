import { expect, test } from "vite-plus/test";
import { catalogSchema } from "./catalog";
import { faqSchema } from "./faq";
import { postSchema } from "./posts";
import { releaseSchema } from "./releases";
import { roadmapSchema } from "./roadmap";

const app = {
  name: "Pi-hole",
  category: "Network",
  isolation: "shared",
  description: "DNS",
  tile: "blue",
};
const post = {
  title: "T",
  summary: "S",
  date: "2026-11-05",
  category: "C",
  author: { name: "A", role: "R" },
  content: "x",
};
const release = {
  date: "2026-11-05",
  summary: "S",
  description: "D",
  changes: [{ type: "fixed", text: "x" }],
  content: "",
};

test("schemas accept valid entries", () => {
  expect(catalogSchema.safeParse(app).success).toBe(true);
  expect(postSchema.safeParse(post).success).toBe(true);
  expect(releaseSchema.safeParse(release).success).toBe(true);
});

test("schemas reject unknown or misspelled keys instead of dropping them", () => {
  expect(catalogSchema.safeParse({ ...app, exmaple: true }).success).toBe(false);
  expect(catalogSchema.safeParse({ ...app, draft: true }).success).toBe(false);
  expect(postSchema.safeParse({ ...post, darft: true }).success).toBe(false);
  expect(postSchema.safeParse({ ...post, author: { ...post.author, email: "x" } }).success).toBe(
    false,
  );
  expect(releaseSchema.safeParse({ ...release, drafts: true }).success).toBe(false);
  expect(
    faqSchema.safeParse({ title: "T", order: 1, items: [{ q: "Q", a: "A", qa: 1 }] }).success,
  ).toBe(false);
  expect(roadmapSchema.safeParse({ milestones: [], laters: [] }).success).toBe(false);
});
