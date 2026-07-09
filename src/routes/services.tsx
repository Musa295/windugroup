import { createFileRoute, Link } from "@tanstack/react-router";
import { serviceCategories } from "@/lib/services";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import { ArrowRight, Calculator, ChevronRight } from "lucide-react";

const faq = [
  { q: "Сколько стоят окна ПВХ или алюминиевые в Грозном?", a: "Стоимость зависит от типа профиля, размера, стеклопакета и фурнитуры. Стандартное двустворчатое ПВХ-окно — от 8 900 ₽, панорамное — от 22 000 ₽ за м². Точный расчёт даём бесплатно после замера или через онлайн-калькулятор." },
  { q: "Замер и доставка платные?", a: "Нет. Выезд замерщика и доставка по Грозному и всей Чеченской Республике — бесплатно при заказе конструкций." },
  { q: "Какая гарантия на окна и монтаж?", a: "Гарантия на профиль и фурнитуру — до 10 лет, на монтажные работы — 3 года. Мы обслуживаем клиентов весь срок гарантии." },
  { q: "Работаете ли вы с рассрочкой?", a: "Да, рассрочка 0% на срок до 12 месяцев без переплат и без банка — прямо от компании." },
  { q: "Сколько занимает изготовление и установка?", a: "Стандартный срок — 5–10 рабочих дней от замера до сдачи объекта. Витражи и нестандартные конструкции — от 14 дней." },
  { q: "Можно ли заказать нестандартные размеры и формы?", a: "Да, мы производим арочные, трапециевидные, круглые окна и любые нестандартные конфигурации по вашему проекту." },
];

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Услуги: окна, двери, балконы и витражи в Грозном | Windu.Group" },
      { name: "description", content: "Полный каталог услуг Windu.Group в Чеченской Республике: пластиковые и алюминиевые окна, входные и раздвижные двери, тёплые и холодные балконы, витражи, входные группы и остекление балконов. Замер бесплатно, гарантия до 10 лет, рассрочка 0%." },
      { name: "keywords", content: "окна ПВХ Грозный, алюминиевые окна Чечня, входные группы, витражи, остекление балконов, панорамные окна, HS-портал, безрамное остекление, тёплый алюминий, двустворчатые окна, поворотно-откидные окна" },
      { property: "og:title", content: "Услуги Windu.Group — окна, двери, балконы и витражи в ЧР" },
      { property: "og:description", content: "Все виды окон, дверей, балконов и витражей в Чеченской Республике. Замер и монтаж бесплатно, рассрочка 0%, гарантия до 10 лет." },
      { property: "og:url", content: `${SITE.origin}/services` },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/services` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Услуги Windu.Group",
          itemListElement: serviceCategories.flatMap((cat, ci) =>
            cat.items.map((s, si) => ({
              "@type": "ListItem",
              position: ci * 20 + si + 1,
              url: `${SITE.origin}/services/${cat.slug}/${s.slug}`,
              name: `${cat.title} — ${s.title}`,
            })),
          ),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Windu.Group",
          url: `${SITE.origin}/services`,
          telephone: SITE.phone,
          email: SITE.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Грозный",
            addressRegion: "Чеченская Республика",
            addressCountry: "RU",
          },
          areaServed: "Чеченская Республика",
          priceRange: "₽₽",
        }),
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <section className="border-b border-border bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Услуги · подробный каталог</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            Окна, двери, балконы и витражи в Чеченской Республике
          </h1>
          <p className="mt-4 max-w-3xl text-white/80">
            От двустворчатого окна ПВХ до безрамного панорамного балкона и структурного витража на фасаде здания —
            производим и монтируем весь спектр светопрозрачных конструкций в Грозном и по всей Чеченской Республике.
          </p>
          <nav className="mt-6 flex flex-wrap gap-2 text-sm">
            {serviceCategories.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full border border-white/25 bg-white/5 px-4 py-1.5 backdrop-blur transition-colors hover:border-accent hover:text-accent"
              >
                {c.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-7xl space-y-20 px-4 py-16">
        {serviceCategories.map((cat) => (
          <div key={cat.slug} id={cat.slug} className="scroll-mt-24">
            <div className="flex items-end justify-between gap-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-accent">Категория</div>
                <h2 className="mt-1 font-display text-3xl font-bold md:text-4xl">{cat.title}</h2>
                <p className="mt-3 max-w-3xl text-muted-foreground">{cat.intro}</p>
              </div>
              <CallbackDialog defaultTopic={cat.title}>
                <Button variant="accent" size="lg" className="hidden shrink-0 md:inline-flex">
                  Рассчитать стоимость
                </Button>
              </CallbackDialog>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cat.items.map((s) => (
                <article
                  key={s.slug}
                  className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-2xl">
                      {s.emoji}
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-tight">
                      <Link
                        to="/services/$category/$sub"
                        params={{ category: cat.slug, sub: s.slug }}
                        className="hover:text-accent"
                      >
                        {s.title}
                      </Link>
                    </h3>
                  </div>
                  <p className="mt-4 flex-1 text-sm text-muted-foreground">{s.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <Link
                      to="/services/$category/$sub"
                      params={{ category: cat.slug, sub: s.slug }}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline"
                    >
                      Подробнее <ChevronRight className="h-4 w-4" />
                    </Link>
                    <Link
                      to="/calculator"
                      className="text-xs text-muted-foreground hover:text-accent"
                    >
                      <Calculator className="mr-1 inline h-3.5 w-3.5" />Калькулятор
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Быстрая заявка с выбором типа */}
            <QuickLeadForm
              categoryTitle={cat.title}
              productTypes={cat.items.map((i) => ({ slug: i.slug, title: i.title }))}
            />

            <p className="mt-4 text-xs text-muted-foreground">
              Ключевые запросы: <span className="italic">{cat.seo}</span>
            </p>
          </div>
        ))}

        {/* FAQ */}
        <div>
          <div className="text-xs uppercase tracking-widest text-accent">Частые вопросы</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Отвечаем на вопросы клиентов</h2>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {faq.map((f) => (
              <details key={f.q} className="group rounded-2xl border border-border bg-card p-5 open:shadow-[var(--shadow-soft)]">
                <summary className="cursor-pointer list-none font-display text-base font-semibold text-foreground">
                  <span className="mr-2 text-accent">▸</span>{f.q}
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>

        <div className="rounded-3xl p-8 md:p-14" style={{ background: "var(--gradient-accent)" }}>
          <div className="grid gap-6 text-white md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Не нашли нужный тип конструкции?</h2>
              <p className="mt-3 opacity-95">
                Мы изготавливаем окна и двери нестандартных форм и размеров под ваш проект. Позвоните — обсудим задачу.
              </p>
            </div>
            <CallbackDialog>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Обсудить проект <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </CallbackDialog>
          </div>
        </div>
      </section>
    </>
  );
}
