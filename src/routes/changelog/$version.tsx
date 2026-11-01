import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ChangeList } from "@/components/changelog/change-list";
import { InlineCode } from "@/components/inline-code";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { releases, type Release } from "@/content";
import { addNamespace, i18n } from "@/i18n";
import changelog from "@/i18n/en/changelog.json";
import { links } from "@/lib/links";
import { products, type ProductKey } from "@/lib/products";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/changelog/$version")({
  loader: ({ params }) => {
    const release = releases.find((r) => r.version === params.version);
    if (!release) throw notFound();
    return release;
  },
  head: ({ loaderData: release }) =>
    release
      ? seo({
          title: i18n.t("meta.release.title", { version: release.version }),
          description: release.description,
          path: `/changelog/${release.version}`,
        })
      : {},
  codeSplitGroupings: [["loader", "component"]],
  component: ReleasePage,
});

// shortcut: assumes release tags are named v<version>; change here if the tags differ.
const tagUrl = (version: string) => `${links.github}/releases/tag/v${version}`;
const compareUrl = (from: string, to: string) => `${links.github}/compare/v${from}...v${to}`;

function Hero({ release, previous }: { release: Release; previous?: Release }) {
  const { t } = useTranslation("changelog");
  const { t: tc } = useTranslation();
  const latest = releases.find((r) => r.channel === "stable");
  return (
    <Section dots band padded={false}>
      <div className="flex flex-col gap-[18px] pt-14 pb-12 max-md:pt-12">
        <nav aria-label={t("release.breadcrumb")}>
          <p className="text-body-s">
            <Link to="/changelog/">{t("release.changelog")}</Link>{" "}
            <span className="text-ink-muted">/</span> {release.version}
          </p>
        </nav>
        <div className="flex flex-wrap items-center gap-3.5">
          <h1 className="text-display-l max-sm:text-heading-1">
            {tc("meta.release.title", { version: release.version })}
          </h1>
          {release.version === latest?.version && <Pill tone="ok">{t("latest")}</Pill>}
          {release.channel === "beta" && <Pill tone="info">{t("beta")}</Pill>}
          {release.security && <Pill tone="bad">{t("security")}</Pill>}
        </div>
        <p className="max-w-[720px] text-body-l text-ink-muted">
          {release.description} {t("release.released", { date: release.date })}
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <a href={href("/download")}>{t("release.download", { version: release.version })}</a>
          </Button>
          <Button asChild>
            <a href={tagUrl(release.version)}>{t("release.signature")}</a>
          </Button>
          {previous && (
            <Button asChild variant="ghost">
              <a href={compareUrl(previous.version, release.version)}>
                {t("release.compare", { previous: previous.version })}
              </a>
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}

/** The Markdown body ("How to upgrade", "Upgrade notes"), compiled at build time from our own content. */
function UpgradeNotes({ html }: { html: string }) {
  const { t } = useTranslation("changelog");
  return (
    <Callout tint="yellow" role="note" className="flex-wrap">
      <ProductIcon product="molt" size={32} />
      <div
        className="min-w-0 flex-[1_1_240px] text-body-s [&_h2]:text-label [&_h2:not(:first-child)]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&>*+*]:mt-1"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Button asChild size="sm">
        <Link to="/molt/">{t("release.molt")}</Link>
      </Button>
    </Callout>
  );
}

const severityTones = { critical: "bad", high: "warn", medium: "off", low: "off" } as const;

function Vulnerabilities({ items }: { items: Release["vulnerabilities"] }) {
  const { t } = useTranslation("changelog");
  const columns = ["component", "advisory", "severity", "affected"] as const;
  return (
    <Card asChild>
      <section className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <Pill tone="bad">{t("security")}</Pill>
          <h2 className="text-heading-3">{t("release.vulnerabilities.heading")}</h2>
        </div>
        <Table>
          <thead>
            <tr>
              {columns.map((column) => (
                <Th key={column}>{t(`release.vulnerabilities.columns.${column}`)}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <Tr key={i}>
                <Td>{item.component}</Td>
                <Td className="font-mono">{item.advisory}</Td>
                <Td>
                  <Pill tone={severityTones[item.severity]}>
                    {t(`release.vulnerabilities.severity.${item.severity}`)}
                  </Pill>
                </Td>
                <Td>{item.affected}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        <p className="text-caption text-ink-muted">
          {t("release.vulnerabilities.details")}{" "}
          <a href={href("/security")}>{t("release.vulnerabilities.advisories")}</a>.
        </p>
      </section>
    </Card>
  );
}

function Areas({ areas }: { areas: Release["areas"] }) {
  const { t } = useTranslation("changelog");
  const { t: tc } = useTranslation();
  // Product order, not the order the file lists them in.
  const keys = (Object.keys(products) as ProductKey[]).filter((key) => areas[key]?.length);
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-heading-2">{t("release.areas")}</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {keys.map((key) => (
          <Card key={key} asChild>
            <section className="flex flex-col gap-2.5">
              <div className="flex items-center gap-3">
                {key !== "assistant" && <ProductIcon product={key} size={36} />}
                <h3 className={cn("text-heading-3", products[key].text)}>
                  {tc(`products.${key}`)}
                </h3>
              </div>
              <ul className="list-disc pl-5 text-body-s">
                {areas[key]?.map((line) => (
                  <li key={line}>
                    <InlineCode text={line} />
                  </li>
                ))}
              </ul>
            </section>
          </Card>
        ))}
      </div>
    </div>
  );
}

function Checksums({ items }: { items: Release["checksums"] }) {
  const { t } = useTranslation("changelog");
  const columns = ["file", "size", "sha256"] as const;
  const first = items[0]?.file;
  return (
    <Card asChild>
      <section className="flex min-w-0 flex-[2_1_640px] flex-col gap-3">
        <h2 className="text-heading-3">{t("release.checksums.heading")}</h2>
        <Table>
          <thead>
            <tr>
              {columns.map((column) => (
                <Th key={column}>{t(`release.checksums.columns.${column}`)}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <Tr key={item.file}>
                <Td className="font-mono">{item.file}</Td>
                <Td>{item.size}</Td>
                <Td className="font-mono text-body-s">sha256:{item.sha256}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        {first && <Cmd command={`cosign verify-blob --bundle ${first}.sigstore.json ${first}`} />}
      </section>
    </Card>
  );
}

function ImageCard({ image }: { image: string }) {
  const { t } = useTranslation("changelog");
  return (
    <Card asChild>
      <section className="flex min-w-0 flex-[1_1_300px] flex-col gap-2.5">
        <h2 className="text-heading-3">{t("release.image.heading")}</h2>
        <p className="font-mono text-body-s [overflow-wrap:anywhere]">{image}</p>
        <p className="text-body-s">{t("release.image.signed")}</p>
      </section>
    </Card>
  );
}

function ReleasePage() {
  addNamespace("changelog", changelog);
  const { t } = useTranslation("changelog");
  const release = Route.useLoaderData();
  const previous = releases[releases.findIndex((r) => r.version === release.version) + 1];
  const hasAreas = Object.values(release.areas).some((lines) => lines?.length);
  return (
    <>
      <Hero release={release} previous={previous} />
      <Section wrapClassName="flex flex-col gap-8">
        {release.html && <UpgradeNotes html={release.html} />}
        {release.vulnerabilities.length > 0 && <Vulnerabilities items={release.vulnerabilities} />}
        {hasAreas ? (
          <Areas areas={release.areas} />
        ) : (
          // Without per-area notes, the changelog entry's changes stand in.
          <div className="flex flex-col gap-4">
            <h2 className="text-heading-2">{t("release.changes")}</h2>
            <ChangeList changes={release.changes} />
          </div>
        )}
        {(release.checksums.length > 0 || release.image) && (
          <div className="flex flex-wrap items-start gap-6">
            {release.checksums.length > 0 && <Checksums items={release.checksums} />}
            {release.image && <ImageCard image={release.image} />}
          </div>
        )}
      </Section>
    </>
  );
}
