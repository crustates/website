import {
  RouterProvider,
  createMemoryHistory,
  createRootRoute,
  createRouter,
} from "@tanstack/react-router";
import { expect, test } from "vite-plus/test";
import { page } from "vite-plus/test/browser/context";
import { NavAnchor } from "@/components/layout/nav-anchor";
import { render } from "@/test/render";
import { StaticButton } from "./static-button";
import { Table, Td } from "./table";

test("a static button in an illustration is text, not a control", async () => {
  const container = await render(<StaticButton variant="primary">Review plan</StaticButton>);
  await expect.element(page.getByText("Review plan")).toBeVisible();
  expect(container.querySelector("button, a, [tabindex]")).toBeNull();
});

test("a row header cell is a th with row scope", async () => {
  const container = await render(
    <Table>
      <tbody>
        <tr>
          <Td rowHeader>Architectures</Td>
          <Td>amd64 and arm64</Td>
        </tr>
      </tbody>
    </Table>,
  );
  const th = container.querySelector("th");
  expect(th?.getAttribute("scope")).toBe("row");
  expect(th?.textContent).toBe("Architectures");
});

test("a nav item shown as current for its section says so to screen readers", async () => {
  const container = await render(
    <NavAnchor target={{ href: "#features" }} active activeClassName="underline">
      Features
    </NavAnchor>,
  );
  expect(container.querySelector("a")?.getAttribute("aria-current")).toBe("true");
});

test("a nav item can point at a section of another page", async () => {
  const routeTree = createRootRoute({
    component: () => <NavAnchor target={{ to: "/community/", hash: "sponsor" }}>Sponsor</NavAnchor>,
  });
  const router = createRouter({
    routeTree,
    history: createMemoryHistory(),
    trailingSlash: "always",
  });
  await render(<RouterProvider router={router} />);
  await expect
    .element(page.getByRole("link", { name: "Sponsor" }))
    .toHaveAttribute("href", "/community/#sponsor");
});

test("a nav item for a section isn't marked as the current page", async () => {
  const routeTree = createRootRoute({
    component: () => (
      <>
        <NavAnchor target={{ to: "/community/" }}>Contribute</NavAnchor>
        <NavAnchor target={{ to: "/community/", hash: "sponsor" }}>Sponsor</NavAnchor>
      </>
    ),
  });
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: ["/community/"] }),
    trailingSlash: "always",
  });
  await render(<RouterProvider router={router} />);
  await expect
    .element(page.getByRole("link", { name: "Contribute" }))
    .toHaveAttribute("aria-current", "page");
  await expect
    .element(page.getByRole("link", { name: "Sponsor" }))
    .not.toHaveAttribute("aria-current");
});
