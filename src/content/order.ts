const parts = (version: string) =>
  version.split(/[.-]/).map((part) => Number.parseInt(part, 10) || 0);

export function byVersionDesc(a: { version: string }, b: { version: string }): number {
  const [x, y] = [parts(a.version), parts(b.version)];
  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const d = (y[i] ?? 0) - (x[i] ?? 0);
    if (d !== 0) return d;
  }
  return 0;
}

/** ISO dates sort by code point; "[DATE]" (drafts only) sorts above every date. */
export function byDateDesc(a: { date: string }, b: { date: string }): number {
  return a.date === b.date ? 0 : a.date > b.date ? -1 : 1;
}
