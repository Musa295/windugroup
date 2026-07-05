import { useState } from "react";
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

export function CallbackDialog({ children, defaultTopic }: Props) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
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
      // Отправляем заявку на серверный роут (Telegram + Email — включаются после подключения Cloud/Resend/Telegram)
      await fetch("/api/public/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, topic: defaultTopic ?? "Обратный звонок" }),
      }).catch(() => null);
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
            <Input id="cb-name" name="name" required placeholder="Ваше имя" maxLength={80} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-phone">Телефон</Label>
            <Input id="cb-phone" name="phone" required type="tel" placeholder="+7 (___) ___-__-__" maxLength={30} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-msg">Комментарий</Label>
            <Textarea id="cb-msg" name="message" defaultValue={defaultTopic} placeholder="Что вас интересует?" rows={3} maxLength={500} />
          </div>
          <Button type="submit" variant="accent" size="lg" className="w-full" disabled={submitting}>
            {submitting ? "Отправляем…" : "Отправить заявку"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
