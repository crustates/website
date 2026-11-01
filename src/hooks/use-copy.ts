import { useEffect, useState } from "react";

/**
 * Copy `text` to the clipboard. `mounted` is false in the prerendered HTML:
 * render the copy button only once it's true, so no page shows a dead button.
 */
export function useCopy(text: string) {
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setMounted(true), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return; // Clipboard blocked: the text is still there to select.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return { mounted, copied, copy };
}
