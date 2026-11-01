// Serves dist/client the way GitHub Pages does: under the base path, `/x` from
// `x.html`, files as they are, and 404.html for everything else. `vp run preview`
// uses it; Playwright and Lighthouse run against it too.
import { existsSync, readFileSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, resolve, sep } from "node:path";
import { site } from "../site.config.ts";

const types: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css",
  ".js": "text/javascript",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".webmanifest": "application/manifest+json",
};

const isFile = (path: string) => existsSync(path) && statSync(path).isFile();

export function resolveRequest(
  root: string,
  basePath: string,
  url: string,
): { status: number; file: string } {
  const notFound = { status: 404, file: join(root, "404.html") };
  let path: string;
  try {
    path = decodeURIComponent(new URL(url, "http://localhost").pathname);
  } catch {
    return notFound;
  }
  if (!path.startsWith(basePath)) return notFound;

  const target = resolve(root, `.${sep}${path.slice(basePath.length)}`);
  if (target !== root && !target.startsWith(root + sep)) return notFound;

  for (const candidate of [join(target, "index.html"), target, `${target}.html`]) {
    if (isFile(candidate)) return { status: 200, file: candidate };
  }
  return notFound;
}

if (import.meta.main) {
  const root = resolve("dist/client");
  const port = Number(process.env.PORT ?? 4173);
  createServer((req, res) => {
    const { status, file } = resolveRequest(root, site.basePath, req.url ?? "/");
    if (!isFile(file)) return res.writeHead(404).end("Not found");
    res.writeHead(status, { "content-type": types[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
  }).listen(port, () =>
    console.log(`Serving dist/client at http://localhost:${port}${site.basePath}`),
  );
}
