import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { FollowBand } from "@/components/blog/follow-band";
import { Avatar, PostDate, PostTopic } from "@/components/blog/post-meta";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { type Post, posts } from "@/content";
import { addNamespace, i18n } from "@/i18n";
import blog from "@/i18n/en/blog.json";
import { products } from "@/lib/products";
import { seo } from "@/lib/seo";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: () =>
    seo({
      title: i18n.t("meta.blog.title"),
      description: i18n.t("meta.blog.description"),
      path: "/blog",
    }),
  component: BlogPage,
});

/** The post's product colour behind its product icon. */
function Cover({ post, size, className }: { post: Post; size: number; className?: string }) {
  const { product } = post;
  return (
    <div
      className={cn(
        "flex items-center justify-center border-line",
        product ? products[product].fill : "bg-surface-sunken",
        className,
      )}
    >
      {product && product !== "assistant" && <ProductIcon product={product} size={size} />}
    </div>
  );
}

function Featured({ post }: { post: Post }) {
  const { t } = useTranslation("blog");
  return (
    <Card asChild raised padding="none" className="grid overflow-hidden md:grid-cols-2">
      <article>
        <Cover post={post} size={140} className="min-h-[300px] max-md:border-b-3 md:border-r-3" />
        <div className="flex min-w-0 flex-col gap-4 p-8 max-sm:p-6">
          <Tag className="self-start">{t("index.featured")}</Tag>
          <Kicker product={post.product}>
            <PostTopic post={post} /> · <PostDate date={post.date} /> ·{" "}
            {t("minRead", { count: post.readingMinutes })}
          </Kicker>
          <h2 className="text-heading-1 max-sm:text-heading-2">
            <Link to="/blog/$slug/" params={{ slug: post.slug }} className="text-inherit">
              {post.title}
            </Link>
          </h2>
          <p className="text-body-l text-ink-muted">{post.summary}</p>
          <div className="flex items-center gap-3">
            <Avatar name={post.author.name} />
            <span className="text-body-s">
              {post.author.name} · {post.author.role}
            </span>
          </div>
          <Button asChild variant="primary" className="self-start">
            <Link to="/blog/$slug/" params={{ slug: post.slug }}>
              {t("index.readPost")}
            </Link>
          </Button>
        </div>
      </article>
    </Card>
  );
}

function PostCard({ post }: { post: Post }) {
  const { t } = useTranslation("blog");
  return (
    <Card asChild className="flex flex-col gap-3">
      <article>
        <Cover post={post} size={72} className="h-[140px] rounded-md border-thick" />
        <Kicker product={post.product}>
          <PostTopic post={post} /> · <PostDate date={post.date} />
        </Kicker>
        <h3 className="text-heading-3">
          <Link to="/blog/$slug/" params={{ slug: post.slug }} className="text-inherit">
            {post.title}
          </Link>
        </h3>
        <p className="text-body-s text-ink-muted">{post.summary}</p>
        <p className="font-mono text-caption text-ink-muted">
          {t("minRead", { count: post.readingMinutes })}
        </p>
      </article>
    </Card>
  );
}

function BlogPage() {
  addNamespace("blog", blog);
  const { t } = useTranslation("blog");
  const featured = posts.find((p) => p.featured) ?? posts[0];
  const latest = posts.filter((p) => p !== featured);
  return (
    <>
      <Section dots band padded={false} wrapClassName="flex flex-col gap-5 pt-16 pb-12">
        <Kicker>{t("index.kicker")}</Kicker>
        <h1 className="text-display-l max-sm:text-heading-1">{t("index.heading")}</h1>
        <p className="max-w-[640px] text-body-l text-ink-muted">{t("index.lead")}</p>
      </Section>
      <Section wrapClassName="flex flex-col gap-10">
        {featured ? (
          <Featured post={featured} />
        ) : (
          // Production has no published posts yet; the band below links the feed and GitHub.
          <p className="text-body-l">{t("index.empty")}</p>
        )}
        {latest.length > 0 && (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-heading-1">{t("index.latest")}</h2>
              <div className="flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <Link to="/changelog/">{t("index.releaseNotes")}</Link>
                </Button>
                <Button asChild size="sm">
                  <a href={asset("/blog/rss.xml")} type="application/rss+xml">
                    {t("index.rss")}
                  </a>
                </Button>
              </div>
            </div>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {latest.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </>
        )}
      </Section>
      <FollowBand tone="ink" />
    </>
  );
}
