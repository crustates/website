/** The page without its `<link rel="modulepreload">` tags, for pages that run no scripts. */
export function withoutModulePreloads(html: string): string {
  return html.replace(/<link rel="modulepreload"[^>]*>/g, "");
}
