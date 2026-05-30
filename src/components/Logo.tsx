import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";

export function Logo({ variant = "dark", compact = false }: { variant?: "dark" | "light"; compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5">
      <img
        src={logo}
        alt="Windu.Group"
        width={40}
        height={40}
        className="h-10 w-10 shrink-0 object-contain"
        style={variant === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
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
