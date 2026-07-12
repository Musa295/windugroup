import { MessageCircle, Phone, Instagram } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingMessengers() {
  const items = [
    { href: SITE.whatsapp, label: "WhatsApp", icon: MessageCircle, bg: "bg-[#25D366]" },
    { href: SITE.instagram, label: "Instagram", icon: Instagram, bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]" },
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
          className={`grid h-12 w-12 place-items-center rounded-full text-white shadow-xl ring-2 ring-white/30 transition-transform hover:scale-110 ${i.bg}`}
        >
          <i.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
