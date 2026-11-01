import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { matchesQuery, searchText } from "@/components/faq/filter";
import { Rich } from "@/components/rich";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { Section, Wrap } from "@/components/ui/section";
import { faqTopics } from "@/content";
import { addNamespace, i18n } from "@/i18n";
import faq from "@/i18n/en/faq.json";
import { links } from "@/lib/links";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/faq")({
  head: () =>
    seo({
      title: i18n.t("meta.faq.title"),
      description: i18n.t("meta.faq.description"),
      path: "/faq",
    }),
  component: FaqPage,
});

const topics = faqTopics.map((topic) => ({
  ...topic,
  items: topic.items.map((item) => ({ ...item, text: searchText(item) })),
}));

/** Hero search box, rendered only after hydration: without JS the page lists every question. */
function SearchBox({
  query,
  onQuery,
  count,
}: {
  query: string;
  onQuery: (query: string) => void;
  count: number;
}) {
  const { t } = useTranslation("faq");
  const input = useRef<HTMLInputElement>(null);
  // "/" focuses the search, as the hint in the box says.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || e.ctrlKey || e.metaKey || e.altKey) return;
      if (
        e.target instanceof Element &&
        e.target.closest("input, textarea, select, [contenteditable]")
      )
        return;
      e.preventDefault();
      input.current?.focus();
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="flex max-w-[640px] flex-col">
      <label className="flex min-h-10 items-center gap-2 rounded-sm border-thin border-line bg-surface-card px-3 py-1.5 text-body-s text-ink-muted focus-within:outline-3 focus-within:outline-offset-2 focus-within:outline-focus-ring">
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={input}
          type="search"
          value={query}
          onChange={(e) => onQuery(e.target.value)}
          aria-label={t("search.label")}
          aria-keyshortcuts="/"
          placeholder={t("search.label")}
          className="min-w-0 flex-1 bg-transparent text-ink outline-none max-sm:text-body"
        />
        <kbd className="rounded-sm border-thin border-line bg-surface-sunken px-1.5 py-0.5 text-[11px] leading-[14px] font-bold text-ink max-sm:hidden">
          /
        </kbd>
      </label>
      <p aria-live="polite" className="text-body-s text-ink-muted not-empty:mt-2">
        {query.trim() ? t("search.count", { count }) : null}
      </p>
    </div>
  );
}

function FaqPage() {
  addNamespace("faq", faq);
  const { t } = useTranslation("faq");
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(topics[0]?.id);
  useEffect(() => {
    setMounted(true);
    const sync = () => setActive(location.hash.slice(1) || topics[0]?.id);
    sync();
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);

  // Items stay mounted and are hidden, so open/closed state survives filtering.
  const shown = topics.map((topic) => topic.items.map((item) => matchesQuery(item.text, query)));
  const count = shown.flat().filter(Boolean).length;

  return (
    <>
      <Section
        dots
        band
        padded={false}
        wrapClassName="flex flex-col gap-5 pt-16 pb-14 max-md:pt-12 max-md:pb-12"
      >
        <Kicker>{t("kicker")}</Kicker>
        <h1 className="text-display-l max-sm:text-heading-1">{t("heading")}</h1>
        {mounted && <SearchBox query={query} onQuery={setQuery} count={count} />}
      </Section>
      <Wrap className="flex flex-col gap-8 pt-12 pb-16 md:flex-row md:items-start md:gap-12">
        <nav
          aria-label={t("topics.label")}
          className="flex flex-col gap-0.5 md:w-[220px] md:shrink-0"
        >
          <Kicker className="px-2 pb-2">{t("topics.heading")}</Kicker>
          <div className="flex flex-col gap-0.5 max-md:flex-row max-md:overflow-x-auto max-md:p-1.5">
            {topics.map((topic, i) => (
              <a
                key={topic.id}
                href={`#${topic.id}`}
                hidden={!shown[i]?.some(Boolean)}
                aria-current={topic.id === active ? "location" : undefined}
                className={cn(
                  "flex min-h-10 items-center rounded-md border-thin border-transparent px-2 py-1.5 text-[15px] font-medium text-ink no-underline hover:border-line max-md:shrink-0 max-md:whitespace-nowrap",
                  topic.id === active &&
                    "border-line bg-accent-yellow font-bold text-on-fill-dark shadow-sm",
                )}
              >
                {topic.title}
              </a>
            ))}
          </div>
        </nav>
        <div className="flex min-w-0 flex-col gap-10 md:flex-1">
          {count === 0 && (
            <p className="text-body-l">
              <Trans
                t={t}
                i18nKey="search.none"
                components={{ community: <a href={href("/community")} /> }}
              />
            </p>
          )}
          {topics.map((topic, i) => (
            <section
              key={topic.id}
              id={topic.id}
              hidden={!shown[i]?.some(Boolean)}
              className="flex flex-col gap-3"
            >
              <h2 className="text-heading-3">{topic.title}</h2>
              {topic.items.map((item, j) => (
                <Card key={item.q} asChild padding="none">
                  <details open={i === 0 && j === 0} hidden={!shown[i]?.[j]}>
                    <summary className="cursor-pointer list-inside px-[18px] py-3.5 font-bold">
                      {item.q}
                    </summary>
                    <p className="px-[18px] pb-4 text-body-s">
                      <Rich text={item.a} />
                      {item.link && (
                        <>
                          {" "}
                          <a href={href(item.link.to)}>{item.link.label}</a>
                        </>
                      )}
                    </p>
                  </details>
                </Card>
              ))}
            </section>
          ))}
          <Callout tint="yellow">
            <strong>{t("stuck.heading")}</strong>
            <span className="text-body-s">
              <Trans
                t={t}
                i18nKey="stuck.body"
                components={{
                  community: <a href={href("/community")} />,
                  docs: <a href={links.docs} />,
                  hardware: <Link to="/hardware/" />,
                }}
              />
            </span>
          </Callout>
        </div>
      </Wrap>
    </>
  );
}
