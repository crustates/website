// The one place that knows where the site is served from. Switch to
// { origin: "https://crustates.eu", basePath: "/" } once DNS points at Pages.
export const site = {
  origin: "https://crustates.github.io",
  basePath: "/website/",
} as const;
