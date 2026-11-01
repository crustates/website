import { readFileSync } from "node:fs";
import { describe, expect, test } from "vite-plus/test";
import { generateTheme } from "./tokens";

const tokens = JSON.parse(readFileSync("design/tokens.json", "utf8"));
const css = generateTheme(tokens);

function block(selector: string): string {
  const start = css.indexOf(`${selector} {`);
  expect(start, `missing block ${selector}`).toBeGreaterThan(-1);
  return css.slice(start, css.indexOf("}", start));
}

describe("generateTheme", () => {
  test("exposes every colour token to Tailwind through a CSS variable", () => {
    expect(css).toContain("--color-brand-rust: var(--brand-rust);");
    expect(css).toContain("--color-tint-pink: var(--tint-pink);");
  });

  test("defines light values on :root and dark values for both dark selectors", () => {
    expect(block(":root")).toContain("--ink: #111111;");
    expect(block(':root[data-theme="dark"]')).toContain("--ink: #FFF6E5;");
    expect(block(':root:not([data-theme="light"])')).toContain("--ink: #FFF6E5;");
  });

  test("offers a .theme-dark scope for always-dark surfaces like the console", () => {
    expect(block(".theme-dark")).toContain("--surface-sunken: #0B0B0B;");
    expect(block(".theme-dark")).toContain("color: var(--ink);");
  });

  test("resolves token references", () => {
    expect(block(":root")).toContain("--status-warning: #FFD23F;");
  });

  test("draws hard shadows in the line colour so they flip in dark mode", () => {
    expect(css).toContain("--shadow-md: 4px 4px 0 0 var(--line);");
    expect(css).toContain("--shadow-pressed: 0px 0px 0 0 var(--line);");
  });

  test("emits type styles with their line height, weight and tracking", () => {
    expect(css).toContain("--text-display-xl: 72px;");
    expect(css).toContain("--text-display-xl--line-height: 72px;");
    expect(css).toContain("--text-display-xl--font-weight: 700;");
    expect(css).toContain("--text-kicker--letter-spacing: 0.08em;");
  });

  test("emits fonts, radii, spacing and border widths", () => {
    expect(css).toContain('--font-sans: "Space Grotesk", system-ui, sans-serif;');
    expect(css).toContain("--radius-md: 6px;");
    expect(css).toContain("--spacing: 4px;");
    expect(css).toContain("@utility border-thick {\n  border-width: 3px;\n}");
    expect(css).toContain('src: url("../assets/fonts/SpaceGrotesk-700.woff2") format("woff2");');
  });

  test("rejects a colour without a dark value", () => {
    const broken = structuredClone(tokens);
    delete broken.color.tokens[0].value.dark;
    expect(() => generateTheme(broken)).toThrow();
  });

  test("rejects a spacing token that is not a multiple of the base unit", () => {
    const broken = structuredClone(tokens);
    broken.spacing.tokens[2].value = "13px";
    expect(() => generateTheme(broken)).toThrow(/space-3/);
  });

  test("matches the committed theme.css (run `vp run tokens` after editing tokens.json)", () => {
    expect(readFileSync("src/styles/theme.css", "utf8")).toBe(css);
  });
});

test("cn() knows every type style name", async () => {
  const { TEXT_STYLES } = await import("../src/lib/utils");
  const names = tokens.type.groups.flatMap((g: { styles: { name: string }[] }) =>
    g.styles.map((s) => s.name),
  );
  expect([...TEXT_STYLES]).toEqual(names);
});
