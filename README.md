# website

Source of [crustates.eu](https://crustates.eu). The site is built with
[Bun](https://bun.sh) and deployed to GitHub Pages by
`.github/workflows/pages.yaml` on every push to `main`.

For now `public/` holds a static placeholder and there is no build step. When
the Bun build lands, the workflow uploads the build output instead of `public/`.

## Licence

Code is MIT ([LICENSE](LICENSE)). Content is CC BY 4.0
([CONTENT-LICENSE](CONTENT-LICENSE)).
