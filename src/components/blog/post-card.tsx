import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { InlineCode } from "@/components/inline-code";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { ProductIcon } from "@/components/ui/product-icon";
import type { Post } from "@/content";
import { products } from "@/lib/products";
import { cn } from "@/lib/utils";
import { PostDate, PostTopic } from "./post-meta";

/** The post's product colour behind its product icon. */
export function Cover({ post, size, className }: { post: Post; size: number; className?: string }) {
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

/** A post as a card: cover, topic and date, title link, summary, reading time. */
export function PostCard({ post }: { post: Post }) {
  const { t } = useTranslation();
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
        <p className="text-body-s text-ink-muted">
          <InlineCode text={post.summary} />
        </p>
        <p className="font-mono text-caption text-ink-muted">
          {t("minRead", { count: post.readingMinutes })}
        </p>
      </article>
    </Card>
  );
}
