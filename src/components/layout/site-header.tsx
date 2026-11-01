import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Wrap } from "@/components/ui/section";
import { links } from "@/lib/links";
import { asset } from "@/lib/site";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { NavAnchor, type NavItem } from "./nav-anchor";
import { ThemeToggle } from "./theme-toggle";

/** `interactive={false}` renders the header for a page that ships without JS (404.html). */
export function SiteHeader({ interactive = true }: { interactive?: boolean }) {
  const { t } = useTranslation();
  // With JS, the links collapse into the menu below xl; without it they wrap.
  const collapse = interactive ? "js:max-xl:hidden" : "";
  // Pages from later parts are plain links until their routes exist.
  const items: NavItem[] = [
    { label: t("nav.features"), href: asset("/features") },
    { label: t("nav.docs"), href: links.docs },
    { label: t("nav.download"), href: asset("/download") },
    { label: t("nav.roadmap"), href: asset("/roadmap") },
    { label: t("nav.changelog"), href: asset("/changelog") },
    { label: t("nav.community"), href: asset("/community") },
  ];
  const actions = (
    <>
      <Button asChild size="sm">
        <a href={links.github}>{t("nav.github")}</a>
      </Button>
      <Button asChild size="sm" variant="primary">
        <a href={asset("/download")}>{t("nav.getCrustates")}</a>
      </Button>
    </>
  );

  return (
    <header>
      <Wrap>
        <nav
          aria-label={t("nav.label")}
          className="flex flex-wrap items-center gap-x-7 gap-y-3 py-[18px]"
        >
          <Link
            to="/"
            className="mr-auto flex items-center gap-2.5 text-[24px] leading-none font-bold tracking-[-0.02em] text-ink no-underline"
          >
            <img
              src={asset("/brand/mark-light.svg")}
              alt=""
              width={44}
              height={44}
              className="dark:hidden"
            />
            <img
              src={asset("/brand/mark-dark.svg")}
              alt=""
              width={44}
              height={44}
              className="hidden dark:block"
            />
            {t("brand")}
          </Link>
          <ul
            className={cn(
              "m-0 flex list-none flex-wrap items-center gap-x-7 gap-y-3 p-0",
              collapse,
            )}
          >
            {items.map((item) => (
              <li key={item.label}>
                <NavAnchor
                  target={item}
                  className="font-medium text-ink no-underline"
                  activeClassName="underline decoration-3 underline-offset-8"
                >
                  {item.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
          <div className={cn("flex items-center gap-3", collapse)}>{actions}</div>
          {interactive && (
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <MobileNav items={items}>{actions}</MobileNav>
            </div>
          )}
        </nav>
      </Wrap>
    </header>
  );
}
