import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Send, MessageCircle, Clock } from "lucide-react";
import { SITE } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm opacity-80">
            Производство и установка окон, дверей и балконных систем из ПВХ и алюминия в Чеченской Республике с 2018 года.
          </p>
          <div className="mt-4 flex gap-2">
            <a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex h-11 items-center gap-2 rounded-md bg-[#25D366] px-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity" aria-label="WhatsApp">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={SITE.telegram} target="_blank" rel="noreferrer" className="flex h-11 items-center gap-2 rounded-md bg-[#229ED9] px-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity" aria-label="Telegram">
              <Send className="h-4 w-4" /> Telegram
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider opacity-70">Навигация</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="opacity-80 hover:opacity-100 hover:text-accent">Главная</Link></li>
            <li><Link to="/about" className="opacity-80 hover:opacity-100 hover:text-accent">О нас</Link></li>
            <li><Link to="/services" className="opacity-80 hover:opacity-100 hover:text-accent">Услуги</Link></li>
            <li><Link to="/catalog" className="opacity-80 hover:opacity-100 hover:text-accent">Каталог</Link></li>
            <li><Link to="/price-list" className="opacity-80 hover:opacity-100 hover:text-accent">Прайс-лист</Link></li>
            <li><Link to="/calculator" className="opacity-80 hover:opacity-100 hover:text-accent">Калькулятор</Link></li>
            <li><Link to="/promotions" className="opacity-80 hover:opacity-100 hover:text-accent">Акции</Link></li>
            <li><Link to="/portfolio" className="opacity-80 hover:opacity-100 hover:text-accent">Портфолио</Link></li>
            <li><Link to="/reviews" className="opacity-80 hover:opacity-100 hover:text-accent">Отзывы</Link></li>
            <li><Link to="/contacts" className="opacity-80 hover:opacity-100 hover:text-accent">Контакты</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider opacity-70">Контакты</h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li><a href={SITE.phoneHref} className="flex items-center gap-2 text-base font-semibold hover:text-accent"><Phone className="h-4 w-4 text-accent" />{SITE.phone}</a></li>
            <li><a href={SITE.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent"><MessageCircle className="h-4 w-4 text-accent" />WhatsApp</a></li>
            <li><a href={SITE.telegram} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-accent"><Send className="h-4 w-4 text-accent" />Telegram</a></li>
            <li><a href={SITE.emailHref} className="flex items-center gap-2 hover:text-accent"><Mail className="h-4 w-4 text-accent" />{SITE.email}</a></li>
            <li className="flex items-start gap-2 opacity-90"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{SITE.address}</li>
            <li className="flex items-start gap-2 opacity-90"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent" />{SITE.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold uppercase tracking-wider opacity-70">Наши условия</h4>
          <ul className="mt-4 space-y-2 text-sm opacity-80">
            <li>· Беспроцентная рассрочка 0%</li>
            <li>· Москитные сетки в подарок</li>
            <li>· Бесплатный замер по ЧР</li>
            <li>· Бесплатная доставка и монтаж</li>
            <li>· Гарантия до 10 лет</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-70 md:flex-row">
          <div>© {new Date().getFullYear()} Windu.Group. Все права защищены.</div>
          <div>{SITE.city}, {SITE.region}</div>
        </div>
      </div>
    </footer>
  );
}
