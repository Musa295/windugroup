import { createFileRoute } from "@tanstack/react-router";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { Wrench, Zap, Hand, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/equipment")({
  head: () => ({
    meta: [
      { title: "Оборудование для производства окон и дверей — Windu.Group" },
      { name: "description", content: "Продажа оборудования для производства окон и дверей в Чеченской Республике: пресс ручной пробивочный, углообжимной станок, пневматический пресс." },
    ],
  }),
  component: EquipmentPage,
});

const items = [
  {
    icon: Hand,
    title: "Пресс ручной пробивочный для алюминиевых профилей",
    text: "Компактный станок для пробивки технологических отверстий в алюминиевых профилях. Подходит для небольших производств и мастерских.",
    specs: ["Ручной привод", "Сменные пуансоны и матрицы", "Подходит для всех типов алюминия", "Простое обслуживание"],
  },
  {
    icon: Wrench,
    title: "Углообжимной станок",
    text: "Станок для соединения алюминиевых профилей под углом 90°. Обеспечивает прочное и герметичное угловое соединение оконных и дверных рам.",
    specs: ["Регулировка усилия обжима", "Сменные ножи", "Точное позиционирование", "Для серийного производства"],
  },
  {
    icon: Zap,
    title: "Пресс пневматический пробивочный для алюминия",
    text: "Высокопроизводительный пневматический пресс для серийной пробивки отверстий в алюминиевых профилях. Скорость и точность для крупного производства.",
    specs: ["Пневматический привод", "Высокая производительность", "Точная пробивка", "Сменная оснастка"],
  },
];

function EquipmentPage() {
  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Оборудование</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Станки для производства окон и дверей</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Поставляем проверенное в работе оборудование для производства алюминиевых и ПВХ конструкций. Доставка по Чеченской Республике и регионам РФ.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-6 px-4 py-16">
        {items.map((it) => (
          <article key={it.title} className="grid gap-6 rounded-3xl border border-border bg-card p-6 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
            <div className="grid h-20 w-20 place-items-center rounded-2xl bg-accent/10 text-accent">
              <it.icon className="h-10 w-10" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold md:text-2xl">{it.title}</h2>
              <p className="mt-2 text-muted-foreground">{it.text}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {it.specs.map((s) => (
                  <li key={s} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <CallbackDialog defaultTopic={`Оборудование: ${it.title}`}>
              <Button variant="accent" size="lg">Запросить цену</Button>
            </CallbackDialog>
          </article>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <div className="rounded-3xl border border-border bg-surface p-8 text-center md:p-12">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Нужна консультация по оборудованию?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Подберём станки под ваш объём производства, расскажем о сроках поставки и гарантии.
          </p>
          <div className="mt-6 flex justify-center">
            <CallbackDialog defaultTopic="Консультация по оборудованию">
              <Button variant="accent" size="lg">Получить консультацию</Button>
            </CallbackDialog>
          </div>
        </div>
      </section>
    </>
  );
}
