import { Trans } from "react-i18next";

/** Renders a translated string with inline <code> (and <strong>, which Trans keeps by default). */
export function Rich({ text }: { text: string }) {
  return <Trans defaults={text} components={{ code: <code /> }} />;
}
