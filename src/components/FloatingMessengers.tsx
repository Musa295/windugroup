import { MessageCircle, Send, Sparkles } from "lucide-react";
import { SITE } from "@/lib/site";

export function FloatingMessengers() {
  const items = [
    { href: SITE.whatsapp, label: "WhatsApp", icon: MessageCircle, bg: "bg-[#25D366]" },
    { href: SITE.telegram, label: "Telegram", icon: Send, bg: "bg-[#229ED9]" },
    { href: SITE.bip, label: "BiP", icon: Sparkles, bg: "bg-[#FBB03B]" },
  ];
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col gap-2 print:hidden">
      {items.map((i) => (
        <a
          key={i.label}
          href={i.href}
          target="_blank"
          rel="noreferrer"
          aria-label={i.label}
          className={`grid h-12 w-12 place-items-center rounded-full text-white shadow-lg transition-transform hover:scale-110 ${i.bg}`}
        >
          <i.icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}
