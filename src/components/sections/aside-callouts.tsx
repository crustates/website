import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Rich } from "@/components/rich";
import { Callout } from "@/components/ui/callout";
import { Cmd } from "@/components/ui/cmd";

/** Yellow "Ask the assistant" callout with an example question. */
export function AskAssistant({ body, command }: { body: string; command: string }) {
  const { t } = useTranslation();
  return (
    <Callout tint="yellow" className="flex-col gap-2">
      <strong>{t("productPage.ask.title")}</strong>
      <p className="text-body-s">
        <Rich text={body} />
      </p>
      <Cmd command={command} className="w-full" />
    </Callout>
  );
}

/** "Same API everywhere" callout linking to the API page. */
export function SameApi() {
  const { t } = useTranslation();
  return (
    <Callout tint="card" className="flex-col gap-2">
      <strong>{t("productPage.api.title")}</strong>
      <p className="text-body-s">
        <Rich text={t("productPage.api.body")} />
      </p>
      <Link to="/api/" className="text-body-s">
        {t("productPage.api.link")}
      </Link>
    </Callout>
  );
}
