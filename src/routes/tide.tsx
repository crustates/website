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
import tide from "@/i18n/en/tide.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/tide")({
  head: () =>
    seo({
      title: i18n.t("meta.tide.title"),
      description: i18n.t("meta.tide.description"),
      path: "/tide",
    }),
  component: TidePage,
});

/** Illustration: example workloads on one node, not live data. */
function Workloads() {
  const { t } = useTranslation("tide");
  const rows = [
    { name: "win11", kind: "vm", isolation: "qemu", cpu: "4", ram: "8 GiB", status: "running" },
    { name: "haos", kind: "vm", isolation: "qemu", cpu: "2", ram: "4 GiB", status: "running" },
    {
      name: "jellyfin",
      kind: "app",
      isolation: "microVM",
      cpu: "4",
      ram: "3 GiB",
      status: "running",
    },
    {
      name: "immich",
      kind: "app",
      isolation: "microVM",
      cpu: "2",
      ram: "4 GiB",
      status: "updating",
    },
    {
      name: "paperless",
      kind: "app",
      isolation: "shared",
      cpu: "1",
      ram: "1 GiB",
      status: "stopped",
    },
  ] as const;
  const tones = { running: "ok", updating: "warn", stopped: "off" } as const;
  return (
    <>
      <Card raised padding="none" className="overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-3 border-line px-[18px] py-3.5">
          <div className="flex items-center gap-2.5">
            <ProductIcon product="tide" size={28} />
            <strong>{t("visual.title")}</strong>
          </div>
          <Tag>{t("visual.node")}</Tag>
        </div>
        <Table frame="none">
          <thead>
            <tr>
              <Th>{t("visual.columns.name")}</Th>
              <Th>{t("visual.columns.kind")}</Th>
              <Th>{t("visual.columns.isolation")}</Th>
              <Th num>{t("visual.columns.cpu")}</Th>
              <Th num>{t("visual.columns.ram")}</Th>
              <Th>{t("visual.columns.status")}</Th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <Tr key={row.name} selected={row.status === "updating"}>
                <Td>
                  <strong>{row.name}</strong>
                </Td>
                <Td>{t(`visual.${row.kind}`)}</Td>
                <Td className="font-mono">{row.isolation}</Td>
                <Td num>{row.cpu}</Td>
                <Td num>{row.ram}</Td>
                <Td>
                  <Pill tone={tones[row.status]}>{t(`visual.${row.status}`)}</Pill>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Console wrap className="mt-5">
        <Term tone="dim">$</Term> crust tide vm create win11 --iso win11.iso --tpm --cpus 4 --memory
        8G{"\n"}
        <Term tone="ok">✓</Term> VM win11 created{" "}
        <Term tone="dim">(UEFI · vTPM · Secure Boot)</Term>
        {"\n"}
        <Term tone="ok">✓</Term> console at https://node-1.crust.internal/tide/win11/console
      </Console>
    </>
  );
}

function TidePage() {
  const copy = usePageCopy("tide", tide);
  return <ProductPage product="tide" copy={copy} visual={<Workloads />} next="reef" />;
}
