import { defineConfig } from "@content-collections/core";
import { catalog } from "./src/content/collections/catalog";
import { faq } from "./src/content/collections/faq";
import { posts } from "./src/content/collections/posts";
import { releases } from "./src/content/collections/releases";
import { roadmap } from "./src/content/collections/roadmap";

// Content in content/, validated with Zod at build time. A schema error fails
// the build. Schemas live in src/content/collections/.
export default defineConfig({ content: [posts, releases, faq, catalog, roadmap] });
