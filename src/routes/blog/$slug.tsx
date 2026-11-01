import { createFileRoute, notFound } from "@tanstack/react-router";
import { posts } from "@/content";
import { PostBody } from "@/content/post-body";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: post }) =>
    post ? seo({ title: post.title, description: post.summary, path: `/blog/${post.slug}` }) : {},
  // Keep the loader (and the content it imports) out of the main bundle.
  codeSplitGroupings: [["loader", "component"]],
  component: PostPage,
});

// Stub: filled in by the part 3 page port.
function PostPage() {
  const post = Route.useLoaderData();
  return <PostBody slug={post.slug} />;
}
