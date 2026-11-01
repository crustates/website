import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ProductPage } from "@/components/product-page";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { i18n, usePageCopy } from "@/i18n";
import current from "@/i18n/en/current.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/current")({
  head: () =>
    seo({
      title: i18n.t("meta.current.title"),
      description: i18n.t("meta.current.description"),
      path: "/current",
    }),
  component: CurrentPage,
});

/** Illustration: example ingress routes and flow logs, not live data. */
function Ingress() {
  const { t } = useTranslation("current");
  const routes = [
    { host: "jellyfin.crust.internal", target: "jellyfin:8096", public: false },
    { host: "immich.crust.internal", target: "immich:2283", public: false },
    { host: "photos.example.nl", target: "immich:2283", public: true },
    { host: "ha.crust.internal", target: "haos:8123", public: false },
  ];
  return (
    <>
      <Card raised padding="none" className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-line px-[18px] py-3.5">
          <div className="flex items-center gap-2.5">
            <ProductIcon product="current" size={28} />
            <strong>{t("visual.title")}</strong>
          </div>
          <Tag>{t("visual.ca")}</Tag>
        </div>
        <Table frame="none">
          <thead>
            <tr>
              <Th>{t("visual.columns.hostname")}</Th>
              <Th>{t("visual.columns.target")}</Th>
              <Th>{t("visual.columns.certificate")}</Th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <Tr key={route.host} selected={route.public}>
                <Td className="font-mono">{route.host}</Td>
                <Td>{route.target}</Td>
                <Td>
                  {route.public ? (
                    <Pill tone="info">{t("visual.letsEncrypt")}</Pill>
                  ) : (
                    <Pill tone="ok">{t("visual.localCa")}</Pill>
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Console wrap className="mt-5">
        <Term tone="dim">$</Term> crust current flows --app jellyfin --since 1h{"\n"}
        <Term tone="info">jellyfin</Term>
        {" → 10.0.0.42:443   "}
        <Term tone="dim">tcp</Term>
        {"  "}
        <Term tone="ok">allowed</Term>
        {"  "}
        <Term tone="dim">2.1 GiB</Term>
        {"\n"}
        <Term tone="info">jellyfin</Term>
        {" → 203.0.113.9:25   "}
        <Term tone="dim">tcp</Term>
        {"  "}
        <Term tone="bad">denied</Term>
        {"   "}
        <Term tone="dim">rule: no-smtp</Term>
      </Console>
    </>
  );
}

function CurrentPage() {
  const copy = usePageCopy("current", current);
  return <ProductPage product="current" copy={copy} visual={<Ingress />} next="molt" />;
}
