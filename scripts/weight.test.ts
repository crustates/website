import { describe, expect, test } from "vite-plus/test";
import { pageScripts, weightTable } from "./weight";

describe("pageScripts", () => {
  test("lists the module scripts and modulepreloads a page loads, once each", () => {
    const html =
      '<link rel="modulepreload" href="/website/assets/a.js"/><link rel="stylesheet" href="/website/assets/app.css"/>' +
      '<script>theme()</script><script type="module" async="" src="/website/assets/main.js"></script>' +
      '<link rel="modulepreload" href="/website/assets/main.js"/>';
    expect(pageScripts(html)).toEqual(["/website/assets/a.js", "/website/assets/main.js"]);
  });
});

describe("weightTable", () => {
  test("is a Markdown table in KB, heaviest page first", () => {
    expect(
      weightTable([
        { page: "/", files: 3, gzip: 150_000 },
        { page: "/faq/", files: 4, gzip: 170_500 },
      ]),
    ).toBe(
      "| Page | JS files | JS (gzip) |\n|---|--:|--:|\n| /faq/ | 4 | 170.5 KB |\n| / | 3 | 150.0 KB |\n",
    );
  });
});
