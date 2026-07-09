import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  beforeLoad: () => {
    throw redirect({ href: "/catalog", statusCode: 301 });
  },
  component: () => null,
});
