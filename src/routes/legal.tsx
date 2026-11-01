import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { PageHero } from "@/components/sections/page-hero";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { Wrap } from "@/components/ui/section";
import { Table, Td, Th } from "@/components/ui/table";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/legal.json";
import { email } from "@/lib/links";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/legal")({
  head: () =>
    seo({
      title: i18n.t("meta.legal.title"),
      description: i18n.t("meta.legal.description"),
      path: "/legal",
    }),
  component: LegalPage,
});

/** Section ids, in page order; each section's heading is also its "On this page" label. */
const sections = ["licence", "trademark", "website", "telemetry", "assistant", "imprint"] as const;

/** Tags the page's strings may use, and the email addresses as {{hello}}, {{privacy}}… */
const tags = {
  code: <code />,
  time: <time />,
  brand: <Link to="/brand/" />,
  security: <Link to="/security/" />,
  github: (
    <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" />
  ),
  hello: <a href={`mailto:${email.hello}`} />,
  privacy: <a href={`mailto:${email.privacy}`} />,
};

function Text({ text }: { text: string }) {
  return <Trans defaults={text} values={email} components={tags} />;
}

/** "On this page": the current section is the one in the URL hash, else the first. */
function Toc() {
  const { t } = useTranslation("legal");
  const [active, setActive] = useState<string>(sections[0]);
  useEffect(() => {
    const sync = () => setActive(location.hash.slice(1) || sections[0]);
    sync();
    addEventListener("hashchange", sync);
    return () => removeEventListener("hashchange", sync);
  }, []);
  return (
    <aside className="flex max-w-[260px] min-w-0 flex-[1_1_220px] flex-col gap-3 lg:sticky lg:top-6">
      <Kicker>{t("toc.heading")}</Kicker>
      <nav aria-label={t("toc.label")} className="flex flex-col gap-0.5">
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={id === active ? "location" : undefined}
            className={cn(
              "flex min-h-10 items-center rounded-md border-thin border-transparent px-2 py-1.5 text-[15px] font-medium text-ink no-underline hover:border-line",
              id === active && "border-line bg-accent-yellow font-bold text-on-fill-dark shadow-sm",
            )}
          >
            {t(`${id}.heading`)}
          </a>
        ))}
      </nav>
    </aside>
  );
}

const section = "flex scroll-mt-6 flex-col gap-3.5";
const list = "m-0 list-disc pl-5";

function Licence() {
  const { t } = useTranslation("legal");
  const logos = t("licence.logos", { returnObjects: true });
  return (
    <section id="licence" className={section}>
      <h2 className="text-heading-1">{t("licence.heading")}</h2>
      <Table>
        <thead>
          <tr>
            {t("licence.columns", { returnObjects: true }).map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {t("licence.rows", { returnObjects: true }).map((row) => (
            <tr key={row.licence}>
              <Td rowHeader className="font-normal whitespace-normal">
                {row.component}
              </Td>
              <Td className="font-mono">{row.licence}</Td>
            </tr>
          ))}
          <tr>
            <Td rowHeader className="font-normal whitespace-normal">
              {logos.component}
            </Td>
            <Td>{logos.licence}</Td>
          </tr>
        </tbody>
      </Table>
      <p>{t("licence.body")}</p>
      <p className="text-body-s text-ink-muted">
        <Text text={t("licence.thirdParty")} />
      </p>
    </section>
  );
}

function Trademark() {
  const { t } = useTranslation("legal");
  const cards = [
    ["fine", "ok"],
    ["ask", "bad"],
  ] as const;
  return (
    <section id="trademark" className={section}>
      <h2 className="text-heading-1">{t("trademark.heading")}</h2>
      <p>{t("trademark.intro")}</p>
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map(([key, tone]) => (
          <Card key={key} padding="tight" className="flex flex-col items-start gap-3">
            <Pill tone={tone}>{t(`trademark.${key}.label`)}</Pill>
            <p className="text-body-s">{t(`trademark.${key}.body`)}</p>
          </Card>
        ))}
      </div>
      <p className="text-body-s">
        <Text text={t("trademark.forks")} />
      </p>
    </section>
  );
}

function Website() {
  const { t } = useTranslation("legal");
  return (
    <section id="website" className={section}>
      <h2 className="text-heading-1">{t("website.heading")}</h2>
      {/* TODO(privacy): the design also promised self-hosted cookieless analytics, a newsletter and 14-day server logs; none exist. Revisit when the site moves off GitHub Pages. */}
      <ul className={list}>
        {t("website.items", { returnObjects: true }).map((item) => (
          <li key={item}>
            <Text text={item} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function Telemetry() {
  const { t } = useTranslation("legal");
  return (
    <section id="telemetry" className={section}>
      <h2 className="text-heading-1">{t("telemetry.heading")}</h2>
      <Callout tint="blue">
        <p className="text-body-s">
          <Text text={t("telemetry.callout")} />
        </p>
      </Callout>
      <div className="grid gap-6 md:grid-cols-2">
        {(["sent", "never"] as const).map((key) => (
          <Card key={key} padding="tight" className="flex flex-col gap-3">
            <p className="text-label">{t(`telemetry.${key}.label`)}</p>
            <ul className={cn(list, "text-body-s")}>
              {t(`telemetry.${key}.items`, { returnObjects: true }).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
      <p className="text-body-s">{t("telemetry.updates")}</p>
    </section>
  );
}

function Assistant() {
  const { t } = useTranslation("legal");
  return (
    <section id="assistant" className={section}>
      <h2 className="text-heading-1">{t("assistant.heading")}</h2>
      <p>{t("assistant.intro")}</p>
      <ul className={list}>
        {t("assistant.items", { returnObjects: true }).map((item) => (
          <li key={item}>
            <Text text={item} />
          </li>
        ))}
      </ul>
      <Button asChild size="sm" className="self-start">
        <Link to="/assistant/">{t("assistant.link")}</Link>
      </Button>
    </section>
  );
}

function Imprint() {
  const { t } = useTranslation("legal");
  return (
    <section id="imprint" className={section}>
      <h2 className="text-heading-1">{t("imprint.heading")}</h2>
      <Card className="flex flex-col gap-1.5">
        <p>
          <strong>{t("imprint.name")}</strong>
        </p>
        {/* "Crustates BV": crustates/.github GOVERNANCE.md says "Crustates is maintained by Crustates BV". */}
        <p className="text-body-s">
          {t("imprint.lines", { returnObjects: true }).map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
        <p className="text-body-s">
          <Text text={t("imprint.contact")} />
        </p>
      </Card>
    </section>
  );
}

function LegalPage() {
  addNamespace("legal", copy);
  const { t } = useTranslation("legal");
  return (
    <>
      <PageHero
        size="l"
        kicker={t("hero.kicker")}
        heading={t("hero.heading")}
        lead={t("hero.lead")}
      >
        <p className="text-body-s text-ink-muted">
          <Text text={t("hero.updated")} />
        </p>
      </PageHero>
      <Wrap className="flex flex-wrap items-start gap-14 pt-12 pb-[72px]">
        <Toc />
        <div className="flex max-w-[800px] min-w-0 flex-[1_1_640px] flex-col gap-10">
          <Licence />
          <Trademark />
          <Website />
          <Telemetry />
          <Assistant />
          <Imprint />
        </div>
      </Wrap>
    </>
  );
}
