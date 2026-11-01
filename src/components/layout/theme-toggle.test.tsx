import { afterEach, expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";
import { render } from "@/test/render";
import { ThemeToggle } from "./theme-toggle";

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  localStorage.clear();
});

test("switches from light to dark and remembers the choice", async () => {
  document.documentElement.setAttribute("data-theme", "light");
  await render(<ThemeToggle />);
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  expect(localStorage.getItem("theme")).toBe("dark");
  await expect.element(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
});

test("starts from the stored choice", async () => {
  document.documentElement.setAttribute("data-theme", "dark");
  await render(<ThemeToggle />);
  await expect.element(page.getByRole("button", { name: "Switch to light theme" })).toBeVisible();
});
