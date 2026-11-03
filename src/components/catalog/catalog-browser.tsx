import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { useSlashFocus } from "@/hooks/use-slash-focus";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { apps, type App } from "@/content";
import { links } from "@/lib/links";
import { cn } from "@/lib/utils";
import { AppTile, ExampleTag, IsolationPill } from "./app-bits";
import { categoryCounts, filterApps, type Filters } from "./filter";

const isolations = ["microvm", "vm", "shared", "database"] as const;
const sources = ["curated", "community"] as const;
// Offer only the choices the catalog has, so no checkbox filters nothing.
const presentIsolations = isolations.filter((i) => apps.some((a) => a.isolation === i));
const presentSources = sources.filter((s) => apps.some((a) => a.source === s));
const anyGpu = apps.some((a) => a.needs.includes("gpu"));
const categories = categoryCounts(apps);

const allFilters: Filters = {
  query: "",
  category: null,
  isolation: presentIsolations,
  source: presentSources,
  gpu: false,
};

function toggle<T>(list: readonly T[], value: T, on: boolean): T[] {
  return on ? [...list, value] : list.filter((v) => v !== value);
}

/**
 * Hero and app list. Search and filters are prerendered but hidden until the
 * head script marks JS as on, so nothing moves when they appear. Without
 * JavaScript the page lists every app and shows no controls.
 */
