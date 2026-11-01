import { pageUrl } from "./site";

// Route files that are pages but stay out of the sitemap: the root layout, the
// 404 page, the UI kit and the /plugins redirect. Server routes (.ts) and
// dynamic routes ($param) are not page files of their own.
const hidden = /^\.\/(__root|404|\[_\]kit|plugins)\.tsx$/;

/** Page paths ("/tide/") for the route files in src/routes. */
export function pagePaths(routeFiles: readonly string[]): string[] {
  return routeFiles
    .filter((file) => file.endsWith(".tsx") && !file.includes("$") && !hidden.test(file))
    .map((file) => file.slice(2, -4))
    .map((name) => (name === "index" ? "/" : `/${name.replaceAll(".", "/")}/`))
    .sort();
}

export function sitemapXml(paths: readonly string[]): string {
  const urls = paths.map((path) => `  <url><loc>${pageUrl(path)}</loc></url>`).join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
