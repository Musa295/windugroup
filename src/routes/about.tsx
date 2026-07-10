import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Award, Factory, ShieldCheck, Users, Truck, HeartHandshake, Star, Timer } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "О компании Windu.Group — производство окон и дверей в Чеченской Республике" },
      { name: "description", content: "Windu.Group — производство и установка окон ПВХ, алюминиевых окон, дверей, балконов и витражей в Грозном и по всей Чеченской Республике с 2018 года. гарантия до 10 лет, рассрочка 0%." },
      { name: "keywords", content: "Windu Group, о компании, производство окон Грозный, окна ПВХ Чечня, алюминиевые окна ЧР, установка окон Грозный, оконная компания Чеченская Республика, окна под ключ Грозный, монтаж окон Чечня" },
      { property: "og:title", content: "О компании Windu.Group — окна и двери в Грозном" },
      { property: "og:description", content: "Производство и установка окон, дверей и балконов в Чеченской Республике с 2018 года. гарантия 10 лет." },
      { property: "og:url", content: `${SITE.origin}/about` },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/about` }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "О компании Windu.Group",
          url: `${SITE.origin}/about`,
          mainEntity: {
            "@type": "LocalBusiness",
            name: "Windu.Group",
            image: `${SITE.origin}/favicon.png`,
            telephone: SITE.phone,
            email: SITE.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Грозный",
              addressRegion: "Чеченская Республика",
              addressCountry: "RU",
            },
            areaServed: "Чеченская Республика",
            foundingDate: "2018",
          },
        }),
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Factory, title: "Собственное производство", text: "Полный цикл — от резки профиля до отгрузки. Никаких посредников и наценок." },
  { icon: ShieldCheck, title: "Гарантия до 10 лет", text: "Официальный договор и сервисное сопровождение весь срок гарантии." },
  { icon: Users, title: "Штатная команда", text: "Замерщики, инженеры, монтажники и сервисная бригада — все в штате компании." },
  { icon: Timer, title: "Соблюдаем сроки", text: "Чётко по договору: от замера до сдачи объекта под ключ, без переносов." },
  { icon: Truck, title: "Доставка и монтаж по ЧР", text: "Работаем в Грозном, Аргуне, Гудермесе, Урус-Мартане, Шали и по всем районам." },
  { icon: HeartHandshake, title: "Клиент важнее сделки", text: "Не продаём «дороже» — предлагаем то, что действительно нужно вашему объекту." },
];

const milestones = [
  { year: "2018", text: "Открытие компании в Грозном, первый производственный цех и монтажная бригада." },
  { year: "2020", text: "Запуск линии по производству алюминиевых конструкций и витражей." },
  { year: "2022", text: "Более 500 сданных объектов. Расширение сервиса до всей Чеченской Республики." },
  { year: "2024", text: "Ввод второго цеха, партнёрство с ведущими европейскими и российскими поставщиками профилей." },
  { year: "2026", text: "Расширение продуктовой линейки, гарантия увеличена до 10 лет, запуск онлайн-калькулятора и премиум-линейки." },
];

function AboutPage() {
  return (
    <>
      <section className="border-b border-border bg-primary py-16 text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 md:grid-cols-2 md:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-accent">
              <Award className="h-4 w-4" /> О компании
            </div>
            <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">
              Windu.Group — производство окон и дверей в Чеченской Республике
            </h1>
            <p className="mt-5 max-w-2xl text-white/85">
              Мы производим и устанавливаем окна ПВХ, алюминиевые окна, входные двери, балконы, витражи и входные группы в Грозном и по всей Чеченской Республике с 2018 года.
              За плечами команды — наши объекты: квартиры, частные дома, магазины, кафе, офисы и бизнес-центры.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallbackDialog>
                <Button variant="accent" size="lg">Заказать замер</Button>
              </CallbackDialog>
              <Button asChild size="lg" variant="outline" className="border-white/30 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                <Link to="/portfolio">Наши работы</Link>
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
            <Stat n="С 2018" l="на рынке" />
            <Stat n="10 лет" l="гарантия" />
            <Stat n="0%" l="рассрочка" />
            <Stat n="4.9" l="рейтинг клиентов" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <div className="text-xs uppercase tracking-widest text-accent">Наша миссия</div>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Сделать современное остекление доступным в каждом доме ЧР</h2>
            <p className="mt-5 text-muted-foreground">
              Мы уверены, что качественные окна и двери — это не роскошь, а базовый уровень комфорта. Поэтому предлагаем полный цикл под ключ: бесплатный выезд замерщика, честный расчёт стоимости, производство на собственном оборудовании и монтаж по ГОСТ силами штатной бригады.
              Работаем со всеми ведущими системами: <strong>REHAU, VEKA, KBE, Provedal, Alutech, Alumark, Roto, Maco, Siegenia</strong>.
            </p>
            <p className="mt-4 text-muted-foreground">
              Мы аккуратно относимся к вашему дому — используем защитные плёнки, убираем строительный мусор и оставляем помещение чистым. Каждый монтаж принимает старший инженер, а после сдачи объекта клиент получает паспорт изделий и гарантийный талон.
            </p>
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-accent">География работы</div>
            <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Работаем по всей Чеченской Республике</h2>
            <p className="mt-5 text-muted-foreground">
              Основное производство и офис находятся в Грозном, а бригады выезжают на замер и монтаж во все районы республики:
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 text-sm">
              {["Грозный", "Аргун", "Гудермес", "Урус-Мартан", "Шали", "Курчалой", "Ачхой-Мартан", "Ножай-Юрт", "Наурский район", "Итум-Калинский район", "Веденский район", "Шелковской район"].map((city) => (
                <li key={city} className="rounded-lg border border-border bg-card px-3 py-2">📍 {city}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Наши ценности</div>
          <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Почему клиенты выбирают Windu.Group</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-xs uppercase tracking-widest text-accent">История компании</div>
        <h2 className="mt-2 font-display text-3xl font-bold md:text-4xl">Как мы росли</h2>
        <div className="mt-10 relative border-l-2 border-accent/30 pl-6">
          {milestones.map((m) => (
            <div key={m.year} className="relative mb-8 last:mb-0">
              <div className="absolute -left-[33px] top-1 grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">•</div>
              <div className="font-display text-2xl font-bold text-accent">{m.year}</div>
              <p className="mt-1 max-w-3xl text-muted-foreground">{m.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="flex justify-center gap-1 text-accent">
            {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-5 w-5 fill-current" />)}
          </div>
          <h2 className="mt-3 font-display text-3xl font-bold md:text-4xl">Рейтинг 4.9 из 5 · отзывы клиентов</h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Мы работаем на репутацию — 8 из 10 наших клиентов приходят по рекомендации.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="accent" size="lg"><Link to="/reviews">Все отзывы</Link></Button>
            <CallbackDialog>
              <Button size="lg" variant="outline">Заказать замер</Button>
            </CallbackDialog>
          </div>
        </div>
      </section>
    </>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-2xl font-bold md:text-3xl">{n}</div>
      <div className="text-[11px] uppercase tracking-wider opacity-75">{l}</div>
    </div>
  );
}
