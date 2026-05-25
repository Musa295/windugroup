import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <div className="font-display text-xl font-bold">Windu<span className="text-accent">.Group</span></div>
          <p className="mt-3 text-sm opacity-80">
            Производство и установка окон и дверей из ПВХ и алюминия в Чеченской Республике с 2018 года.
          </p>
          <div className="mt-4 flex gap-2">
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md bg-white/10 hover:bg-accent transition-colors" aria-label="WhatsApp">
              <MessageCircle className="h-5 w-5" />
            </a>
            <a href={SITE.telegram} target="_blank" rel="noreferrer" className="grid h-10 w-10 place-items-center rounded-md bg-white/10 hover:bg-accent transition-colors" aria-label="Telegram">
              <Send className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider opacity-70">Навигация</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="opacity-80 hover:opacity-100 hover:text-accent">Главная</Link></li>
            <li><Link to="/catalog" className="opacity-80 hover:opacity-100 hover:text-accent">Каталог</Link></li>
            <li><Link to="/equipment" className="opacity-80 hover:opacity-100 hover:text-accent">Оборудование</Link></li>
            <li><Link to="/reviews" className="opacity-80 hover:opacity-100 hover:text-accent">Отзывы</Link></li>
            <li><Link to="/contacts" className="opacity-80 hover:opacity-100 hover:text-accent">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider opacity-70">Контакты</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={SITE.phoneHref} className="flex items-center gap-2 hover:text-accent"><Phone className="h-4 w-4" />{SITE.phone}</a></li>
            <li><a href={SITE.emailHref} className="flex items-center gap-2 hover:text-accent"><Mail className="h-4 w-4" />{SITE.email}</a></li>
            <li className="flex items-start gap-2 opacity-80"><MapPin className="mt-0.5 h-4 w-4 shrink-0" />{SITE.address}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider opacity-70">Подарки и условия</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>· Беспроцентная рассрочка</li>
            <li>· Москитные сетки в подарок</li>
            <li>· Бесплатный замер по ЧР</li>
            <li>· Бесплатная доставка и монтаж</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-70 md:flex-row">
          <div>© {new Date().getFullYear()} Windu.Group. Все права защищены.</div>
          <div>Чеченская Республика</div>
        </div>
      </div>
    </footer>
  );
}
