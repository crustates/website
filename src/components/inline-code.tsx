/**
 * Text from content files with Markdown-style `code` spans. Translated UI
 * strings use <Rich> instead; content never goes through i18next.
 */
export function InlineCode({ text }: { text: string }) {
  return text.split("`").map((part, i) => (i % 2 ? <code key={i}>{part}</code> : part));
}
