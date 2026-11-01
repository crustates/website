import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { CardGrid } from "@/components/sections/card-grid";
import { DataTable } from "@/components/sections/data-table";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { addNamespace, i18n } from "@/i18n";
import barnacle from "@/i18n/en/barnacle.json";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";

export const Route = createFileRoute("/barnacle")({
  head: () =>
    seo({
      title: i18n.t("meta.barnacle.title"),
      description: i18n.t("meta.barnacle.description"),
      path: "/barnacle",
    }),
  component: BarnaclePage,
});

/** Illustration of the install dialog: static, nothing to tick or click. */
function InstallDialog() {
  const { t } = useTranslation("barnacle");
  return (
    <Card raised className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <strong>{t("dialog.title")}</strong>
        <Tag>{t("dialog.version")}</Tag>
      </div>
      <p className="text-body-s text-ink-muted">{t("dialog.asks")}</p>
      <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
        {t("dialog.grants", { returnObjects: true }).map((grant) => (
          <li key={grant} className="flex items-center gap-2.5">
            {/* A ticked checkbox, drawn: the dialog is a picture, not a form. */}
            <span
              aria-hidden
              className="inline-flex size-5 flex-none items-center justify-center rounded-sm bg-brand-rust text-caption font-bold text-on-fill-dark"
            >
              ✓
            </span>
            <span className="min-w-0 text-body-s">
              <Rich text={grant} />
            </span>
          </li>
        ))}
      </ul>
      <Callout tint="violet">
        <p className="text-body-s">{t("dialog.note")}</p>
      </Callout>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="violet" size="sm" className="pointer-events-none">
          <span>{t("dialog.approve")}</span>
        </Button>
        <Button asChild size="sm" className="pointer-events-none">
          <span>{t("dialog.cancel")}</span>
        </Button>
      </div>
    </Card>
  );
}

function Hero() {
  const { t } = useTranslation("barnacle");
  return (
    <PageHero
      kickerChip
      product="barnacle"
      size="l"
      kicker={t("hero.kicker")}
      heading={t("hero.heading")}
      lead={t("hero.lead")}
      actions={
        <>
          <Button asChild variant="violet">
            <a href="#directory">{t("hero.browse")}</a>
          </Button>
          <Button asChild>
            <a href="#build">{t("hero.build")}</a>
          </Button>
        </>
      }
      visual={<InstallDialog />}
    />
  );
}

const statusTones = { official: "ok", community: "info", example: "off" } as const;

/** The directory's example plugins: monogram, its fill, capability and source. */
const plugins = [
  {
    id: "netbird",
    letter: "N",
    fill: "bg-brand-teal text-on-fill-light",
    cap: "network.access",
    status: "official",
  },
  {
    id: "tailscale",
    letter: "T",
    fill: "bg-brand-blue text-on-fill-light",
    cap: "network.access",
    status: "official",
  },
  {
    id: "cloudflare",
    letter: "C",
    fill: "bg-brand-rust text-on-fill-dark",
    cap: "dns.records",
    status: "official",
  },
  {
    id: "desec",
    letter: "D",
    fill: "bg-accent-yellow text-on-fill-dark",
    cap: "dns.records",
    status: "community",
  },
  {
    id: "ntfy",
    letter: "N",
    fill: "bg-status-success text-on-fill-dark",
    cap: "alerts.send",
    status: "official",
  },
  {
    id: "matrix",
    letter: "M",
    fill: "bg-surface-card text-ink",
    cap: "alerts.send",
    status: "community",
  },
  {
    id: "hetzner",
    letter: "H",
    fill: "bg-status-danger text-on-fill-dark",
    cap: "storage.target",
    status: "community",
  },
  {
    id: "backblaze",
    letter: "B",
    fill: "bg-brand-rust text-on-fill-dark",
    cap: "storage.target",
    status: "community",
  },
  {
    id: "homeAssistant",
    letter: "H",
    fill: "bg-brand-blue text-on-fill-light",
    cap: "events.read",
    status: "community",
  },
  {
    id: "nut",
    letter: "U",
    fill: "bg-accent-yellow text-on-fill-dark",
    cap: "host.power",
    status: "official",
  },
  {
    id: "naming",
    letter: "P",
    fill: "bg-brand-teal text-on-fill-light",
    cap: "policy.admit",
    status: "example",
  },
  {
    id: "poolHealth",
    letter: "W",
    fill: "bg-surface-card text-ink",
    cap: "ui.widget",
    status: "example",
  },
] as const;

