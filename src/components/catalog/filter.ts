import type { App } from "@/content";

export type Filters = {
  query: string;
  /** null: all categories. */
  category: string | null;
  isolation: readonly App["isolation"][];
  source: readonly App["source"][];
  gpu: boolean;
};

/** The apps that match every filter; the query searches name, category, description and tags. */
export function filterApps(apps: readonly App[], filters: Filters): App[] {
  const query = filters.query.trim().toLowerCase();
  return apps.filter(
    (app) =>
      (filters.category === null || app.category === filters.category) &&
      filters.isolation.includes(app.isolation) &&
      filters.source.includes(app.source) &&
      (!filters.gpu || app.needs.includes("gpu")) &&
      [app.name, app.category, app.description, ...app.tags].some((text) =>
        text.toLowerCase().includes(query),
      ),
  );
}

/** Each category with its number of apps, by name. */
export function categoryCounts(apps: readonly App[]): [string, number][] {
  const counts = new Map<string, number>();
  for (const app of apps) counts.set(app.category, (counts.get(app.category) ?? 0) + 1);
  return [...counts].sort(([a], [b]) => a.localeCompare(b));
}
