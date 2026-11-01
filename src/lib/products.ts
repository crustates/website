// Colour classes per product area. Tailwind finds the class names here, so they
// must stay literal strings.
export const productIds = ["tide", "reef", "current", "molt", "cast", "barnacle", "spawn"] as const;
export type ProductId = (typeof productIds)[number];
export type ProductKey = ProductId | "assistant";

type ProductStyle = {
  route: string;
  /** Background fill with its matching text and focus ring colour. */
  fill: string;
  /** Text colour that passes on page and card surfaces. */
  text: string;
  /** Top border of a product card. */
  accent: string;
  tint?: string;
};

export const products: Record<ProductKey, ProductStyle> = {
  tide: {
    route: "/tide",
    fill: "bg-brand-blue text-on-fill-light [--focus-ring:var(--on-fill-light)]",
    text: "text-text-link",
    accent: "border-t-brand-blue",
    tint: "bg-tint-blue",
  },
  reef: {
    route: "/reef",
    fill: "bg-brand-rust text-on-fill-dark [--focus-ring:var(--on-fill-dark)]",
    text: "text-text-rust",
    accent: "border-t-brand-rust",
    tint: "bg-tint-rust",
  },
  current: {
    route: "/current",
    fill: "bg-brand-teal text-on-fill-light [--focus-ring:var(--on-fill-light)]",
    text: "text-text-teal",
    accent: "border-t-brand-teal",
    tint: "bg-tint-teal",
  },
  molt: {
    route: "/molt",
    fill: "bg-accent-yellow text-on-fill-dark [--focus-ring:var(--on-fill-dark)]",
    text: "text-ink",
    accent: "border-t-accent-yellow",
    tint: "bg-tint-yellow",
  },
  cast: {
    route: "/cast",
    fill: "bg-brand-brown text-on-fill-light [--focus-ring:var(--on-fill-light)]",
    text: "text-text-brown",
    accent: "border-t-brand-brown",
    tint: "bg-tint-brown",
  },
  barnacle: {
    route: "/barnacle",
    fill: "bg-brand-violet text-on-fill-dark [--focus-ring:var(--on-fill-dark)]",
    text: "text-text-violet",
    accent: "border-t-brand-violet",
    tint: "bg-tint-violet",
  },
  spawn: {
    route: "/spawn",
    fill: "bg-brand-pink text-on-fill-dark [--focus-ring:var(--on-fill-dark)]",
    text: "text-text-pink",
    accent: "border-t-brand-pink",
    tint: "bg-tint-pink",
  },
  assistant: {
    route: "/assistant",
    fill: "bg-status-success text-on-fill-dark [--focus-ring:var(--on-fill-dark)]",
    text: "text-text-success",
    accent: "border-t-status-success",
  },
};
