import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Phone } from "lucide-react";

interface Props {
  children?: React.ReactNode;
  defaultTopic?: string;
}

const schema = z.object({
  name: z.string().trim().min(2, "Укажите имя").max(80),
  phone: z.string().trim().min(6, "Укажите телефон").max(30),
  message: z.string().trim().max(500).optional(),
});

function useCaptcha() {
  const [pair, setPair] = useState<[number, number]>([0, 0]);
  const regen = () => setPair([Math.floor(Math.random() * 8) + 2, Math.floor(Math.random() * 8) + 1]);
  useEffect(regen, []);
  const answer = useMemo(() => pair[0] + pair[1], [pair]);
  return { question: `${pair[0]} + ${pair[1]}`, answer, regen };
}

export function CallbackDialog({ children, defaultTopic }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const captcha = useCaptcha();

  useEffect(() => { if (open) captcha.regen(); }, [open]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    // Honeypot: скрытое поле должно быть пустым (боты его заполнят)
    if (String(fd.get("website") ?? "").trim() !== "") {
      toast.success("Заявка принята!");
      setOpen(false);
      return;
    }

    // Согласие на обработку персональных данных (152-ФЗ)
    if (fd.get("consent") !== "on") {
      toast.error("Отметьте согласие на обработку персональных данных");
      return;
    }

    // Простая математическая капча
    const captchaValue = Number(fd.get("captcha"));
    if (!Number.isFinite(captchaValue) || captchaValue !== captcha.answer) {
      toast.error("Неверный ответ на проверку. Попробуйте ещё раз.");
      captcha.regen();
      return;
    }

    const parsed = schema.safeParse({
      name: fd.get("name"),
      phone: fd.get("phone"),
      message: fd.get("message") || undefined,
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setSubmitting(true);
    try {
      // Vercel serverless (/api/lead) — работает и на Lovable-хостинге (тот же путь у публичного роута ниже)
      const payload = { ...parsed.data, topic: defaultTopic ?? "Обратный звонок" };
      const endpoints = ["/api/lead", "/api/public/lead"];
      let ok = false;
      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          if (res.ok) { ok = true; break; }
        } catch { /* попробуем следующий */ }
      }
      if (!ok) {
        // Fallback: открываем WhatsApp с готовым текстом
        const text = encodeURIComponent(`Здравствуйте! Заявка с сайта.\nИмя: ${parsed.data.name}\nТелефон: ${parsed.data.phone}\nКомментарий: ${parsed.data.message ?? "-"}`);
        window.open(`https://wa.me/79380044040?text=${text}`, "_blank");
      }
      toast.success("Заявка принята!");
      setOpen(false);
      form.reset();
      navigate({ to: "/thank-you" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button variant="outline" size="sm" className="gap-2">
            <Phone className="h-4 w-4" /> Заказать звонок
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Заказать обратный звонок</DialogTitle>
          <DialogDescription>
            Оставьте телефон — перезвоним в течение 15 минут. Бесплатный замер по всей Чеченской Республике.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="cb-name">Имя</Label>
            <Input id="cb-name" name="name" required placeholder="Ваше имя" maxLength={80} className="h-12 text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-phone">Телефон</Label>
            <Input id="cb-phone" name="phone" required type="tel" inputMode="tel" autoComplete="tel" placeholder="+7 (___) ___-__-__" maxLength={30} className="h-12 text-base" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-msg">Комментарий</Label>
            <Textarea id="cb-msg" name="message" defaultValue={defaultTopic} placeholder="Что вас интересует?" rows={3} maxLength={500} className="text-base" />
          </div>

          {/* honeypot — не показываем людям */}
          <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

          <div className="space-y-2">
            <Label htmlFor="cb-captcha">Проверка: сколько будет {captcha.question}?</Label>
            <Input id="cb-captcha" name="captcha" required type="number" inputMode="numeric" placeholder="Ответ" className="h-12 text-base" />
          </div>

          <label className="flex items-start gap-2 text-[12px] leading-snug text-muted-foreground">
            <input
              type="checkbox"
              name="consent"
              defaultChecked
              className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[hsl(var(--accent))]"
              required
            />
            <span>
              Согласен на обработку персональных данных в соответствии с 152-ФЗ и{" "}
              <a href="/privacy" className="underline hover:text-accent">Политикой конфиденциальности</a>.
            </span>
          </label>

          <Button type="submit" variant="accent" size="lg" className="h-12 w-full text-base" disabled={submitting}>
            {submitting ? "Отправляем…" : "Отправить заявку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
