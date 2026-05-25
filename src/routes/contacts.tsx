import { createFileRoute } from "@tanstack/react-router";
import { CallbackDialog } from "@/components/CallbackDialog";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";

export const Route = createFileRoute("/contacts")({
  head: () => ({
    meta: [
      { title: "Контакты — Windu.Group" },
      { name: "description", content: "Контакты Windu.Group: телефон, WhatsApp, Telegram, email и адрес в Чеченской Республике." },
    ],
  }),
  component: ContactsPage,
});

function ContactsPage() {
  return (
    <>
      <section className="bg-surface py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-xs uppercase tracking-widest text-accent">Контакты</div>
          <h1 className="mt-2 font-display text-4xl font-bold md:text-5xl">Свяжитесь с нами</h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Позвоните, напишите в мессенджер или закажите обратный звонок — ответим в течение 15 минут в рабочие часы.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <a href={SITE.phoneHref} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Телефон</div>
                <div className="mt-1 font-display text-lg font-bold">{SITE.phone}</div>
              </div>
            </a>

            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent"><MessageCircle className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                <div className="mt-1 font-display text-lg font-bold">Написать в WhatsApp</div>
              </div>
            </a>

            <a href={SITE.telegram} target="_blank" rel="noreferrer" className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent"><Send className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Telegram</div>
                <div className="mt-1 font-display text-lg font-bold">Написать в Telegram</div>
              </div>
            </a>

            <a href={SITE.emailHref} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent"><Mail className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Почта</div>
                <div className="mt-1 font-display text-lg font-bold">{SITE.email}</div>
              </div>
            </a>

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent"><MapPin className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Адрес</div>
                <div className="mt-1 font-display text-lg font-bold">{SITE.address}</div>
                <div className="text-sm text-muted-foreground">Замер и установка по всей ЧР бесплатно</div>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent"><Clock className="h-5 w-5" /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Режим работы</div>
                <div className="mt-1 font-display text-lg font-bold">Ежедневно с 9:00 до 20:00</div>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-border p-8" style={{ background: "var(--gradient-hero)" }}>
            <div className="text-white">
              <h2 className="font-display text-2xl font-bold md:text-3xl">Закажите бесплатный замер</h2>
              <p className="mt-3 text-white/80">
                Оставьте номер — перезвоним за 15 минут, согласуем время и приедем бесплатно по всей Чеченской Республике.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/80">
                <li>· Беспроцентная рассрочка на любой заказ</li>
                <li>· Москитные сетки в подарок</li>
                <li>· Доставка и монтаж включены</li>
              </ul>
              <div className="mt-7">
                <CallbackDialog>
                  <Button variant="hero" size="lg" className="h-12 w-full">Заказать обратный звонок</Button>
                </CallbackDialog>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
