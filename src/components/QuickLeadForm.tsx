import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, Send } from "lucide-react";

interface Props {
  categoryTitle: string;
  productTypes: { slug: string; title: string }[];
  defaultType?: string;
}

/** Компактная форма быстрой заявки: выбор типа изделия + имя + телефон. */
export function QuickLeadForm({ categoryTitle, productTypes, defaultType }: Props) {
  const [submitting, setSubmitting] = useState(false);
  const [type, setType] = useState(defaultType ?? productTypes[0]?.title ?? categoryTitle);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    if (String(fd.get("website") ?? "").trim() !== "") { setSubmitting(false); return; }

    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    if (name.length < 2) return toast.error("Укажите имя");
    if (phone.length < 6) return toast.error("Укажите телефон");

    setSubmitting(true);
    const payload = { name, phone, topic: `${categoryTitle} — ${type}`, message: `Быстрая заявка: ${type}` };
    let ok = false;
    for (const url of ["/api/lead", "/api/public/lead"]) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (res.ok) { ok = true; break; }
      } catch { /* try next */ }
    }
    if (!ok) {
      const text = encodeURIComponent(`Здравствуйте! Заявка с сайта.\nИмя: ${name}\nТелефон: ${phone}\nТип: ${type}`);
      window.open(`https://wa.me/79380044040?text=${text}`, "_blank");
    }
    setSubmitting(false);
    toast.success("Заявка принята!");
    form.reset();
    navigate({ to: "/thank-you" });
  };

  return (
    <form
      onSubmit={onSubmit}
      className="mt-8 grid gap-3 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)] md:grid-cols-[1.2fr_1fr_1fr_auto] md:items-end md:p-6"
    >
      <div className="space-y-1.5">
        <Label htmlFor={`qlf-type-${categoryTitle}`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <Calculator className="mr-1 inline h-3.5 w-3.5 text-accent" /> Тип изделия
        </Label>
        <select
          id={`qlf-type-${categoryTitle}`}
          name="type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {productTypes.map((p) => (
            <option key={p.slug} value={p.title}>{p.title}</option>
          ))}
        </select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`qlf-name-${categoryTitle}`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Имя</Label>
        <Input id={`qlf-name-${categoryTitle}`} name="name" required placeholder="Ваше имя" className="h-11" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`qlf-phone-${categoryTitle}`} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Телефон</Label>
        <Input id={`qlf-phone-${categoryTitle}`} name="phone" required type="tel" inputMode="tel" placeholder="+7 (___) ___-__-__" className="h-11" />
      </div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <Button type="submit" variant="accent" size="lg" className="h-11 gap-2 md:h-11" disabled={submitting}>
        <Send className="h-4 w-4" />
        {submitting ? "Отправляем…" : "Рассчитать"}
      </Button>
    </form>
  );
}
