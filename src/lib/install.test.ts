import { spawnSync } from "node:child_process";
import { describe, expect, test } from "vite-plus/test";
import { installScript } from "./install";

describe("installScript", () => {
  const script = installScript("https://example.org/website/download/");

  test("is a POSIX sh script", () => {
    expect(script.startsWith("#!/bin/sh\n")).toBe(true);
  });

  test("says Crustates isn't released, points to the download page and fails", () => {
    const run = spawnSync("sh", ["-s"], { input: script, encoding: "utf8" });
    expect(run.status).toBe(1);
    expect(run.stdout).toBe("");
    expect(run.stderr).toContain("Crustates isn't released yet.");
    expect(run.stderr).toContain("https://example.org/website/download/");
  });

  test("defaults to this site's download page", () => {
    expect(installScript()).toContain("https://crustates.github.io/website/download/");
  });
});
