"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "burgundy" | "beige";
  size?: "sm" | "md" | "lg";
  href?: string;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      href,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "text-xs px-3.5 py-1.5 uppercase tracking-wider rounded-none gap-1.5",
      md: "text-xs sm:text-sm px-6 py-3 uppercase tracking-widest rounded-none gap-2",
      lg: "text-sm sm:text-base px-8 py-4 uppercase tracking-widest rounded-none gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[#5A252E] text-white hover:bg-[#431b22] focus-visible:ring-[#5A252E] shadow-sm",
      secondary:
        "bg-[#252522] text-white hover:bg-[#151513] focus-visible:ring-[#252522]",
      outline:
        "border border-[#252522] text-[#252522] bg-transparent hover:bg-[#252522] hover:text-white focus-visible:ring-[#252522]",
      ghost:
        "text-[#252522] hover:bg-[#E9DFD1]/50 focus-visible:ring-[#5A252E]",
      burgundy:
        "bg-[#5A252E] text-[#F7F4EE] hover:bg-[#431b22] focus-visible:ring-[#5A252E]",
      beige:
        "bg-[#E9DFD1] text-[#252522] hover:bg-[#ddd0be] focus-visible:ring-[#8B8176]",
    };

    const combinedClassName = cn(
      baseStyles,
      sizeStyles[size],
      variantStyles[variant],
      className
    );

    const content = (
      <>
        {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={combinedClassName}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={combinedClassName}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
