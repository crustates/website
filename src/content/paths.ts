// Pages for content entries, for the prerender list in vite.config.ts. That
// config loads before content-collections runs, so this reads the files
// directly: the file name is the slug, and only the `draft` flag matters.
import { readFileSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import { parse } from "yaml";

const sources = [
  { dir: "blog", ext: ".mdx", route: "/blog" },
  { dir: "releases", ext: ".md", route: "/changelog" },
  { dir: "catalog", ext: ".yaml", route: "/catalog" },
] as const;

function isDraft(file: string, ext: string): boolean {
  const text = readFileSync(file, "utf8");
  const data = ext === ".yaml" ? parse(text) : parse(/^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? "");
  return data?.draft === true;
}

export function contentPaths(root: string, drafts: boolean): string[] {
  return sources
    .flatMap(({ dir, ext, route }) =>
      readdirSync(join(root, dir))
        .filter((name) => extname(name) === ext)
        .filter((name) => drafts || !isDraft(join(root, dir, name), ext))
        .map((name) => `${route}/${basename(name, ext)}`),
    )
    .sort();
}
