import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeAll, expect, test } from "vite-plus/test";
import { draftMdx } from "./draft-mdx";

let dir: string;
beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), "mdx-"));
  mkdirSync(join(dir, "blog"));
  writeFileSync(join(dir, "blog/wip.mdx"), "---\ndraft: true\n---\nSecret plans");
  writeFileSync(join(dir, "blog/out.mdx"), "---\ntitle: Out\n---\nPublic");
});

const load = (plugin: ReturnType<typeof draftMdx>, id: string) =>
  (plugin.load as (id: string) => string | null)(id);

test("empties a draft post's MDX when drafts are hidden", () => {
  expect(load(draftMdx(false), join(dir, "blog/wip.mdx"))).toBe("");
});

test("leaves published posts, non-MDX files and shown drafts alone", () => {
  expect(load(draftMdx(false), join(dir, "blog/out.mdx"))).toBeNull();
  expect(load(draftMdx(false), join(dir, "blog/wip.ts"))).toBeNull();
  expect(load(draftMdx(true), join(dir, "blog/wip.mdx"))).toBeNull();
});
