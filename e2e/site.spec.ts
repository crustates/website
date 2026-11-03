import { readFileSync, readdirSync } from "node:fs";
import { expect, test, type Page } from "@playwright/test";
import { site } from "../site.config.ts";

const base = site.basePath;
const html = (path: string) => readFileSync(`dist/client/${path}`, "utf8");

const sitemap = [...html("sitemap.xml").matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (m) => new URL(m[1]!).pathname,
);
// Every page in the sitemap, plus the UI kit, which stays out of it.
const pages = [...sitemap, `${base}_kit/`];
// The site's own absolute URLs (canonical, og:image) are checked like relative ones.
const ownHost = new URL(site.origin).host;

test("the sitemap lists every built page", () => {
  // The UI kit and the /plugins redirect stay out on purpose.
  const built = readdirSync("dist/client", { recursive: true, encoding: "utf8" })
    .filter((file) => file.endsWith("index.html") && !/^(_kit|plugins)\//.test(file))
    .map((file) => `${base}${file.replace(/index\.html$/, "")}`);
  const sorted = (list: string[]) => [...list].sort((a, b) => a.localeCompare(b));
  expect(sorted(sitemap)).toEqual(sorted(built));
});

/** Sums layout shifts from page load on, as Web Vitals' CLS does for a short visit. */
async function trackLayoutShift(page: Page) {
  await page.addInitScript(() => {
    const w = window as unknown as { cls: number };
    w.cls = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries() as (PerformanceEntry & {
        value: number;
        hadRecentInput: boolean;
      })[]) {
        if (!entry.hadRecentInput) w.cls += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  return () => page.evaluate(() => (window as unknown as { cls: number }).cls);
}

/** Console errors, exceptions, failed requests and requests to other sites while the page is open. */
function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("request", (request) => {
    const { protocol, hostname } = new URL(request.url());
    if (protocol.startsWith("http") && hostname !== "localhost") {
      errors.push(`third-party: ${request.url()}`);
    }
  });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(`console: ${message.text()}`);
  });
  page.on("pageerror", (error) => errors.push(`exception: ${error.message}`));
  page.on("requestfailed", (request) => errors.push(`failed: ${request.url()}`));
  page.on("response", (response) => {
    if (response.status() >= 400) errors.push(`${response.status()}: ${response.url()}`);
  });
  return errors;
}

for (const path of pages) {
  test.describe(path, () => {
    test("renders without errors or layout shift", async ({ page }) => {
      const errors = trackErrors(page);
      const cls = await trackLayoutShift(page);
      const response = await page.goto(path, { waitUntil: "networkidle" });
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("main")).toBeVisible();
      expect(errors).toEqual([]);
      expect(await cls()).toBeLessThan(0.1);
    });

    test("fits a 320px screen, with no layout shift", async ({ page }) => {
      await page.setViewportSize({ width: 320, height: 640 });
      const cls = await trackLayoutShift(page);
      await page.goto(path, { waitUntil: "networkidle" });
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
        320,
      );
      expect(await cls()).toBeLessThan(0.1);
    });

    test.describe("with JavaScript off", () => {
      test.use({ javaScriptEnabled: false });

      test("reads fine, fits 320px and shows no controls", async ({ page, browser, baseURL }) => {
        await page.setViewportSize({ width: 320, height: 640 });
        await page.goto(path);
        await expect(page.locator("h1")).toBeVisible();
        // The prerendered page holds (nearly) all the text the page shows with JS.
        // test.use() applies to new pages too, so turn JS back on here.
        const withJs = await browser.newPage({ javaScriptEnabled: true });
        await withJs.goto(`${baseURL}${path}`, { waitUntil: "networkidle" });
        const full = (await withJs.locator("main").textContent()) ?? "";
        await withJs.close();
        const text = (await page.locator("main").textContent()) ?? "";
        expect(text.length).toBeGreaterThanOrEqual(full.length * 0.9);
        expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
          320,
        );
        // Buttons and form fields need JS here; links and <details> don't. The UI
        // kit shows buttons on purpose.
        if (path === `${base}_kit/`) return;
        await expect(
          page.locator("input, select, textarea, button").filter({ visible: true }),
        ).toHaveCount(0);
      });
    });
  });
}

test("every internal link and asset resolves, including #anchors", async ({ request }) => {
  const files = new Map<string, string>();
  const fetchPage = async (url: string) => {
    if (!files.has(url)) {
      const response = await request.get(url, { maxRedirects: 0 });
      files.set(
        url,
        response.status() === 200 ? await response.text() : `status ${response.status()}`,
      );
    }
    return files.get(url)!;
  };
  const broken: string[] = [];
  for (const path of pages) {
    const source = await fetchPage(path);
    for (const [, attribute, url] of source.matchAll(/\s(href|src|content)="([^"]+)"/g)) {
      // <meta content> is text, unless it's a URL (og:image, og:url).
      if (attribute === "content" && !/^https?:\/\//.test(url!)) continue;
      const target = new URL(url!, `http://localhost${path}`);
      if (target.host !== "localhost" && target.host !== ownHost) continue;
      if (!target.pathname.startsWith(base)) {
        broken.push(`${path} → ${url} (outside ${base})`);
        continue;
      }
      const body = target.pathname === path ? source : await fetchPage(target.pathname);
      if (body.startsWith("status ")) broken.push(`${path} → ${url} (${body})`);
      else if (target.hash && !body.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`)) {
        broken.push(`${path} → ${url} (no such anchor)`);
      }
    }
  }
  expect(broken).toEqual([]);
});

test("an unknown URL gets the 404 page, which loads no scripts", async ({ page }) => {
  const response = await page.goto(`${base}no-such-page/`);
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator('script[type="module"], link[rel="modulepreload"]')).toHaveCount(0);
});

test("the install script, feeds, robots.txt and sitemap are served", async ({ request }) => {
  const install = await request.get(`${base}install`);
  expect(install.status()).toBe(200);
  expect(await install.text()).toMatch(/^#!\/bin\/sh\n/);
  for (const file of ["robots.txt", "sitemap.xml", "blog/rss.xml", "changelog/rss.xml"]) {
    expect((await request.get(`${base}${file}`)).status(), file).toBe(200);
  }
});

test.describe("the phone menu", () => {
  test.use({ viewport: { width: 390, height: 800 } });

  test("opens with the site links and closes on Escape", async ({ page }) => {
    await page.goto(base, { waitUntil: "networkidle" });
    const menu = page.getByRole("button", { name: "Menu" });
    await menu.click();
    const sheet = page.getByRole("dialog", { name: "Menu" });
    await expect(sheet.getByRole("link", { name: "Download" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(sheet).toBeHidden();
    await expect(menu).toBeFocused();
  });

  test("falls back to the header links when its code can't load", async ({ page }) => {
    await page.route(/menu-sheet-[^/]+\.js$/, (route) => route.abort());
    await page.goto(base, { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Menu" }).click();
    await expect(page.locator("h1")).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: "Main" }).getByRole("link", { name: "Download" }),
    ).toBeVisible();
  });
});
