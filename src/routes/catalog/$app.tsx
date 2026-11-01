import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { AppTile, ExampleTag, IsolationPill, RelatedApp } from "@/components/catalog/app-bits";
import { InlineCode } from "@/components/inline-code";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { apps, type App } from "@/content";
import { addNamespace, i18n } from "@/i18n";
import catalog from "@/i18n/en/catalog.json";
import type { ProductId } from "@/lib/products";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";

export const Route = createFileRoute("/catalog/$app")({
  loader: ({ params }) => {
    const app = apps.find((a) => a.slug === params.app);
    if (!app) throw notFound();
    return app;
  },
  head: ({ loaderData: app }) =>
    app
      ? seo({
          title: i18n.t("meta.app.title", { name: app.name }),
          description: app.description,
          path: `/catalog/${app.slug}`,
        })
      : {},
  codeSplitGroupings: [["loader", "component"]],
  component: AppPage,
});

type Detail = NonNullable<App["detail"]>;

const screenshotTints = ["bg-tint-rust", "bg-tint-blue", "bg-tint-yellow"];
const avatarTints = ["bg-accent-yellow text-on-fill-dark", "bg-tint-blue text-ink"];

function Header({ app }: { app: App }) {
  const { t } = useTranslation("catalog");
  const { t: common } = useTranslation();
  const { detail } = app;
  return (
    <Section dots band padded={false} wrapClassName="flex flex-col gap-5 py-12">
      <nav aria-label={t("app.breadcrumb")} className="text-body-s">
        <Link to="/catalog/">{t("app.catalog")}</Link>{" "}
        <span className="text-ink-muted">/ {app.category} /</span> {app.name}
      </nav>
      <div className="flex flex-wrap items-start gap-10">
        <div className="flex min-w-0 flex-[2_1_560px] flex-col gap-[18px]">
          <div className="flex items-center gap-[18px]">
            <AppTile name={app.name} tile={app.tile} size="xl" />
            <div className="flex min-w-0 flex-col gap-1.5">
              <h1 className="text-display-l [overflow-wrap:anywhere] max-sm:text-heading-1">
                {app.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <IsolationPill isolation={app.isolation} />
                {app.example && <ExampleTag />}
                {app.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
                {detail?.verified && <Pill tone="ok">{t("app.verified")}</Pill>}
              </div>
            </div>
          </div>
          <p className="max-w-[640px] text-body-l">{detail?.about ?? app.description}</p>
          <Cmd
            command={`crust tide app create ${app.slug} --from-catalog`}
            className="max-w-[640px]"
          />
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <a href={href("/download")}>{common("nav.getCrustates")}</a>
            </Button>
            {detail?.website && (
              <Button asChild variant="ghost">
                <a href={detail.website.url}>{detail.website.label} ↗</a>
              </Button>
            )}
          </div>
        </div>
        <Glance app={app} />
      </div>
    </Section>
  );
}

function Glance({ app }: { app: App }) {
  const { t } = useTranslation("catalog");
  const { detail } = app;
  const isolation = t(`isolationLong.${app.isolation}`);
  const rows: [string, ReactNode][] = detail
    ? [
        [
          t("app.version"),
          <>
            <span className="font-mono">{detail.version}</span> ·{" "}
            {t("app.template", { n: detail.template })}
          </>,
        ],
        [t("app.isolation"), `${isolation} (${detail.isolationNote})`],
        [t("app.resources"), app.resources],
        [t("app.architectures"), detail.architectures.join(", ")],
        [t("app.licence"), detail.licence],
        [t("app.installs"), detail.installs && t("app.installsValue", { n: detail.installs })],
      ]
    : [
        [t("app.category"), app.category],
        [t("app.isolation"), isolation],
        [t("app.resources"), app.resources],
        [t("app.needs"), app.needs.map((n) => t(`needs.${n}`)).join(", ")],
      ];
  return (
    <Card asChild className="flex min-w-0 flex-[1_1_380px] flex-col gap-3">
      <aside>
        <p className="text-label">{t("app.glance")}</p>
        <Table frame="none">
          <tbody>
            {rows
              .filter(([, value]) => value)
              .map(([label, value]) => (
                <Tr key={label}>
                  <Td rowHeader className="font-normal text-ink-muted">
                    {label}
                  </Td>
                  <Td className="whitespace-normal">{value}</Td>
                </Tr>
              ))}
          </tbody>
        </Table>
      </aside>
    </Card>
  );
}

function FactCard({
  icon,
  heading,
  children,
}: {
  icon: ProductId;
  heading: string;
  children: ReactNode;
}) {
  return (
    <Card asChild className="flex flex-col gap-3">
      <section>
        <div className="flex items-center gap-3">
          <ProductIcon product={icon} size={32} />
          <h2 className="text-heading-3">{heading}</h2>
        </div>
        {children}
      </section>
    </Card>
  );
}

function DetailSections({ detail }: { detail: Detail }) {
  const { t } = useTranslation("catalog");
  return (
    <>
      {detail.screenshots.length > 0 && (
        <ul aria-label={t("app.screenshots")} className="grid gap-6 md:grid-cols-3">
          {detail.screenshots.map((caption, i) => (
            <li key={caption}>
              <Card padding="none" className="overflow-hidden">
                <div
                  className={`flex h-40 items-center justify-center border-b-3 border-line p-3 text-center ${screenshotTints[i % screenshotTints.length]}`}
                >
                  <span className="font-mono text-body-s">{t("app.screenshot", { caption })}</span>
                </div>
                <p className="px-3.5 py-2.5 text-body-s">{caption}</p>
              </Card>
            </li>
          ))}
        </ul>
      )}

      <div className="grid gap-6 md:grid-cols-3">
        {detail.database && (
          <FactCard icon="reef" heading={t("app.database")}>
            <p className="text-body-s">
              <InlineCode text={detail.database} />
            </p>
          </FactCard>
        )}
        {detail.volumes.length > 0 && (
          <FactCard icon="reef" heading={t("app.volumes")}>
            <Table frame="none">
              <tbody>
                {detail.volumes.map((volume) => (
                  <Tr key={volume.path}>
                    <Td rowHeader className="font-mono font-normal">
                      {volume.path}
                    </Td>
                    <Td className="whitespace-normal">{volume.description}</Td>
                  </Tr>
                ))}
              </tbody>
            </Table>
          </FactCard>
        )}
        {detail.network && (
          <FactCard icon="current" heading={t("app.network")}>
            <p className="text-body-s [overflow-wrap:anywhere]">
              <InlineCode text={detail.network} />
            </p>
          </FactCard>
        )}
      </div>

      <div className="flex flex-wrap items-start gap-6">
        {detail.versions.length > 0 && (
          <Card asChild className="flex min-w-0 flex-[2_1_560px] flex-col gap-3">
            <section>
              <h2 className="text-heading-3">{t("app.versions")}</h2>
              <Table>
                <thead>
                  <tr>
                    <Th>{t("app.columns.version")}</Th>
                    <Th>{t("app.columns.template")}</Th>
                    <Th>{t("app.columns.released")}</Th>
                    <Th>{t("app.columns.notes")}</Th>
                  </tr>
                </thead>
                <tbody>
                  {detail.versions.map((v) => (
                    <Tr key={v.template}>
                      <Td className="font-mono">{v.version}</Td>
                      <Td className="font-mono">{v.template}</Td>
                      <Td>{v.released}</Td>
                      <Td>
                        {v.current && <Pill tone="ok">{t("app.current")}</Pill>} {v.notes}
                      </Td>
                    </Tr>
                  ))}
                </tbody>
              </Table>
              <p className="text-caption text-ink-muted">{t("app.versionsNote")}</p>
            </section>
          </Card>
        )}
        {detail.maintainers.length > 0 && (
          <Card asChild className="flex min-w-0 flex-[1_1_300px] flex-col gap-3">
            <section>
              <h2 className="text-heading-3">{t("app.maintainers")}</h2>
              {detail.maintainers.map((m, i) => (
                <div key={m.name} className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className={`inline-flex size-9 flex-none items-center justify-center rounded-full border-thin border-line text-[14px] font-bold ${avatarTints[i % avatarTints.length]}`}
                  >
                    {/* First letter, skipping the brackets of "[MAINTAINER]". */}
                    {/\p{L}/u.exec(m.name)?.[0]}
                  </span>
                  <div className="flex flex-col">
                    <strong>{m.name}</strong>
                    <span className="text-caption text-ink-muted">{m.role}</span>
                  </div>
                </div>
              ))}
              <Button asChild size="sm" className="self-start">
                <a href={href("/community")}>{t("app.report")}</a>
              </Button>
            </section>
          </Card>
        )}
      </div>
    </>
  );
}

type RelatedEntry = { name: string; slug?: string; tile: App["tile"]; meta: string };

function Related({ related }: { related: RelatedEntry[] }) {
  const { t } = useTranslation("catalog");
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-heading-2">{t("app.related")}</h2>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(220px,100%),1fr))] gap-5">
        {related.map((r) => (
          <li key={r.name} className="flex [&>*]:w-full">
            <RelatedApp {...r} />
          </li>
        ))}
      </ul>
    </section>
  );
}

function AppPage() {
  addNamespace("catalog", catalog);
  const { t } = useTranslation("catalog");
  const app = Route.useLoaderData();
  // The template's own list, or else the other apps in the same category.
  const related: RelatedEntry[] = app.detail
    ? app.detail.related.map((r) => ({
        name: r.name,
        slug: r.slug,
        tile: apps.find((a) => a.slug === r.slug)?.tile ?? r.tile ?? "card",
        meta: `${r.category} · ${r.isolation}`,
      }))
    : apps
        .filter((a) => a.category === app.category && a.slug !== app.slug)
        .map((a) => ({
          name: a.name,
          slug: a.slug,
          tile: a.tile,
          meta: `${a.category} · ${t(`isolation.${a.isolation}`)}`,
        }));
  return (
    <>
      <Header app={app} />
      {(app.detail || related.length > 0) && (
        <Section wrapClassName="flex flex-col gap-8">
          {app.detail && <DetailSections detail={app.detail} />}
          {related.length > 0 && <Related related={related} />}
        </Section>
      )}
    </>
  );
}
