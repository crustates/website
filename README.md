# website

Source of [crustates.eu](https://crustates.eu), served at
<https://crustates.github.io/website/> until the domain points at GitHub Pages.

A fully prerendered static site: [TanStack Start](https://tanstack.com/start)
(React, file-based routes) built with [Vite+](https://viteplus.dev) on
[Bun](https://bun.sh), styled with Tailwind CSS. Every page is plain HTML that
reads fine without JavaScript; scripts only add the theme toggle, the mobile
menu and copy buttons.

## Run it

Install [mise](https://mise.jdx.dev) and the
[Vite+ CLI](https://viteplus.dev/guide/) (`vp`), then:

```sh
mise install         # Node, Bun and Trivy at the pinned versions
vp install           # dependencies, and the pre-commit hook
vp dev               # dev server at http://localhost:5173/website/
```

The global `vp` runs each command with the project's own Vite+ version from
`package.json`.

| Command           | What it does                                                     |
| ----------------- | ---------------------------------------------------------------- |
| `vp check`        | Format check, lint and type check (`vp check --fix` fixes)       |
| `vp test`         | Unit tests in Node, component tests in Chromium                  |
| `vp build`        | Prerenders the site into `dist/client`                           |
| `vp run preview`  | Builds, then serves `dist/client` like GitHub Pages on port 4173 |
| `vp run tokens`   | Regenerates `src/styles/theme.css` from `design/tokens.json`     |
| `vp run security` | Scans dependencies with Trivy (`trivy.yaml`)                     |

Component tests need Chromium once: `vp exec playwright install chromium`.

## Where things live

- `site.config.ts`: the site's origin and base path. Change it to
  `{ origin: "https://crustates.eu", basePath: "/" }` when the domain is live;
  links, assets, canonical URLs, the sitemap and robots.txt follow it.
- `design/tokens.json`: the design tokens, the single source for colours, type,
  spacing, radii, borders and shadows. Run `vp run tokens` after editing it.
- `src/routes/`: one file per page. `/_kit` shows every UI component and is not
  linked or indexed.
- `src/i18n/en/`: every UI string. Keys are type-checked.
- `public/brand/`: logos, icons and badges copied from
  [crustates/brand](https://github.com/crustates/brand), which is their source.
  Update them there first.

## Deploy

`.github/workflows/site.yaml` checks, tests and builds every pull request, and
deploys `dist/client` to GitHub Pages on every push to `main`.
`.github/workflows/security.yaml` runs Trivy on pull requests, on `main` and
weekly.

## Licence

Code is MIT ([LICENSE](LICENSE)). Content is CC BY 4.0
([CONTENT-LICENSE](CONTENT-LICENSE)).
