import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { applyTheme, currentTheme, type Theme } from "@/lib/theme";

/** Light/dark switch. Needs JS, so it renders only after hydration. */
export function ThemeToggle() {
  const { t } = useTranslation();
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => setTheme(currentTheme()), []);

  if (!theme) return <span aria-hidden="true" className="hidden size-9 js:inline-block" />;
  const next: Theme = theme === "dark" ? "light" : "dark";
  return (
    <Button
      size="sm"
      className="size-9 p-0"
      aria-label={next === "dark" ? t("theme.toDark") : t("theme.toLight")}
      onClick={() => {
        applyTheme(next);
        setTheme(next);
      }}
    >
      {theme === "dark" ? <Sun aria-hidden /> : <Moon aria-hidden />}
    </Button>
  );
}
