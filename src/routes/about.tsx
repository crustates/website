import { Link, createFileRoute } from "@tanstack/react-router";
import { Trans, useTranslation } from "react-i18next";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/about.json";
import { email, links } from "@/lib/links";
import { seo } from "@/lib/seo";
import { asset } from "@/lib/site";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: i18n.t("meta.about.title"),
      description: i18n.t("meta.about.description"),
      path: "/about",
    }),
  component: AboutPage,
});

function Hero() {
  const { t } = useTranslation("about");
  return (
    <Section dots band padded={false}>
      <div className="flex flex-wrap items-center gap-10 py-16 max-md:py-12">
        <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-5">
          <Kicker>{t("hero.kicker")}</Kicker>
          <h1 className="text-display-l max-sm:text-heading-1">{t("hero.heading")}</h1>
          <p className="max-w-[680px] text-body-l">{t("hero.lead")}</p>
        </div>
        <div className="flex flex-[0_1_300px] justify-center">
          <img
            src={asset("/brand/app-icon.svg")}
            alt=""
            width={240}
            height={240}
            className="size-[240px] max-sm:size-[180px]"
          />
        </div>
      </div>
    </Section>
  );
}

function Story() {
  const { t } = useTranslation("about");
  return (
    <Section wrapClassName="flex flex-wrap items-start gap-14">
      <div className="flex max-w-[760px] min-w-0 flex-[1_1_520px] flex-col gap-[18px]">
        <Kicker>{t("story.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("story.heading")}</h2>
        <p className="text-body-l">{t("story.lead")}</p>
        {t("story.paragraphs", { returnObjects: true }).map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
      <dl className="m-0 flex min-w-0 flex-[1_1_340px] flex-col gap-4">
        {t("story.stats", { returnObjects: true }).map(({ label, value }) => (
          <Card key={label}>
            <dt className="text-label">{label}</dt>
            <dd className="m-0 text-heading-2 tabular-nums">{value}</dd>
          </Card>
        ))}
      </dl>
    </Section>
  );
}

function Principles() {
  const { t } = useTranslation("about");
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={t("principles.kicker")} heading={t("principles.heading")} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {t("principles.items", { returnObjects: true }).map((item) => (
          <Card key={item.title} className="flex flex-col gap-3">
            <h3 className="text-heading-4">{item.title}</h3>
            <p className="text-body-s">{item.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

const governanceLinks = {
  maintainers: <a href={links.governance} />,
  adr: <a href={links.adr} />,
  dco: <a href={links.contributing} />,
  roadmap: <Link to="/roadmap/" />,
};

function GovernanceAndLicence() {
  const { t } = useTranslation("about");
  return (
    <Section wrapClassName="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-7">
      <Card raised className="flex flex-col gap-3.5">
        <Kicker>{t("governance.kicker")}</Kicker>
        <h2 className="text-heading-2">{t("governance.heading")}</h2>
        <ul className="m-0 list-disc pl-5 text-body-s">
          {(Object.keys(governanceLinks) as (keyof typeof governanceLinks)[]).map((key) => (
            <li key={key}>
              <Trans
                t={t}
                i18nKey={`governance.items.${key}`}
                components={{ strong: <strong />, code: <code />, ref: governanceLinks[key] }}
              />
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Button asChild size="sm">
            <Link to="/roadmap/">{t("governance.roadmap")}</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/community/">{t("governance.contribute")}</Link>
          </Button>
        </div>
      </Card>
      <Card raised className="flex flex-col gap-3.5">
        <Kicker>{t("licence.kicker")}</Kicker>
        <h2 className="text-heading-2">{t("licence.heading")}</h2>
        {t("licence.paragraphs", { returnObjects: true }).map((p) => (
          <p key={p} className="text-body-s">
            {p}
          </p>
        ))}
        <Button asChild size="sm" className="self-start">
          <Link to="/legal/">{t("licence.action")}</Link>
        </Button>
      </Card>
    </Section>
  );
}

function Sustainability() {
  const { t } = useTranslation("about");
  return (
    <Section tone="yellow" band wrapClassName="flex flex-wrap items-center gap-10">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-3.5">
        <Kicker>{t("sustainability.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("sustainability.heading")}</h2>
        {/* TODO(sponsor): "kept going by sponsors" predates FUNDING.yml, which says sponsorship is undecided */}
        <p className="text-body-l">{t("sustainability.lead")}</p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <Link to="/community/" hash="sponsor">
              {t("sustainability.become")}
            </Link>
          </Button>
          <Button asChild>
            <Link to="/community/" hash="sponsor">
              {t("sustainability.see")}
            </Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-[0_1_300px] justify-center">
        <img
          src={asset("/brand/badge-runs-on.svg")}
          alt={t("sustainability.badgeAlt")}
          width={280}
          height={48}
          loading="lazy"
          className="h-auto max-w-full"
        />
      </div>
    </Section>
  );
}

function Contact() {
  const { t } = useTranslation("about");
  return (
    <Section tone="ink" wrapClassName="flex flex-wrap items-center justify-between gap-8">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-3">
        <Kicker className="text-accent-yellow">{t("contact.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("contact.heading")}</h2>
        <p className="text-body-l text-ink-muted">{t("contact.lead")}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <a href={`mailto:${email.hello}`}>{email.hello}</a>
        </Button>
        <Button asChild>
          <Link to="/brand/">{t("contact.brand")}</Link>
        </Button>
      </div>
    </Section>
  );
}

function AboutPage() {
  addNamespace("about", copy);
  return (
    <>
      <Hero />
      <Story />
      <Principles />
      <GovernanceAndLicence />
      <Sustainability />
      <Contact />
    </>
  );
}
