import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { products, type Product } from "@/lib/catalog";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог окон, дверей и балконов — Windu.Group" },
      { name: "description", content: "Каталог окон, дверей и балконных систем из ПВХ и алюминия. Подробные характеристики и фото каждого товара." },
    ],
  }),
  component: CatalogPage,
});

const filters = ["Все", "Окна", "Двери", "Балконы", "Сетки"] as const;

function CatalogPage() {
  const [active, setActive] = useState<(typeof filters)[number]>("Все");
  const visible = active === "Все" ? products : products.filter((p) => p.category === active);

  return (
    <>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Каталог продукции</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Окна, двери и балконы</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Изготавливаем оконные и дверные конструкции любых размеров и форм из ПВХ и алюминия.
            Бесплатный замер и доставка по всей Чеченской Республике.
          </p>

          <div className="mt-8 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                  active === f
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-background hover:border-accent hover:text-accent"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>
    </>
  );
}

function ProductCard({ p }: { p: Product }) {
  return (
    <Link
      to="/catalog/$slug"
      params={{ slug: p.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={p.image}
          alt={p.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
          {p.category}
        </div>
        <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">
          {p.priceFrom}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl font-bold">{p.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{p.short}</p>
        <ul className="mt-4 space-y-1.5">
          {p.features.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> {f}
            </li>
          ))}
        </ul>
        <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          Подробнее <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
