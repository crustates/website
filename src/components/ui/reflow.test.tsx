import { expect, test } from "vite-plus/test";
import { render } from "@/test/render";
import { Button } from "./button";
import { Cmd } from "./cmd";
import { Console } from "./console";

// WCAG 1.4.10: nothing may force sideways page scrolling at phone widths.
test("a long button label wraps instead of overflowing", async () => {
  const container = await render(
    <div style={{ width: 200 }}>
      <Button size="sm">Compare with Proxmox, TrueNAS and Unraid →</Button>
    </div>,
  );
  expect(container.querySelector("button")!.getBoundingClientRect().width).toBeLessThanOrEqual(200);
});

test("console and command blocks shrink inside a grid and scroll inside", async () => {
  const container = await render(
    <div style={{ width: 200, display: "grid" }}>
      <Console>{"x".repeat(200)}</Console>
      <Cmd command={"y".repeat(200)} />
    </div>,
  );
  for (const block of container.querySelectorAll(":scope > div > *")) {
    expect(block.getBoundingClientRect().width).toBeLessThanOrEqual(200);
  }
});
