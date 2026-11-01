import { Link, createFileRoute } from "@tanstack/react-router";
import { Fragment } from "react";
import { Rich } from "@/components/rich";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Table, Td, Th } from "@/components/ui/table";
import { i18n, usePageCopy } from "@/i18n";
import hardware from "@/i18n/en/hardware.json";
import type { ProductId, ProductKey } from "@/lib/products";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/hardware")({
  head: () =>
    seo({
      title: i18n.t("meta.hardware.title"),
      description: i18n.t("meta.hardware.description"),
      path: "/hardware",
    }),
  component: HardwarePage,
});

/** Support levels are Pill tones (src/i18n/hardware.test.ts checks the JSON). */
type Tone = keyof typeof hardware.support.labels;

/** The support tables, in page order, with each band's tint and kicker colour. */
const supportTables: {
  key: "nics" | "storage" | "gpus" | "devices" | "arm";
  product?: ProductKey;
  className?: string;
}[] = [
  { key: "nics", product: "current", className: "border-y-3 border-line bg-tint-teal" },
  { key: "storage", product: "reef", className: "border-y-3 border-line bg-tint-rust" },
  { key: "gpus", product: "tide", className: "border-y-3 border-line bg-tint-blue" },
  { key: "devices" },
  { key: "arm", className: "border-y-3 border-line bg-surface-card" },
];

/** Illustration: the installer's hardware check on an example box, not live data. */
const check = [
  ["ok", "✓", "CPU", "AMD Ryzen 7 5700G", "(8C/16T, AMD-V)"],
  ["ok", "✓", "IOMMU", "enabled", "(14 groups)"],
  ["ok", "✓", "Memory", "64 GiB", "ECC"],
  ["ok", "✓", "Secure Boot", "enabled · TPM 2.0 present", ""],
  ["ok", "✓", "Boot disk", "nvme0n1", "500 GB · SMART ok"],
  ["ok", "✓", "Data disks", "sda, sdb", "8 TB · mirror possible"],
  ["warn", "!", "NIC", "enp3s0", "Realtek 2.5 GbE · works, Intel preferred"],
  ["info", "i", "GPU", "iGPU can be shared with apps", ""],
] as const;

const grid = "grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6";

