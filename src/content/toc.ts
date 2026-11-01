import GithubSlugger from "github-slugger";

/** The `## ` headings of a Markdown/MDX body, with the ids rehype-slug gives them. */
export function tableOfContents(content: string): { id: string; text: string }[] {
  const slugger = new GithubSlugger();
  const prose = content.replace(/^```[\s\S]*?^```/gm, "");
  return [...prose.matchAll(/^## (.+)$/gm)].map(([, heading = ""]) => {
    const text = heading.replace(/[`*_]/g, "");
    return { id: slugger.slug(text), text };
  });
}
