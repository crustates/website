import { renderToString } from "react-dom/server";
import { describe, expect, test, vi } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";
import { render } from "@/test/render";
import { Button } from "./button";
import { Cmd } from "./cmd";
import { Pill } from "./pill";

describe("Pill", () => {
  test("always shows its label, so colour is never the only signal", async () => {
    await render(<Pill tone="ok">Running</Pill>);
    await expect.element(page.getByText("Running")).toBeVisible();
  });
});

describe("Button", () => {
  test("asChild renders the link with button styling", async () => {
    const container = await render(
      <Button asChild variant="primary">
        <a href="/download">Download</a>
      </Button>,
    );
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("/download");
    expect(link?.className).toContain("bg-brand-rust");
    expect(container.querySelector("button")).toBeNull();
  });
});

describe("Cmd", () => {
  test("has no copy button in prerendered HTML", () => {
    expect(renderToString(<Cmd command="crust ask hi" />)).not.toContain("<button");
  });

  test("copies the command without the prompt once hydrated", async () => {
    const writeText = vi.spyOn(navigator.clipboard, "writeText").mockResolvedValue();
    await render(<Cmd command="curl -fsSL https://example.test/install | sh" />);
    await page.getByRole("button", { name: "Copy command" }).click();
    expect(writeText).toHaveBeenCalledWith("curl -fsSL https://example.test/install | sh");
    await expect.element(page.getByRole("button", { name: "Copied" })).toBeVisible();
  });

  test("stays quiet when the clipboard refuses", async () => {
    vi.spyOn(navigator.clipboard, "writeText").mockRejectedValue(new DOMException("denied"));
    await render(<Cmd command="crust ask hi" />);
    await page.getByRole("button", { name: "Copy command" }).click();
    await expect.element(page.getByRole("button", { name: "Copy command" })).toBeVisible();
  });
});

describe("Button size sm", () => {
  test("stays bold at its smaller font size", async () => {
    const container = await render(<Button size="sm">GitHub</Button>);
    const button = container.querySelector("button");
    expect(button && getComputedStyle(button).fontWeight).toBe("700");
    expect(button && getComputedStyle(button).fontSize).toBe("13px");
  });
});
