import { createFileRoute } from "@tanstack/react-router";
import { reviews } from "@/lib/reviews";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      { title: "Отзывы клиентов — Windu.Group" },
      { name: "description", content: "Реальные отзывы клиентов о работе Windu.Group: окна и двери из ПВХ и алюминия в Чеченской Республике." },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const avg = 5.0;
  return (
    <>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Отзывы</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Что говорят клиенты</h1>
          <div className="mt-6 flex items-center gap-4">
            <div className="flex items-center gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
            </div>
            <div className="font-display text-lg font-bold">{avg.toFixed(1)} / 5</div>
            <div className="text-sm text-muted-foreground">· {reviews.length} отзывов клиентов</div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <article key={r.name + r.date} className="flex flex-col rounded-2xl border border-border bg-card p-6">
              <div className="flex items-center gap-1 text-accent">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-foreground/90">{r.text}</p>
              <div className="mt-5 border-t border-border pt-4">
                <div className="font-display font-semibold">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date} · {r.topic}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
