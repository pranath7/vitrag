import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "burgundy" | "champagne" | "rose" | "outline" | "charcoal";
}

export function Badge({
  className,
  variant = "burgundy",
  children,
  ...props
}: BadgeProps) {
  const variantStyles = {
    burgundy: "bg-[#6E2023] text-white",
    champagne: "bg-[#CBAE9B] text-[#6E2023] font-semibold",
    rose: "bg-[#E8C5C8] text-[#6E2023] font-semibold",
    outline: "border border-[#EADBC8] text-[#54483E] bg-white/80",
    charcoal: "bg-[#252522] text-white",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center text-[10px] sm:text-xs uppercase tracking-wider font-medium px-2.5 py-0.5 rounded-full select-none shadow-2xs",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
