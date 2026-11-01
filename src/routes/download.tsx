import { Link, createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { Section } from "@/components/ui/section";
import { Table, Td, Th } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/download.json";
import { links } from "@/lib/links";
import { seo } from "@/lib/seo";
import { asset } from "@/lib/site";

export const Route = createFileRoute("/download")({
  head: () =>
    seo({
      title: i18n.t("meta.download.title"),
      description: i18n.t("meta.download.description"),
      path: "/download",
    }),
  component: DownloadPage,
});

const grid = "grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] gap-7";

function Hero() {
  const { t } = useTranslation("download");
  return (
    <Section dots band padded={false}>
      <div className="flex flex-wrap items-center gap-10 py-16 max-md:py-12">
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-[18px]">
          <Kicker>{t("hero.kicker")}</Kicker>
          <h1 className="text-display-l max-sm:text-heading-1">{t("hero.heading")}</h1>
          <p className="max-w-[600px] text-body-l">{t("hero.lead")}</p>
        </div>
        <img src={asset("/brand/app-icon.svg")} alt={t("hero.iconAlt")} width={200} height={200} />
      </div>
    </Section>
  );
}

function Build({ arch }: { arch: "amd64" | "arm64" }) {
  const { t } = useTranslation("download");
  return (
    <Card raised asChild className="flex flex-col gap-4">
      <article>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-heading-2">{arch}</h2>
          <Pill tone="ok">{t("builds.stable")}</Pill>
        </div>
        <p className="text-ink-muted">
          {arch === "amd64" ? (
            t("builds.amd64.body")
          ) : (
            <>
              {t("builds.arm64.body")} <Link to="/hardware/">{t("builds.arm64.guide")}</Link>{" "}
              {t("builds.arm64.after")}
            </>
          )}
        </p>
        <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-body-s">
          <dt className="text-label">{t("builds.version")}</dt>
          <dd className="m-0 font-mono">[VERSION]</dd>
          <dt className="text-label">{t("builds.file")}</dt>
          <dd className="m-0 font-mono [overflow-wrap:anywhere]">crustates-[VERSION]-{arch}.iso</dd>
          <dt className="text-label">{t("builds.size")}</dt>
          <dd className="m-0 font-mono">[SIZE]</dd>
        </dl>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="primary">
            {/* TODO: link the ISO asset once a release exists */}
            <a href={links.releases}>{t("builds.download")}</a>
          </Button>
          <Button asChild size="sm">
            <a href="#verify">{t("builds.verify")}</a>
          </Button>
        </div>
      </article>
    </Card>
  );
}

function Builds() {
  const { t } = useTranslation("download");
  return (
    <Section wrapClassName="flex flex-col gap-7">
      <Callout tint="yellow">
        <p>
          <strong>{t("notice.title")}</strong> {t("notice.body")}{" "}
          <a href={links.github}>{t("notice.link")}</a>
        </p>
      </Callout>
      <div className={grid}>
        <Build arch="amd64" />
        <Build arch="arm64" />
      </div>
    </Section>
  );
}

function Install() {
  const { t } = useTranslation("download");
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-8">
      <h2 className="text-heading-1">{t("install.heading")}</h2>
      <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-6 p-0">
        {t("install.steps", { returnObjects: true }).map((step, i) => (
          <Card key={step.title} asChild className="flex flex-col gap-3">
            <li>
              <Tag className="self-start">{t("install.step", { n: i + 1 })}</Tag>
              <h3 className="text-heading-4">{step.title}</h3>
              <p className="text-body-s">{step.body}</p>
              {i === 1 && (
                <Console wrap framed={false}>
                  sudo dd if=crustates.iso of=/dev/sdX bs=4M status=progress
                </Console>
              )}
            </li>
          </Card>
        ))}
      </ol>
    </Section>
  );
}

function Verify() {
  const { t } = useTranslation("download");
  const iso = "crustates-[VERSION]-amd64.iso";
  return (
    <Section id="verify" wrapClassName="flex flex-wrap items-start gap-12">
      <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
        <Kicker>{t("verify.kicker")}</Kicker>
        <h2 className="text-heading-2">{t("verify.heading")}</h2>
        <p className="text-ink-muted">{t("verify.lead")}</p>
      </div>
      {/* Illustration: what verifying a release will look like. */}
      <Console className="flex-[1_1_560px]">
        <Term tone="dim">{t("verify.checksum")}</Term>
        {`\nsha256sum -c ${iso}.sha256\n\n`}
        <Term tone="dim">{t("verify.signature")}</Term>
        {`
cosign verify-blob \\
  --bundle ${iso}.sigstore.json \\
  --certificate-identity [SIGNING IDENTITY] \\
  --certificate-oidc-issuer [OIDC ISSUER] \\
  ${iso}
`}
        <Term tone="ok">{t("verify.ok")}</Term>
      </Console>
    </Section>
  );
}

function Requirements() {
  const { t } = useTranslation("download");
  return (
    <Card asChild className="flex flex-col gap-3">
      <article>
        <h2 className="text-heading-3">{t("requirements.heading")}</h2>
        {/* The design drops the table's shadow inside a card. */}
        <div className="border-thin border-line">
          <Table frame="none">
            <thead>
              <tr>
                {t("requirements.columns", { returnObjects: true }).map((c) => (
                  <Th key={c}>{c}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t("requirements.rows", { returnObjects: true }).map(([part, min, rec]) => (
                <tr key={part}>
                  <Td rowHeader className="font-normal">
                    {part}
                  </Td>
                  <Td>{min}</Td>
                  <Td>{rec}</Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
        <p className="text-body-s text-ink-muted">{t("requirements.note")}</p>
      </article>
    </Card>
  );
}

const channels = [
  ["stable", "ok"],
  ["beta", "warn"],
] as const;

function Channels() {
  const { t } = useTranslation("download");
  return (
    <Card asChild className="flex flex-col gap-3">
      <article>
        <h2 className="text-heading-3">{t("channels.heading")}</h2>
        {channels.map(([channel, tone]) => (
          <Callout key={channel} className="items-center">
            <Pill tone={tone}>{t(`channels.${channel}.label`)}</Pill>
            <p className="text-body-s">{t(`channels.${channel}.body`)}</p>
          </Callout>
        ))}
        <h3 className="mt-2 text-heading-4">{t("channels.upgradeHeading")}</h3>
        {/* The design linked "Updates" to a console screen (ui-updates.html): text only. */}
        <p className="text-body-s">
          <Rich text={t("channels.upgradeBody")} />
        </p>
      </article>
    </Card>
  );
}

function DownloadPage() {
  addNamespace("download", copy);
  return (
    <>
      <Hero />
      <Builds />
      <Install />
      <Verify />
      <Section band className="bg-tint-blue" wrapClassName={grid}>
        <Requirements />
        <Channels />
      </Section>
    </>
  );
}
