import { Link, createFileRoute } from "@tanstack/react-router";
import { Rich } from "@/components/rich";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Pill } from "@/components/ui/pill";
import { Section } from "@/components/ui/section";
import { Table, Td, Th } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { i18n, usePageCopy } from "@/i18n";
import compare from "@/i18n/en/compare.json";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";

export const Route = createFileRoute("/compare")({
  head: () =>
    seo({
      title: i18n.t("meta.compare.title"),
      description: i18n.t("meta.compare.description"),
      path: "/compare",
    }),
  component: ComparePage,
});

/** Matrix columns, in order; keys of each row in compare.json. */
const columns = ["crustates", "proxmox", "truenas", "unraid", "xcpng", "panels"] as const;
const tones = { yes: "ok", partial: "warn", no: "off", planned: "info" } as const;
/** Row values in compare.json; src/i18n/compare.test.ts checks each has a label. */
type Status = keyof typeof tones;
const statuses = Object.keys(tones) as Status[];

const grid = "grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6";

function ComparePage() {
  const copy = usePageCopy("compare", compare);
  const status = (s: string) => <Pill tone={tones[s as Status]}>{copy.status[s as Status]}</Pill>;
  return (
    <>
      <PageHero
        size="l"
        kicker={copy.hero.kicker}
        heading={copy.hero.heading}
        lead={<Rich text={copy.hero.lead} />}
      >
        <div className="flex flex-wrap items-center gap-3">
          {statuses.map((s) => (
            <Pill key={s} tone={tones[s]}>
              {copy.status[s]}
            </Pill>
          ))}
          <span className="text-body-s text-ink-muted">{copy.hero.legendNote}</span>
        </div>
      </PageHero>

      <Section wrapClassName="flex flex-col gap-7">
        <SectionIntro
          kicker={copy.matrix.kicker}
          heading={copy.matrix.heading}
          lead={copy.matrix.lead}
        />
        <Table frame="card">
          <thead>
            <tr>
              <Th>{copy.matrix.columns.feature}</Th>
              {columns.map((c) => (
                <Th key={c}>{copy.matrix.columns[c]}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copy.matrix.rows.map((row) => (
              <tr key={row.feature}>
                <Td rowHeader>{row.feature}</Td>
                {columns.map((c) => (
                  <Td key={c}>
                    {status(row[c])}
                    {c === "crustates" && row.milestone && (
                      <span className="text-ink-muted"> {row.milestone}</span>
                    )}
                  </Td>
                ))}
              </tr>
            ))}
            <tr>
              <Td rowHeader>{copy.matrix.licence.feature}</Td>
              {columns.map((c) => (
                <Td key={c} className="font-mono">
                  {copy.matrix.licence[c]}
                </Td>
              ))}
            </tr>
          </tbody>
        </Table>
        <p className="text-body-s text-ink-muted">{copy.matrix.footnote}</p>
      </Section>

      <Section tone="card" band wrapClassName="flex flex-col gap-7">
        <SectionIntro kicker={copy.else.kicker} heading={copy.else.heading} lead={copy.else.lead} />
        <div className={grid}>
          {copy.else.items.map((item) => (
            <Card key={item.title} className="flex flex-col gap-3">
              <h3 className="text-heading-4">{item.title}</h3>
              <p className="text-body-s">{item.body}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section wrapClassName="flex flex-col gap-7">
        <SectionIntro kicker={copy.migrate.kicker} heading={copy.migrate.heading} />
        <div className={grid}>
          {copy.migrate.items.map((item) => (
            <Card key={item.title} className="flex flex-col gap-3">
              <Tag className="self-start">{item.from}</Tag>
              <h3 className="text-heading-4">{item.title}</h3>
              <p className="text-body-s">{item.body}</p>
              <Cmd command={item.command} />
            </Card>
          ))}
        </div>
        <Callout tint="yellow">
          <strong>{copy.migrate.note.title}</strong>
          <span className="text-body-s">{copy.migrate.note.body}</span>
        </Callout>
      </Section>

      <CtaBand heading={copy.cta.heading}>
        <Button asChild>
          <a href={href("/download")}>{copy.cta.download}</a>
        </Button>
        <Button asChild>
          <Link to="/roadmap/">{copy.cta.roadmap}</Link>
        </Button>
      </CtaBand>
    </>
  );
}
