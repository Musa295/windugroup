import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/catalog";
import { serviceCategories } from "@/lib/services";
import { SITE } from "@/lib/site";

const BASE_URL = SITE.origin;

const staticPaths = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/catalog", changefreq: "weekly", priority: "0.9" },
  { path: "/calculator", changefreq: "monthly", priority: "0.8" },
  { path: "/price-list", changefreq: "weekly", priority: "0.8" },
  { path: "/promotions", changefreq: "weekly", priority: "0.7" },
  { path: "/portfolio", changefreq: "monthly", priority: "0.7" },
  { path: "/equipment", changefreq: "monthly", priority: "0.6" },
  { path: "/reviews", changefreq: "monthly", priority: "0.6" },
  { path: "/contacts", changefreq: "yearly", priority: "0.6" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          ...staticPaths,
          ...products.map((p) => ({ path: `/catalog/${p.slug}`, changefreq: "monthly", priority: "0.7" })),
          ...serviceCategories.flatMap((cat) =>
            cat.items.map((s) => ({
              path: `/services/${cat.slug}/${s.slug}`,
              changefreq: "monthly",
              priority: "0.75",
            })),
          ),
        ];
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
