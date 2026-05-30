import { createFileRoute, Link } from "@tanstack/react-router";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import {
  Percent, Gift, Truck, Ruler, ShieldCheck, Wrench, Timer, Sparkles, BadgeCheck,
} from "lucide-react";

export const Route = createFileRoute("/promotions")({
  head: () => ({
    meta: [
      { title: "Акции и выгодные условия — Windu.Group" },
      { name: "description", content: "Беспроцентная рассрочка, бесплатный замер, монтаж и доставка, москитные сетки в подарок и гарантия до 10 лет." },
    ],
  }),
  component: PromotionsPage,
});

const offers = [
  {
    icon: Percent,
    title: "Беспроцентная рассрочка",
    text: "0% переплаты. Подберём удобный график платежей под ваш бюджет — от 3 до 12 месяцев.",
    badge: "0%",
  },
  {
    icon: Gift,
    title: "Москитные сетки в подарок",
    text: "Классические москитные сетки бесплатно ко всем заказам окон ПВХ и алюминия.",
    badge: "В подарок",
  },
  {
    icon: Ruler,
    title: "Бесплатный замер",
    text: "Выезд замерщика по всей Чеченской Республике — 0 ₽. Подробная консультация на объекте.",
    badge: "0 ₽",
  },
  {
    icon: Truck,
    title: "Доставка и монтаж в подарок",
    text: "Доставка и профессиональная установка по всей ЧР включены в стоимость заказа.",
    badge: "Включено",
  },
  {
    icon: ShieldCheck,
    title: "Гарантия до 10 лет",
    text: "Официальные обязательства на конструкции, фурнитуру и монтаж. Документально оформляем гарантию.",
    badge: "10 лет",
  },
  {
    icon: Wrench,
    title: "Сервис в течение гарантии",
    text: "Обслуживание и ремонт ваших окон и дверей в течение всего гарантийного периода.",
    badge: "Сервис",
  },
  {
    icon: Timer,
    title: "Соблюдаем сроки",
    text: "Работаем чётко по договору. От замера до монтажа — без сорванных сроков и задержек.",
    badge: "В срок",
  },
  {
    icon: BadgeCheck,
    title: "Стоимость без переплат",
    text: "Прозрачная смета без скрытых платежей. Цена в договоре = цена при сдаче объекта.",
    badge: "Честно",
  },
];

function PromotionsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 30% 20%, oklch(0.68 0.16 50) 0%, transparent 40%)" }} />
        <div className="relative mx-auto max-w-7xl px-4 text-white">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
            <Sparkles className="h-3.5 w-3.5" /> Действует постоянно
          </div>
          <h1 className="mt-5 font-display text-4xl font-bold leading-tight md:text-5xl">
            Акции и <span className="text-accent">выгодные условия</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/80">
            Мы делаем работу качественно и берём ответственность за результат — а вам предлагаем лучшие условия в Чеченской Республике.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <div key={o.title} className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
              <div className="absolute right-5 top-5 rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                {o.badge}
              </div>
              <div className="grid h-14 w-14 place-items-center rounded-xl bg-accent text-accent-foreground">
                <o.icon className="h-7 w-7" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold">{o.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12" style={{ background: "var(--gradient-accent)" }}>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center text-white">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Все выгоды в одном заказе</h2>
              <p className="mt-3 max-w-2xl opacity-90">
                Оставьте заявку — посчитаем стоимость с учётом всех акций, подарков и индивидуальной рассрочки.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CallbackDialog defaultTopic="Заявка по акции">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">Получить расчёт</Button>
              </CallbackDialog>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/calculator">Калькулятор</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
