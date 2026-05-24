import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-colors",
        variant === "default" && "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
        variant === "secondary" && "bg-white/10 text-foreground border border-white/10",
        variant === "outline" && "border border-white/20 text-foreground",
        variant === "success" && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
        className
      )}
      {...props}
    />
  );
}

export { Badge };
