import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { CardGrid } from "@/components/sections/card-grid";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { StaticButton } from "@/components/ui/static-button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { addNamespace, i18n } from "@/i18n";
import assistant from "@/i18n/en/assistant.json";
import { links } from "@/lib/links";
import { seo } from "@/lib/seo";
import { asset, href } from "@/lib/site";

export const Route = createFileRoute("/assistant")({
  head: () =>
    seo({
      title: i18n.t("meta.assistant.title"),
      description: i18n.t("meta.assistant.description"),
      path: "/assistant",
    }),
  component: AssistantPage,
});

/** Illustration: a chat that ends in a plan to confirm, not a live chat. */
function Chat() {
  const { t } = useTranslation("assistant");
  return (
    <Card raised padding="none" className="overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-line bg-surface-sunken px-[18px] py-3">
        <div className="flex items-center gap-2.5">
          <img
            src={asset("/brand/mark-light.svg")}
            alt=""
            width={28}
            height={28}
            className="dark:hidden"
          />
          <img
            src={asset("/brand/mark-dark.svg")}
            alt=""
            width={28}
            height={28}
            className="hidden dark:block"
          />
          <strong>{t("chat.title")}</strong>
        </div>
        <Tag>{t("chat.model")}</Tag>
      </div>
      <div className="flex flex-col gap-4 p-5">
        <Callout tint="blue" className="max-w-[80%] self-end">
          <p className="text-body-s">{t("chat.question")}</p>
        </Callout>
        <div className="flex max-w-[92%] flex-col gap-2.5">
          <p className="text-body-s">
            <Rich text={t("chat.answer")} />
          </p>
          <div className="flex flex-wrap gap-2">
            {t("chat.refs", { returnObjects: true }).map((ref) => (
              <Tag key={ref}>{ref}</Tag>
            ))}
          </div>
          <p className="text-body-s">
            <Rich text={t("chat.offer")} />
          </p>
        </div>
        <Card padding="tight" className="flex flex-col gap-2.5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <strong className="text-body-s">{t("chat.plan")}</strong>
            <Pill tone="warn">{t("chat.needsConfirmation")}</Pill>
          </div>
          <Console
            wrap
            framed={false}
            className="border-thin [&>pre]:text-code-s [&>pre]:leading-[18px]"
          >
            <Term tone="dim">{"app/jellyfin  spec.devices"}</Term>
            {"\n"}
            <Term tone="ok">+ - gpu: /dev/dri/renderD128</Term>
            {"\n"}
            <Term tone="dim">dry run: ok · restarts 1 app · ~20 s downtime</Term>
          </Console>
          <div className="flex flex-wrap items-center gap-2.5">
            <StaticButton variant="primary" size="sm">
              {t("chat.confirm")}
            </StaticButton>
            <StaticButton size="sm">{t("chat.cancel")}</StaticButton>
            <span className="ml-auto text-body-s text-ink-muted">{t("chat.logged")}</span>
          </div>
        </Card>
      </div>
    </Card>
  );
}

const doesIcons = ["tide", "current", "reef", "molt"] as const;

function Does() {
  const { t } = useTranslation("assistant");
  return (
    <Section wrapClassName="flex flex-col gap-10">
      <SectionIntro
        kicker={t("does.kicker")}
        heading={t("does.heading")}
        lead={t("does.lead")}
        // "troubleshooting" is wider than a 320px screen at heading size.
        className="max-w-[720px] hyphens-auto break-words"
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6">
        {t("does.items", { returnObjects: true }).map((item, i) => (
          <Card key={item.title} asChild className="flex flex-col gap-3">
            <article>
              <ProductIcon product={doesIcons[i] ?? "tide"} />
              <h3 className="text-heading-4">{item.title}</h3>
              <p className="text-body-s">{item.body}</p>
            </article>
          </Card>
        ))}
      </div>
      <Callout tint="yellow">
        <p className="text-body-s">
          <strong>{t("does.digest.title")}</strong> {t("does.digest.body")}
        </p>
      </Callout>
    </Section>
  );
}

