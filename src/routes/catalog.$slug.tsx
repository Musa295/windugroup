import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products, type Product } from "@/lib/catalog";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { works } from "@/lib/works";
import { ArrowLeft, CheckCircle2, Gift, Percent, ShieldCheck, Truck, Calculator as CalcIcon, MessageCircle, Send } from "lucide-react";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/catalog/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — Windu.Group` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.title} — Windu.Group` },
          { property: "og:description", content: loaderData.product.short },
          { property: "og:type", content: "product" },
          { property: "og:image", content: loaderData.product.image },
          { property: "og:url", content: `${SITE.origin}/catalog/${params.slug}` },
        ]
      : [{ title: "Товар не найден — Windu.Group" }, { name: "robots", content: "noindex" }],
    links: loaderData
      ? [{ rel: "canonical", href: `${SITE.origin}/catalog/${params.slug}` }]
      : [],
    scripts: loaderData
      ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: loaderData.product.title,
            description: loaderData.product.description,
            image: loaderData.product.image,
            brand: { "@type": "Brand", name: "Windu.Group" },
          }),
        }]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-bold">Товар не найден</h1>
      <Link to="/catalog" className="mt-4 inline-block text-accent hover:underline">← В каталог</Link>
    </div>
  ),
});

const perks = [
  { icon: Percent, text: "Рассрочка 0%" },
  { icon: Gift, text: "Москитные сетки в подарок" },
  { icon: Truck, text: "Бесплатная доставка по ЧР" },
  { icon: ShieldCheck, text: "Гарантия до 10 лет" },
];

// Комплектации (по категории)
const bundlesByCategory: Record<string, { name: string; price: string; includes: string[] }[]> = {
  "Окна": [
    { name: "Базовая", price: "включено", includes: ["3-камерный профиль 60 мм", "Двухкамерный стеклопакет 32 мм", "Фурнитура Vorne", "Москитная сетка"] },
    { name: "Оптимальная", price: "+ 15%", includes: ["5-камерный профиль 70 мм", "Энергосберегающий стеклопакет i-стекло", "Фурнитура Roto", "Микропроветривание", "Москитная сетка"] },
    { name: "Премиум", price: "+ 30%", includes: ["6-камерный профиль 82 мм", "Трёхкамерный стеклопакет", "Фурнитура Siegenia", "Ламинация под дерево", "Противовзломная защита"] },
  ],
  "Двери": [
    { name: "Стандарт", price: "включено", includes: ["Усиленный профиль", "Сэндвич-панель", "Многоточечный замок"] },
    { name: "Комфорт", price: "+ 20%", includes: ["Триплекс", "Доводчик", "Ручка-скоба нерж."] },
    { name: "Премиум", price: "+ 40%", includes: ["Тёплый алюминий", "Электромагнитный замок", "Автоматика GEZE"] },
  ],
  "Балконы": [
    { name: "Холодное", price: "от 32 000 ₽", includes: ["Раздвижной алюминий Provedal", "Одинарное стекло", "Отделка сайдингом"] },
    { name: "Тёплое", price: "от 55 000 ₽", includes: ["ПВХ-профиль 70 мм", "Двухкамерный стеклопакет", "Утепление пеноплексом", "Отделка ПВХ-панелями"] },
  ],
  "Сетки": [
    { name: "Стандартная", price: "включено", includes: ["Алюминиевая рамка", "Фибергласс 1.2 мм", "Металлические крючки"] },
    { name: "Усиленная", price: "+ 20%", includes: ["Полотно Pet Screen", "Z-крючки 4–8 шт", "Гарантия 3 года"] },
  ],
};