export function CatalogBrowser() {
  const { t } = useTranslation("catalog");
  const [filters, setFilters] = useState(allFilters);
  const search = useRef<HTMLInputElement>(null);

  useSlashFocus(search);

  const set = (patch: Partial<Filters>) => setFilters((f) => ({ ...f, ...patch }));
  const shown = filterApps(apps, filters);

  return (
    <>
      <Section dots band padded={false} wrapClassName="flex flex-col gap-5 py-14 max-md:py-12">
        <Kicker>{t("hero.kicker")}</Kicker>
        {/* TODO(placeholder): design said "148 apps, one command each." */}
        <h1 className="max-w-[900px] text-display-l max-sm:text-heading-1">{t("hero.heading")}</h1>
        <p className="max-w-[720px] text-body-l">
          <Rich text={t("hero.lead")} />
        </p>
        {apps.length > 0 && (
          <label className="hidden min-h-[52px] max-w-[640px] items-center gap-2 rounded-sm border-thin border-line bg-surface-card px-3 py-1.5 text-ink-muted has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-focus-ring js:flex">
            <Search aria-hidden className="size-5 shrink-0" />
            {/* TODO(placeholder): design said "Search 148 apps, e.g. photos, dns, git" */}
            <input
              ref={search}
              type="search"
              aria-label={t("hero.search")}
              aria-keyshortcuts="/"
              placeholder={t("hero.searchPlaceholder")}
              value={filters.query}
              onChange={(e) => set({ query: e.target.value })}
              className="min-w-0 flex-1 bg-transparent text-body text-ink outline-none placeholder:text-ink-muted"
            />
            <kbd className="rounded-sm border-thin border-line bg-surface-sunken px-1.5 py-0.5 text-[11px] leading-[14px] font-bold text-ink">
              /
            </kbd>
          </label>
        )}
      </Section>

      <Section
        padded={false}
        className="pt-10 pb-16 max-md:pb-12"
        wrapClassName="flex max-w-[1376px] flex-wrap items-start gap-8"
      >
        {apps.length === 0 ? (
          <p className="text-body-l">
            {t("list.empty")} <a href={links.github}>{t("list.github")}</a>
          </p>
        ) : (
          <>
            <FilterPanel filters={filters} set={set} />
            <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-5">
              <h2 className="sr-only">{t("list.label")}</h2>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p aria-live="polite" className="text-body-s text-ink-muted">
                  {t("list.showing", {
                    count: shown.length,
                    total: apps.length,
                    category: filters.category ?? t("list.allCategories"),
                  })}
                </p>
                <div className="flex flex-wrap gap-2" aria-label={t("list.legend")} role="group">
                  {presentIsolations.map((i) => (
                    <IsolationPill key={i} isolation={i} />
                  ))}
                </div>
              </div>
              {shown.length > 0 ? (
                <ul
                  aria-label={t("list.label")}
                  className="grid grid-cols-[repeat(auto-fill,minmax(min(280px,100%),1fr))] gap-5"
                >
                  {shown.map((app) => (
                    <li key={app.slug} className="flex">
                      <AppCard app={app} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="flex flex-col items-start gap-3">
                  <p className="text-body-l">{t("list.noMatch")}</p>
                  <Button size="sm" onClick={() => setFilters(allFilters)}>
                    {t("list.reset")}
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </Section>
    </>
  );
}

function AppCard({ app }: { app: App }) {
  return (
    <Card padding="tight" className="flex w-full flex-col gap-3">
      <div className="flex items-center gap-3">
        <AppTile name={app.name} tile={app.tile} />
        <div className="flex min-w-0 flex-col gap-0.5">
          <h3 className="text-heading-4">
            <Link to="/catalog/$app/" params={{ app: app.slug }} className="text-inherit">
              {app.name}
            </Link>
          </h3>
          <span className="text-body-s text-ink-muted">{app.category}</span>
        </div>
        <IsolationPill isolation={app.isolation} className="ml-auto" />
      </div>
      <p className="text-body-s">{app.description}</p>
      <div className="flex flex-wrap gap-1.5">
        {app.example && <ExampleTag />}
        {app.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
      <Cmd
        command={`crust tide app create ${app.slug}`}
        className="mt-auto border-thin shadow-none [&_button]:size-7 [&>div]:gap-2 [&>div]:py-1.5 [&>div]:pr-1.5 [&>div]:pl-2.5 [&_code]:text-[12px] [&>div]:leading-4"
      />
    </Card>
  );
}

function FilterPanel({
  filters,
  set,
}: {
  filters: Filters;
  set: (patch: Partial<Filters>) => void;
}) {
  const { t } = useTranslation("catalog");
  return (
    <aside
      aria-label={t("filters.label")}
      className="hidden flex-[1_1_220px] flex-col gap-0.5 js:flex sm:max-w-60"
    >
      <Kicker id="catalog-categories" className="px-2 pb-2">
        {t("filters.categories")}
      </Kicker>
      <ul
        aria-labelledby="catalog-categories"
        className="flex flex-col gap-0.5 max-sm:flex-row max-sm:flex-wrap max-sm:gap-1.5"
      >
        {[[null, apps.length] as const, ...categories].map(([category, count]) => (
          <li key={category ?? ""}>
            <button
              type="button"
              aria-pressed={filters.category === category}
              onClick={() => set({ category })}
              className={cn(
                "flex min-h-10 w-full cursor-pointer max-sm:w-auto items-center gap-2.5 rounded-md border-thin border-transparent px-2 py-1.5 text-left text-[15px] font-medium text-ink hover:border-line",
                filters.category === category &&
                  "border-line bg-accent-yellow font-bold text-on-fill-dark shadow-sm",
              )}
            >
              {category ?? t("filters.all")}
              <span className="ml-auto font-mono text-caption font-bold">{count}</span>
            </button>
          </li>
        ))}
      </ul>
      {presentIsolations.length > 1 && (
        <CheckGroup legend={t("filters.isolation")}>
          {presentIsolations.map((i) => (
            <Check
              key={i}
              label={t(`isolationLong.${i}`)}
              checked={filters.isolation.includes(i)}
              onChange={(on) => set({ isolation: toggle(filters.isolation, i, on) })}
            />
          ))}
        </CheckGroup>
      )}
      {presentSources.length > 1 && (
        <CheckGroup legend={t("filters.source")}>
          {presentSources.map((s) => (
            <Check
              key={s}
              label={t(`source.${s}`)}
              checked={filters.source.includes(s)}
              onChange={(on) => set({ source: toggle(filters.source, s, on) })}
            />
          ))}
        </CheckGroup>
      )}
      {anyGpu && (
        <Check label={t("filters.gpu")} checked={filters.gpu} onChange={(gpu) => set({ gpu })} />
      )}
    </aside>
  );
}

function CheckGroup({ legend, children }: { legend: string; children: ReactNode }) {
  return (
    <fieldset className="flex flex-col">
      <legend className="px-2 pt-5 pb-2 font-mono text-kicker text-text-rust uppercase">
        {legend}
      </legend>
      {children}
    </fieldset>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 px-2 py-1 text-body-s">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="size-5 accent-brand-rust"
      />
      {label}
    </label>
  );
}
