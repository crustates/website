import { Menu, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { NavAnchor, type NavItem } from "./nav-anchor";

/**
 * Below the xl breakpoint, with JS, the header links move into this sheet.
 * Without JS the trigger stays hidden and the header links wrap instead.
 */
export function MobileNav({ items, children }: { items: NavItem[]; children?: ReactNode }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button size="sm" className="hidden js:max-xl:inline-flex">
          <Menu aria-hidden />
          {t("nav.openMenu")}
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-on-fill-dark/40" />
        <Dialog.Content
          aria-describedby={undefined}
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
                  onClick={() => setOpen(false)}
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
