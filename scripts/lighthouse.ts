// Lighthouse 13 (default mobile config) on one page per template of the built
// site, served the way GitHub Pages does. Fails if any category scores under
// 95. `vp run lighthouse` after `vp build`; CI runs it on every pull request.
// Reports for the median run of each page go to .lighthouse/.
import { appendFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:net";
import type { AddressInfo } from "node:net";
import { resolve } from "node:path";
import lighthouse from "lighthouse";
import { chromium } from "playwright";
import { site } from "../site.config.ts";
import { servePages } from "./serve.ts";

const categories = ["performance", "accessibility", "best-practices", "seo"] as const;
export type Scores = Record<(typeof categories)[number], number>;
type Result = { page: string; scores: Scores };

// One page per template. A blog post and a release page join once any is published.
const templates = [
  "/",
  "/features/",
  "/tide/",
  "/catalog/",
  "/catalog/immich/",
  "/blog/",
  "/faq/",
  "/download/",
  "/legal/",
];
const runs = 3;
const min = 0.95;

/** A port nothing listens on, for Chromium's debugging port. */
async function freePort(): Promise<number> {
  const probe = createServer().listen(0);
  await new Promise((done) => probe.once("listening", done));
  const { port } = probe.address() as AddressInfo;
  await new Promise((done) => probe.close(done));
  return port;
}

/** The run with the median performance score, as Lighthouse CI picks it. */
export function medianRun(list: readonly Scores[]): Scores {
  return [...list].sort((a, b) => a.performance - b.performance)[Math.floor(list.length / 2)]!;
}

export function belowMin(results: readonly Result[], minimum: number): string[] {
  return results.flatMap(({ page, scores }) =>
    categories
      .filter((category) => scores[category] < minimum)
      .map((category) => `${page}: ${category} ${Math.round(scores[category] * 100)}`),
  );
}

export function scoreTable(results: readonly Result[]): string {
  const rows = results.map(
    ({ page, scores }) =>
      `| ${page} | ${categories.map((c) => Math.round(scores[c] * 100)).join(" | ")} |`,
  );
  return (
    [
      "| Page | Performance | Accessibility | Best practices | SEO |",
      "|---|--:|--:|--:|--:|",
      ...rows,
    ].join("\n") + "\n"
  );
}

async function main() {
  const server = servePages(resolve("dist/client"), 0);
  await new Promise((done) => server.once("listening", done));
  const { port } = server.address() as AddressInfo;
  const published = [
    ...readFileSync("dist/client/sitemap.xml", "utf8").matchAll(
      /<loc>[^<]+?(\/(?:blog|changelog)\/[^/<]+\/)<\/loc>/g,
    ),
  ].map((m) => m[1]!);
  const pages = [
    ...templates,
    ...["/blog/", "/changelog/"].flatMap((section) =>
      published.filter((path) => path.startsWith(section)).slice(0, 1),
    ),
  ];
  const debugPort = await freePort();
  // Playwright's Chromium, so local runs and CI use the same browser.
  const browser = await chromium.launch({ args: [`--remote-debugging-port=${debugPort}`] });
  const results: Result[] = [];
  mkdirSync(".lighthouse", { recursive: true });
  try {
    for (const page of pages) {
      const url = `http://localhost:${port}${site.basePath}${page.slice(1)}`;
      const list: { scores: Scores; report: string }[] = [];
      for (let i = 0; i < runs; i++) {
        const result = await lighthouse(url, {
          port: debugPort,
          output: "html",
          logLevel: "error",
          onlyCategories: [...categories],
        });
        if (!result) throw new Error(`Lighthouse returned no result for ${url}`);
        const scores = Object.fromEntries(
          categories.map((c) => [c, result.lhr.categories[c]?.score ?? 0]),
        ) as Scores;
        list.push({ scores, report: String(result.report) });
      }
      const median = medianRun(list.map((run) => run.scores));
      const report = list.find((run) => run.scores === median)!.report;
      writeFileSync(
        `.lighthouse/${page.replace(/\W+/g, "-").replace(/^-|-$/g, "") || "home"}.html`,
        report,
      );
      results.push({ page, scores: median });
    }
  } finally {
    await browser.close();
    server.close();
  }
  const table = scoreTable(results);
  process.stdout.write(table);
  if (process.env.GITHUB_STEP_SUMMARY) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `### Lighthouse (mobile)\n\n${table}\n`);
  }
  const failures = belowMin(results, min);
  if (failures.length > 0) {
    console.error(`Scores under ${min * 100}:\n${failures.join("\n")}`);
    process.exitCode = 1;
  }
}

if (import.meta.main) await main();
