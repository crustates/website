import { useTranslation } from "react-i18next";
import { Section } from "@/components/ui/section";
import { href } from "@/lib/site";
import { CardGrid } from "./card-grid";

/** A few questions on a sunken band, with a link to the full FAQ. */
export function FaqStrip({
  heading,
  items,
}: {
  heading: string;
  items: readonly { title: string; body: string }[];
}) {
  const { t } = useTranslation();
  return (
    <Section tone="sunken" band wrapClassName="flex flex-col gap-7">
      <h2 className="text-heading-2">{heading}</h2>
      <CardGrid items={items} cols={2} />
      {/* Plain link until /faq lands in part 3. */}
      <a href={href("/faq")} className="self-start">
        {t("productPage.faqLink")}
      </a>
    </Section>
  );
}
