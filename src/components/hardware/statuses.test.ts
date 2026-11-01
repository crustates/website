import { expect, test } from "vite-plus/test";
import hardware from "@/i18n/en/hardware.json";
import { productIds } from "@/lib/products";

// Support levels, pill tones and icons are data in the JSON; check them against what renders.
test("support rows, build pills and part icons use known values", () => {
  const tones = ["ok", "info", "warn", "bad"];
  expect(Object.keys(hardware.support.labels)).toEqual(tones);
  expect(Object.keys(hardware.support.legend)).toEqual(tones);
  const tables = [hardware.nics, hardware.storage, hardware.gpus, hardware.devices, hardware.arm];
  for (const row of tables.flatMap((t) => t.rows)) expect(tones).toContain(row.support);
  for (const build of hardware.builds.items) expect(tones).toContain(build.tone);
  for (const part of hardware.parts.items) expect(productIds).toContain(part.icon);
});
