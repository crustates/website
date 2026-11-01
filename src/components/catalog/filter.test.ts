import { expect, test } from "vite-plus/test";
import { apps, type App } from "@/content";
import { categoryCounts, filterApps, type Filters } from "./filter";

const fixture = (slug: string, fields: Partial<App>) =>
  ({
    slug,
    name: slug,
    category: "Files",
    description: "",
    tags: [],
    needs: [],
    isolation: "microvm",
    source: "curated",
    ...fields,
  }) as App;
const sample = [
  fixture("cloud", { tags: ["postgres"], needs: ["database"] }),
  fixture("dns", { category: "Network", isolation: "shared", description: "Blocks ads with DNS." }),
  fixture("films", { category: "Media", needs: ["gpu"], source: "community" }),
];
const all: Filters = {
  query: "",
  category: null,
  isolation: ["microvm", "vm", "shared", "database"],
  source: ["curated", "community"],
  gpu: false,
};
const slugs = (filters: Partial<Filters>) =>
  filterApps(sample, { ...all, ...filters }).map((a) => a.slug);

test("filters combine", () => {
  expect(slugs({})).toEqual(["cloud", "dns", "films"]);
  expect(slugs({ query: " dns " })).toEqual(["dns"]);
  expect(slugs({ query: "POSTGRES" })).toEqual(["cloud"]);
  expect(slugs({ category: "Files" })).toEqual(["cloud"]);
  expect(slugs({ isolation: ["shared"] })).toEqual(["dns"]);
  expect(slugs({ source: ["curated"] })).toEqual(["cloud", "dns"]);
  expect(slugs({ gpu: true, source: ["curated"] })).toEqual([]);
});

test("counts apps per category, by name", () => {
  expect(categoryCounts([...sample, fixture("sync", {})])).toEqual([
    ["Files", 2],
    ["Media", 1],
    ["Network", 1],
  ]);
});

test("related apps link only to apps in the catalog", () => {
  const known = new Set(apps.map((a) => a.slug));
  for (const app of apps)
    for (const related of app.detail?.related ?? [])
      if (related.slug) expect(known).toContain(related.slug);
});
