import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calculator, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CallbackDialog } from "@/components/CallbackDialog";
import slide1 from "@/assets/hero-slides/slide1.png.asset.json";
import slide2 from "@/assets/hero-slides/slide2.png.asset.json";
import slide3 from "@/assets/hero-slides/slide3.png.asset.json";
import slide4 from "@/assets/hero-slides/slide4.png.asset.json";

const SLIDE_MS = 3500;

const slides = [
  { url: slide1.url, alt: "Панорамные окна и терраса дома премиум-класса вечером" },
  { url: slide2.url, alt: "Раздвижные алюминиевые двери с видом на горы и озеро" },
  { url: slide3.url, alt: "Портальные раздвижные окна в пол с видом на природу" },
  { url: slide4.url, alt: "Современная входная группа с панорамным остеклением" },
];

export function HeroSlideshow() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const next = (i + 1) % slides.length;
    const img = new Image();
    img.decoding = "async";
    img.src = slides[next].url;
  }, [i]);

  return (
    <section className="relative overflow-hidden">
      <div className="relative h-[86vh] min-h-[520px] max-h-[820px] w-full sm:h-[92vh]">
        {slides.map((s, idx) => {
          const active = idx === i;
          return (
            <img
              key={s.url}
              src={s.url}
              alt={s.alt}
              loading={idx === 0 ? "eager" : "lazy"}
              fetchPriority={idx === 0 ? "high" : "low"}
              decoding="async"
              sizes="100vw"
              style={{
                transitionProperty: "opacity, transform, filter",
                transitionDuration: "1400ms",
                transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                transform: active ? "scale(1.08)" : "scale(1)",
                filter: active ? "blur(0px) saturate(1.05)" : "blur(6px) saturate(0.9)",
                opacity: active ? 1 : 0,
              }}
              className="absolute inset-0 h-full w-full object-cover will-change-[opacity,transform,filter]"
            />
          );
        })}
        {/* Overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {/* Animated shimmer accent */}
        <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay animate-[pulse_6s_ease-in-out_infinite]" style={{ background: "radial-gradient(60% 60% at 20% 30%, rgba(255,255,255,0.25), transparent 70%)" }} />

        {/* Text content OVER photos */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-4">
          <div className="max-w-2xl text-white">
            <div className="inline-flex animate-[fade-in_.8s_ease-out] items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-accent animate-pulse" /> Производство в Чеченской Республике
            </div>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight drop-shadow-lg md:text-6xl lg:text-7xl">
              Окна, двери и балконы <span className="bg-gradient-to-r from-accent via-amber-300 to-accent bg-clip-text text-transparent">премиум-класса</span>
            </h1>
            <p className="mt-5 max-w-xl text-base text-white/90 md:text-lg">
              Панорамные, раздвижные и портальные системы из ПВХ и алюминия. Замер и монтаж по всей ЧР — бесплатно.
              <span className="mt-2 block font-semibold text-white">Рассрочка 0% · Гарантия до 10 лет.</span>
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <CallbackDialog>
                <Button variant="accent" size="lg" className="h-12 px-7 text-base shadow-xl transition-transform hover:scale-[1.03]">
                  Бесплатный замер <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CallbackDialog>
              <Button asChild variant="outline" size="lg" className="h-12 border-white/40 bg-white/10 px-7 text-base text-white backdrop-blur transition-transform hover:scale-[1.03] hover:bg-white/20 hover:text-white">
                <Link to="/calculator"><Calculator className="mr-1 h-4 w-4" />Калькулятор</Link>
              </Button>
            </div>

            <div className="mt-10 hidden gap-6 border-t border-white/20 pt-6 text-white sm:grid sm:grid-cols-3">
              <div><div className="font-display text-3xl font-bold">С 2018</div><div className="text-xs uppercase tracking-wider opacity-80">на рынке ЧР</div></div>
              <div><div className="font-display text-3xl font-bold">0%</div><div className="text-xs uppercase tracking-wider opacity-80">рассрочка</div></div>
              <div><div className="font-display text-3xl font-bold">10 лет</div><div className="text-xs uppercase tracking-wider opacity-80">гарантия</div></div>
            </div>
          </div>
        </div>

        {/* Floating badge */}
        <div className="absolute bottom-6 right-6 z-10 hidden rounded-2xl bg-white/95 p-4 shadow-2xl backdrop-blur md:flex md:items-center md:gap-3 animate-[fade-in_1s_ease-out]">
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
              className={`h-1.5 rounded-full transition-all duration-500 ${idx === i ? "w-10 bg-accent shadow-[0_0_16px_hsl(var(--accent))]" : "w-4 bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

