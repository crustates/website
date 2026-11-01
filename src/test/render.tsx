import type { ReactNode } from "react";
import { act } from "react";
import { createRoot } from "react-dom/client";
import "@/i18n";
import "@/styles/app.css";

/** Mounts a component into an emptied test page and returns its container. */
export async function render(ui: ReactNode): Promise<HTMLElement> {
  document.body.replaceChildren();
  const container = document.createElement("div");
  document.body.append(container);
  await act(async () => createRoot(container).render(ui));
  return container;
}