function Models() {
  const { t } = useTranslation("assistant");
  const tones = ["ok", "ok", "warn"] as const;
  return (
    <Section tone="card" band wrapClassName="flex flex-wrap items-start gap-12">
      <SectionIntro
        kicker={t("models.kicker")}
        heading={t("models.heading")}
        lead={t("models.lead")}
        className="min-w-0 flex-[1_1_400px]"
      />
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-4">
        {t("models.items", { returnObjects: true }).map((item, i) => (
          <Card
            key={item.title}
            padding="tight"
            className="flex flex-wrap items-start justify-between gap-3"
          >
            <div className="flex min-w-0 flex-[1_1_300px] flex-col gap-1.5">
              <h3 className="text-heading-4">{item.title}</h3>
              <p className="text-body-s text-ink-muted">{item.body}</p>
            </div>
            <Pill tone={tones[i]}>{item.status}</Pill>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function Grounded() {
  const { t } = useTranslation("assistant");
  return (
    <Section wrapClassName="flex flex-wrap items-center gap-12">
      <SectionIntro
        kicker={t("grounded.kicker")}
        heading={t("grounded.heading")}
        lead={t("grounded.lead")}
        className="min-w-0 flex-[1_1_420px]"
      />
      {/* Illustration: an example answer with its sources, not live data. */}
      <Card className="flex min-w-0 flex-[1_1_480px] flex-col gap-3">
        <p className="text-body-s">
          <strong>{t("grounded.question")}</strong>
        </p>
        <p className="text-body-s">
          <Rich text={t("grounded.answer")} />
        </p>
        <hr className="m-0 border-0 border-t-2 border-line" />
        <p className="text-label">{t("grounded.sources")}</p>
        <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
          {t("grounded.links", { returnObjects: true }).map((source) => (
            // Drawn like links into the console; there is no console to open here.
            <li
              key={source}
              className="font-mono text-body-s break-all text-text-link underline underline-offset-3"
            >
              {source}
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

function Where() {
  const { t } = useTranslation("assistant");
  const card = "flex flex-col gap-3";
  return (
    <Section band className="bg-tint-blue" wrapClassName="flex flex-col gap-8">
      <div className="flex max-w-[720px] flex-col gap-3">
        <Kicker className="text-text-link">{t("where.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("where.heading")}</h2>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-6">
        <Card className={card}>
          <h3 className="text-heading-4">{t("where.console.title")}</h3>
          <p className="text-body-s">{t("where.console.body")}</p>
        </Card>
        <Card className={card}>
          <h3 className="text-heading-4">{t("where.cli.title")}</h3>
          <Cmd command={'crust ask "what changed today?"'} className="shadow-none" />
          <p className="text-body-s">{t("where.cli.body")}</p>
        </Card>
        <Card className={card}>
          <h3 className="text-heading-4">{t("where.tui.title")}</h3>
          <p className="text-body-s">
            <Rich text={t("where.tui.body")} />
          </p>
        </Card>
        <Card className={card}>
          <h3 className="text-heading-4">{t("where.mcp.title")}</h3>
          <p className="text-body-s">{t("where.mcp.body")}</p>
        </Card>
      </div>
    </Section>
  );
}

function Safety() {
  const { t } = useTranslation("assistant");
  return (
    <Section tone="ink" wrapClassName="flex flex-col gap-8">
      <div className="flex max-w-[760px] flex-col gap-3">
        <Kicker className="text-accent-yellow">{t("safety.kicker")}</Kicker>
        <h2 className="text-heading-1">{t("safety.heading")}</h2>
        <p className="text-body-l text-ink-muted">{t("safety.lead")}</p>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-6">
        {t("safety.items", { returnObjects: true }).map((item) => (
          <div key={item.title} className="rounded-md border-thick border-line p-6">
            <h3 className="mb-2 text-heading-4">{item.title}</h3>
            <p className="text-body-s text-ink-muted">{item.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Destructive() {
  const { t } = useTranslation("assistant");
  return (
    <Section wrapClassName="flex flex-wrap items-start gap-12">
      <SectionIntro
        kicker={t("destructive.kicker")}
        heading={t("destructive.heading")}
        lead={t("destructive.lead")}
        size="h2"
        className="min-w-0 flex-[1_1_380px]"
      />
      {/* Illustration: the typed confirmation dialog, drawn without real inputs. */}
      <Card raised className="flex min-w-0 flex-[1_1_520px] flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <strong>{t("destructive.plan")}</strong>
          <Pill tone="bad">{t("destructive.badge")}</Pill>
        </div>
        <p className="text-body-s">
          <Rich text={t("destructive.body")} />
        </p>
        <div className="flex flex-col gap-1.5">
          <p className="text-label">
            <Rich text={t("destructive.label")} />
          </p>
          <div className="flex min-h-11 items-center rounded-sm border-thin border-line bg-surface-card px-3 py-2.5 font-mono text-[14px] leading-5 shadow-sm">
            win11-o
          </div>
          <p className="text-[13px] leading-[18px] text-ink-muted">{t("destructive.help")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <StaticButton variant="danger" className="opacity-50">
            {t("destructive.delete")}
          </StaticButton>
          <StaticButton>{t("destructive.cancel")}</StaticButton>
        </div>
      </Card>
    </Section>
  );
}

function Faq() {
  const { t } = useTranslation("assistant");
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-6">
      <SectionIntro kicker={t("faq.kicker")} heading={t("faq.heading")} />
      <CardGrid items={t("faq.items", { returnObjects: true })} />
    </Section>
  );
}

function CallToAction() {
  const { t } = useTranslation("assistant");
  return (
    <CtaBand heading={t("cta.heading")}>
      <Button asChild>
        <a href={href("/community")}>{t("cta.discuss")}</a>
      </Button>
      <Button asChild>
        <a href={href("/roadmap")}>{t("cta.roadmap")}</a>
      </Button>
    </CtaBand>
  );
}

function AssistantPage() {
  addNamespace("assistant", assistant);
  const { t } = useTranslation("assistant");
  return (
    <>
      <PageHero
        size="l"
        kicker={t("hero.kicker")}
        heading={t("hero.heading")}
        lead={t("hero.lead")}
        tags={t("hero.tags", { returnObjects: true })}
        visual={<Chat />}
        actions={
          <>
            <Button asChild variant="primary">
              <a href={links.docs}>{t("hero.design")}</a>
            </Button>
            <Button asChild>
              <a href={href("/roadmap")}>{t("hero.roadmap")}</a>
            </Button>
          </>
        }
      />
      <Does />
      <Models />
      <Grounded />
      <Where />
      <Safety />
      <Destructive />
      <Faq />
      <CallToAction />
    </>
  );
}
