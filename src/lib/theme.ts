export type Theme = "light" | "dark";
const STORAGE_KEY = "theme";

/**
 * Runs inline in <head> before first paint: marks that JS runs (data-js) and
 * applies a stored theme choice, so there is no flash of the wrong theme.
 * Without a stored choice the CSS follows prefers-color-scheme.
 */
export const themeScript = `(function(){var d=document.documentElement;d.setAttribute("data-js","");try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="light"||t==="dark")d.setAttribute("data-theme",t)}catch(e){}})()`;

export function currentTheme(): Theme {
  const stored = document.documentElement.dataset.theme;
  if (stored === "light" || stored === "dark") return stored;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked; the choice then lasts for this page only.
  }
}
