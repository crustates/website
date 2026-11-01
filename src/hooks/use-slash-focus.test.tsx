import { useRef } from "react";
import { expect, test } from "vite-plus/test";
import { userEvent } from "vite-plus/test/browser/context";
import { render } from "@/test/render";
import { useSlashFocus } from "./use-slash-focus";

function Search() {
  const input = useRef<HTMLInputElement>(null);
  useSlashFocus(input);
  return (
    <>
      <input aria-label="Search" ref={input} />
      <input aria-label="Other" />
    </>
  );
}

test('"/" focuses the search box, but not while typing in another field', async () => {
  const container = await render(<Search />);
  const [search, other] = container.querySelectorAll("input");
  await userEvent.keyboard("/");
  expect(document.activeElement).toBe(search);
  other!.focus();
  await userEvent.keyboard("/");
  expect(document.activeElement).toBe(other);
  expect(other!.value).toBe("/");
});
