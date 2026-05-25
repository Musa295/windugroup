import { createFileRoute } from "@tanstack/react-router";
import { works } from "@/lib/works";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/catalog")({
  head: () => ({
    meta: [
      { title: "Каталог окон и дверей — Windu.Group" },
      { name: "description", content: "Каталог окон и дверей из ПВХ и алюминия: оконные конструкции, входные и витражные двери. Производство в Чеченской Республике." },
    ],
  }),
  component: CatalogPage,
});

const categories = [
  {
    title: "Окна ПВХ",
    text: "Энергосберегающие профили 60–70 мм с двух- и трёхкамерными стеклопакетами. Подходят для жилых домов, квартир и коммерческих объектов.",
    features: ["Профили 60/70 мм", "Энергосберегающие стеклопакеты", "Фурнитура с микропроветриванием", "Ламинация под дерево"],
  },
  {
    title: "Алюминиевые окна",
    text: "Холодные и тёплые системы для остекления балконов, террас, веранд и витражей. Высокая прочность и долговечность.",
    features: ["Тёплый и холодный алюминий", "Системы Provedal, Alutech", "Раздвижные и поворотные", "Любые размеры"],
  },
  {
    title: "Двери ПВХ",
    text: "Входные двери в дома, тамбурные двери, балконные и межкомнатные. Цвета под дерево или классический белый.",
    features: ["Усиленный профиль", "Многоточечный запор", "Уплотнители по периметру", "Декоративные раскладки"],
  },
  {
    title: "Алюминиевые двери",
    text: "Входные двери, витражные группы и перегородки для офисов, кафе, магазинов и частных домов.",
    features: ["Тёплый алюминий", "Доводчики и петли премиум", "Большие площади остекления", "Стойкость к нагрузкам"],
  },
];

function CatalogPage() {
  return (
    <>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Каталог продукции</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Окна и двери из ПВХ и алюминия</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Изготавливаем оконные и дверные конструкции любых размеров и форм. Бесплатный замер и доставка по всей Чеченской Республике.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-8 px-4 py-16">
        {categories.map((c, i) => (
          <div key={c.title} className="grid items-center gap-8 rounded-3xl border border-border bg-card p-6 md:grid-cols-2 md:p-10">
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <img src={works[(i * 2) % works.length].src} alt={c.title} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">{c.title}</h2>
              <p className="mt-3 text-muted-foreground">{c.text}</p>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {c.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <CallbackDialog defaultTopic={`Интересует: ${c.title}`}>
                  <Button variant="accent">Рассчитать стоимость</Button>
                </CallbackDialog>
              </div>
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Галерея выполненных работ</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((w) => (
            <div key={w.alt} className="group overflow-hidden rounded-2xl">
              <img src={w.src} alt={w.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
