import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProduct, products } from "@/lib/catalog";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, Gift, Percent, ShieldCheck, Truck } from "lucide-react";

export const Route = createFileRoute("/catalog/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.title} — Windu.Group` },
          { name: "description", content: loaderData.product.description },
          { property: "og:title", content: `${loaderData.product.title} — Windu.Group` },
          { property: "og:description", content: loaderData.product.short },
          { property: "og:image", content: loaderData.product.image },
        ]
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

function ProductPage() {
  const data = Route.useLoaderData() as { product: Product } | undefined;
  if (!data) return null;
  const { product } = data;
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  const perks = [
    { icon: Percent, text: "Рассрочка 0%" },
    { icon: Gift, text: "Москитные сетки в подарок" },
    { icon: Truck, text: "Бесплатная доставка по ЧР" },
    { icon: ShieldCheck, text: "Гарантия до 10 лет" },
  ];

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
          <img src={product.image} alt={product.title} className="aspect-[4/3] w-full object-cover" />
        </div>

        <div>
          <div className="text-xs uppercase tracking-widest text-accent">{product.category}</div>
          <h1 className="mt-2 font-display text-3xl font-bold md:text-4xl">{product.title}</h1>
          <div className="mt-3 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
            {product.priceFrom}
          </div>
          <p className="mt-5 text-muted-foreground">{product.description}</p>

          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {product.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" /> {f}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-3">
            <CallbackDialog defaultTopic={`Заявка: ${product.title}`}>
              <Button variant="accent" size="lg">Рассчитать стоимость</Button>
            </CallbackDialog>
            <Button asChild variant="outline" size="lg">
              <Link to="/calculator">Калькулятор</Link>
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3">
            {perks.map((p) => (
              <div key={p.text} className="flex items-center gap-2 rounded-lg border border-border bg-card p-3 text-sm">
                <p.icon className="h-4 w-4 shrink-0 text-accent" /> {p.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-display text-2xl font-bold md:text-3xl">Технические характеристики</h2>
          <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
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
        </div>
      </section>

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
              <img src={p.image} alt={p.title} className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="p-5">
                <div className="font-display text-lg font-semibold">{p.title}</div>
                <div className="mt-1 text-sm text-muted-foreground">{p.short}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
