import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import { works } from "@/lib/works";
import { reviews } from "@/lib/reviews";
import { products } from "@/lib/catalog";
import {
  ShieldCheck, Ruler, Truck, Gift, Percent, Wrench,
  ArrowRight, Star, Factory, Timer, BadgeCheck, Calculator,
} from "lucide-react";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Windu.Group — Окна, двери и балконы из ПВХ и алюминия в ЧР" },
      { name: "description", content: "Производство окон, дверей и балконного остекления из ПВХ и алюминия в Чеченской Республике. Рассрочка 0%, бесплатный замер, доставка и монтаж. Гарантия до 10 лет." },
    ],
  }),
  component: HomePage,
});

const advantages = [
  { icon: Percent, title: "Рассрочка 0%", text: "Беспроцентная рассрочка на любой заказ — от 3 до 12 месяцев." },
  { icon: Gift, title: "Сетки в подарок", text: "Москитные сетки бесплатно при заказе окон." },
  { icon: Ruler, title: "Замер бесплатно", text: "Выезд замерщика по всей Чеченской Республике." },
  { icon: Truck, title: "Доставка и монтаж", text: "Доставка и установка по ЧР включены в стоимость." },
  { icon: ShieldCheck, title: "Гарантия до 10 лет", text: "Официальные гарантийные обязательства на всё." },
  { icon: Factory, title: "Своё производство", text: "Без посредников — контролируем каждый этап." },
  { icon: Timer, title: "Соблюдаем сроки", text: "Чётко по договору — от замера до сдачи объекта." },
  { icon: BadgeCheck, title: "Цена без переплат", text: "Прозрачная смета, никаких скрытых платежей." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, oklch(0.68 0.16 50) 0%, transparent 40%), radial-gradient(circle at 90% 90%, oklch(0.5 0.15 220) 0%, transparent 50%)" }} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" /> Производство в Чеченской Республике
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Окна, двери и балконы из <span className="text-accent">ПВХ и алюминия</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Изготавливаем, доставим и установим под ключ по всей ЧР. Беспроцентная рассрочка, бесплатный замер и монтаж.
              <span className="block mt-2 font-semibold text-white">Надёжно · современно · с гарантией.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallbackDialog>
                <Button variant="hero" size="lg" className="h-12 px-7 text-base">
                  Бесплатный замер <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CallbackDialog>
              <Button asChild variant="outline" size="lg" className="h-12 border-white/30 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
                <Link to="/calculator"><Calculator className="mr-1 h-4 w-4" />Калькулятор</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 text-white">
              <div><div className="font-display text-3xl font-bold">15+</div><div className="text-xs uppercase tracking-wider opacity-70">лет опыта</div></div>
              <div><div className="font-display text-3xl font-bold">1200+</div><div className="text-xs uppercase tracking-wider opacity-70">объектов сдано</div></div>
              <div><div className="font-display text-3xl font-bold">10 лет</div><div className="text-xs uppercase tracking-wider opacity-70">гарантия</div></div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <img src={hero} alt="Современные окна и двери" width={1600} height={1200} className="aspect-[4/3] w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-xl bg-white p-4 shadow-2xl md:block">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent">
                  <Gift className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-display text-sm font-bold text-foreground">Москитные сетки</div>
                  <div className="text-xs text-muted-foreground">в подарок к каждому заказу</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 hidden rounded-xl bg-accent p-4 shadow-2xl md:block">
              <div className="font-display text-xs font-bold uppercase tracking-wider text-accent-foreground">Рассрочка</div>
              <div className="font-display text-3xl font-bold text-accent-foreground">0%</div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="text-xs uppercase tracking-widest text-accent">Почему мы</div>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">8 причин выбрать Windu.Group</h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {advantages.map((a) => (
            <div key={a.title} className="group rounded-2xl border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-accent">Каталог</div>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Что мы изготавливаем</h2>
            </div>
            <Link to="/catalog" className="hidden text-sm font-medium text-accent hover:underline md:inline">Весь каталог →</Link>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((p) => (
              <Link to="/catalog/$slug" params={{ slug: p.slug }} key={p.slug} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={p.image} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute right-3 top-3 rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">{p.priceFrom}</div>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{p.short}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Подробнее <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ALUMINUM HIGHLIGHT */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="overflow-hidden rounded-3xl" style={{ background: "var(--gradient-hero)" }}>
          <div className="grid gap-10 p-8 text-white md:grid-cols-2 md:p-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-accent">Алюминий · тёплый и холодный профиль</div>
              <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">
                Алюминиевые окна и двери под любые задачи
              </h2>
              <p className="mt-4 text-white/80">
                От квартир до коммерческих объектов. Остекление фасадов, витражи, окна, двери и перегородки —
                выполняем конструкции любой сложности и формы.
              </p>
              <ul className="mt-6 grid gap-2 text-sm">
                {[
                  "Тёплый и холодный алюминий",
                  "Подходит для домов, балконов, офисов и магазинов",
                  "Собственное производство — без посредников",
                  "Более 15 лет практического опыта",
                  "Гарантия до 10 лет + сервис в течение всего срока",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" /> {t}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <CallbackDialog defaultTopic="Алюминиевые конструкции">
                  <Button variant="accent" size="lg">Рассчитать стоимость</Button>
                </CallbackDialog>
                <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
                  <Link to="/promotions">Все акции</Link>
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <img src={products[3].image} alt="Алюминиевые окна" className="aspect-[3/4] w-full rounded-2xl object-cover" />
              <div className="space-y-3">
                <img src={products[7].image} alt="Фасадное остекление" className="aspect-square w-full rounded-2xl object-cover" />
                <img src={products[5].image} alt="Алюминиевые двери" className="aspect-square w-full rounded-2xl object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent">Портфолио</div>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Выполненные работы</h2>
          </div>
          <Link to="/catalog" className="hidden text-sm font-medium text-accent hover:underline md:inline">Весь каталог →</Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.slice(0, 6).map((w) => (
            <div key={w.alt} className="group overflow-hidden rounded-2xl">
              <img src={w.src} alt={w.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Отзывы</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Что говорят клиенты</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {reviews.slice(0, 6).map((r, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-5">{r.text}</p>
                <div className="mt-4 text-sm font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date} · {r.topic}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/reviews" className="text-sm font-medium text-accent hover:underline">Все отзывы →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="overflow-hidden rounded-3xl p-8 md:p-14" style={{ background: "var(--gradient-accent)" }}>
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center text-white">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Готовы рассчитать ваш заказ?</h2>
              <p className="mt-3 max-w-2xl opacity-95">
                Замер бесплатно, рассрочка 0%, монтаж и доставка — за наш счёт. Звоните или оставьте заявку.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <CallbackDialog>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">Заказать замер</Button>
              </CallbackDialog>
              <Button asChild size="lg" variant="outline" className="border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
                <Link to="/calculator"><Wrench className="mr-1 h-4 w-4" />Калькулятор</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
