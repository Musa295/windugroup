import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/services/$")({
  beforeLoad: ({ params }) => {
    const rest = params._splat ? `/${params._splat}` : "";
    throw redirect({ href: `/catalog${rest}`, statusCode: 301 });
  },
  component: () => null,
});
