type Item = { q: string; a: string; link?: { label: string } };

/** Lower-cased question, answer (without tags) and link label of an FAQ item. */
export function searchText({ q, a, link }: Item): string {
  return [q, a.replace(/<[^>]+>/g, ""), link?.label ?? ""].join(" ").toLowerCase();
}

/** True when the text contains every word of the query; an empty query matches all. */
export function matchesQuery(text: string, query: string): boolean {
  return query
    .toLowerCase()
    .split(/\s+/)
    .every((word) => text.includes(word));
}
