import type { Plugin } from "vite";
import { isDraft } from "./paths";

/**
 * Production builds compile draft posts as empty MDX, so no draft text ends
 * up in a JS chunk (post-body.tsx imports every .mdx file).
 */
export function draftMdx(showDrafts: boolean) {
  return {
    name: "crustates:draft-mdx",
    enforce: "pre",
    apply: "build",
    load(id: string) {
      if (showDrafts || !id.endsWith(".mdx") || !isDraft(id)) return null;
      return "";
    },
  } satisfies Plugin;
}
