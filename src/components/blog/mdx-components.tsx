import type { MDXComponents } from "mdx/types";
import { Console } from "@/components/ui/console";
import { href } from "@/lib/site";

/**
 * Styles for the Markdown in post bodies. JSX written in the MDX itself (the
 * callouts, tables and figures) keeps its own classes.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="scroll-mt-6 text-heading-2" {...props} />,
  h3: (props) => <h3 className="scroll-mt-6 text-heading-3" {...props} />,
  // Site-relative links are pages: they get the base path.
  a: ({ href: to = "", ...props }) => <a href={to.startsWith("/") ? href(to) : to} {...props} />,
  ul: (props) => <ul className="m-0 list-disc pl-6" {...props} />,
  ol: (props) => <ol className="m-0 list-decimal pl-6" {...props} />,
  // Fenced code: the console's 13px, not the 14px of inline code.
  pre: ({ children }) => <Console className="[&_code]:text-[13px]">{children}</Console>,
  hr: () => <hr className="m-0 border-0 border-t-2 border-line" />,
};
