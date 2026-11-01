import "i18next";
import type { defaultNS } from "./index";
import type { Resources } from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof defaultNS;
    resources: Resources;
  }
}
