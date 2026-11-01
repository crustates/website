import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { roadmap } from "@/content";
import { addNamespace, i18n } from "@/i18n";
import copy from "@/i18n/en/roadmap.json";
import { links } from "@/lib/links";
import type { ProductId } from "@/lib/products";
import { seo } from "@/lib/seo";
import { asset, href } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/roadmap")({
  head: () =>
    seo({
      title: i18n.t("meta.roadmap.title"),
      description: i18n.t("meta.roadmap.description"),
      path: "/roadmap",
    }),
  component: RoadmapPage,
});

type Milestone = (typeof roadmap.milestones)[number];
type Status = Milestone["status"];

/** Pill tone per status, in legend order. */
const statusTone = {
  "in-progress": "warn",
  planned: "off",
  shipped: "ok",
} as const satisfies Record<Status, string>;

/** Icon per milestone, as in the design; others get the Crustates mark. */
const icons: Partial<Record<string, ProductId>> = {
  M0: "molt",
  M1: "tide",
  M2: "tide",
  M3: "reef",
  M5: "current",
  M6: "cast",
};

function StatusPill({ status }: { status: Status }) {
  const { t } = useTranslation("roadmap");
  return <Pill tone={statusTone[status]}>{t(`status.${status}`)}</Pill>;
}

function MilestoneIcon({ id }: { id: string }) {
  const product = icons[id];
  if (product) return <ProductIcon product={product} size={36} className="shrink-0" />;
  return (
    <>
      <img
        src={asset("/brand/mark-light.svg")}
        alt=""
        width={36}
        height={36}
        className="shrink-0 dark:hidden"
      />
      <img
        src={asset("/brand/mark-dark.svg")}
        alt=""
        width={36}
        height={36}
        className="hidden shrink-0 dark:block"
      />
    </>
  );
}

function Milestones() {
  const { t } = useTranslation("roadmap");
  return (
    <Section wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={t("milestones.kicker")} heading={t("milestones.heading")} />
      <ol className="m-0 list-none p-0">
        {roadmap.milestones.map((m) => (
          <li key={m.id} className="flex items-stretch gap-6 max-sm:gap-3">
            <div className="flex shrink-0 basis-24 flex-col items-center gap-2 max-sm:basis-14">
              <Tag className="px-3 py-1.5 text-[18px]">{m.id}</Tag>
              <div className="w-[3px] flex-1 bg-line" />
            </div>
            <Card
              className={cn(
                "mb-5 flex min-w-0 flex-1 items-start gap-5 max-sm:flex-col max-sm:gap-3",
                m.status === "in-progress" &&
                  "border-brand-rust shadow-[6px_6px_0_0_var(--color-brand-rust)]",
              )}
            >
              <MilestoneIcon id={m.id} />
              <div className="flex min-w-0 flex-1 flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-heading-3">{m.title}</h3>
                  <StatusPill status={m.status} />
                </div>
                <ul className="m-0 list-disc pl-5 text-body-s md:columns-2 md:gap-x-8">
                  {m.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function Later() {
  const { t } = useTranslation("roadmap");
  return (
    <Section tone="card" band wrapClassName="flex flex-col gap-7">
      <SectionIntro
        kicker={t("later.kicker")}
        heading={t("later.heading")}
        lead={t("later.lead")}
      />
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-6 p-0">
        {roadmap.later.map((item) => (
          <Card key={item} asChild padding="tight" className="flex flex-col gap-3">
            <li>
              <Tag className="self-start">{t("later.tag")}</Tag>
              <p className="text-body-s">
                <strong>{item}</strong>
              </p>
            </li>
          </Card>
        ))}
      </ul>
    </Section>
  );
}

function HaveASay() {
  const { t } = useTranslation("roadmap");
  const cards = [
    { key: "vote", to: `${links.github}/discussions` },
    { key: "rfc", to: links.github },
    { key: "issue", to: href("/community") },
  ] as const;
  return (
    <Section wrapClassName="flex flex-col gap-7">
      <SectionIntro kicker={t("say.kicker")} heading={t("say.heading")} />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
        {cards.map(({ key, to }) => (
          <Card key={key} className="flex flex-col gap-3">
            <h3 className="text-heading-4">{t(`say.${key}.title`)}</h3>
            <p className="text-body-s">
              <Rich text={t(`say.${key}.body`)} />
            </p>
            <Button asChild size="sm" className="self-start">
              <a href={to}>{t(`say.${key}.action`)}</a>
            </Button>
          </Card>
        ))}
      </div>
    </Section>
  );
}

function RoadmapPage() {
  addNamespace("roadmap", copy);
  const { t } = useTranslation("roadmap");
  return (
    <>
      <PageHero
        size="l"
        kicker={t("hero.kicker")}
        heading={t("hero.heading")}
        lead={t("hero.lead")}
      >
        <div className="flex flex-wrap gap-3">
          {(Object.keys(statusTone) as Status[]).map((status) => (
            <StatusPill key={status} status={status} />
          ))}
        </div>
      </PageHero>
      <Milestones />
      <Later />
      <HaveASay />
    </>
  );
}
