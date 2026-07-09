import { createFileRoute, Link } from "@tanstack/react-router";
import { serviceCategories } from "@/lib/services";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Услуги — окна, двери, балконы и витражи в Грозном | Windu.Group" },
      { name: "description", content: "Полный каталог услуг Windu.Group: пластиковые и алюминиевые окна, входные и раздвижные двери, тёплые и холодные балконы, витражи, входные группы и остекление балконов в Чеченской Республике." },
      { name: "keywords", content: "окна ПВХ Грозный, алюминиевые окна Чечня, входные группы, витражи, остекление балконов, панорамные окна, HS-портал, безрамное остекление, тёплый алюминий" },
      { property: "og:title", content: "Услуги Windu.Group — окна, двери, балконы и витражи" },
      { property: "og:description", content: "Все виды окон, дверей, балконов и витражей в Чеченской Республике. Замер и монтаж бесплатно, рассрочка 0%." },
      { property: "og:url", content: `${SITE.origin}/services` },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/services` }],
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
            Все виды окон, дверей и остекления в ЧР
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
                <article key={s.slug} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elevated)]">
                  <div className="flex items-center gap-3">
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-2xl">
                      {s.emoji}
                    </div>
                    <h3 className="font-display text-lg font-semibold leading-tight">{s.title}</h3>
                  </div>
                  <p className="mt-4 flex-1 text-sm text-muted-foreground">{s.description}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <CallbackDialog defaultTopic={`${cat.title} — ${s.title}`}>
                      <button className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                        Заказать <ArrowRight className="h-4 w-4" />
                      </button>
                    </CallbackDialog>
                    <Link
                      to="/calculator"
                      className="text-xs text-muted-foreground hover:text-accent"
                    >
                      Калькулятор →
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Ключевые запросы: <span className="italic">{cat.seo}</span>
            </p>
          </div>
        ))}

        <div className="rounded-3xl p-8 md:p-14" style={{ background: "var(--gradient-accent)" }}>
          <div className="grid gap-6 text-white md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Не нашли нужный тип конструкции?</h2>
              <p className="mt-3 opacity-95">
                Мы изготавливаем окна и двери нестандартных форм и размеров под ваш проект. Позвоните — обсудим задачу.
              </p>
            </div>
            <CallbackDialog>
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">Обсудить проект</Button>
            </CallbackDialog>
          </div>
        </div>
      </section>
    </>
  );
}