function HardwarePage() {
  const copy = usePageCopy("hardware", hardware);
  const { labels } = copy.support;
  return (
    <>
      <PageHero
        size="l"
        kicker={copy.hero.kicker}
        heading={copy.hero.heading}
        lead={copy.hero.lead}
      />

      <Section wrapClassName="flex flex-col gap-7">
        <SectionIntro kicker={copy.specs.kicker} heading={copy.specs.heading} />
        <Table frame="card">
          <thead>
            <tr>
              {copy.specs.columns.map((c) => (
                <Th key={c}>{c}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {copy.specs.rows.map(([part, ...cells]) => (
              <tr key={part}>
                <Td rowHeader>{part}</Td>
                {cells.map((cell, i) => (
                  <Td key={i}>{cell}</Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Section>

      <Section tone="card" band wrapClassName="flex flex-col gap-7">
        <SectionIntro kicker={copy.parts.kicker} heading={copy.parts.heading} />
        <div className={grid}>
          {copy.parts.items.map((item) => (
            <Card key={item.title} className="flex flex-col gap-3">
              <ProductIcon product={item.icon as ProductId} size={40} />
              <h3 className="text-heading-4">{item.title}</h3>
              {item.paragraphs.map((p) => (
                <p key={p.text} className="text-body-s">
                  {p.lead && <strong>{p.lead} </strong>}
                  {p.text}
                </p>
              ))}
            </Card>
          ))}
        </div>
        <Callout tint="yellow">
          <strong className="shrink-0">{copy.parts.pi.title}</strong>
          <span className="text-body-s">
            <Rich text={copy.parts.pi.body} />
          </span>
        </Callout>
      </Section>

      <Section wrapClassName="flex flex-col gap-7">
        <SectionIntro
          kicker={copy.builds.kicker}
          heading={copy.builds.heading}
          lead={copy.builds.lead}
        />
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(210px,100%),1fr))] gap-5">
          {copy.builds.items.map((item) => (
            <Card key={item.title} className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-heading-4">{item.title}</h3>
                <Pill tone={item.tone as Tone}>{item.badge}</Pill>
              </div>
              <p className="font-mono text-body-s">{item.spec}</p>
              <p className="text-body-s">{item.body}</p>
              <p className="mt-auto text-label">{item.price}</p>
            </Card>
          ))}
        </div>
      </Section>

      <Section tone="card" band wrapClassName="flex flex-wrap items-center gap-12">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <Kicker>{copy.installer.kicker}</Kicker>
          <h2 className="text-heading-1">{copy.installer.heading}</h2>
          <p className="text-body-l text-ink-muted">{copy.installer.lead}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <Link to="/download/">{copy.installer.download}</Link>
            </Button>
            <Button asChild>
              <Link to="/faq/">{copy.installer.faq}</Link>
            </Button>
          </div>
        </div>
        <Console className="flex-[1_1_480px]">
          <Term tone="dim">crustates hardware check</Term>
          {"\n"}
          {check.map(([tone, mark, label, value, note], i) => (
            <Fragment key={label}>
              <Term tone={tone}>{mark}</Term> {label.padEnd(11)} {value}
              {note && (
                <>
                  {" "}
                  <Term tone="dim">{note}</Term>
                </>
              )}
              {i < check.length - 1 && "\n"}
            </Fragment>
          ))}
        </Console>
      </Section>

      <Section wrapClassName="flex flex-col gap-8">
        <SectionIntro
          kicker={copy.support.kicker}
          heading={copy.support.heading}
          lead={copy.support.lead}
        />
        <div className="flex flex-wrap items-center gap-3">
          {(Object.keys(labels) as Tone[]).map((tone) => (
            <Fragment key={tone}>
              <Pill tone={tone}>{labels[tone]}</Pill>
              <span className="text-body-s text-ink-muted">{copy.support.legend[tone]}</span>
            </Fragment>
          ))}
        </div>
      </Section>

      {supportTables.map(({ key, product, className }) => {
        const table = copy[key];
        return (
          <Section key={key} className={className} wrapClassName="flex flex-col gap-8">
            <SectionIntro
              kicker={table.kicker}
              heading={table.heading}
              lead={table.lead}
              product={product}
              onTint={Boolean(product)}
            />
            <Table>
              <thead>
                <tr>
                  <Th>{copy.support.columns.hardware}</Th>
                  <Th>{copy.support.columns.notes}</Th>
                  <Th>{copy.support.columns.support}</Th>
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.hardware}>
                    <Td rowHeader>{row.hardware}</Td>
                    <Td>{row.notes}</Td>
                    <Td>
                      <Pill tone={row.support as Tone}>{labels[row.support as Tone]}</Pill>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {"footnote" in table && <p className="text-body-s text-ink-muted">{table.footnote}</p>}
          </Section>
        );
      })}

      <Section wrapClassName="grid items-stretch gap-6 md:grid-cols-2">
        <Card raised asChild className="flex flex-col gap-3.5">
          <article>
            <ProductIcon product="molt" />
            <Kicker>{copy.secureBoot.kicker}</Kicker>
            <h3 className="text-heading-2">{copy.secureBoot.heading}</h3>
            <p>{copy.secureBoot.body}</p>
            <ul className="m-0 list-disc pl-5 text-body-s">
              {copy.secureBoot.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </Card>
        <Card raised asChild className="flex flex-col gap-3.5">
          <article>
            <Kicker>{copy.hcl.kicker}</Kicker>
            <h3 className="text-heading-2">{copy.hcl.heading}</h3>
            <p>{copy.hcl.body}</p>
            <Cmd command={copy.hcl.command} />
            {/* The design's "Browse the list" button has no URL yet: its text and placeholder stay. */}
            <p className="text-body-s text-ink-muted">{copy.hcl.browse}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/faq/">{copy.hcl.faq}</Link>
              </Button>
            </div>
          </article>
        </Card>
      </Section>
    </>
  );
}
