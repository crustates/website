import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";
import { Wrap } from "@/components/ui/section";
import { links } from "@/lib/links";
import { asset } from "@/lib/site";
import { NavAnchor, type NavItem } from "./nav-anchor";

export function SiteFooter() {
  const { t } = useTranslation();
  const columns: { heading: string; items: NavItem[] }[] = [
    {
      heading: t("footer.product.heading"),
      items: [
        { label: t("footer.product.features"), to: "/features/" },
        { label: t("footer.product.tide"), to: "/tide/" },
        { label: t("footer.product.reef"), to: "/reef/" },
        { label: t("footer.product.current"), to: "/current/" },
        { label: t("footer.product.molt"), to: "/molt/" },
        { label: t("footer.product.cast"), to: "/cast/" },
        { label: t("footer.product.barnacle"), to: "/barnacle/" },
        { label: t("footer.product.spawn"), to: "/spawn/" },
        { label: t("footer.product.assistant"), to: "/assistant/" },
        { label: t("footer.product.catalog"), to: "/catalog/" },
        { label: t("footer.product.compare"), to: "/compare/" },
        { label: t("footer.product.download"), to: "/download/" },
      ],
    },
    {
      heading: t("footer.docs.heading"),
      items: [
        { label: t("footer.docs.gettingStarted"), href: links.docs },
        { label: t("footer.docs.hardware"), to: "/hardware/" },
        { label: t("footer.docs.api"), to: "/api/" },
        { label: t("footer.docs.faq"), to: "/faq/" },
      ],
    },
    {
      heading: t("footer.community.heading"),
      items: [
        { label: t("footer.community.contribute"), to: "/community/" },
        { label: t("footer.community.sponsor"), to: "/community/", hash: "sponsor" },
        { label: t("footer.community.roadmap"), to: "/roadmap/" },
        { label: t("footer.community.changelog"), to: "/changelog/" },
        { label: t("footer.community.github"), href: links.github },
      ],
    },
    {
      heading: t("footer.project.heading"),
      items: [
        { label: t("footer.project.about"), to: "/about/" },
        { label: t("footer.project.security"), to: "/security/" },
        { label: t("footer.project.brand"), to: "/brand/" },
        { label: t("footer.project.legal"), to: "/legal/" },
        { label: t("footer.project.conduct"), to: "/community/", hash: "conduct" },
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