function Directory() {
  const { t } = useTranslation("barnacle");
  return (
    // The design's search box, capability filters and "Show all 42 plugins" link are
    // left out: a static page has nothing to search, filter or page through.
    <Section id="directory" wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={t("directory.kicker")} heading={t("directory.heading")} />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(min(270px,100%),1fr))] gap-6">
        {plugins.map((plugin) => (
          <Card key={plugin.id} asChild padding="tight" className="flex flex-col gap-3">
            <article>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className={`inline-flex size-12 flex-none items-center justify-center rounded-md border-thick border-line text-[22px] leading-none font-bold ${plugin.fill}`}
                >
                  {plugin.letter}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <h3 className="text-heading-4">{t(`directory.plugins.${plugin.id}.name`)}</h3>
                  <span className="text-body-s text-ink-muted">
                    {t(`directory.plugins.${plugin.id}.kind`)}
                  </span>
                </div>
              </div>
              <p className="text-body-s">{t(`directory.plugins.${plugin.id}.body`)}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                <Tag>{plugin.cap}</Tag>
                <Pill tone={statusTones[plugin.status]}>{t(`directory.${plugin.status}`)}</Pill>
              </div>
            </article>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Security() {
  const { t } = useTranslation("barnacle");
  return (
    <Section band className="bg-tint-violet" wrapClassName="flex flex-col gap-8">
      <SectionIntro
        product="barnacle"
        kicker={t("security.kicker")}
        heading={t("security.heading")}
        lead={t("security.lead")}
      />
      <DataTable
        frame="thin"
        columns={t("security.columns", { returnObjects: true })}
        rows={t("security.rows", { returnObjects: true })}
        monoFirst
      />
      <CardGrid items={t("security.items", { returnObjects: true })} />
    </Section>
  );
}

function Build() {
  const { t } = useTranslation("barnacle");
  return (
    <Section id="build" wrapClassName="flex flex-wrap items-start gap-12">
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
        <SectionIntro
          kicker={t("build.kicker")}
          heading={t("build.heading")}
          lead={t("build.lead")}
        />
        <ol className="m-0 flex list-none flex-col gap-4 p-0">
          {t("build.steps", { returnObjects: true }).map((step, i) => (
            <Card key={step.title} asChild padding="tight" className="flex items-start gap-3">
              <li>
                <Tag>{i + 1}</Tag>
                <div className="flex min-w-0 flex-col gap-1">
                  <h3 className="text-body font-bold">{step.title}</h3>
                  <p className="text-body-s text-ink-muted">
                    <Rich text={step.body} />
                  </p>
                </div>
              </li>
            </Card>
          ))}
        </ol>
      </div>
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5">
        <Console wrap>
          <Term tone="dim">$</Term> crust barnacle new ntfy-alerts --template alert-channel --lang
          rust{"\n"}
          <Term tone="ok">✓</Term> created ntfy-alerts/{" "}
          <Term tone="dim">(Cargo.toml, barnacle.toml, src/lib.rs)</Term>
          {"\n"}
          <Term tone="dim">$</Term> crust barnacle build{"\n"}
          <Term tone="ok">✓</Term> ntfy_alerts.wasm{" "}
          <Term tone="dim">(component, wasi 0.2, 412 KiB)</Term>
          {"\n"}
          <Term tone="dim">$</Term> crust barnacle dev --node node-1{"\n"}
          <Term tone="info">→</Term> watching src/ · sending test alert …{"\n"}
          <Term tone="ok">✓</Term> delivered to ntfy.sh/homelab
        </Console>
        <Console>
          <Term tone="dim">{"// src/lib.rs"}</Term>
          {"\n"}
          <Term tone="info">impl</Term> AlertChannel <Term tone="info">for</Term> Ntfy {"{"}
          {"\n    "}
          <Term tone="info">fn</Term> send(alert: Alert) -&gt; Result&lt;(), Error&gt; {"{"}
          {"\n        "}
          <Term tone="info">let</Term> token = secrets::get(<Term tone="ok">"ntfy-token"</Term>)?;
          {"\n        "}
          http::post(<Term tone="ok">"https://ntfy.sh/homelab"</Term>)
          {
            "\n            .bearer(&token)\n            .body(alert.summary())\n            .send()?;\n        Ok(())\n    }\n}"
          }
        </Console>
        <Console>
          <Term tone="dim"># barnacle.toml</Term>
          {"\n"}
          <Term tone="info">[plugin]</Term>
          {"\n"}name = <Term tone="ok">"ntfy-alerts"</Term>
          {"\n"}kind = <Term tone="ok">"alert-channel"</Term>
          {"\n"}
          <Term tone="info">[capabilities]</Term>
          {"\n"}alerts.send{"   "}= <Term tone="ok">true</Term>
          {"\n"}http.outbound = [<Term tone="ok">"ntfy.sh"</Term>]{"\n"}secrets.read{"  "}= [
          <Term tone="ok">"ntfy-token"</Term>]
        </Console>
      </div>
    </Section>
  );
}

function UnderTheHood() {
  const { t } = useTranslation("barnacle");
  return (
    <Section tone="ink" wrapClassName="flex flex-wrap items-center gap-12">
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3.5">
        <Kicker className="text-accent-yellow">{t("hood.kicker")}</Kicker>
        <h2 className="text-heading-2">{t("hood.heading")}</h2>
        <p className="text-body-l text-ink-muted">{t("hood.lead")}</p>
      </div>
      <div className="flex min-w-0 flex-[1_1_380px] flex-wrap gap-2.5">
        {t("hood.tags", { returnObjects: true }).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </Section>
  );
}

/** Closing band in Barnacle violet, pointing at the related pages. */
function Share() {
  const { t } = useTranslation("barnacle");
  return (
    // The design's "Submit a plugin" button is left out: it had no destination yet.
    <Section fill="barnacle" band wrapClassName="flex flex-wrap items-center justify-between gap-6">
      <div className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
        <Kicker className="text-current">{t("share.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("share.heading")}</h2>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant="pink">
          <a href={href("/spawn")}>{t("share.spawn")}</a>
        </Button>
        <Button asChild className="bg-line text-surface-page">
          <a href={href("/assistant")}>{t("share.assistant")}</a>
        </Button>
        {/* Plain link until /api lands in part 4. */}
        <Button asChild>
          <a href={href("/api")}>{t("share.api")}</a>
        </Button>
      </div>
    </Section>
  );
}

function BarnaclePage() {
  addNamespace("barnacle", barnacle);
  return (
    <>
      <Hero />
      <Directory />
      <Security />
      <Build />
      <UnderTheHood />
      <Share />
    </>
  );
}
