import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { findSubService, serviceCategories, type SubService } from "@/lib/services";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import { QuickLeadForm } from "@/components/QuickLeadForm";
import slide1 from "@/assets/hero-slides/slide1.png.asset.json";
import slide2 from "@/assets/hero-slides/slide2.png.asset.json";
import slide3 from "@/assets/hero-slides/slide3.png.asset.json";
import slide4 from "@/assets/hero-slides/slide4.png.asset.json";
import { ArrowRight, CheckCircle2, ChevronRight, ShieldCheck, Target, Timer, Wrench } from "lucide-react";

const gallery = [slide1.url, slide2.url, slide3.url, slide4.url];

const faqTemplate = (title: string, category: string) => [
  { q: `Сколько стоит ${title.toLowerCase()} в Грозном?`, a: `Стоимость зависит от размеров, профиля и стеклопакета. Точный расчёт по вашему объекту делаем бесплатно после замера. Ориентировочная цена — от 8 900 ₽ за стандартную конструкцию.` },
  { q: `Какие сроки изготовления?`, a: `Стандартный срок для «${title}» — 5–10 рабочих дней от замера до монтажа. Нестандартные размеры и цвета — до 14 дней.` },
  { q: `Даёте ли гарантию?`, a: `Да, до 10 лет на профиль и фурнитуру, 3 года на монтаж. Сервисная поддержка весь срок гарантии.` },
  { q: `Работаете ли по всей Чеченской Республике?`, a: `Да, монтаж «${title}» и остальных конструкций из категории «${category}» выполняем в Грозном, Аргуне, Гудермесе, Урус-Мартане, Шали и по всем районам ЧР.` },
];

export const Route = createFileRoute("/catalog/$category/$sub")({
  loader: ({ params }) => {
    const found = findSubService(params.category, params.sub);
    if (!found) throw notFound();
    return found;
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Не найдено — Windu.Group" }, { name: "robots", content: "noindex" }] };
    }
    const { cat, item } = loaderData;
    const url = `${SITE.origin}/catalog/${params.category}/${params.sub}`;
    const title = `${item.title} — ${cat.title} в Грозном | Windu.Group`;
    const desc = `${item.description} ${item.longDescription ?? ""} Замер и доставка по Чеченской Республике бесплатно, гарантия до 10 лет, рассрочка 0%.`.slice(0, 300);
    const faq = faqTemplate(item.title, cat.title);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { name: "keywords", content: [...item.keywords, cat.title, "Грозный", "Чеченская Республика", "Windu Group"].join(", ") },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "product" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${cat.title} — ${item.title}`,
            description: item.longDescription ?? item.description,
            url,
            areaServed: { "@type": "AdministrativeArea", name: "Чеченская Республика" },
            provider: {
              "@type": "LocalBusiness",
              name: "Windu.Group",
              telephone: SITE.phone,
              address: { "@type": "PostalAddress", addressLocality: "Грозный", addressRegion: "Чеченская Республика", addressCountry: "RU" },
            },
            category: cat.title,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Главная", item: SITE.origin },
              { "@type": "ListItem", position: 2, name: "Каталог", item: `${SITE.origin}/catalog` },
              { "@type": "ListItem", position: 3, name: cat.title, item: `${SITE.origin}/catalog#${cat.slug}` },
              { "@type": "ListItem", position: 4, name: item.title, item: url },
            ],
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
      ],
    };
  },
  component: SubPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Раздел не найден</h1>
      <p className="mt-3 text-muted-foreground">Возможно, страница была перемещена. Перейдите в каталог.</p>
      <Button asChild className="mt-6" variant="accent"><Link to="/catalog">В каталог</Link></Button>
    </div>
  ),
});

const benefits = [
  { icon: ShieldCheck, title: "Гарантия до 10 лет", text: "На профиль, стеклопакет и фурнитуру. Сервис по гарантии — весь срок." },
  { icon: Timer, title: "Срок 5–10 дней", text: "От замера до сдачи объекта. Работаем чётко по договору." },
  { icon: Wrench, title: "Штатные монтажники", text: "Никаких подрядчиков. Замер, изготовление и монтаж — одной командой." },
];

