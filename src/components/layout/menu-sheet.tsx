import { X } from "lucide-react";
import { Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { NavAnchor, type NavItem } from "./nav-anchor";

/** The menu sheet of MobileNav, in its own chunk with Radix Dialog. */
export function MenuSheet({
  open,
  onOpenChange,
  onClosed,
  items,
  isActive,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Called when the sheet has closed, to put focus back on the menu button. */
  onClosed: () => void;
  items: NavItem[];
  isActive: (item: NavItem) => boolean;
  children?: ReactNode;
}) {
  const { t } = useTranslation();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-on-fill-dark/40" />
        <Dialog.Content
          aria-describedby={undefined}
          // There's no Dialog.Trigger to return focus to, so the opener does it.
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            onClosed();
          }}
          className="fixed inset-y-0 right-0 z-50 flex w-[min(320px,85vw)] flex-col gap-6 overflow-y-auto border-l-3 border-line bg-surface-page p-6 text-ink shadow-lg"
        >
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-heading-4">{t("nav.openMenu")}</Dialog.Title>
            <Dialog.Close asChild>
              <Button size="sm" className="size-9 p-0" aria-label={t("nav.closeMenu")}>
                <X aria-hidden />
              </Button>
            </Dialog.Close>
          </div>
          <ul className="m-0 flex list-none flex-col p-0">
            {items.map((item) => (
              <li key={item.label}>
                <NavAnchor
                  target={item}
                  active={isActive(item)}
                  onClick={() => onOpenChange(false)}
                  className="block border-b-2 border-line-soft py-3 text-heading-4 text-ink no-underline"
                  activeClassName="underline decoration-3 underline-offset-8"
                >
                  {item.label}
                </NavAnchor>
              </li>
            ))}
          </ul>
          {children && <div className="flex flex-wrap gap-3">{children}</div>}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
