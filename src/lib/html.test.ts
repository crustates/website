import { describe, expect, test } from "vite-plus/test";
import { withoutModulePreloads } from "./html";

describe("withoutModulePreloads", () => {
  test("drops modulepreload links and keeps everything else", () => {
    const html =
      '<head><link rel="modulepreload" href="/website/assets/a.js"/><link rel="stylesheet" href="/website/assets/app.css"/>' +
      '<link rel="modulepreload" href="/website/assets/b.js" crossorigin=""/><script>theme()</script></head>';
    expect(withoutModulePreloads(html)).toBe(
      '<head><link rel="stylesheet" href="/website/assets/app.css"/><script>theme()</script></head>',
    );
  });
});
