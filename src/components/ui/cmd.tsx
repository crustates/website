import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

/**
 * A single shell command. The copy button only appears after hydration, so
 * the prerendered page never shows a button that does nothing.
 */
export function Cmd({ command, className }: { command: string; className?: string }) {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => setMounted(true), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      return; // Clipboard blocked: the command is still there to select.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className={cn("min-w-0 rounded-md border-thick border-line shadow-md", className)}>
      <div className="theme-dark flex h-full items-center gap-3 rounded-[3px] bg-surface-sunken py-3.5 pr-3 pl-4 font-mono text-[14px] leading-5">
        <span aria-hidden="true" className="text-accent-yellow">
          $
        </span>
        <code className="min-w-0 flex-1 [overflow-wrap:anywhere]">{command}</code>
        {mounted && (
          <button
            type="button"
            onClick={copy}
            aria-label={copied ? t("copy.copied") : t("copy.command")}
            className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm border-thin border-line bg-surface-card text-ink"
          >
            {copied ? (
              <Check aria-hidden className="size-4" />
            ) : (
              <Copy aria-hidden className="size-4" />
            )}
          </button>
        )}
        <span role="status" className="sr-only">
          {copied ? t("copy.copied") : ""}
        </span>
      </div>
    </div>
  );
}
