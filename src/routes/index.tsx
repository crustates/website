import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Crustates" }] }),
  component: Home,
});

function Home() {
  return <h1>Crustates</h1>;
}
