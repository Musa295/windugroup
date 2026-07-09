import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingMessengers } from "@/components/FloatingMessengers";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Windu.Group — Окна ПВХ, алюминиевые окна и двери в Грозном | Чеченская Республика" },
      { name: "description", content: "Окна ПВХ и алюминиевые окна, двери, балконы и витражи в Грозном и по всей Чеченской Республике. Собственное производство, рассрочка 0%, бесплатный замер, гарантия до 10 лет." },
      { name: "keywords", content: "окна Грозный, окна ПВХ Чечня, алюминиевые окна Грозный, пластиковые окна Чеченская Республика, остекление балконов Грозный, входные двери Грозный, витражи для бизнеса Чечня, Windu.Group" },
      { name: "author", content: "Windu.Group" },
      { name: "geo.region", content: "RU-CE" },
      { name: "geo.placename", content: "Грозный" },
      { name: "geo.position", content: "43.3168;45.6981" },
      { name: "ICBM", content: "43.3168, 45.6981" },
      { property: "og:site_name", content: "Windu.Group" },
      { property: "og:locale", content: "ru_RU" },
      { property: "og:title", content: "Windu.Group — Окна и двери в Грозном | Чеченская Республика" },
      { property: "og:description", content: "Производство и установка окон, дверей и балконов из ПВХ и алюминия. Рассрочка 0%, замер бесплатно, гарантия до 10 лет." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Windu.Group — Окна и двери в Чеченской Республике" },
      { name: "twitter:description", content: "Окна ПВХ, алюминий, двери, балконы, витражи. Замер бесплатно, рассрочка 0%." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@500;600;700;800&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "@id": "https://windugroup.lovable.app/#business",
          name: "Windu.Group",
          description: "Производство и установка окон, дверей, балконных систем и витражей из ПВХ и алюминия в Чеченской Республике.",
          image: "https://windugroup.lovable.app/favicon.png",
          url: "https://windugroup.lovable.app",
          telephone: "+7 938 004-40-40",
          email: "info@windu.group",
          areaServed: [
            { "@type": "AdministrativeArea", name: "Чеченская Республика" },
            { "@type": "City", name: "Грозный" },
          ],
          address: {
            "@type": "PostalAddress",
            addressCountry: "RU",
            addressRegion: "Чеченская Республика",
            addressLocality: "Грозный",
          },
          geo: { "@type": "GeoCoordinates", latitude: 43.3168, longitude: 45.6981 },
          openingHours: "Mo-Su 09:00-20:00",
          priceRange: "₽₽",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
      <FloatingMessengers />
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
