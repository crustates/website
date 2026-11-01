import { expect, test } from "vite-plus/test";
import { userEvent } from "vite-plus/test/browser/context";
import { render } from "@/test/render";
import { Console } from "./console";
import { Section } from "./section";

test("a scrolling console shows its focus ring inside its clipped frame", async () => {
  await render(
    <div style={{ width: 200 }}>
      <Console>{"x".repeat(200)}</Console>
    </div>,
  );
  await userEvent.tab();
  const pre = document.querySelector("pre");
  expect(document.activeElement).toBe(pre);
  expect(getComputedStyle(pre!).outlineStyle).toBe("solid");
  expect(getComputedStyle(pre!).outlineOffset).toBe("-3px");
});

test("controls on a filled band use the band's text colour as focus ring", async () => {
  const container = await render(
    <>
      <Section fill="tide">
        <button type="button">On blue</button>
      </Section>
      <Section tone="rust">
        <button type="button">On rust</button>
      </Section>
    </>,
  );
  const [onBlue, onRust] = container.querySelectorAll("button");
  expect(getComputedStyle(onBlue!).getPropertyValue("--focus-ring").trim()).toBe("#FFF6E5");
  expect(getComputedStyle(onRust!).getPropertyValue("--focus-ring").trim()).toBe("#111111");
});
