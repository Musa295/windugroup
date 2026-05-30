import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { Calculator as CalcIcon, Info } from "lucide-react";

export const Route = createFileRoute("/calculator")({
  head: () => ({
    meta: [
      { title: "Калькулятор окон и дверей — Windu.Group" },
      { name: "description", content: "Рассчитайте предварительную стоимость окон, дверей и балконного остекления онлайн." },
    ],
  }),
  component: CalculatorPage,
});

const productTypes = [
  { id: "pvc-window", label: "Окно ПВХ", base: 7900 },
  { id: "alu-window", label: "Алюминиевое окно", base: 9500 },
  { id: "pvc-door", label: "Дверь ПВХ", base: 18900, fixed: true },
  { id: "alu-door", label: "Алюминиевая дверь", base: 28500, fixed: true },
  { id: "balcony", label: "Остекление балкона", base: 11500 },
];

const glassOptions = [
  { id: "single", label: "Однокамерный стеклопакет", multiplier: 1 },
  { id: "double", label: "Двухкамерный энергосберегающий", multiplier: 1.18 },
  { id: "triple", label: "Трёхкамерный премиум", multiplier: 1.35 },
];

const extras = [
  { id: "mosquito", label: "Москитная сетка (в подарок)", price: 0 },
  { id: "lamination", label: "Ламинация под дерево", price: 2500 },
  { id: "install", label: "Монтаж (бесплатно по ЧР)", price: 0, checked: true },
  { id: "dismantle", label: "Демонтаж старой конструкции", price: 1500 },
];

function CalculatorPage() {
  const [type, setType] = useState(productTypes[0].id);
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(1400);
  const [glass, setGlass] = useState(glassOptions[1].id);
  const [selected, setSelected] = useState<string[]>(["mosquito", "install"]);
  const [qty, setQty] = useState(1);

  const product = productTypes.find((p) => p.id === type)!;
  const glassOpt = glassOptions.find((g) => g.id === glass)!;

  const total = useMemo(() => {
    const area = (width / 1000) * (height / 1000);
    const base = product.fixed ? product.base : product.base * Math.max(area, 0.6);
    const withGlass = base * glassOpt.multiplier;
    const extrasSum = extras.filter((e) => selected.includes(e.id)).reduce((s, e) => s + e.price, 0);
    return Math.round((withGlass + extrasSum) * qty);
  }, [type, width, height, glass, selected, qty, product, glassOpt]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
            <CalcIcon className="h-4 w-4" /> Калькулятор
          </div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Рассчитайте стоимость онлайн</h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Укажите параметры конструкции — получите предварительную стоимость за минуту.
            Точную цену сообщит менеджер после бесплатного замера.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-8 rounded-3xl border border-border bg-card p-6 md:p-8">
            <Field label="Тип конструкции">
              <div className="grid gap-2 sm:grid-cols-2">
                {productTypes.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setType(p.id)}
                    className={`rounded-xl border p-4 text-left transition-all ${
                      type === p.id ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
                    }`}
                  >
                    <div className="font-semibold">{p.label}</div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {p.fixed ? `от ${p.base.toLocaleString("ru")} ₽` : `от ${p.base.toLocaleString("ru")} ₽/м²`}
                    </div>
                  </button>
                ))}
              </div>
            </Field>

            {!product.fixed && (
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label={`Ширина: ${width} мм`}>
                  <input type="range" min={400} max={3000} step={50} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full accent-[var(--accent)]" />
                </Field>
                <Field label={`Высота: ${height} мм`}>
                  <input type="range" min={400} max={2700} step={50} value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full accent-[var(--accent)]" />
                </Field>
              </div>
            )}

            <Field label="Стеклопакет">
              <div className="space-y-2">
                {glassOptions.map((g) => (
                  <label key={g.id} className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 ${glass === g.id ? "border-accent bg-accent/5" : "border-border"}`}>
                    <span className="flex items-center gap-3 text-sm">
                      <input type="radio" name="glass" checked={glass === g.id} onChange={() => setGlass(g.id)} className="accent-[var(--accent)]" />
                      {g.label}
                    </span>
                    <span className="text-xs text-muted-foreground">×{g.multiplier}</span>
                  </label>
                ))}
              </div>
            </Field>

            <Field label="Дополнительно">
              <div className="space-y-2">
                {extras.map((e) => (
                  <label key={e.id} className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3">
                    <span className="flex items-center gap-3 text-sm">
                      <input type="checkbox" checked={selected.includes(e.id)} onChange={() => toggle(e.id)} className="accent-[var(--accent)]" />
                      {e.label}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {e.price === 0 ? "0 ₽" : `+${e.price.toLocaleString("ru")} ₽`}
                    </span>
                  </label>
                ))}
              </div>
            </Field>

            <Field label={`Количество: ${qty} шт.`}>
              <input type="range" min={1} max={20} value={qty} onChange={(e) => setQty(+e.target.value)} className="w-full accent-[var(--accent)]" />
            </Field>
          </div>

          <aside className="space-y-4 lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-3xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Предварительная стоимость</div>
              <div className="mt-2 font-display text-4xl font-bold text-accent">
                {total.toLocaleString("ru")} ₽
              </div>
              <div className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
                <Row label="Конструкция" value={product.label} />
                {!product.fixed && <Row label="Размер" value={`${width}×${height} мм`} />}
                <Row label="Стеклопакет" value={glassOpt.label} />
                <Row label="Количество" value={`${qty} шт.`} />
              </div>
              <div className="mt-5 space-y-2">
                <CallbackDialog defaultTopic={`Расчёт: ${product.label} — ${total.toLocaleString("ru")} ₽`}>
                  <Button variant="accent" size="lg" className="w-full">Заказать замер</Button>
                </CallbackDialog>
                <Button asChild variant="outline" size="lg" className="w-full">
                  <a href="tel:+79280000000">Позвонить менеджеру</a>
                </Button>
              </div>
              <div className="mt-4 flex gap-2 rounded-lg bg-accent/10 p-3 text-xs text-muted-foreground">
                <Info className="h-4 w-4 shrink-0 text-accent" />
                Это предварительный расчёт. Финальная цена — после бесплатного замера.
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-3 text-sm font-semibold">{label}</div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-right">{value}</span>
    </div>
  );
}
