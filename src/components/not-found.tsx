import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { Tag } from "@/components/ui/tag";
import { links } from "@/lib/links";
import { asset, href } from "@/lib/site";

// No search box: the site has no search index, and 404.html ships without JS.
export function NotFound() {
  const { t } = useTranslation();
  // Plain links: most of these pages land in later parts.
  const popular = [
    { label: t("notFound.links.download"), href: href("/download") },
    { label: t("notFound.links.features"), href: href("/features") },
    { label: t("notFound.links.hardware"), href: href("/hardware") },
    { label: t("notFound.links.compare"), href: href("/compare") },
    { label: t("notFound.links.catalog"), href: href("/catalog") },
    { label: t("notFound.links.faq"), href: href("/faq") },
  ];
  return (
    <Section dots band padded={false} className="min-h-[560px]">
      <div className="flex flex-wrap items-center gap-12 py-[72px] max-md:py-12">
        <div className="flex flex-[0_1_340px] flex-col items-center gap-3">
          <img
            src={asset("/brand/mark-light.svg")}
            alt=""
            width={220}
            height={220}
            className="-rotate-8 dark:hidden"
          />
          <img
            src={asset("/brand/mark-dark.svg")}
            alt=""
            width={220}
            height={220}
            className="hidden -rotate-8 dark:block"
          />
          <p className="font-mono text-display-l text-brand-rust">404</p>
        </div>
        <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-5">
          <Kicker>{t("notFound.kicker")}</Kicker>
          <h1 className="text-display-l max-sm:text-heading-1">{t("notFound.heading")}</h1>
          <p className="max-w-[600px] text-body-l">{t("notFound.body")}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <a href={href("/")}>{t("notFound.home")}</a>
            </Button>
            <Button asChild>
              <a href={links.docs}>{t("notFound.docs")}</a>
            </Button>
          </div>
          <div className="mt-2 flex flex-col gap-2.5">
            <p className="text-label">{t("notFound.popular")}</p>
            <div className="flex flex-wrap gap-2.5">
              {popular.map((item) => (
                <Tag key={item.label} asChild>
                  <a href={item.href}>{item.label}</a>
                </Tag>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
