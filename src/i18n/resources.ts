// Types of every namespace, for type-checked keys. Type-only imports: no JSON
// ends up in a bundle from here. Add a line per new namespace.
export type Resources = {
  common: typeof import("./en/common.json");
  home: typeof import("./en/home.json");
  tide: typeof import("./en/tide.json");
  features: typeof import("./en/features.json");
  reef: typeof import("./en/reef.json");
  current: typeof import("./en/current.json");
  molt: typeof import("./en/molt.json");
  cast: typeof import("./en/cast.json");
  barnacle: typeof import("./en/barnacle.json");
  spawn: typeof import("./en/spawn.json");
  assistant: typeof import("./en/assistant.json");
  compare: typeof import("./en/compare.json");
  hardware: typeof import("./en/hardware.json");
  blog: typeof import("./en/blog.json");
  changelog: typeof import("./en/changelog.json");
  faq: typeof import("./en/faq.json");
  catalog: typeof import("./en/catalog.json");
  roadmap: typeof import("./en/roadmap.json");
};
