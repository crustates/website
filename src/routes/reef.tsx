import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ProductPage } from "@/components/product-page";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Meter } from "@/components/ui/meter";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { i18n, usePageCopy } from "@/i18n";
import reef from "@/i18n/en/reef.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/reef")({
  head: () =>
    seo({
      title: i18n.t("meta.reef.title"),
      description: i18n.t("meta.reef.description"),
      path: "/reef",
    }),
  component: ReefPage,
});

/** Illustration: an example pool and its disks, not live data. */
function Pool() {
  const { t } = useTranslation("reef");
  const disks = [
    { name: "sda", model: "WD Red Plus 4 TB", temp: "34 °C", worn: false },
    { name: "sdb", model: "WD Red Plus 4 TB", temp: "35 °C", worn: false },
    { name: "nvme0", model: "Samsung 990 Pro", temp: "48 °C", worn: true },
  ];
  return (
    <>
      <Card raised className="flex flex-col gap-[18px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ProductIcon product="reef" size={28} />
            <strong>{t("visual.title")}</strong>
          </div>
          <Pill tone="ok">{t("visual.healthy")}</Pill>
        </div>
        <Meter value={62} tone="rust" label={t("visual.usage")} />
        <p className="text-body-s text-ink-muted">{t("visual.summary")}</p>
        <Table frame="none">
          <thead>
            <tr>
              <Th>{t("visual.columns.disk")}</Th>
              <Th>{t("visual.columns.model")}</Th>
              <Th num>{t("visual.columns.temp")}</Th>
              <Th>{t("visual.columns.smart")}</Th>
            </tr>
          </thead>
          <tbody>
            {disks.map((disk) => (
              <Tr key={disk.name} selected={disk.worn}>
                <Td className="font-mono">{disk.name}</Td>
                <Td>{disk.model}</Td>
                <Td num>{disk.temp}</Td>
                <Td>
                  {disk.worn ? (
                    <Pill tone="warn">{t("visual.wear")}</Pill>
                  ) : (
                    <Pill tone="ok">{t("visual.ok")}</Pill>
                  )}
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Console wrap className="mt-5">
        <Term tone="dim">$</Term> crust reef backup run --app immich{"\n"}
        <Term tone="ok">✓</Term> snapshot tank/immich-data@2026-10-31{" "}
        <Term tone="dim">(1.4 GiB)</Term>
        {"\n"}
        <Term tone="ok">✓</Term> rustic → s3://offsite/crust{" "}
        <Term tone="dim">(312 MiB new, deduplicated)</Term>
      </Console>
    </>
  );
}

function ReefPage() {
  const copy = usePageCopy("reef", reef);
  return <ProductPage product="reef" copy={copy} visual={<Pool />} next="current" />;
}
