import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Wrap } from "@/components/ui/section";
import { links } from "@/lib/links";
import { asset, href } from "@/lib/site";
import { NavAnchor, type NavItem } from "./nav-anchor";

export function SiteFooter() {
  const { t } = useTranslation();
  // Pages from later parts are plain links until their routes exist.
  const columns: { heading: string; items: NavItem[] }[] = [
    {
      heading: t("footer.product.heading"),
      items: [
        { label: t("footer.product.features"), href: href("/features") },
        { label: t("footer.product.tide"), href: href("/tide") },
        { label: t("footer.product.reef"), href: href("/reef") },
        { label: t("footer.product.current"), href: href("/current") },
        { label: t("footer.product.molt"), href: href("/molt") },
        { label: t("footer.product.cast"), href: href("/cast") },
        { label: t("footer.product.barnacle"), href: href("/barnacle") },
        { label: t("footer.product.spawn"), href: href("/spawn") },
        { label: t("footer.product.assistant"), href: href("/assistant") },
        { label: t("footer.product.catalog"), href: href("/catalog") },
        { label: t("footer.product.compare"), href: href("/compare") },
        { label: t("footer.product.download"), href: href("/download") },
      ],
    },
    {
      heading: t("footer.docs.heading"),
      items: [
        { label: t("footer.docs.gettingStarted"), href: links.docs },
        { label: t("footer.docs.hardware"), href: href("/hardware") },
        { label: t("footer.docs.api"), href: href("/api") },
        { label: t("footer.docs.faq"), href: href("/faq") },
      ],
    },
    {
      heading: t("footer.community.heading"),
      items: [
        { label: t("footer.community.contribute"), href: href("/community") },
        { label: t("footer.community.sponsor"), href: href("/community") },
        { label: t("footer.community.roadmap"), href: href("/roadmap") },
        { label: t("footer.community.changelog"), href: href("/changelog") },
        { label: t("footer.community.github"), href: links.github },
      ],
    },
    {
      heading: t("footer.project.heading"),
      items: [
        { label: t("footer.project.about"), href: href("/about") },
        { label: t("footer.project.security"), href: href("/security") },
        { label: t("footer.project.brand"), href: href("/brand") },
        { label: t("footer.project.legal"), href: href("/legal") },
        { label: t("footer.project.conduct"), href: href("/community") },
      ],
    },
  ];

  return (
    <footer className="border-t-3 border-line bg-surface-card pt-12 pb-8">
      <Wrap className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-8">
        <div className="flex flex-col gap-3">
          <img
            src={asset("/brand/logo-horizontal-light.svg")}
            alt={t("footer.logoAlt")}
            width={200}
            height={44}
            loading="lazy"
            className="h-auto dark:hidden"
          />
          <img
            src={asset("/brand/logo-horizontal-dark.svg")}
            alt={t("footer.logoAlt")}
            width={200}
            height={44}
            loading="lazy"
            className="hidden h-auto dark:block"
          />
          <p className="text-body-s text-ink-muted">{t("footer.tagline")}</p>
          <Badge
            name="runs-on"
            alt={t("footer.badgeAlt")}
            width={210}
            height={36}
            className="h-auto"
          />
        </div>
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="mb-2 text-label">{column.heading}</p>
            <ul className="m-0 list-none p-0">
              {column.items.map((item) => (
                <li key={item.label}>
                  <NavAnchor
                    target={item}
                    className="block py-1 text-ink no-underline hover:underline"
                  >
                    {item.label}
                  </NavAnchor>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Wrap>
    </footer>
  );
}
