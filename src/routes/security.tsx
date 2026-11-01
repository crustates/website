import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/security.json";
import { email, links } from "@/lib/links";
import { seo } from "@/lib/seo";
import { asset } from "@/lib/site";

export const Route = createFileRoute("/security")({
  head: () =>
    seo({
      title: i18n.t("meta.security.title"),
      description: i18n.t("meta.security.description"),
      path: "/security",
    }),
  component: SecurityPage,
});

/** Illustration: `crust molt verify` on an example release, not live data. */
const verify = [
  ["image", "ghcr.io/crustates/molt:[VERSION]"],
  ["signature", "cosign · keyless · Rekor entry found"],
  ["provenance", "SLSA build L3"],
  ["SBOM", "412 packages · 0 known critical CVEs"],
  ["measured boot", "PCRs match release"],
] as const;

function Model() {
  const { t } = useTranslation("security");
  return (
    <Section wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={t("model.kicker")} heading={t("model.heading")} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {t("model.items", { returnObjects: true }).map((item) => (
          <Card key={item.title} className="flex flex-col gap-3">
            <h3 className="text-heading-4">{item.title}</h3>
            <p className="text-body-s">{item.body}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function SupplyChain() {
  const { t } = useTranslation("security");
  return (
    <Section tone="ink" wrapClassName="flex flex-wrap items-start gap-12">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        <Kicker className="text-accent-yellow">{t("supply.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("supply.heading")}</h2>
        <p className="text-body-l text-ink-muted">{t("supply.lead")}</p>
      </div>
      <Console wrap className="flex-[1_1_480px]">
        <Term tone="dim">$</Term> crust molt verify
        {verify.map(([check, detail]) => (
          <span key={check}>
            {"\n"}
            <Term tone="ok">✓</Term> {check} {detail}
          </span>
        ))}
      </Console>
    </Section>
  );
}

function Assistant() {
  const { t } = useTranslation("security");
  return (
    <Section wrapClassName="flex flex-wrap items-center gap-12">
      <img
        src={asset("/brand/mark-light.svg")}
        alt=""
        width={120}
        height={120}
        className="dark:hidden"
      />
      <img
        src={asset("/brand/mark-dark.svg")}
        alt=""
        width={120}
        height={120}
        className="hidden dark:block"
      />
      <div className="flex min-w-0 flex-[1_1_560px] flex-col gap-3">
        <Kicker>{t("assistant.kicker")}</Kicker>
        <h2 className="text-heading-2">{t("assistant.heading")}</h2>
        <p className="text-body-s">{t("assistant.body")}</p>
      </div>
    </Section>
  );
}

function Report() {
  const { t } = useTranslation("security");
  return (
    <Section
      id="report"
      band
      className="bg-tint-blue"
      wrapClassName="flex flex-wrap items-start gap-10"
    >
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
        {/* Ink, not rust: rust text fails AA on the blue tint. */}
        <Kicker className="text-ink">{t("report.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("report.heading")}</h2>
        <p className="text-body-l">{t("report.lead")}</p>
        <Card asChild>
          {/* GitHub first, as in SECURITY.md. TODO(mail): crustates.eu has no MX record yet, so security@ can't receive reports. */}
          <dl className="flex flex-col gap-3">
            <dt className="text-label">{t("report.github")}</dt>
            <dd className="text-body-s">
              <a href={links.reportVulnerability}>{t("report.advisory")}</a>
            </dd>
            <dt className="text-label">{t("report.email")}</dt>
            <dd className="font-mono">
              <a href={`mailto:${email.security}`}>{email.security}</a>
            </dd>
            <dt className="text-label">{t("report.pgp")}</dt>
            <dd className="font-mono text-body-s">{t("report.fingerprint")}</dd>
          </dl>
        </Card>
      </div>
      <Card className="flex min-w-0 flex-[1_1_420px] flex-col gap-3.5">
        <h3 className="text-heading-3">{t("next.heading")}</h3>
        {/* Matches SECURITY.md. TODO(policy): design said "First assessment within 10 working days"; not in SECURITY.md */}
        <dl className="flex flex-col gap-3.5">
          {t("next.steps", { returnObjects: true }).map((step) => (
            <div key={step.label} className="flex flex-wrap items-center justify-between gap-3">
              <dt className="font-bold">{step.label}</dt>
              <dd>
                <Tag>{step.value}</Tag>
              </dd>
            </div>
          ))}
        </dl>
        <p className="text-body-s text-ink-muted">{t("next.note")}</p>
        <a href={links.securityPolicy} className="self-start text-body-s">
          {t("next.policy")}
        </a>
      </Card>
    </Section>
  );
}

function Advisories() {
  const { t } = useTranslation("security");
  return (
    <Section id="advisories" wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={t("advisories.kicker")} heading={t("advisories.heading")} />
      {/* TODO: list advisories here once there are any */}
      <Card className="flex flex-col gap-2">
        <p className="text-body-l">{t("advisories.empty")}</p>
        <a href={links.advisories} className="self-start text-body-s">
          {t("advisories.link")}
        </a>
      </Card>
    </Section>
  );
}

function Thanks() {
  const { t } = useTranslation("security");
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-5">
      <Kicker>{t("thanks.kicker")}</Kicker>
      <h2 className="text-heading-2">{t("thanks.heading")}</h2>
      <div className="flex flex-wrap gap-3">
        {t("thanks.names", { returnObjects: true }).map((name, i) => (
          <Tag key={i}>{name}</Tag>
        ))}
        <Tag asChild>
          <a href="#report">{t("thanks.you")}</a>
        </Tag>
      </div>
    </Section>
  );
}

function SecurityPage() {
  addNamespace("security", copy);
  const { t } = useTranslation("security");
  return (
    <>
      <PageHero
        size="l"
        kicker={t("hero.kicker")}
        heading={t("hero.heading")}
        lead={t("hero.lead")}
        actions={
          <>
            <Button asChild variant="primary">
              <a href="#report">{t("hero.report")}</a>
            </Button>
            <Button asChild>
              <a href="#advisories">{t("hero.advisories")}</a>
            </Button>
          </>
        }
      />
      <Model />
      <SupplyChain />
      <Assistant />
      <Report />
      <Advisories />
      <Thanks />
    </>
  );
}
