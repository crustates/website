import { expect, test } from "vite-plus/test";
import { cn } from "./utils";

test("keeps a token text size next to a text colour", () => {
  expect(cn("text-ink", "text-body-s")).toBe("text-ink text-body-s");
});

test("lets a later token text size override an earlier one", () => {
  expect(cn("text-body", "text-display-xl")).toBe("text-display-xl");
});

test("lets a later token shadow override an earlier one", () => {
  expect(cn("shadow-md", "shadow-lg")).toBe("shadow-lg");
});

test("keeps a token border width next to a border colour", () => {
  expect(cn("border-thick", "border-line")).toBe("border-thick border-line");
});

test("lets a later token border width override an earlier one", () => {
  expect(cn("border-thick", "border-thin")).toBe("border-thin");
});
