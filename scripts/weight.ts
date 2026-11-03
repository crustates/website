// Gzipped JavaScript each prerendered page loads up front: its module scripts
// and modulepreloads. Chunks loaded later (the menu sheet) don't count.
// `vp run weight` prints it as a Markdown table after `vp build`.
import { readdirSync, readFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { gzipSync } from "node:zlib";
import { site } from "../site.config.ts";

export type Weight = { page: string; files: number; gzip: number };

/** URLs of the module scripts and modulepreloads in a page, once each. */
export function pageScripts(html: string): string[] {
  const urls = [
    ...html.matchAll(/<script[^>]*\ssrc="([^"]+)"/g),
    ...html.matchAll(/<link rel="modulepreload"[^>]*\shref="([^"]+)"/g),
  ].map((m) => m[1]!);
  return [...new Set(urls)].sort((a, b) => a.localeCompare(b));
}

export function weightTable(rows: readonly Weight[]): string {
  const lines = [...rows]
    .sort((a, b) => b.gzip - a.gzip)
    .map((r) => `| ${r.page} | ${r.files} | ${(r.gzip / 1000).toFixed(1)} KB |`);
  return ["| Page | JS files | JS (gzip) |", "|---|--:|--:|", ...lines].join("\n") + "\n";
}

function weights(root: string, basePath: string): Weight[] {
  const gzipped = new Map<string, number>();
  const size = (url: string) => {
    if (!gzipped.has(url)) {
      const file = join(root, url.slice(basePath.length));
      gzipped.set(url, gzipSync(readFileSync(file)).length);
    }
    return gzipped.get(url)!;
  };
  return readdirSync(root, { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith(".html"))
    .map((file) => {
      const urls = pageScripts(readFileSync(join(root, file), "utf8"));
      const page = `/${file.replace(/index\.html$/, "")}`;
      return { page, files: urls.length, gzip: urls.reduce((sum, url) => sum + size(url), 0) };
    });
}

if (import.meta.main) {
  process.stdout.write(weightTable(weights(resolve("dist/client"), site.basePath)));
}
