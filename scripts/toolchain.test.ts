import { readFileSync } from "node:fs";
import { expect, test } from "vite-plus/test";

// Renovate updates these files separately; keep the pins that must agree in step.
const mise = readFileSync("mise.toml", "utf8");
const pkg = JSON.parse(readFileSync("package.json", "utf8"));
const miseVersion = (tool: string) => new RegExp(`^${tool} = "([^"]+)"`, "m").exec(mise)?.[1];

test("mise and package.json pin the same Bun", () => {
  expect(pkg.devEngines.packageManager.version).toBe(miseVersion("bun"));
});

test("vite-plus and the vite alias pin the same Vite+", () => {
  const version = pkg.devDependencies["vite-plus"];
  expect(pkg.devDependencies.vite).toBe(`npm:@voidzero-dev/vite-plus-core@${version}`);
  expect(pkg.overrides.vite).toBe(`npm:@voidzero-dev/vite-plus-core@${version}`);
});
