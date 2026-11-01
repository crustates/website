import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PostCard } from "@/components/blog/post-card";
import { ChangeList } from "@/components/changelog/change-list";
import { Rich } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { Section } from "@/components/ui/section";
import { posts, releases } from "@/content";
import { addNamespace, i18n } from "@/i18n";
import changelog from "@/i18n/en/changelog.json";
import { links } from "@/lib/links";
import { seo } from "@/lib/seo";
import { asset } from "@/lib/site";

export const Route = createFileRoute("/changelog/")({
  head: () => {
    const head = seo({
      title: i18n.t("meta.changelog.title"),
      description: i18n.t("meta.changelog.description"),
      path: "/changelog",
    });
    // RSS autodiscovery for feed readers.
    const feed = {
      rel: "alternate",
      type: "application/rss+xml",
      title: i18n.t("meta.changelog.title"),
      href: asset("/changelog/rss.xml"),
    };
    return { ...head, links: [...head.links, feed] };
  },
  component: ChangelogPage,
});

function Hero() {
  const { t } = useTranslation("changelog");
  return (
    <Section dots band padded={false}>
      <div className="flex flex-wrap items-end justify-between gap-6 py-14 max-md:py-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-4">
          <Kicker>{t("hero.kicker")}</Kicker>
          <h1 className="text-display-l max-sm:text-heading-1">{t("hero.heading")}</h1>
          <p className="text-body-l">
            <Rich text={t("hero.lead")} />
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="sm">
            <a href={`${links.github}/releases`}>{t("hero.github")}</a>
          </Button>
          <Button asChild size="sm">
            <a href={asset("/changelog/rss.xml")}>{t("hero.rss")}</a>
          </Button>
        </div>
      </div>
    </Section>
  );
}

function Releases() {
  const { t } = useTranslation("changelog");
  const latest = releases.find((r) => r.channel === "stable");
  return (
    <Section wrapClassName="flex max-w-[960px] flex-col gap-7">
      {releases.length === 0 && (
        <Card>
          <p>{t("empty")}</p>
        </Card>
      )}
      {releases.map((release, i) => (
        <Card key={release.version} asChild raised={i === 0}>
          <article className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <h2 className="text-heading-2">
                  <Link
                    to="/changelog/$version/"
                    params={{ version: release.version }}
                    className="text-inherit"
                  >
                    {release.version}
                  </Link>
                </h2>
                {release === latest && <Pill tone="ok">{t("latest")}</Pill>}
                {release.channel === "beta" && <Pill tone="info">{t("beta")}</Pill>}
              </div>
              <time className="font-mono text-ink-muted">{release.date}</time>
            </div>
            <p>
              {release.summary}{" "}
              <Link to="/changelog/$version/" params={{ version: release.version }}>
                {t("readNotes")}
              </Link>
            </p>
            <ChangeList changes={release.changes} />
          </article>
        </Card>
      ))}
    </Section>
  );
}

function FromTheBlog() {
  const { t } = useTranslation("changelog");
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-heading-1">{t("blog.heading")}</h2>
        <Link to="/blog/">{t("blog.all")}</Link>
      </div>
      {posts.length > 0 && (
        <div className="grid gap-7 md:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </Section>
  );
}

function ChangelogPage() {
  addNamespace("changelog", changelog);
  return (
    <>
      <Hero />
      <Releases />
      <FromTheBlog />
    </>
  );
}
