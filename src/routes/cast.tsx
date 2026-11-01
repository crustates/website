import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ProductPage } from "@/components/product-page";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { i18n, usePageCopy } from "@/i18n";
import cast from "@/i18n/en/cast.json";
import { seo } from "@/lib/seo";
import { href } from "@/lib/site";

export const Route = createFileRoute("/cast")({
  head: () =>
    seo({
      title: i18n.t("meta.cast.title"),
      description: i18n.t("meta.cast.description"),
      path: "/cast",
    }),
  component: CastPage,
});

/** Illustration: an example three-node cluster, not live data. */
function Nodes() {
  const { t } = useTranslation("cast");
  const rows = [
    { name: "node-1", site: "home", role: "leader", link: "LAN" },
    { name: "node-2", site: "home", role: "voter", link: "LAN" },
    { name: "pi-parents", site: "parents", role: "voter", link: "iroh · 18 ms" },
  ] as const;
  return (
    <>
      <Card raised padding="none" className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-line px-[18px] py-3.5">
          <div className="flex items-center gap-2.5">
            <ProductIcon product="cast" size={28} />
            <strong>{t("visual.title")}</strong>
          </div>
          <Tag>{t("visual.summary")}</Tag>
        </div>
        <Table frame="none">
          <thead>
            <tr>
              <Th>{t("visual.columns.node")}</Th>
              <Th>{t("visual.columns.site")}</Th>
              <Th>{t("visual.columns.role")}</Th>
              <Th>{t("visual.columns.link")}</Th>
              <Th>{t("visual.columns.status")}</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <Tr key={row.name} selected={row.site === "parents"}>
                <Td>
                  <strong>{row.name}</strong>
                </Td>
                <Td>{t(`visual.${row.site}`)}</Td>
                <Td>{t(`visual.${row.role}`)}</Td>
                <Td className="font-mono">{row.link}</Td>
                <Td>
                  <Pill tone="ok">{t("visual.ready")}</Pill>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Console wrap className="mt-5">
        <Term tone="dim">node-1 $</Term> crust cast token --expires 15m{"\n"}
        <Term tone="info">ct_9f2c…a71e</Term>
        {"\n"}
        <Term tone="dim">pi-parents $</Term> crust cast join ct_9f2c…a71e{"\n"}
        <Term tone="ok">✓</Term> connected via iroh <Term tone="dim">(direct, hole-punched)</Term>
        {"\n"}
        <Term tone="ok">✓</Term> joined cluster home as voter
      </Console>
    </>
  );
}

function CastPage() {
  const copy = usePageCopy("cast", cast);
  const { t } = useTranslation();
  return (
    <ProductPage
      product="cast"
      copy={copy}
      visual={<Nodes />}
      next="barnacle"
      nextExtra={
        <Button asChild>
          <a href={href("/features")}>{t("productPage.allFeatures")}</a>
        </Button>
      }
    />
  );
}
