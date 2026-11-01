import { expect, test } from "vite-plus/test";
import { matchesQuery, searchText } from "./filter";

const item = {
  q: "Can I still run plain containers?",
  a: "Yes, with <code>isolation: shared</code> for apps that need it.",
  link: { label: "About Spawn →" },
};

test("matches every word of the query in any order, ignoring case", () => {
  const text = searchText(item);
  expect(matchesQuery(text, "")).toBe(true);
  expect(matchesQuery(text, "  ")).toBe(true);
  expect(matchesQuery(text, "SHARED containers")).toBe(true);
  expect(matchesQuery(text, "spawn")).toBe(true);
  expect(matchesQuery(text, "containers windows")).toBe(false);
});

test("searches answer text, not markup", () => {
  expect(matchesQuery(searchText(item), "code")).toBe(false);
});
