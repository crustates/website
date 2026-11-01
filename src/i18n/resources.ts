// Types of every namespace, for type-checked keys. Type-only imports: no JSON
// ends up in a bundle from here. Add a line per new namespace.
export type Resources = {
  common: typeof import("./en/common.json");
  home: typeof import("./en/home.json");
};
