import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "burgundy" | "beige" | "gold" | "outline" | "charcoal";
}

export function Badge({
  className,
  variant = "burgundy",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    burgundy: "bg-[#5A252E] text-white",
    beige: "bg-[#E9DFD1] text-[#252522]",
    gold: "bg-[#F3E5AB] text-[#5A252E] border border-[#D4AF37]/30",
    outline: "border border-[#E7E0D6] text-[#8B8176] bg-white/70",
    charcoal: "bg-[#252522] text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] sm:text-xs uppercase tracking-widest font-medium px-2 py-0.5 select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
