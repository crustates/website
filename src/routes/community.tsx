import { Link, createFileRoute } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { useCopy } from "@/hooks/use-copy";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/community.json";
import { links } from "@/lib/links";
import { seo } from "@/lib/seo";
import { absoluteUrl, asset, pageUrl } from "@/lib/site";

export const Route = createFileRoute("/community")({
  head: () =>
    seo({
      title: i18n.t("meta.community.title"),
      description: i18n.t("meta.community.description"),
      path: "/community",
    }),
  component: CommunityPage,
});

const grid = "grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6";

function Hero() {
  const { t } = useTranslation("community");
  return (
    <Section fill="tide" band padded={false}>
      <div className="flex flex-wrap items-center justify-between gap-10 py-16 max-md:py-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-4">
          <Kicker className="text-accent-yellow">{t("hero.kicker")}</Kicker>
          <h1 className="text-display-l max-sm:text-heading-1">{t("hero.heading")}</h1>
          <p className="text-body-l">{t("hero.lead")}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <a href={links.github}>{t("hero.star")}</a>
            </Button>
            <Button asChild>
              <a href="#sponsor">{t("hero.sponsor")}</a>
            </Button>
          </div>
        </div>
        <img
          src={asset("/brand/emblem-seal.svg")}
          alt={t("hero.emblemAlt")}
          width={240}
          height={240}
          className="size-[240px] max-sm:size-[200px]"
        />
      </div>
    </Section>
  );
}

