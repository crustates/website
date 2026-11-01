import { mkdirSync, mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { beforeAll, describe, expect, test } from "vite-plus/test";
import { resolveRequest } from "./serve";

let root: string;
beforeAll(() => {
  root = mkdtempSync(join(tmpdir(), "serve-"));
  mkdirSync(join(root, "brand"));
  mkdirSync(join(root, "changelog"));
  for (const file of [
    "index.html",
    "404.html",
    "features.html",
    "brand/mark.svg",
    "changelog/0.4.1.html",
    "install",
  ]) {
    writeFileSync(join(root, file), file);
  }
});

describe("resolveRequest behaves like GitHub Pages", () => {
  const resolve = (url: string) => resolveRequest(root, "/website/", url);

  test("serves index.html for the base path", () => {
    expect(resolve("/website/")).toEqual({ status: 200, file: join(root, "index.html") });
  });

  test("serves a page from its .html file without a trailing slash", () => {
    expect(resolve("/website/features")).toEqual({
      status: 200,
      file: join(root, "features.html"),
    });
    expect(resolve("/website/changelog/0.4.1")).toEqual({
      status: 200,
      file: join(root, "changelog/0.4.1.html"),
    });
  });

  test("serves files as they are, including extensionless ones", () => {
    expect(resolve("/website/brand/mark.svg")).toEqual({
      status: 200,
      file: join(root, "brand/mark.svg"),
    });
    expect(resolve("/website/install")).toEqual({ status: 200, file: join(root, "install") });
  });

  test("ignores the query string", () => {
    expect(resolve("/website/features?ref=x")).toEqual({
      status: 200,
      file: join(root, "features.html"),
    });
  });

  test("answers unknown paths with 404.html", () => {
    expect(resolve("/website/nope")).toEqual({ status: 404, file: join(root, "404.html") });
    expect(resolve("/elsewhere")).toEqual({ status: 404, file: join(root, "404.html") });
  });

  test("never serves files outside the root", () => {
    expect(resolve("/website/../serve-secret")).toEqual({
      status: 404,
      file: join(root, "404.html"),
    });
    expect(resolve("/website/%2e%2e/%2e%2e/etc/passwd")).toEqual({
      status: 404,
      file: join(root, "404.html"),
    });
  });
});
