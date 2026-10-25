"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { siteConfig } from "@/lib/config";
import {
  Home,
  LayoutGrid,
  ShoppingBag,
  MessageSquare,
  Search,
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  // Hide on admin routes or product pages (where product page has its own sticky Add to Bag bar)
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/product/")) {
    return null;
  }

  const whatsappUrl = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(
    "Hello VITRAG! I am browsing your online store and would like assistance with dinner sets and luxury gifting."
  )}`;

  const navItems = [
    {
      label: "Home",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Shop",
      href: "/shop",
      icon: LayoutGrid,
      isActive: pathname.startsWith("/shop") || pathname.startsWith("/collections"),
    },
    {
      label: "Search",
      href: "/search",
      icon: Search,
      isActive: pathname === "/search",
    },
    {
      label: "Bag",
      onClick: openCart,
      icon: ShoppingBag,
      badge: itemCount > 0 ? itemCount : null,
      isActive: pathname === "/cart",
    },
    {
      label: "WhatsApp",
      href: whatsappUrl,
      icon: MessageSquare,
      isExternal: true,
      highlight: true,
    },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-[#FFF5E6]/95 backdrop-blur-xl border-t border-[#EADBC8] shadow-[0_-4px_25px_rgba(110,32,35,0.08)] pb-[max(env(safe-area-inset-bottom),8px)] pt-2 px-2"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item, idx) => {
          const Icon = item.icon;

          if (item.onClick) {
            return (
              <button
                key={idx}
                type="button"
                onClick={item.onClick}
                className="relative flex flex-col items-center justify-center py-1 px-3 text-center min-w-[56px] focus:outline-none group active:scale-95 transition-transform"
              >
                <div className="relative">
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      item.isActive ? "text-[#6E2023]" : "text-[#7A6B60] group-hover:text-[#6E2023]"
                    }`}
                  />
                  {item.badge !== null && (
                    <span className="absolute -top-1.5 -right-2.5 min-w-[18px] h-[18px] bg-[#6E2023] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 shadow-xs animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[10px] tracking-wider mt-1 font-medium transition-colors ${
                    item.isActive ? "text-[#6E2023] font-bold" : "text-[#7A6B60]"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          }

          if (item.isExternal) {
            return (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex flex-col items-center justify-center py-1 px-3 text-center min-w-[56px] focus:outline-none group active:scale-95 transition-transform"
              >
                <div className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xs -mt-3.5 border-2 border-[#FFF5E6]">
                  <Icon className="w-4 h-4 fill-white text-white" />
                </div>
                <span className="text-[10px] tracking-wider mt-0.5 font-medium text-[#25D366] font-semibold">
                  {item.label}
                </span>
              </a>
            );
          }

          return (
            <Link
              key={idx}
              href={item.href}
              className="relative flex flex-col items-center justify-center py-1 px-3 text-center min-w-[56px] focus:outline-none group active:scale-95 transition-transform"
            >
              <Icon
                className={`w-5 h-5 transition-colors ${
                  item.isActive ? "text-[#6E2023]" : "text-[#7A6B60] group-hover:text-[#6E2023]"
                }`}
              />
              <span
                className={`text-[10px] tracking-wider mt-1 font-medium transition-colors ${
                  item.isActive ? "text-[#6E2023] font-bold" : "text-[#7A6B60]"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