function Contribute() {
  const { t } = useTranslation("community");
  const cards = [
    { key: "issues", to: links.goodFirstIssues },
    { key: "signoff" },
    { key: "contributing", to: links.contributing },
    { key: "catalog", to: links.docs },
  ] as const;
  return (
    <Section wrapClassName="flex flex-col gap-7">
      <h2 className="text-heading-1">{t("contribute.heading")}</h2>
      <div className={grid}>
        {cards.map((card) => (
          <Card key={card.key} className="flex flex-col gap-3">
            <h3 className="text-heading-4">{t(`contribute.${card.key}.title`)}</h3>
            <p className="text-body-s">{t(`contribute.${card.key}.body`)}</p>
            {"to" in card ? (
              <Button asChild size="sm" className="self-start">
                <a href={card.to}>{t(`contribute.${card.key}.action`)}</a>
              </Button>
            ) : (
              <Cmd command={'git commit -s -m "feat: ..."'} />
            )}
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Talk() {
  const { t } = useTranslation("community");
  const channels = ["forum", "matrix", "mastodon", "discussions"] as const;
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-7">
      <h2 className="text-heading-1">{t("talk.heading")}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-6">
        {channels.map((key) => {
          const body = (
            <>
              <h3 className="text-heading-4">{t(`talk.${key}.title`)}</h3>
              <p className="text-body-s text-ink-muted">{t(`talk.${key}.body`)}</p>
              <span className="font-mono text-body-s">{t(`talk.${key}.where`)}</span>
            </>
          );
          // Forum, Matrix and Mastodon don't exist yet: their cards stay unlinked.
          return key === "discussions" ? (
            <Card key={key} asChild className="flex flex-col gap-3 no-underline">
              <a href={links.discussions}>{body}</a>
            </Card>
          ) : (
            <Card key={key} className="flex flex-col gap-3">
              {body}
            </Card>
          );
        })}
      </div>
    </Section>
  );
}

function Sponsor() {
  const { t } = useTranslation("community");
  return (
    <Section id="sponsor" wrapClassName="flex flex-col gap-7">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Kicker>{t("sponsor.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("sponsor.heading")}</h2>
        <p className="text-body-l text-ink-muted">{t("sponsor.lead")}</p>
      </div>
      {/* TODO(sponsor): design had "Sponsor" buttons and a "Most chosen" pill; FUNDING.yml says sponsorship is undecided */}
      <div className={grid}>
        {[false, true, false].map((raised, i) => (
          <Card
            key={i}
            raised={raised}
            className={raised ? "flex flex-col gap-3 bg-tint-yellow" : "flex flex-col gap-3"}
          >
            <h3 className="text-heading-3">{t("sponsor.tier.name")}</h3>
            <p className="text-heading-2">{t("sponsor.tier.price")}</p>
            <p className="text-body-s">{t("sponsor.tier.body")}</p>
          </Card>
        ))}
      </div>
      <Callout>
        <p className="text-body-s">
          <strong>{t("sponsor.sponsorsLabel")}</strong> {t("sponsor.sponsors")}
        </p>
      </Callout>
    </Section>
  );
}

function Policies() {
  const { t } = useTranslation("community");
  const items = [
    {
      key: "security",
      link: (label: string) => (
        <Link to="/security/" hash="report">
          {label}
        </Link>
      ),
    },
    { key: "conduct", link: (label: string) => <a href={links.codeOfConduct}>{label}</a> },
    {
      key: "licence",
      link: (label: string) => (
        <Link to="/legal/" hash="licence">
          {label}
        </Link>
      ),
    },
  ] as const;
  return (
    <Section tone="ink" band wrapClassName={grid.replace("260px", "300px")}>
      {items.map(({ key, link }) => (
        <div
          key={key}
          id={key === "conduct" ? "conduct" : undefined}
          className="flex flex-col gap-3 rounded-md border-thick border-line p-6"
        >
          {/* h2: each box is its own topic, though styled like a card heading. */}
          <h2 className="text-heading-3">{t(`policies.${key}.title`)}</h2>
          <p className="text-body-s text-ink-muted">{t(`policies.${key}.body`)}</p>
          <Button asChild size="sm" className="self-start">
            {link(t(`policies.${key}.action`))}
          </Button>
        </div>
      ))}
    </Section>
  );
}

function BadgeCode() {
  const { t } = useTranslation("community");
  const { t: tc } = useTranslation();
  const markdown = `[![Runs on Crustates](${absoluteUrl("/brand/badge-runs-on.svg")})](${pageUrl("/")})`;
  const { mounted, copied, copy } = useCopy(markdown);
  return (
    <div className="min-w-0 rounded-md border-thick border-line shadow-md">
      <div className="theme-dark flex items-start gap-3 rounded-[3px] bg-surface-sunken py-3.5 pr-3 pl-4 font-mono text-[13px] leading-5">
        <code className="min-w-0 flex-1 self-center [overflow-wrap:anywhere]">{markdown}</code>
        {mounted && (
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? tc("copy.copied") : t("brand.copy")}
            className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm border-thin border-line bg-surface-card text-ink"
          >
            {copied ? (
              <Check aria-hidden className="size-4" />
            ) : (
              <Copy aria-hidden className="size-4" />
            )}
          </button>
        )}
        <span role="status" className="sr-only">
          {copied ? tc("copy.copied") : ""}
        </span>
      </div>
    </div>
  );
}

function Brand() {
  const { t } = useTranslation("community");
  return (
    <Section wrapClassName="flex flex-wrap items-center gap-10">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <Kicker>{t("brand.kicker")}</Kicker>
        <h2 className="text-heading-2">{t("brand.heading")}</h2>
        <p className="text-ink-muted">{t("brand.lead")}</p>
        <BadgeCode />
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <a href={links.brandRelease}>{t("brand.kit")}</a>
          </Button>
          <Button asChild>
            <Link to="/brand/">{t("brand.guidelines")}</Link>
          </Button>
        </div>
      </div>
      <Card raised className="flex min-w-0 flex-[1_1_380px] flex-col items-center gap-6">
        <img
          src={asset("/brand/badge-runs-on.svg")}
          alt={t("brand.badgeAlt")}
          width={260}
          height={44}
          loading="lazy"
          className="h-auto max-w-full"
        />
        <img
          src={asset("/brand/logo-horizontal-light.svg")}
          alt={t("brand.logoAlt")}
          width={280}
          height={62}
          loading="lazy"
          className="h-auto max-w-full dark:hidden"
        />
        <img
          src={asset("/brand/logo-horizontal-dark.svg")}
          alt={t("brand.logoAlt")}
          width={280}
          height={62}
          loading="lazy"
          className="hidden h-auto max-w-full dark:block"
        />
      </Card>
    </Section>
  );
}

function CommunityPage() {
  addNamespace("community", copy);
  return (
    <>
      <Hero />
      <Contribute />
      <Talk />
      <Sponsor />
      <Policies />
      <Brand />
    </>
  );
}
