/**
 * Drafts show in development and are left out of production builds.
 * `SHOW_DRAFTS=true vp build` builds them anyway, e.g. to review a draft.
 */
export function showDrafts(): boolean {
  return process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "true";
}
