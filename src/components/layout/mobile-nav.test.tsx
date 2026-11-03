import { afterEach, beforeEach, expect, test } from "vite-plus/test";
import { page, userEvent } from "vite-plus/test/browser/context";
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

test("closes on Escape and puts focus back on the menu button", async () => {
  await render(<MobileNav items={items} />);
  const button = page.getByRole("button", { name: "Menu" });
  await button.click();
  await expect.element(page.getByRole("dialog", { name: "Menu" })).toBeVisible();
  await userEvent.keyboard("{Escape}");
  await expect.element(page.getByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
  await expect.element(button).toHaveFocus();
});
