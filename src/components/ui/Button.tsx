"use client";

import React, { forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "burgundy" | "champagne";
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
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] rounded-lg";

    const sizeStyles = {
      sm: "text-xs px-4 py-2 gap-1.5",
      md: "text-xs sm:text-sm px-6 py-3 gap-2",
      lg: "text-sm sm:text-base px-8 py-3.5 gap-2.5",
    };

    const variantStyles = {
      primary:
        "bg-[#6E2023] text-white hover:bg-[#55181A] focus-visible:ring-[#6E2023] shadow-sm",
      secondary:
        "bg-[#252522] text-white hover:bg-[#151513] focus-visible:ring-[#252522]",
      outline:
        "border border-[#6E2023] text-[#6E2023] bg-transparent hover:bg-[#6E2023] hover:text-white focus-visible:ring-[#6E2023]",
      ghost:
        "text-[#6E2023] hover:bg-[#CBAE9B]/20 focus-visible:ring-[#6E2023]",
      burgundy:
        "bg-[#6E2023] text-white hover:bg-[#55181A] focus-visible:ring-[#6E2023] shadow-sm",
      champagne:
        "bg-[#CBAE9B] text-[#6E2023] hover:bg-[#bfa08c] focus-visible:ring-[#6E2023] font-semibold",
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
        <Link
          href={href}
          className={combinedClassName}
          onClick={props.onClick as unknown as React.MouseEventHandler<HTMLAnchorElement>}
          aria-disabled={disabled || isLoading}
        >
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
