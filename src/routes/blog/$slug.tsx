import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { InlineCode } from "@/components/inline-code";
import { FollowBand } from "@/components/blog/follow-band";
import { mdxComponents } from "@/components/blog/mdx-components";
import { Avatar, PostDate, PostTopic } from "@/components/blog/post-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { Section, Wrap } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { type Post, posts } from "@/content";
import { PostBody } from "@/content/post-body";
import { addNamespace } from "@/i18n";
import blog from "@/i18n/en/blog.json";
import { seo } from "@/lib/seo";
import { pageUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData: post }) =>
    post
      ? seo({
          title: post.title,
          description: post.summary.replaceAll("`", ""),
          path: `/blog/${post.slug}`,
        })
      : {},
  // Keep the loader (and the content it imports) out of the main bundle.
  codeSplitGroupings: [["loader", "component"]],
  component: PostPage,
});

function Hero({ post }: { post: Post }) {
  const { t } = useTranslation("blog");
  return (
    <Section
      dots
      band
      padded={false}
      wrapClassName="flex max-w-[1100px] flex-col gap-5 py-14 max-md:py-12"
    >
      <nav aria-label={t("post.breadcrumb")} className="text-body-s text-ink-muted">
        <Link to="/blog/">{t("post.blog")}</Link> / <span>{post.category}</span>
      </nav>
      <div className="flex flex-wrap gap-3">
        {[post.category, ...post.tags].map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <h1 className="max-w-[900px] text-display-l max-sm:text-heading-1">{post.title}</h1>
      <p className="max-w-[760px] text-body-l">
        <InlineCode text={post.lede ?? post.summary} />
      </p>
      <div className="flex items-center gap-3.5">
        <Avatar name={post.author.name} />
        <div className="text-body-s">
          <p>
            <strong>{post.author.name}</strong> · {post.author.role}
          </p>
          <p className="text-ink-muted">
            <PostDate date={post.date} /> ·{" "}
            {t("minRead", { ns: "common", count: post.readingMinutes })}
          </p>
        </div>
      </div>
    </Section>
  );
}

/** Bluesky has a compose intent URL; Mastodon has no instance-free one, so it's left out. */
function Share({ post }: { post: Post }) {
  const { t } = useTranslation("blog");
  const { t: tc } = useTranslation();
  const url = pageUrl(`/blog/${post.slug}`);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setMounted(true), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      return; // Clipboard blocked: the address bar still has the link.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <>
      <p className="text-label">{t("post.share")}</p>
      <div className="flex flex-wrap gap-2">
        <Button asChild size="sm">
          <a
            href={`https://bsky.app/intent/compose?text=${encodeURIComponent(`${post.title} ${url}`)}`}
          >
            {t("post.bluesky")}
          </a>
        </Button>
        {mounted && (
          <Button size="sm" onClick={copy}>
            {copied ? tc("copy.copied") : t("post.copyLink")}
          </Button>
        )}
      </div>
      <span role="status" className="sr-only">
        {copied ? tc("copy.copied") : ""}
      </span>
    </>
  );
}

function Related({ post }: { post: Post }) {
  const { t } = useTranslation("blog");
  const related = posts.filter((p) => p.slug !== post.slug && !p.draft).slice(0, 3);
  if (related.length === 0) return null;
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-heading-1">{t("post.related")}</h2>
        <Link to="/blog/">{t("post.allPosts")}</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {related.map((p) => (
          <Card key={p.slug} asChild className="flex flex-col gap-3">
            <article>
              <Tag className="self-start">
                <PostTopic post={p} />
              </Tag>
              <h3 className="text-heading-3">
                <Link to="/blog/$slug/" params={{ slug: p.slug }} className="text-inherit">
                  {p.title}
                </Link>
              </h3>
              <p className="text-body-s text-ink-muted">
                <InlineCode text={p.summary} />
              </p>
            </article>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function PostPage() {
  const post = Route.useLoaderData();
  addNamespace("blog", blog);
  const { t } = useTranslation("blog");
  return (
    <>
      <Hero post={post} />
      <Wrap className="flex flex-wrap items-start gap-14 pt-12 pb-[72px]">
        <aside className="flex max-w-[260px] min-w-0 flex-[1_1_220px] flex-col gap-3 lg:sticky lg:top-6">
          <Kicker>{t("post.onThisPage")}</Kicker>
          <nav aria-label={t("post.toc")} className="flex flex-col gap-0.5">
            {post.toc.map((heading) => (
              <a
                key={heading.id}
                href={`#${heading.id}`}
                className="flex min-h-10 items-center rounded-md border-thin border-transparent px-2 py-1.5 text-[15px] font-medium text-ink no-underline hover:border-line"
              >
                {heading.text}
              </a>
            ))}
          </nav>
          <hr className="m-0 border-0 border-t-2 border-line" />
          <Share post={post} />
        </aside>
        <article className="flex max-w-[760px] min-w-0 flex-[1_1_640px] flex-col gap-5">
          <PostBody slug={post.slug} components={mdxComponents} />
        </article>
      </Wrap>
      <Related post={post} />
      <FollowBand tone="rust" />
    </>
  );
}
