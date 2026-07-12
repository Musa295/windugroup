import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/windu-logo.png.asset.json";

export function Logo({ variant = "dark", compact = false }: { variant?: "dark" | "light"; compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src={logoAsset.url}
        alt="Windu.Group"
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-1 ring-border"
      />
      {!compact && (
        <div className="leading-tight">
          <div className={`font-display text-lg font-bold tracking-tight ${variant === "light" ? "text-white" : ""}`}>
            Windu<span className="text-accent">.Group</span>
          </div>
          <div className={`text-[10px] uppercase tracking-widest ${variant === "light" ? "text-white/60" : "text-muted-foreground"}`}>
            Окна · Двери · Балконы
          </div>
        </div>
      )}
    </Link>
  );
}
