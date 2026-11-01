import { expect, test } from "vite-plus/test";
import { createI18n } from "./index";

test("translates synchronously from bundled resources", () => {
  const i18n = createI18n();
  expect(i18n.isInitialized).toBe(true);
  expect(i18n.t("nav.features")).toBe("Features");
  expect(i18n.t("common:footer.tagline")).toBe("Your own cloud, on your own hardware.");
});

test("rejects unknown keys at compile time", () => {
  const i18n = createI18n();
  // @ts-expect-error: not a key in en/common.json
  expect(i18n.t("nav.nope")).toBe("nav.nope");
});
