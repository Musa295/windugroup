import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { serviceCategories, type SubService } from "@/lib/services";
import { products, type Product } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/catalog/")({
  head: () => ({
    meta: [
      { title: "Каталог: окна, двери, балконы и витражи в Грозном | Windu.Group" },
      { name: "description", content: "Единый каталог Windu.Group: пластиковые и алюминиевые окна, входные и раздвижные двери, тёплые и холодные балконы, витражи, входные группы, остекление балконов и готовые изделия с ценой. Замер бесплатно, гарантия до 10 лет." },
      { name: "keywords", content: "каталог окон Грозный, окна ПВХ, алюминиевые окна, входные группы, витражи, остекление балконов, панорамные окна, HS-портал, безрамное остекление" },
      { property: "og:title", content: "Каталог Windu.Group — окна, двери, балконы, витражи" },
      { property: "og:description", content: "Все виды светопрозрачных конструкций в Чеченской Республике. Каталог, характеристики, цены." },
      { property: "og:url", content: `${SITE.origin}/catalog` },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/catalog` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Каталог Windu.Group",
          itemListElement: serviceCategories.flatMap((cat, ci) =>
            cat.items.map((s, si) => ({
              "@type": "ListItem",
              position: ci * 20 + si + 1,
              url: `${SITE.origin}/catalog/${cat.slug}/${s.slug}`,
              name: `${cat.title} — ${s.title}`,
            })),
          ),
        }),
      },
    ],
  }),
  component: CatalogPage,
});

// Метаданные для фильтров: тип изделия и материал
const CAT_META: Record<string, { type: "window" | "door" | "balcony" | "vitrage" | "entrance"; materials: ("pvc" | "alu")[] }> = {
  "plastikovye-okna": { type: "window", materials: ["pvc"] },
  "alyuminievye-okna": { type: "window", materials: ["alu"] },
  "alyuminievye-dveri": { type: "door", materials: ["alu", "pvc"] },
  "vitrazhi": { type: "vitrage", materials: ["alu"] },
  "vkhodnye-gruppy": { type: "entrance", materials: ["alu", "pvc"] },
  "osteklenie-balkonov": { type: "balcony", materials: ["pvc", "alu"] },
};

const TYPE_OPTIONS = [
  { id: "all", label: "Все изделия" },
  { id: "window", label: "🪟 Окна" },
  { id: "door", label: "🚪 Двери" },
  { id: "balcony", label: "🏠 Балконы" },
  { id: "vitrage", label: "🏢 Витражи" },
  { id: "entrance", label: "🚪 Входные группы" },
] as const;

const MAT_OPTIONS = [
  { id: "all", label: "Любой материал" },
  { id: "pvc", label: "Пластик (ПВХ)" },
  { id: "alu", label: "Алюминий" },
] as const;

function CatalogPage() {
  const [active, setActive] = useState<string>("all");
  const [typeF, setTypeF] = useState<string>("all");
  const [matF, setMatF] = useState<string>("all");

  const filtered = serviceCategories.filter((c) => {
    const meta = CAT_META[c.slug];
    if (active !== "all" && c.slug !== active) return false;
    if (typeF !== "all" && meta?.type !== typeF) return false;
    if (matF !== "all" && !meta?.materials.includes(matF as "pvc" | "alu")) return false;
    return true;
  });

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Каталог продукции</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            Окна, двери, балконы и витражи
          </h1>
          <p className="mt-4 max-w-3xl text-white/80">
            Единый каталог всех решений Windu.Group — от двустворчатого окна ПВХ до безрамного панорамного балкона и структурного витража.
            Отфильтруйте по типу изделия и материалу — и переходите к нужному подвиду.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-30 border-b border-border bg-background/95 py-3 backdrop-blur">
        <div className="mx-auto max-w-7xl space-y-2 px-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Тип:</span>
            {TYPE_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setTypeF(o.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition ${
                  typeF === o.id ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background hover:border-accent hover:text-accent"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Материал:</span>
            {MAT_OPTIONS.map((o) => (
              <button
                key={o.id}
                onClick={() => setMatF(o.id)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition ${
                  matF === o.id ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background hover:border-accent hover:text-accent"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Категория:</span>
            <button
              onClick={() => setActive("all")}
              className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition ${
                active === "all" ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background hover:border-accent hover:text-accent"
              }`}
            >
              Все
            </button>
            {serviceCategories.map((c) => (
              <button
                key={c.slug}
                onClick={() => setActive(c.slug)}
                className={`whitespace-nowrap rounded-full border px-3 py-1 text-xs font-medium transition ${
                  active === c.slug ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background hover:border-accent hover:text-accent"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Empty state */}
      {filtered.length === 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 text-center">
          <p className="text-lg font-semibold">Ничего не найдено под выбранные фильтры</p>
          <p className="mt-2 text-sm text-muted-foreground">Сбросьте фильтры или выберите другой тип / материал.</p>
          <button
            onClick={() => { setActive("all"); setTypeF("all"); setMatF("all"); }}
            className="mt-4 rounded-full border border-accent bg-accent px-5 py-2 text-sm font-semibold text-accent-foreground"
          >
            Сбросить фильтры
          </button>
        </section>
      )}


      {/* Categories */}
      <section className="mx-auto max-w-7xl space-y-16 px-4 py-16">
        {filtered.map((cat) => (
          <div key={cat.slug} id={cat.slug} className="scroll-mt-36">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent">Категория</div>
                <h2 className="mt-1 font-display text-3xl font-bold md:text-4xl">{cat.title}</h2>
                <p className="mt-3 max-w-3xl text-muted-foreground">{cat.intro}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((s: SubService) => (
                <Link
                  key={s.slug}
                  to="/catalog/$category/$sub"
                  params={{ category: cat.slug, sub: s.slug }}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-2xl">
                      {s.emoji}
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-tight group-hover:text-accent">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-4 flex-1 text-sm text-muted-foreground">{s.description}</p>
                  {s.bestFor?.length ? (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {s.bestFor.slice(0, 3).map((b) => (
                        <span key={b} className="rounded-full bg-surface px-2.5 py-0.5 text-[11px] text-muted-foreground">
                          {b}
                        </span>
                      ))}
                    </div>
                  ) : null}
                  <div className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    Подробнее <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Ready-made products */}
      <section className="border-t border-border bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Готовые изделия с ценой</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Готовые решения</h2>
          <p className="mt-3 max-w-3xl text-muted-foreground">
            Популярные конфигурации со стартовой ценой — берите как есть или используйте как ориентир для расчёта под ваш проём.
          </p>
          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.map((p: Product) => (
              <Link
                key={p.slug}
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
                  <h3 className="font-display text-lg font-bold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.short}</p>
                  <ul className="mt-3 space-y-1.5">
                    {p.features.slice(0, 2).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                    К товару <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
