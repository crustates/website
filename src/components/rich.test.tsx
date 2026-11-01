import { expect, test } from "vite-plus/test";
import { render } from "@/test/render";
import { Rich } from "./rich";

test("turns <code> tags into code elements and keeps the rest as text", async () => {
  const container = await render(
    <Rich text={'Names like <code>jellyfin.crust.internal</code> and "quotes"'} />,
  );
  expect(container.querySelector("code")?.textContent).toBe("jellyfin.crust.internal");
  expect(container.textContent).toBe('Names like jellyfin.crust.internal and "quotes"');
});

test("turns <strong> tags into strong elements", async () => {
  const container = await render(<Rich text="after the update to <strong>10.11.2</strong>." />);
  expect(container.querySelector("strong")?.textContent).toBe("10.11.2");
});
