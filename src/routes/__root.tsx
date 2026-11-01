import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import fontBold from "@/assets/fonts/SpaceGrotesk-700.woff2?url";
import fontRegular from "@/assets/fonts/SpaceGrotesk-400.woff2?url";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { i18n } from "@/i18n";
import { asset } from "@/lib/site";
import { themeScript } from "@/lib/theme";
import appCss from "@/styles/app.css?url";

const preloadFont = (href: string) => ({
  rel: "preload",
  href,
  as: "font",
  type: "font/woff2",
  crossOrigin: "anonymous" as const,
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      // One value only: head() dedupes meta by name, so a light/dark pair collapses.
      { name: "theme-color", content: "#FFF6E5" },
    ],
    links: [
      preloadFont(fontRegular),
      preloadFont(fontBold),
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: asset("/brand/favicon.svg"), type: "image/svg+xml" },
      { rel: "icon", href: asset("/brand/favicon-32.png"), sizes: "32x32", type: "image/png" },
      { rel: "apple-touch-icon", href: asset("/brand/apple-touch-icon.png") },
      { rel: "manifest", href: asset("/manifest.webmanifest") },
    ],
    scripts: [{ children: themeScript }],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  const { t } = useTranslation();
  return (
    <html lang={i18n.language} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-surface-card focus:p-3"
        >
          {t("skipToContent")}
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  );
}
