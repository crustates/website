# website

Source of [crustates.eu](https://crustates.eu), served at
<https://crustates.github.io/website/> until the domain points at GitHub Pages.

A fully prerendered static site: [TanStack Start](https://tanstack.com/start)
(React, file-based routes) built with [Vite+](https://viteplus.dev) on
[Bun](https://bun.sh), styled with Tailwind CSS. Every page is plain HTML that
reads fine without JavaScript; scripts only add the theme toggle, the mobile
menu, copy buttons and the FAQ and catalog filters. No cookies, trackers or
third-party requests; fonts are self-hosted.

## Run it

Install [mise](https://mise.jdx.dev) and the
[Vite+ CLI](https://viteplus.dev/guide/) (`vp`), then:

```sh
mise install                             # Node, Bun and Trivy at the pinned versions
vp install                               # dependencies, content types and the pre-commit hook
vp exec playwright install chromium      # once: the browser for component and end-to-end tests
vp dev                                   # dev server at http://localhost:5173/website/
```

The global `vp` runs each command with the project's own Vite+ version from
`package.json`. Bun only installs packages; `vp`, the tests and the prerender
run on Node (`.node-version`).

## Commands

| Command             | What it does                                                                               |
| ------------------- | ------------------------------------------------------------------------------------------ |
| `vp check`          | Format check, lint and type check (`vp check --fix` fixes)                                 |
| `vp test`           | Unit tests in Node, component tests in Chromium                                            |
| `vp build`          | Prerenders the site into `dist/client`                                                     |
| `vp run preview`    | Builds, then serves `dist/client` like GitHub Pages on port 4173                           |
| `vp run e2e`        | End-to-end tests against the built site (run `vp build` first)                             |
| `vp run lighthouse` | Lighthouse on one page per template; fails under 95 (after `vp build`)                     |
| `vp run weight`     | Gzipped JavaScript per page, as a Markdown table (after `vp build`)                        |
| `vp run design`     | Screenshots next to the design kit, report only (after `vp build`; needs `DESIGN_KIT_DIR`) |
| `vp run content`    | Validates `content/` and regenerates its types (also runs on `vp install`)                 |
| `vp run tokens`     | Regenerates `src/styles/theme.css` from `design/tokens.json`                               |
| `vp run security`   | Scans dependencies with Trivy (`trivy.yaml`)                                               |

Before opening a pull request: `vp check`, `vp test`, `vp build`,
`vp run e2e` and `vp run lighthouse`. CI runs the same.

## Where things live

- `site.config.ts`: the site's origin and base path, the one place that knows
  where the site is served from. Links, assets, canonical URLs, feeds, the
  sitemap, robots.txt and the install script follow it.
- `content/`: blog posts, release notes, FAQ, app catalog and roadmap (see
  below). Schemas are in `src/content/collections/`.
- `src/routes/`: one file per page. `/_kit` shows every UI component and is
  neither linked nor indexed.
- `src/i18n/en/`: every UI string, one namespace per page plus `common.json`
  (navigation, footer, page titles and descriptions). Keys are type-checked.
- `src/components/ui/`: the UI kit (shadcn-style, restyled); `sections/` holds
  the blocks pages share.
- `design/tokens.json`: the design tokens, the single source for colours, type,
  spacing, radii, borders and shadows. Run `vp run tokens` after editing it.
- `public/brand/`: logos, icons and badges copied from
  [crustates/brand](https://github.com/crustates/brand), which is their source.
  Update them there first.
- `e2e/`: Playwright tests; `scripts/`: the token generator, the Pages-like
  server, the Lighthouse runner and the JS weight report.

## Adding content

Every file is validated against a strict schema: a wrong value, a missing
field or a misspelled key fails `vp run content` and `vp build` with the file
and field named. Entries marked `draft: true` show in `vp dev` and are left out
of production builds entirely (no page, no feed or sitemap entry, no text in
the JavaScript). `SHOW_DRAFTS=true vp build` includes them. Published entries
need a real date (`YYYY-MM-DD`); only drafts may keep `"[DATE]"`.

### A blog post

Create `content/blog/<slug>.mdx`. The file name is the URL: `/blog/<slug>/`.

```mdx
---
title: Why every app gets its own kernel
summary: One or two sentences for the blog list and the feed.
lede: Optional longer intro under the title; defaults to the summary.
date: "2026-11-05"
product: tide # optional: tide, reef, current, molt, cast, barnacle, spawn or assistant
category: Architecture
tags: [Tide, Security]
author:
  name: Your Name
  role: Maintainer
featured: false # true puts it at the top of /blog/
draft: true # remove when it's ready
---

import { Callout } from "@/components/ui/callout";

Body in MDX. `## Headings` become the table of contents.

<Callout tint="blue">Components from src/components/ui work here.</Callout>
```

The post appears on `/blog/`, in `/blog/rss.xml` and in the sitemap. Reading
time is computed from the text.

### A release note

Create `content/releases/<version>.md`, named after the version (`0.5.0.md`,
`0.5.0-beta.1.md`). Its page is `/changelog/<version>/`; links to the
signature and the diff assume a GitHub tag `v<version>`.

```md
---
date: "2026-11-05"
channel: stable # or beta
security: false # true marks it as a security release
summary: One or two sentences for the changelog list.
description: The lead on the release page.
changes:
  - { type: added, text: "What's new. `code` in backticks works." }
  - { type: fixed, text: "What's fixed." } # added, changed, fixed, removed or security
vulnerabilities: [] # { component, advisory, severity, affected } per CVE
areas: { tide: ["Per-area notes"] } # optional, keyed by product
checksums: [] # { file, size, sha256 } per download
---

Free Markdown for the rest of the notes.
```

It appears on `/changelog/`, in `/changelog/rss.xml` and in the sitemap.

### A FAQ entry

Add an item to the topic file in `content/faq/`:

```yaml
- q: Can I run it on a Raspberry Pi?
  a: Yes, with shared isolation. `code` in backticks works.
  link: { label: Hardware guide, to: /hardware/ } # optional, a page of this site
```

A new topic is a new file with `title`, `order` (its position on the page) and
`items`.

### A catalog app

Create `content/catalog/<slug>.yaml`. Its page is `/catalog/<slug>/`, and the
card shows `crust tide app create <slug>`.

```yaml
name: Jellyfin
category: Media
isolation: microvm # microvm, vm, shared or database
needs: [gpu] # gpu, usb, database; drives the filters
description: Stream your films, series and music to every device.
tags: [media, gpu]
tile: blue # colour of the letter tile
source: curated # or community
example: true # sample entry, shown with an "Example" tag; remove for a real template
```

An optional `detail` block adds the full app page sections (about, versions,
volumes, maintainers, related apps); `content/catalog/immich.yaml` has one, and
the schema in `src/content/collections/catalog.ts` lists every field.

### The roadmap

`content/roadmap.yaml` holds the milestones (`id` `M0`…, `title`, `status`
`shipped`, `in-progress` or `planned`, and `items`) and a `later` list.

## Adding a page

1. Add `src/routes/<page>.tsx`; prerendering picks it up from the route tree.
2. Put its strings in `src/i18n/en/<page>.json` and add the namespace to
   `src/i18n/resources.ts`; put its title and description under `meta` in
   `common.json`.
3. Link to it with a typed `<Link to="/<page>/">` (routes end in `/`). Use
   `asset()` from `src/lib/site.ts` for files in `public/`.

`vp run e2e` then checks the new page like every other one.

## Quality checks

- **End-to-end** (`e2e/site.spec.ts`): every page in the sitemap renders with
  no console errors, failed requests or layout shift; fits a 320px screen; and
  with JavaScript off still shows its content and no buttons or form fields.
  Every internal link, asset and `#anchor` resolves, unknown URLs get the 404
  page, and `/install`, the feeds and robots.txt are served.
- **Lighthouse** (`scripts/lighthouse.ts`): Lighthouse 13, mobile defaults,
  median of three runs on nine pages, at least 95 in performance,
  accessibility, best practices and SEO. Reports land in `.lighthouse/`.
- **Design comparison** (`e2e/design.spec.ts`, local only): set
  `DESIGN_KIT_DIR` to the design kit's folder and run `vp run design`. It
  reports how much of each page differs from its kit page at 1440 and 390
  wide; `vp exec playwright show-report` shows the screenshots and diffs.
- **JS weight**: `vp run weight` lists the gzipped JavaScript each page loads.

## CI and deploys

- `.github/workflows/site.yaml`, on every pull request and push to `main`:
  check, test, build, end-to-end tests, JS weight and Lighthouse scores (in
  the job summary). Pushes to `main` then deploy `dist/client` to GitHub Pages.
- `.github/workflows/security.yaml`: Trivy on pull requests, on `main` and
  weekly.
- `.github/workflows/links.yaml`: weekly check of the external links on the
  live site with [lychee](https://lychee.cli.rs); broken links open (or update)
  one issue.
- Renovate keeps dependencies, mise tools and pinned action digests current.

## Moving to crustates.eu

1. Point the domain's DNS at GitHub Pages and set the custom domain in the
   repository's Pages settings.
2. Change `site.config.ts` to
   `{ origin: "https://crustates.eu", basePath: "/" }`.

robots.txt only takes effect at the domain root, so it starts working then.

## Licence

Code is MIT ([LICENSE](LICENSE)). Content is CC BY 4.0
([CONTENT-LICENSE](CONTENT-LICENSE)).
