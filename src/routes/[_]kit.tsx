import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Badge, type BadgeName } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Cmd } from "@/components/ui/cmd";
import { Console, Term } from "@/components/ui/console";
import { Kicker } from "@/components/ui/kicker";
import { Pill } from "@/components/ui/pill";
import { ProductIcon } from "@/components/ui/product-icon";
import { Section } from "@/components/ui/section";
import { Table, Td, Th, Tr } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import { productIds, type ProductKey } from "@/lib/products";
import { seo } from "@/lib/seo";

// Internal component gallery. Not linked, not in the sitemap, not indexed.
// Its sample text is fixture data, so it does not go through i18n.
export const Route = createFileRoute("/_kit")({
  head: () =>
    seo({ title: "UI kit", description: "Crustates UI components.", path: "/_kit", noindex: true }),
  component: Kit,
});

const badges: BadgeName[] = [
  "runs-on",
  "powered-by",
  "built-in-rust",
  "open-source",
  "self-hosted",
  "made-in-nl",
  "compute-tide",
  "storage-reef",
  "network-current",
  "os-molt",
  "cluster-cast",
  "plugins-barnacle",
  "gitops-spawn",
];
const allProducts: ProductKey[] = [...productIds, "assistant"];

function Row({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-heading-4">{title}</h3>
      <div className="flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}

function Gallery() {
  return (
    <div className="flex flex-col gap-10">
      <Row title="Buttons">
        <Button>Default</Button>
        <Button variant="primary">Primary</Button>
        <Button variant="blue">Blue</Button>
        <Button variant="violet">Violet</Button>
        <Button variant="brown">Brown</Button>
        <Button variant="pink">Pink</Button>
        <Button variant="success">Success</Button>
        <Button variant="danger">Danger</Button>
        <Button variant="ghost">Ghost</Button>
        <Button size="sm">Small</Button>
        <Button size="sm" variant="primary">
          Small primary
        </Button>
        <Button asChild variant="primary">
          <a href="#kit">Link as button</a>
        </Button>
      </Row>
      <Row title="Pills and tags">
        <Pill tone="ok">Running</Pill>
        <Pill tone="warn">Updating</Pill>
        <Pill tone="bad">Failed</Pill>
        <Pill tone="off">Stopped</Pill>
        <Pill tone="info">microVM</Pill>
        <Tag>node-1</Tag>
        <Tag asChild>
          <a href="#kit">Link tag</a>
        </Tag>
      </Row>
      <Row title="Kickers">
        <Kicker>Default</Kicker>
        {allProducts.map((p) => (
          <Kicker key={p} product={p}>
            {p}
          </Kicker>
        ))}
      </Row>
      <Row title="Product icons">
        {productIds.map((p) => (
          <ProductIcon key={p} product={p} />
        ))}
        {productIds.map((p) => (
          <ProductIcon key={`${p}-flat`} product={p} flat size={32} />
        ))}
      </Row>
      <Row title="Cards">
        <Card className="w-64">Default card</Card>
        <Card padding="tight" className="w-64">
          Tight card
        </Card>
        <Card raised className="w-64">
          Raised card
        </Card>
        {allProducts.map((p) => (
          <Card key={p} accent={p} padding="tight" className="w-48">
            {p}
          </Card>
        ))}
      </Row>
      <Row title="Callouts">
        {(["rust", "blue", "teal", "yellow", "violet", "brown", "pink", "card"] as const).map(
          (tint) => (
            <Callout key={tint} tint={tint} className="w-48">
              <p className="text-body-s">{tint}</p>
            </Callout>
          ),
        )}
      </Row>
      <div className="grid gap-6 md:grid-cols-2">
        <Console>
          <Term tone="dim">$</Term> crust tide app create immich --from-catalog{"\n"}
          <Term tone="ok">✓</Term> microVM created <Term tone="dim">(2 vCPU · 4 GiB)</Term>
          {"\n"}
          <Term tone="info">info</Term> <Term tone="warn">warn</Term> <Term tone="bad">bad</Term>
        </Console>
        <Cmd command="curl -fsSL https://example.test/install | sh" />
      </div>
      <Table>
        <thead>
          <tr>
            <Th>Name</Th>
            <Th>Isolation</Th>
            <Th num>RAM</Th>
            <Th>Status</Th>
          </tr>
        </thead>
        <tbody>
          <Tr>
            <Td>
              <strong>jellyfin</strong>
            </Td>
            <Td className="font-mono">microVM</Td>
            <Td num>3 GiB</Td>
            <Td>
              <Pill tone="ok">Running</Pill>
            </Td>
          </Tr>
          <Tr selected>
            <Td>
              <strong>home-assistant</strong>
            </Td>
            <Td className="font-mono">VM</Td>
            <Td num>4 GiB</Td>
            <Td>
              <Pill tone="warn">Updating</Pill>
            </Td>
          </Tr>
        </tbody>
      </Table>
      <Row title="Badges">
        {badges.map((b) => (
          <Badge key={b} name={b} alt={b} height={34} />
        ))}
      </Row>
    </div>
  );
}

function Kit() {
  return (
    <div id="kit">
      <Section dots band>
        <h1 className="text-display-l">UI kit</h1>
      </Section>
      <Section>
        <Gallery />
      </Section>
      <Section tone="ink" band>
        <h2 className="mb-8 text-heading-2">Inverted band (.theme-dark)</h2>
        <Gallery />
      </Section>
      <Section tone="yellow" band>
        <p className="text-heading-4">Yellow band</p>
      </Section>
      {allProducts.map((p) => (
        <Section key={p} fill={p} band padded={false} className="py-6">
          <Kicker className="text-current">Next up</Kicker>
          <p className="text-heading-2">{p} fill band</p>
        </Section>
      ))}
      <Section tone="rust" band>
        <p className="text-display-l">Rust CTA</p>
      </Section>
    </div>
  );
}
