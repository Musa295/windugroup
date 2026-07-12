import { createFileRoute, Link } from "@tanstack/react-router";
import { worksByCategory } from "@/lib/works";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Портфолио выполненных работ — Windu.Group" },
      { name: "description", content: "Реальные фото установленных окон и дверей из ПВХ и алюминия от Windu.Group в Чеченской Республике." },
      { property: "og:title", content: "Портфолио — Windu.Group" },
      { property: "og:description", content: "Фото выполненных объектов: окна, двери, балконы и витражи." },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Портфолио</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Наши выполненные работы</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Более 15 лет опыта, тысячи установленных окон и дверей в Чеченской Республике.
            Каждый объект — от замера до монтажа — реализуем силами собственной бригады.
          </p>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2 max-w-2xl">
            {["Собственное производство", "Работаем без посредников", "Гарантия до 10 лет", "Замер и доставка бесплатно"].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-14 px-4 py-16">
        {worksByCategory.map((group) => (
          <div key={group.category}>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent">Категория</div>
                <h2 className="mt-1 font-display text-2xl font-bold md:text-3xl">{group.category}</h2>
              </div>
              <span className="text-xs text-muted-foreground">{group.items.length} фото</span>
            </div>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {group.items.map((w, i) => (
                <div key={i} className="group overflow-hidden rounded-2xl border border-border bg-card">
                  <img
                    src={w.src}
                    alt={w.alt}
                    loading="lazy"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-3 text-xs text-muted-foreground md:text-sm">{w.alt}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="bg-primary py-14 text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 text-center">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Хотите такой же результат у себя?</h2>
          <p className="max-w-xl opacity-85">
            Оставьте заявку — приедем на бесплатный замер и предложим лучшее решение под ваш объект.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CallbackDialog defaultTopic="Заявка с портфолио">
              <Button variant="accent" size="lg">Заказать замер</Button>
            </CallbackDialog>
            <Button asChild variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10">
              <Link to="/catalog">Смотреть каталог</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
