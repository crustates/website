import { useTranslation } from "react-i18next";
import type { Post } from "@/content";

/** Author initials in a yellow circle; the name is always written next to it. */
export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      aria-hidden="true"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border-thin border-line bg-accent-yellow text-[14px] font-bold text-on-fill-dark"
    >
      {initials}
    </span>
  );
}

/** A post's date; drafts may still say "[DATE]". */
export function PostDate({ date }: { date: string }) {
  const { i18n } = useTranslation();
  if (date === "[DATE]") return date;
  const long = new Intl.DateTimeFormat(i18n.language, { dateStyle: "long", timeZone: "UTC" });
  return <time dateTime={date}>{long.format(new Date(date))}</time>;
}

/** The post's product name, or its category when it has no product. */
export function PostTopic({ post }: { post: Post }) {
  const { t } = useTranslation();
  return post.product ? t(`products.${post.product}`) : post.category;
}
