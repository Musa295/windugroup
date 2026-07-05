import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Menu, X, Calculator, Sparkles } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/site";
import { CallbackDialog } from "./CallbackDialog";
import { Button } from "./ui/button";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Главная" },
  { to: "/catalog", label: "Каталог" },
  { to: "/price-list", label: "Прайс" },
  { to: "/calculator", label: "Калькулятор" },
  { to: "/promotions", label: "Акции" },
  { to: "/portfolio", label: "Портфолио" },
  { to: "/equipment", label: "Оборудование" },
  { to: "/reviews", label: "Отзывы" },
  { to: "/contacts", label: "Контакты" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs">
          <div className="flex items-center gap-4">
            <a href={`mailto:${SITE.email}`} className="hidden items-center gap-1.5 opacity-80 hover:opacity-100 sm:flex">
              <Mail className="h-3.5 w-3.5" /> {SITE.email}
            </a>
            <span className="hidden items-center gap-1.5 opacity-80 md:flex">
              <MapPin className="h-3.5 w-3.5" /> {SITE.address}
            </span>
          </div>
          <div className="flex items-center gap-2 text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Беспроцентная рассрочка · Замер и монтаж бесплатно</span>
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5">
        <Logo />

        <nav className="hidden items-center gap-6 xl:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-accent"
              activeProps={{ className: "text-accent" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a href={SITE.phoneHref} className="hidden text-right md:block">
            <div className="flex items-center gap-2 font-display text-base font-semibold">
              <Phone className="h-4 w-4 text-accent" /> {SITE.phone}
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Ежедневно 9:00–20:00</div>
          </a>
          <CallbackDialog>
            <Button variant="accent" size="sm" className="hidden md:inline-flex">Заказать звонок</Button>
          </CallbackDialog>
          <button
            onClick={() => setOpen((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-md border border-border xl:hidden"
            aria-label="Меню"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 py-3 text-sm font-medium border-b border-border/40 last:border-0"
                activeProps={{ className: "text-accent" }}
              >
                {n.to === "/calculator" && <Calculator className="h-4 w-4" />}
                {n.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-3">
              <a href={SITE.phoneHref} className="font-semibold">{SITE.phone}</a>
              <CallbackDialog>
                <Button variant="accent" size="sm">Заказать звонок</Button>
              </CallbackDialog>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
