import type { ReactNode } from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import "@/i18n";

/** Mounts a component into the test page and returns its container. */
export async function render(ui: ReactNode): Promise<HTMLElement> {
  const container = document.createElement("div");
  document.body.append(container);
  await act(async () => createRoot(container).render(ui));
  return container;
}
