import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeAll, expect, test } from "vite-plus/test";
import { contentPaths } from "./paths";

let root: string;
beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), "content-"));
  for (const dir of ["blog", "releases", "catalog"]) mkdirSync(join(root, dir));
  writeFileSync(join(root, "blog/hello.mdx"), "---\ntitle: Hello\n---\nHi");
  writeFileSync(join(root, "blog/wip.mdx"), "---\ntitle: WIP\ndraft: true\n---\nSoon");
  writeFileSync(join(root, "releases/0.4.1.md"), "---\ndraft: true\n---\n");
  writeFileSync(join(root, "releases/0.5.0.md"), "---\nsummary: x\n---\n");
  writeFileSync(join(root, "catalog/immich.yaml"), "name: Immich\n");
});

test("lists the page of every published entry", () => {
  expect(contentPaths(root, false)).toEqual(["/blog/hello", "/catalog/immich", "/changelog/0.5.0"]);
});

test("includes drafts when drafts are shown", () => {
  expect(contentPaths(root, true)).toEqual([
    "/blog/hello",
    "/blog/wip",
    "/catalog/immich",
    "/changelog/0.4.1",
    "/changelog/0.5.0",
  ]);
});
