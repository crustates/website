import { describe, expect, test } from "vite-plus/test";
import { absoluteUrl, asset } from "./site";

const github = { origin: "https://crustates.github.io", basePath: "/website/" };
const domain = { origin: "https://crustates.eu", basePath: "/" };

describe("asset", () => {
  test("prefixes public files with the base path", () => {
    expect(asset("/brand/og-image.png", github)).toBe("/website/brand/og-image.png");
    expect(asset("brand/og-image.png", github)).toBe("/website/brand/og-image.png");
  });

  test("leaves a root-served site unprefixed", () => {
    expect(asset("/brand/og-image.png", domain)).toBe("/brand/og-image.png");
  });
});

describe("absoluteUrl", () => {
  test("joins origin, base path and route", () => {
    expect(absoluteUrl("/features", github)).toBe("https://crustates.github.io/website/features");
    expect(absoluteUrl("/features", domain)).toBe("https://crustates.eu/features");
  });

  test("keeps the trailing slash for the home page", () => {
    expect(absoluteUrl("/", github)).toBe("https://crustates.github.io/website/");
    expect(absoluteUrl("/", domain)).toBe("https://crustates.eu/");
  });
});
