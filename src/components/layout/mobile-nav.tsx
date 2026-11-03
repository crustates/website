import { Menu } from "lucide-react";
import {
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import type { MenuSheet as Sheet } from "./menu-sheet";
import type { NavItem } from "./nav-anchor";

// Radix Dialog loads on the first open, so no page downloads it up front.
const MenuSheet = lazy<(props: ComponentProps<typeof Sheet>) => ReactNode>(() =>
  import("./menu-sheet").then(
    (m) => ({ default: m.MenuSheet }),
    () => ({ default: HeaderLinks }),
  ),
);

/**
 * When the sheet can't load (a deploy replaced its chunk, or the network
 * dropped), switch the header to its no-JS layout, where the links wrap.
 */
function HeaderLinks() {
  useEffect(() => document.documentElement.removeAttribute("data-js"), []);
  return null;
}

/**
 * Below the xl breakpoint, with JS, the header links move into this sheet.
 * Without JS the trigger stays hidden and the header links wrap instead.
 */
export function MobileNav({
  items,
  isActive = () => false,
  children,
}: {
  items: NavItem[];
  /** Whether an item's section contains the current page. */
  isActive?: (item: NavItem) => boolean;
  children?: ReactNode;
}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  return (
    <>
      <Button
        ref={button}
        size="sm"
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => {
          setOpened(true);
          setOpen(true);
        }}
        className="hidden js:max-xl:inline-flex"
      >
        <Menu aria-hidden />
        {t("nav.openMenu")}
      </Button>
      {opened && (
        <Suspense>
          <MenuSheet
            open={open}
            onOpenChange={setOpen}
            onClosed={() => button.current?.focus()}
            items={items}
            isActive={isActive}
          >
            {children}
          </MenuSheet>
        </Suspense>
      )}
    </>
  );
}
