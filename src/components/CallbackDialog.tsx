import { useState } from "react";
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

export function CallbackDialog({ children, defaultTopic }: Props) {
  const [open, setOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Заявка принята! Перезвоним в течение 15 минут.");
    setOpen(false);
    (e.target as HTMLFormElement).reset();
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
            <Input id="cb-name" required placeholder="Ваше имя" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-phone">Телефон</Label>
            <Input id="cb-phone" required type="tel" placeholder="+7 (___) ___-__-__" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cb-msg">Комментарий</Label>
            <Textarea id="cb-msg" defaultValue={defaultTopic} placeholder="Что вас интересует?" rows={3} />
          </div>
          <Button type="submit" variant="accent" size="lg" className="w-full">
            Отправить заявку
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