function ProductPage() {
  const data = Route.useLoaderData() as { product: Product } | undefined;
  if (!data) return null;
  const { product } = data;
  const related = products.filter((p) => p.slug !== product.slug && p.category === product.category).slice(0, 3);
  const gallery = [product.image, ...works.slice(0, 5).map((w) => w.src)];
  const bundles = bundlesByCategory[product.category] ?? [];

  return (
    <>
      <section className="border-b border-border bg-surface py-6">
        <div className="mx-auto max-w-7xl px-4">
          <Link to="/catalog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent">
            <ArrowLeft className="h-4 w-4" /> Назад в каталог
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-12 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl">
          <img src={product.image} alt={product.title} className="aspect-[4/3] w-full object-cover" width={1200} height={900} />
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-accent">{product.category}</div>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{product.title}</h1>
          <div className="mt-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            {product.priceFrom}
          </div>

          {/* CTA сверху с предзаполнением калькулятора */}
          <div className="mt-5 flex flex-wrap gap-3">
            <Button asChild variant="accent" size="lg" className="gap-2">
              <Link to="/calculator" search={{ product: product.slug }}>
                <CalcIcon className="h-4 w-4" /> Рассчитать стоимость
              </Link>
            </Button>
            <CallbackDialog defaultTopic={`Заявка: ${product.title}`}>
              <Button variant="outline" size="lg">Заказать замер</Button>
            </CallbackDialog>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 hover:border-accent">
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" /> WhatsApp
            </a>
            <a href={SITE.telegram} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 hover:border-accent">
              <Send className="h-3.5 w-3.5 text-[#229ED9]" /> Telegram
            </a>
            <a href={SITE.bip} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 hover:border-accent">
              BiP
            </a>
          </div>

          <p className="mt-6 text-muted-foreground">{product.description}</p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {perks.map((p) => (
              <div key={p.text} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm">
                <p.icon className="h-4 w-4 shrink-0 text-accent" /> {p.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Табы: преимущества, комплектации, характеристики, галерея */}
      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4">
          <Tabs defaultValue="features">
            <TabsList className="flex flex-wrap gap-2 bg-transparent p-0">
              <TabsTrigger value="features" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Преимущества</TabsTrigger>
              <TabsTrigger value="bundles" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Комплектации</TabsTrigger>
              <TabsTrigger value="specs" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Характеристики</TabsTrigger>
              <TabsTrigger value="gallery" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Галерея</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-6">
              <div className="grid gap-3 md:grid-cols-2">
                {product.features.map((f) => (
                  <div key={f} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="bundles" className="mt-6">
              <div className="grid gap-4 md:grid-cols-3">
                {bundles.map((b) => (
                  <div key={b.name} className="rounded-2xl border border-border bg-card p-6">
                    <div className="flex items-baseline justify-between">
                      <div className="font-display text-lg font-bold">{b.name}</div>
                      <div className="text-sm font-semibold text-accent">{b.price}</div>
                    </div>
                    <ul className="mt-4 space-y-2 text-sm">
                      {b.includes.map((i) => (
                        <li key={i} className="flex gap-2">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {i}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <div className="overflow-hidden rounded-2xl border border-border bg-card">
                <table className="w-full text-sm">
                  <tbody>
                    {product.specs.map((s, i) => (
                      <tr key={s.label} className={i % 2 ? "bg-surface/50" : ""}>
                        <td className="border-b border-border/50 px-5 py-4 font-medium text-muted-foreground md:w-1/3">{s.label}</td>
                        <td className="border-b border-border/50 px-5 py-4">{s.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="gallery" className="mt-6">
              <div className="grid gap-3 md:grid-cols-3">
                {gallery.map((src, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl">
                    <img src={src} alt={`${product.title} — фото ${i + 1}`} className="aspect-[4/3] w-full object-cover transition-transform hover:scale-105" loading="lazy" width={800} height={600} />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Похожие позиции</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                to="/catalog/$slug"
                params={{ slug: p.slug }}
                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
              >
                <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" width={800} height={600} />
                <div className="p-5">
                  <div className="font-display text-lg font-semibold">{p.title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{p.short}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
