import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { links } from "@/lib/links";
import { asset } from "@/lib/site";

/**
 * Where to hear about new posts. The design has an email sign-up here.
 * TODO: newsletter. Replace with a sign-up once there is a list; no third-party form.
 */
export function FollowBand({ tone }: { tone: "ink" | "rust" }) {
  const { t } = useTranslation("blog");
  return (
    <Section
      tone={tone}
      className={tone === "rust" ? "border-t-3 border-line" : undefined}
      wrapClassName="flex flex-wrap items-center justify-between gap-8"
    >
      <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2.5">
        <h2 className="text-heading-1">{t("follow.heading")}</h2>
        <p className={tone === "ink" ? "text-body-s text-ink-muted" : "text-body-l"}>
          {t("follow.body")}
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button asChild variant={tone === "ink" ? "primary" : "default"}>
          <a href={asset("/blog/rss.xml")} type="application/rss+xml">
            {t("follow.rss")}
          </a>
        </Button>
        <Button asChild>
          <a href={`${links.github}/releases`}>{t("follow.github")}</a>
        </Button>
      </div>
    </Section>
  );
}
