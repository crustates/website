import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ProductPage } from "@/components/product-page";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Console, Term } from "@/components/ui/console";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { i18n, usePageCopy } from "@/i18n";
import molt from "@/i18n/en/molt.json";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/molt")({
  head: () =>
    seo({
      title: i18n.t("meta.molt.title"),
      description: i18n.t("meta.molt.description"),
      path: "/molt",
    }),
  component: MoltPage,
});

/** Illustration: an update waiting on one node, not live data. */
function Updates() {
  const { t } = useTranslation("molt");
  return (
    <>
      <Card raised className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <ProductIcon product="molt" size={28} />
            <strong>{t("visual.title")}</strong>
          </div>
          <Tag>{t("visual.channel")}</Tag>
        </div>
        <Callout tint="yellow">
          <div className="flex flex-col gap-1">
            <strong>{t("visual.available")}</strong>
            <span className="text-body-s">{t("visual.details")}</span>
          </div>
        </Callout>
        <Table frame="none">
          <thead>
            <tr>
              <Th>{t("visual.columns.slot")}</Th>
              <Th>{t("visual.columns.image")}</Th>
              <Th>{t("visual.columns.status")}</Th>
            </tr>
          </thead>
          <tbody>
            <Tr selected>
              <Td>
                <strong>A</strong>
              </Td>
              <Td className="font-mono">crustates:[VERSION]</Td>
              <Td>
                <Pill tone="ok">{t("visual.booted")}</Pill>
              </Td>
            </Tr>
            <Tr>
              <Td>
                <strong>B</strong>
              </Td>
              <Td className="font-mono">crustates:[PREVIOUS]</Td>
              <Td>
                <Pill tone="off">{t("visual.rollback")}</Pill>
              </Td>
            </Tr>
          </tbody>
        </Table>
        {/* Part of the mock screen: look like buttons, do nothing. */}
        <div className="pointer-events-none flex flex-wrap gap-3">
          <Button asChild variant="primary">
            <span>{t("visual.upgrade")}</span>
          </Button>
          <Button asChild>
            <span>{t("visual.schedule")}</span>
          </Button>
        </div>
      </Card>
      <Console wrap className="mt-5">
        <Term tone="dim">$</Term> crust molt upgrade --check{"\n"}
        <Term tone="ok">✓</Term> signature verified <Term tone="dim">(cosign)</Term>
        {"\n"}
        <Term tone="ok">✓</Term> ZFS module matches kernel{"\n"}
        <Term tone="ok">✓</Term> staged in slot B, reboot to apply
      </Console>
    </>
  );
}

function MoltPage() {
  const copy = usePageCopy("molt", molt);
  return <ProductPage kickerChip product="molt" copy={copy} visual={<Updates />} next="cast" />;
}
