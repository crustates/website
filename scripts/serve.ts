// Serves dist/client the way GitHub Pages does: under the base path, folders
// from their index.html (redirecting to add the trailing slash), files as they
// are, and 404.html for everything else. `vp run preview`
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
const isDir = (path: string) => existsSync(path) && statSync(path).isDirectory();

export type Resolved = { status: 200 | 404; file: string } | { status: 301; location: string };

export function resolveRequest(root: string, basePath: string, url: string): Resolved {
  const notFound = { status: 404, file: join(root, "404.html") } as const;
  let path: string;
  try {
    path = decodeURIComponent(new URL(url, "http://localhost").pathname);
  } catch {
    return notFound;
  }
  if (`${path}/` === basePath) return { status: 301, location: basePath };
  if (!path.startsWith(basePath)) return notFound;

  const target = resolve(root, `.${sep}${path.slice(basePath.length)}`);
  if (target !== root && !target.startsWith(root + sep)) return notFound;

  // Like Pages: a folder needs its trailing slash, then serves its index.html.
  if (isDir(target)) {
    if (!path.endsWith("/")) return { status: 301, location: `${path}/` };
    const index = join(target, "index.html");
    return isFile(index) ? { status: 200, file: index } : notFound;
  }
  return isFile(target) ? { status: 200, file: target } : notFound;
}

if (import.meta.main) {
  const root = resolve("dist/client");
  const port = Number(process.env.PORT ?? 4173);
  createServer((req, res) => {
    const result = resolveRequest(root, site.basePath, req.url ?? "/");
    if (result.status === 301) return res.writeHead(301, { location: result.location }).end();
    if (!isFile(result.file)) return res.writeHead(404).end("Not found");
    res.writeHead(result.status, {
      "content-type": types[extname(result.file)] ?? "application/octet-stream",
    });
    res.end(readFileSync(result.file));
  }).listen(port, () =>
    console.log(`Serving dist/client at http://localhost:${port}${site.basePath}`),
  );
}
