// Pages for content entries, for the prerender list in vite.config.ts. That
// config loads before content-collections runs, so this reads the files
// directly: the file name is the slug, and only the `draft` flag matters.
import { readFileSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { parse } from "yaml";

// Catalog apps have no drafts (the schema has no `draft` key).
const sources = [
  { dir: "blog", ext: ".mdx", route: "/blog", drafts: true },
  { dir: "releases", ext: ".md", route: "/changelog", drafts: true },
  { dir: "catalog", ext: ".yaml", route: "/catalog", drafts: false },
] as const;

/** Whether a content file sets `draft: true` (YAML, or frontmatter in Markdown/MDX). */
export function isDraft(file: string, ext: string = extname(file)): boolean {
  const text = readFileSync(file, "utf8");
  const data =
    ext === ".yaml" ? parse(text) : parse(/^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? "");
  return data?.draft === true;
}

export function contentPaths(root: string, drafts: boolean): string[] {
  return sources
    .flatMap(({ dir, ext, route, drafts: hasDrafts }) =>
      readdirSync(join(root, dir))
        .filter((name) => extname(name) === ext)
        .filter((name) => drafts || !hasDrafts || !isDraft(join(root, dir, name), ext))
        .map((name) => `${route}/${basename(name, ext)}`),
    )
    .sort();
}
