import { MessageCircle, Send, Phone } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingMessengers() {
  const items = [
    { href: SITE.whatsapp, label: "WhatsApp", icon: MessageCircle, bg: "bg-[#25D366]" },
    { href: SITE.telegram, label: "Telegram", icon: Send, bg: "bg-[#229ED9]" },
    { href: SITE.phoneHref, label: "Позвонить", icon: Phone, bg: "bg-accent" },
  ];
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2.5 print:hidden">
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          target={i.href.startsWith("tel:") ? undefined : "_blank"}
          rel="noreferrer"
          aria-label={i.label}
          className={`grid h-14 w-14 place-items-center rounded-full text-white shadow-xl ring-2 ring-white/30 transition-transform hover:scale-110 ${i.bg}`}
        >
          <i.icon className="h-6 w-6" />
        </a>
      ))}
    </div>
  );
}
