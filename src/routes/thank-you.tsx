import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Phone, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/thank-you")({
  head: () => ({
    meta: [
      { title: "Заявка принята — Windu.Group" },
      { name: "description", content: "Спасибо! Мы получили вашу заявку и перезвоним в течение 15 минут." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Заявка принята — Windu.Group" },
      { property: "og:url", content: `${SITE.origin}/thank-you` },
    ],
    links: [{ rel: "canonical", href: `${SITE.origin}/thank-you` }],
  }),
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-24 text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-accent/15 text-accent">
        <CheckCircle2 className="h-10 w-10" />
      </div>
      <h1 className="mt-6 font-display text-3xl font-bold md:text-4xl">Спасибо, заявка принята!</h1>
      <p className="mt-4 text-muted-foreground">
        Наш менеджер перезвонит в течение 15 минут в рабочее время (9:00–20:00).
        Если удобнее — напишите нам в мессенджере прямо сейчас.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button asChild variant="accent" size="lg">
          <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="gap-2">
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={SITE.telegram} target="_blank" rel="noreferrer" className="gap-2">
            <Send className="h-4 w-4" /> Telegram
          </a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={SITE.phoneHref} className="gap-2">
            <Phone className="h-4 w-4" /> Позвонить
          </a>
        </Button>
      </div>

      <div className="mt-10 text-sm text-muted-foreground">
        <Link to="/" className="text-accent hover:underline">← На главную</Link>
        <span className="mx-3">·</span>
        <Link to="/catalog" className="text-accent hover:underline">В каталог</Link>
      </div>
    </section>
  );
}
