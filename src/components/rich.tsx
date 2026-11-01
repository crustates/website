import { Trans } from "react-i18next";

/** Renders a translated string that contains inline <code> tags. */
export function Rich({ text }: { text: string }) {
  return <Trans defaults={text} components={{ code: <code /> }} />;
}
