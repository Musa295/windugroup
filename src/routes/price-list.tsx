import { createFileRoute, Link } from "@tanstack/react-router";
import { products } from "@/lib/catalog";
import { serviceCategories } from "@/lib/services";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import { SITE } from "@/lib/site";
import { Download, FileText, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/price-list")({
  head: () => ({
    meta: [
      { title: "Прайс-лист на окна, двери и москитные сетки — Windu.Group" },
      { name: "description", content: "Актуальный прайс-лист Windu.Group: цены на окна ПВХ и алюминиевые, двери, балконы и москитные сетки в Чеченской Республике." },
      { property: "og:title", content: "Прайс-лист — Windu.Group" },
      { property: "og:description", content: "Актуальные цены на окна, двери и москитные сетки в ЧР." },
      { property: "og:url", content: `${SITE.origin}/price-list` },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/price-list` }],
  }),
  component: PriceListPage,
});

const groups = ["Окна", "Двери", "Балконы", "Сетки"] as const;

function PriceListPage() {
  return (
    <>
      <section className="border-b border-border bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
            <FileText className="h-4 w-4" /> Прайс-лист
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            Прайс-лист на окна, двери и москитные сетки
          </h1>
          <p className="mt-4 max-w-3xl text-white/80">
            Стартовые цены на все виды продукции. Финальная стоимость зависит от размеров и параметров —
            уточнит менеджер после бесплатного замера.
          </p>
        </div>
      </section>
      {/* Subcategory quick links */}
      <section className="border-b border-border bg-surface py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Подпункты по категориям</div>
          <h2 className="mt-1 font-display text-lg font-bold">Быстрый переход к нужному подвиду</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((cat) => (
              <details key={cat.slug} className="group rounded-2xl border border-border bg-card p-4 open:shadow-[var(--shadow-soft)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 font-display text-sm font-semibold">
                  <span>{cat.title}</span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-accent transition-transform group-open:rotate-90" />
                </summary>
                <ul className="mt-3 space-y-1.5">
                  {cat.items.map((s) => (
                    <li key={s.slug}>
                      <Link
                        to="/catalog/$category/$sub"
                        params={{ category: cat.slug, sub: s.slug }}
                        className="text-xs text-muted-foreground hover:text-accent"
                      >
                        {s.emoji} {s.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        {groups.map((g) => {
          const items = products.filter((p) => p.category === g);
          if (!items.length) return null;
          return (
            <div key={g} className="mb-12">
              <h2 className="font-display text-2xl font-bold md:text-3xl">{g}</h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card">
                <table className="w-full text-sm">
                  <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
                    <tr>
                      <th className="px-5 py-3">Позиция</th>
                      <th className="px-5 py-3 hidden md:table-cell">Кратко</th>
                      <th className="px-5 py-3 text-right">Цена от</th>
                      <th className="px-5 py-3 text-right">&nbsp;</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((p, i) => (
                      <tr key={p.slug} className={i % 2 ? "bg-surface/40" : ""}>
                        <td className="px-5 py-4 font-medium">
                          <Link to="/catalog/$slug" params={{ slug: p.slug }} className="hover:text-accent">
                            {p.title}
                          </Link>
                        </td>
                        <td className="px-5 py-4 hidden text-muted-foreground md:table-cell">{p.short}</td>
                        <td className="px-5 py-4 text-right font-semibold text-accent">{p.priceFrom}</td>
                        <td className="px-5 py-4 text-right">
                          <Link
                            to="/calculator"
                            search={{ product: p.slug }}
                            className="text-sm text-accent hover:underline"
                          >
                            Рассчитать →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <div className="font-display text-lg font-semibold">Нужен индивидуальный расчёт?</div>
            <p className="text-sm text-muted-foreground">Пришлём точный прайс под ваш объект в течение 15 минут.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <CallbackDialog defaultTopic="Прайс-лист">
              <Button variant="accent" size="lg" className="gap-2">
                <Download className="h-4 w-4" /> Получить полный прайс
              </Button>
            </CallbackDialog>
            <Button asChild variant="outline" size="lg">
              <Link to="/calculator">Открыть калькулятор</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
