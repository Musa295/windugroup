import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import slide1 from "@/assets/hero-slides/slide1.png.asset.json";
import slide2 from "@/assets/hero-slides/slide2.png.asset.json";
import slide3 from "@/assets/hero-slides/slide3.png.asset.json";
import slide4 from "@/assets/hero-slides/slide4.png.asset.json";

const slides = [
  { url: slide1.url, alt: "Панорамные окна и терраса дома премиум-класса вечером" },
  { url: slide2.url, alt: "Раздвижные алюминиевые двери с видом на горы и озеро" },
  { url: slide3.url, alt: "Портальные раздвижные окна в пол с видом на природу" },
  { url: slide4.url, alt: "Современная входная группа с панорамным остеклением" },
];

export function HeroSlideshow() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[92vh] min-h-[560px] max-h-[820px] w-full">
        {slides.map((s, idx) => (
          <img
            key={s.url}
            src={s.url}
            alt={s.alt}
            loading={idx === 0 ? "eager" : "lazy"}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${idx === i ? "opacity-100" : "opacity-0"}`}
          />
        ))}
        {/* Overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        {/* Text content OVER photos */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent" /> Производство в Чеченской Республике
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight drop-shadow-lg md:text-6xl lg:text-7xl">
              Окна, двери и балконы <span className="text-accent">премиум-класса</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">
              Панорамные, раздвижные и портальные системы из ПВХ и алюминия. Замер и монтаж по всей ЧР — бесплатно.
              <span className="mt-2 block font-semibold text-white">Рассрочка 0% · Гарантия до 10 лет.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallbackDialog>
                <Button variant="accent" size="lg" className="h-12 px-7 text-base shadow-xl">
                  Бесплатный замер <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CallbackDialog>
              <Button asChild variant="outline" size="lg" className="h-12 border-white/40 bg-white/10 px-7 text-base text-white backdrop-blur hover:bg-white/20 hover:text-white">
                <Link to="/calculator"><Calculator className="mr-1 h-4 w-4" />Калькулятор</Link>
              </Button>
            </div>

            <div className="mt-10 hidden gap-6 border-t border-white/20 pt-6 text-white sm:grid sm:grid-cols-3">
              <div><div className="font-display text-3xl font-bold">15+</div><div className="text-xs uppercase tracking-wider opacity-80">лет опыта</div></div>
              <div><div className="font-display text-3xl font-bold">1200+</div><div className="text-xs uppercase tracking-wider opacity-80">объектов</div></div>
              <div><div className="font-display text-3xl font-bold">10 лет</div><div className="text-xs uppercase tracking-wider opacity-80">гарантия</div></div>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute bottom-6 right-6 z-10 hidden rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur md:flex md:items-center md:gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-full bg-accent/15 text-accent">
            <Gift className="h-6 w-6" />
          </div>
          <div>
            <div className="font-display text-sm font-bold text-foreground">Москитные сетки</div>
            <div className="text-xs text-muted-foreground">в подарок к заказу</div>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setI(idx)}
              aria-label={`Слайд ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-8 bg-accent" : "w-4 bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
