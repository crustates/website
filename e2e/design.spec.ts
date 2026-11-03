import { existsSync } from "node:fs";
import { join } from "node:path";
import { test, type Page } from "@playwright/test";
import { site } from "../site.config.ts";

// Compares each page with its design-kit page at 1440 and 390 wide. It
// reports how much differs and attaches both screenshots and a diff image to
// the HTML report (`vp exec playwright show-report`); it never fails on a
// difference. Local only: set DESIGN_KIT_DIR to the kit's folder.
const kit = process.env.DESIGN_KIT_DIR;

/** Kit page → site path. Drafts (blog post, release) only exist in a SHOW_DRAFTS build. */
const pages: Record<string, string> = {
  index: "",
  "web-404": "no-such-page/",
  "web-features": "features/",
  "web-tide": "tide/",
  "web-reef": "reef/",
  "web-current": "current/",
  "web-molt": "molt/",
  "web-cast": "cast/",
  "web-plugins": "barnacle/",
  "web-spawn": "spawn/",
  "web-assistant": "assistant/",
  "web-compare": "compare/",
  "web-hardware": "hardware/",
  "web-download": "download/",
  "web-api": "api/",
  "web-security": "security/",
  "web-community": "community/",
  "web-about": "about/",
  "web-brand": "brand/",
  "web-legal": "legal/",
  "web-roadmap": "roadmap/",
  "web-changelog": "changelog/",
  "web-release": "changelog/0.4.1/",
  "web-blog": "blog/",
  "web-blog-post": "blog/why-every-app-gets-its-own-kernel/",
  "web-faq": "faq/",
  "web-catalog": "catalog/",
  "web-catalog-app": "catalog/immich/",
};

/** Share of pixels that differ noticeably, and a diff image (changed pixels in red). */
async function compare(page: Page, expected: Buffer, actual: Buffer) {
  await page.goto("about:blank");
  return page.evaluate(
    async ({ a, b }) => {
      const load = async (base64: string) => {
        const image = new Image();
        image.src = `data:image/png;base64,${base64}`;
        await image.decode();
        return image;
      };
      const [kitImage, siteImage] = await Promise.all([load(a), load(b)]);
      const width = Math.max(kitImage.width, siteImage.width);
      const height = Math.max(kitImage.height, siteImage.height);
      const pixels = (image: HTMLImageElement) => {
        const context = new OffscreenCanvas(width, height).getContext("2d")!;
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, width, height).data;
      };
      const [p, q] = [pixels(kitImage), pixels(siteImage)];
      const diff = new OffscreenCanvas(width, height);
      const out = diff.getContext("2d")!.createImageData(width, height);
      let changed = 0;
      for (let i = 0; i < p.length; i += 4) {
        const delta =
          Math.abs(p[i]! - q[i]!) +
          Math.abs(p[i + 1]! - q[i + 1]!) +
          Math.abs(p[i + 2]! - q[i + 2]!);
        const differs = delta > 96 || p[i + 3] !== q[i + 3];
        if (differs) changed++;
        // Changed pixels red, the rest a faded copy of the site page.
        out.data.set(differs ? [255, 0, 0, 255] : [q[i]!, q[i + 1]!, q[i + 2]!, 60], i);
      }
      diff.getContext("2d")!.putImageData(out, 0, 0);
      const blob = await diff.convertToBlob();
      const bytes = new Uint8Array(await blob.arrayBuffer());
      let binary = "";
      for (const byte of bytes) binary += String.fromCharCode(byte);
      return {
        ratio: changed / (width * height),
        heights: [kitImage.height, siteImage.height],
        diff: btoa(binary),
      };
    },
    { a: expected.toString("base64"), b: actual.toString("base64") },
  );
}

test.describe("design kit comparison", () => {
  test.skip(!kit, "Set DESIGN_KIT_DIR to compare with the design kit");

  for (const [file, path] of Object.entries(pages)) {
    for (const width of [1440, 390]) {
      test(`${file} vs /${path} at ${width}`, async ({ page }, info) => {
        const kitFile = join(kit!, "pages", `${file}.html`);
        test.skip(!existsSync(kitFile), `${kitFile} not found`);
        await page.setViewportSize({ width, height: 900 });

        await page.goto(`file://${kitFile}`, { waitUntil: "networkidle" });
        const expected = await page.screenshot({ fullPage: true });
        const response = await page.goto(`${site.basePath}${path}`, { waitUntil: "networkidle" });
        test.skip(
          path !== "no-such-page/" && response?.status() === 404,
          `/${path} isn't in this build (drafts need SHOW_DRAFTS=true vp build)`,
        );
        const actual = await page.screenshot({ fullPage: true });

        const result = await compare(page, expected, actual);
        const summary = `${(result.ratio * 100).toFixed(1)}% of pixels differ; height ${result.heights[0]}px (kit) vs ${result.heights[1]}px (site)`;
        info.annotations.push({ type: "difference", description: summary });
        await info.attach("kit", { body: expected, contentType: "image/png" });
        await info.attach("site", { body: actual, contentType: "image/png" });
        await info.attach("diff", {
          body: Buffer.from(result.diff, "base64"),
          contentType: "image/png",
        });
        console.log(`${file} @${width}: ${summary}`);
      });
    }
  }
});
