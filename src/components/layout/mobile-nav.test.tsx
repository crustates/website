import { afterEach, beforeEach, expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";
import { render } from "@/test/render";
import { MobileNav } from "./mobile-nav";

beforeEach(() => document.documentElement.setAttribute("data-js", ""));
afterEach(() => document.documentElement.removeAttribute("data-js"));

const items = [
  { label: "Features", href: "#features" },
  { label: "Docs", href: "#docs" },
];

test("opens a menu with the site links and closes when one is picked", async () => {
  await render(<MobileNav items={items} />);
  await page.getByRole("button", { name: "Menu" }).click();
  const dialog = page.getByRole("dialog", { name: "Menu" });
  await expect.element(dialog).toBeVisible();
  await expect.element(dialog.getByRole("link", { name: "Docs" })).toBeVisible();
  await dialog.getByRole("link", { name: "Features" }).click();
  await expect.element(dialog).not.toBeInTheDocument();
});
