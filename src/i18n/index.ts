import i18next, { type i18n as I18n } from "i18next";
import { initReactI18next } from "react-i18next";
import common from "./en/common.json";
import type { Resources } from "./resources";

export const defaultNS = "common";
export type Namespace = keyof Resources;

/** Synchronous i18next instance, so prerendering needs no backend. */
export function createI18n(lng = "en") {
  const instance = i18next.createInstance();
  void instance.use(initReactI18next).init({
    lng,
    fallbackLng: "en",
    // Only the shared strings ship in the main bundle; pages add theirs.
    resources: { en: { common } },
    defaultNS,
    ns: [defaultNS],
    initAsync: false,
    interpolation: { escapeValue: false },
  });
  return instance;
}

export const i18n = createI18n();

/**
 * Registers a page's strings. Call it in the page component, so the JSON is
 * code-split with the page instead of landing in every page's bundle.
 */
export function addNamespace<N extends Namespace>(
  ns: N,
  bundle: Resources[N],
  instance: I18n = i18n,
) {
  if (!instance.hasResourceBundle(instance.language, ns)) {
    instance.addResourceBundle(instance.language, ns, bundle);
  }
}

/**
 * A page's strings as one object, for pages built from structured copy (lists
 * of cards, table rows). Registers the namespace like addNamespace.
 */
export function usePageCopy<N extends Namespace>(
  ns: N,
  bundle: Resources[N],
  instance: I18n = i18n,
): Resources[N] {
  addNamespace(ns, bundle, instance);
  return instance.getResourceBundle(instance.language, ns) as Resources[N];
}
