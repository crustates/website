import { expect, test } from "vite-plus/test";
import { render } from "@/test/render";
import { InlineCode } from "./change-list";

test("turns `backtick` spans into code elements and keeps the rest as text", async () => {
  const container = await render(
    <p>
      <InlineCode text="Names under `crust.internal` and `mDNS`." />
    </p>,
  );
  expect([...container.querySelectorAll("code")].map((c) => c.textContent)).toEqual([
    "crust.internal",
    "mDNS",
  ]);
  expect(container.textContent).toBe("Names under crust.internal and mDNS.");
});
