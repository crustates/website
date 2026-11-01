import type { MDXComponents } from "mdx/types";
import type { ComponentType } from "react";

// shortcut: every post body loads with the post page's chunk; move to per-post
// chunks (with a render that waits for Suspense) once there are many posts.
// Lazy loading behind Suspense would stream the body hidden until JS runs.
const modules = import.meta.glob<ComponentType<{ components?: MDXComponents }>>(
  "/content/blog/*.mdx",
  {
    eager: true,
    import: "default",
  },
);
const bodies = new Map(
  Object.entries(modules).map(([file, Body]) => [
    file.slice("/content/blog/".length, -".mdx".length),
    Body,
  ]),
);

/** The compiled MDX body of a post, rendered with the given element styles. */
export function PostBody({ slug, components }: { slug: string; components?: MDXComponents }) {
  const Body = bodies.get(slug);
  return Body ? <Body components={components} /> : null;
}
