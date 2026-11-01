import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import common from "./en/common.json";
import home from "./en/home.json";

export const defaultNS = "common";
export const resources = { en: { common, home } } as const;

/** Synchronous i18next instance with bundled resources, so prerendering needs no backend. */
export function createI18n(lng = "en") {
  const instance = i18next.createInstance();
  void instance.use(initReactI18next).init({
    lng,
    fallbackLng: "en",
    resources,
    defaultNS,
    ns: Object.keys(resources.en),
    initAsync: false,
    interpolation: { escapeValue: false },
  });
  return instance;
}

export const i18n = createI18n();
