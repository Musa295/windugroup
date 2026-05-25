import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import { works } from "@/lib/works";
import { reviews } from "@/lib/reviews";
import { SITE } from "@/lib/site";
import {
  ShieldCheck, Ruler, Truck, Gift, Percent, Wrench,
  CheckCircle2, ArrowRight, Star, Phone, MessageCircle, Send,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Windu.Group — Окна и двери ПВХ и алюминий в Чеченской Республике" },
      { name: "description", content: "Производство окон и дверей из ПВХ и алюминия в ЧР. Рассрочка 0%, москитные сетки в подарок, бесплатный замер и установка." },
    ],
  }),
  component: HomePage,
});

const advantages = [
  { icon: Percent, title: "Рассрочка 0%", text: "Беспроцентная рассрочка на любой заказ окон и дверей." },
  { icon: Gift, title: "Сетки в подарок", text: "Классические москитные сетки бесплатно при заказе окон." },
  { icon: Ruler, title: "Замер бесплатно", text: "Выезд замерщика по всей Чеченской Республике — 0 ₽." },
  { icon: Truck, title: "Доставка и монтаж", text: "Доставка и установка по всей ЧР включены в стоимость." },
  { icon: ShieldCheck, title: "Гарантия 5 лет", text: "Официальная гарантия на конструкции и фурнитуру." },
  { icon: Wrench, title: "Своё производство", text: "Контролируем качество на каждом этапе изготовления." },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "var(--gradient-hero)" }}>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 20% 10%, oklch(0.68 0.16 50) 0%, transparent 40%), radial-gradient(circle at 90% 90%, oklch(0.5 0.15 220) 0%, transparent 50%)" }} />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 md:py-28 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" /> Производство в Чеченской Республике
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Окна и двери из <span className="text-accent">ПВХ и алюминия</span> под ключ
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Изготовим, доставим и установим по всей ЧР бесплатно. Рассрочка 0%, москитные сетки и замер — в подарок.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallbackDialog>
                <Button variant="hero" size="lg" className="h-12 px-7 text-base">
                  Бесплатный замер <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CallbackDialog>
              <Button asChild variant="outline" size="lg" className="h-12 border-white/30 bg-white/5 px-7 text-base text-white hover:bg-white/10 hover:text-white">
                <Link to="/catalog">Смотреть каталог</Link>
              </Button>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-white/15 pt-6 text-white">
              <div><div className="font-display text-3xl font-bold">7+</div><div className="text-xs uppercase tracking-wider opacity-70">лет на рынке</div></div>
              <div><div className="font-display text-3xl font-bold">1200+</div><div className="text-xs uppercase tracking-wider opacity-70">объектов сдано</div></div>
              <div><div className="font-display text-3xl font-bold">5 лет</div><div className="text-xs uppercase tracking-wider opacity-70">гарантия</div></div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-3">
              <img src={works[0].src} alt={works[0].alt} className="aspect-[3/4] w-full rounded-2xl object-cover shadow-2xl" />
              <div className="space-y-3">
                <img src={works[3].src} alt={works[3].alt} className="aspect-square w-full rounded-2xl object-cover shadow-2xl" />
                <img src={works[6].src} alt={works[6].alt} className="aspect-square w-full rounded-2xl object-cover shadow-2xl" />
              </div>
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
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent">Почему мы</div>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">6 причин выбрать Windu.Group</h2>
          </div>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map((a) => (
            <div key={a.title} className="group rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <a.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-surface py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Каталог</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Что мы изготавливаем</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Окна ПВХ", text: "Энергосберегающие, любые формы и размеры", img: works[5].src },
              { title: "Алюминиевые окна", text: "Холодные и тёплые системы для любых задач", img: works[6].src },
              { title: "Двери ПВХ", text: "Входные и межкомнатные с фурнитурой премиум", img: works[0].src },
              { title: "Алюминиевые двери", text: "Витражные группы, входные двери, перегородки", img: works[4].src },
            ].map((c) => (
              <Link to="/catalog" key={c.title} className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Подробнее <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent">Портфолио</div>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Наши работы</h2>
          </div>
          <Link to="/catalog" className="hidden text-sm font-medium text-accent hover:underline md:inline">Все работы →</Link>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {works.slice(0, 6).map((w) => (
            <div key={w.alt} className="group overflow-hidden rounded-2xl">
              <img src={w.src} alt={w.alt} loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
      </section>

      {/* EQUIPMENT TEASER */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 md:grid-cols-2 md:items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent">Оборудование для производства</div>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Станки для производства окон и дверей</h2>
            <p className="mt-4 max-w-lg text-white/80">
              Продаём проверенное оборудование для производства алюминиевых и ПВХ конструкций: прессы пробивочные, углообжимные станки и пневматику.
            </p>
            <Button asChild variant="hero" size="lg" className="mt-6 h-12 px-7">
              <Link to="/equipment">Смотреть оборудование</Link>
            </Button>
          </div>
          <ul className="space-y-3">
            {[
              "Пресс ручной пробивочный для алюминиевых профилей",
              "Углообжимной станок",
              "Пресс пневматический пробивочный для алюминия",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-base">{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="mx-auto max-w-7xl px-4 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent">Отзывы</div>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Что говорят клиенты</h2>
          </div>
          <Link to="/reviews" className="hidden text-sm font-medium text-accent hover:underline md:inline">Все отзывы →</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.slice(0, 6).map((r) => (
            <article key={r.name + r.date} className="rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">{r.text}</p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date} · {r.topic}</div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-3xl p-10 md:p-16" style={{ background: "var(--gradient-hero)" }}>
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 80% 50%, oklch(0.68 0.16 50) 0%, transparent 50%)" }} />
          <div className="relative grid gap-8 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div className="text-white">
              <h2 className="font-display text-3xl font-bold md:text-4xl">Готовы рассчитать ваш заказ?</h2>
              <p className="mt-3 max-w-lg text-white/80">
                Оставьте заявку — перезвоним в течение 15 минут и согласуем удобное время для бесплатного замера.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <CallbackDialog>
                <Button variant="hero" size="lg" className="h-12 w-full"><Phone className="h-4 w-4" /> Заказать звонок</Button>
              </CallbackDialog>
              <div className="grid grid-cols-2 gap-3">
                <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a href={SITE.telegram} target="_blank" rel="noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/30 bg-white/10 text-sm font-medium text-white backdrop-blur transition-colors hover:bg-white/20">
                  <Send className="h-4 w-4" /> Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