function SubPage() {
  const { cat, item } = Route.useLoaderData();
  const faq = faqTemplate(item.title, cat.title);
  const siblings = cat.items.filter((i: SubService) => i.slug !== item.slug);

  return (
    <>
      {/* Breadcrumbs */}
      <section className="border-b border-border bg-surface py-3 text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <nav className="flex flex-wrap items-center gap-1">
            <Link to="/" className="hover:text-accent">Главная</Link>
            <ChevronRight className="h-3 w-3" />
            <Link to="/catalog" className="hover:text-accent">Каталог</Link>
            <ChevronRight className="h-3 w-3" />
            <a href={`/catalog#${cat.slug}`} className="hover:text-accent">{cat.title}</a>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground">{item.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="border-b border-border bg-primary py-14 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">{cat.title}</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
            <span className="mr-2">{item.emoji}</span>{item.title}
          </h1>
          <p className="mt-4 max-w-3xl text-white/85">{item.longDescription ?? item.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <CallbackDialog defaultTopic={`${cat.title} — ${item.title}`}>
              <Button variant="accent" size="lg">Рассчитать стоимость <ArrowRight className="ml-1 h-4 w-4" /></Button>
            </CallbackDialog>
            <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
              <Link to="/calculator">Онлайн-калькулятор</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Differences + Best-for */}
      {(item.differences?.length || item.bestFor?.length) && (
        <section className="mx-auto max-w-7xl px-4 py-14">
          <div className="grid gap-6 md:grid-cols-2">
            {item.differences?.length ? (
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                  <Target className="h-4 w-4" /> Чем отличается
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold">Отличия от других вариантов</h2>
                <ul className="mt-5 space-y-3">
                  {item.differences.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {item.bestFor?.length ? (
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
                  <ShieldCheck className="h-4 w-4" /> Где применяется
                </div>
                <h2 className="mt-2 font-display text-2xl font-bold">Лучшие сценарии использования</h2>
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.bestFor.map((b) => (
                    <span key={b} className="rounded-full border border-border bg-surface px-3 py-1.5 text-sm">
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Specs table */}
      {item.specs?.length ? (
        <section className="bg-surface py-14">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-xs uppercase tracking-widest text-accent">Характеристики</div>
            <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Технические параметры</h2>
            <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
              <table className="w-full text-sm">
                <tbody>
                  {item.specs.map((s, i) => (
                    <tr key={s.label} className={i % 2 ? "bg-surface/50" : ""}>
                      <td className="border-b border-border/50 px-5 py-4 font-medium text-muted-foreground md:w-1/3">{s.label}</td>
                      <td className="border-b border-border/50 px-5 py-4">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ) : null}

      {/* Benefits */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-5 md:grid-cols-3">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                <b.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Галерея работ</div>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Наши объекты</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {gallery.map((src, idx) => (
              <div key={src} className="overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)]">
                <img
                  src={src}
                  alt={`${item.title} — пример работы №${idx + 1} от Windu.Group`}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick form */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-xs uppercase tracking-widest text-accent">Оформить заявку</div>
        <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Рассчитайте стоимость «{item.title}»</h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">Выберите тип, оставьте телефон — пришлём точный расчёт и запишем на бесплатный замер.</p>
        <QuickLeadForm
          categoryTitle={cat.title}
          productTypes={cat.items.map((i: SubService) => ({ slug: i.slug, title: i.title }))}
          defaultType={item.title}
        />
      </section>

      {/* Interlinking */}
      <section className="bg-surface py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Смотрите также</div>
          <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Другие виды: {cat.title}</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {siblings.map((s: SubService) => (
              <Link
                key={s.slug}
                to="/catalog/$category/$sub"
                params={{ category: cat.slug, sub: s.slug }}
                className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-accent hover:shadow-[var(--shadow-elevated)]"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-xl">{s.emoji}</div>
                <div className="flex-1">
                  <div className="font-display font-semibold group-hover:text-accent">{s.title}</div>
                  <div className="line-clamp-1 text-xs text-muted-foreground">{s.description}</div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-accent" />
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="outline"><Link to="/catalog">Весь каталог</Link></Button>
            <Button asChild variant="accent"><Link to="/calculator">Онлайн-калькулятор</Link></Button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 py-14">
        <div className="text-xs uppercase tracking-widest text-accent">Частые вопросы</div>
        <h2 className="mt-2 font-display text-2xl font-bold md:text-3xl">Вопросы про «{item.title}»</h2>
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
      </section>
    </>
  );
}
