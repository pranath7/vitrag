"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { useCart } from "@/context/CartContext";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  ChevronDown,
  Heart,
  Phone,
  ArrowRight,
  User,
} from "lucide-react";
import { collections } from "@/lib/products";

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart, wishlist, subtotalPaise } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [giftingDropdownOpen, setGiftingDropdownOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setGiftingDropdownOpen(false);
  }, [pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <header className="w-full z-40 sticky top-0 transition-all duration-300">
      {/* 1. Announcement Bar */}
      {siteConfig.announcement.enabled && (
        <div className="bg-[#6E2023]/95 backdrop-blur-md text-[#FFF5E6] py-2 px-4 text-center text-[11px] sm:text-xs font-medium tracking-widest uppercase border-b border-[#55181A]/50">
          <div className="flex items-center justify-center gap-4">
            <span>{siteConfig.announcement.text}</span>
            <span className="hidden md:inline-block opacity-40">|</span>
            <Link
              href="/bulk-orders"
              className="hidden md:inline-flex items-center gap-1 hover:underline text-[#CBAE9B]"
            >
              Bulk & Corporate Enquiries
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar with Refined Glassmorphism */}
      <nav
        className={`w-full transition-all duration-300 border-b backdrop-blur-md backdrop-saturate-150 ${
          scrolled
            ? "bg-[#FFF5E6]/90 border-[#EADBC8]/90 shadow-[0_4px_20px_-4px_rgba(110,32,35,0.07)] py-3 sm:py-3.5"
            : "bg-[#FFF5E6]/80 border-[#EADBC8]/70 py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#6E2023] hover:text-[#55181A] focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-2 text-[#6E2023] hover:text-[#55181A] focus:outline-none ml-1"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Brand Logo & Wordmark (Matching Mockup) */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-flex items-center gap-2.5 sm:gap-3 group focus:outline-none text-left">
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-lg overflow-hidden border border-[#EADBC8] shadow-2xs shrink-0 group-hover:scale-105 transition-transform duration-200">
                  <Image
                    src="/logo.jpg"
                    alt="VITRAG Emblem"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 36px, 40px"
                    priority
                  />
                </div>
                <div>
                  <span className="font-heading text-xl sm:text-2xl md:text-2xl tracking-[0.08em] font-normal text-[#6E2023] group-hover:text-[#55181A] transition-colors block leading-none">
                    Vitrag
                  </span>
                  <span className="block text-[8px] sm:text-[9px] uppercase tracking-[0.28em] text-[#84766A] mt-1 font-sans font-medium">
                    Fine Living
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links (5 Core Items Matching Mockup) */}
            <div className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-[0.16em] font-medium text-[#252522]">
              <Link
                href="/shop"
                className={`hover:text-[#6E2023] transition-colors py-1 ${
                  pathname === "/shop" ? "text-[#6E2023] border-b-2 border-[#6E2023]" : ""
                }`}
              >
                Shop
              </Link>
              <Link
                href="/collections/dinner-sets"
                className={`hover:text-[#6E2023] transition-colors py-1 ${
                  pathname === "/collections/dinner-sets" ? "text-[#6E2023] border-b-2 border-[#6E2023]" : ""
                }`}
              >
                Dinner Sets
              </Link>
              <Link
                href="/collections/platters-serving"
                className={`hover:text-[#6E2023] transition-colors py-1 ${
                  pathname === "/collections/platters-serving" ? "text-[#6E2023] border-b-2 border-[#6E2023]" : ""
                }`}
              >
                Serving
              </Link>

              {/* Gifting Dropdown / Mega Menu */}
              <div
                className="relative py-1"
                onMouseEnter={() => setGiftingDropdownOpen(true)}
                onMouseLeave={() => setGiftingDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#6E2023] transition-colors focus:outline-none uppercase tracking-[0.16em] text-xs font-medium"
                >
                  Gifting
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>

                {giftingDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-[#FFF5E6]/95 backdrop-blur-xl border border-[#EADBC8]/90 shadow-[0_16px_36px_-6px_rgba(110,32,35,0.12)] p-4 mt-2 grid gap-2 z-50 rounded-xl animate-fade-in">
                    <p className="text-[10px] tracking-widest uppercase text-[#6E2023] font-semibold border-b border-[#EADBC8] pb-2 mb-1">
                      Curated Gifting Collections
                    </p>
                    <Link
                      href="/collections/signature-editions"
                      className="block px-3 py-2 text-xs font-semibold text-[#6E2023] bg-[#CBAE9B]/20 hover:bg-[#CBAE9B]/35 rounded-md transition-colors"
                    >
                      ✨ Signature Editions
                    </Link>
                    <Link
                      href="/collections/dry-fruit-boxes"
                      className="block px-3 py-2 text-xs text-[#252522] hover:bg-white/80 hover:text-[#6E2023] rounded-md transition-colors"
                    >
                      Dry-Fruit Box Sets
                    </Link>
                    <Link
                      href="/collections/gift-sets"
                      className="block px-3 py-2 text-xs text-[#252522] hover:bg-white/80 hover:text-[#6E2023] rounded-md transition-colors"
                    >
                      Curated Gift Sets
                    </Link>
                    <Link
                      href="/bulk-orders"
                      className="block px-3 py-2 text-xs text-[#252522] hover:bg-white/80 hover:text-[#6E2023] rounded-md transition-colors"
                    >
                      Corporate &amp; Bulk Hampers
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/about"
                className={`hover:text-[#6E2023] transition-colors py-1 ${
                  pathname === "/about" ? "text-[#6E2023] border-b-2 border-[#6E2023]" : ""
                }`}
              >
                Our Story
              </Link>
            </div>

            {/* Utility Actions (Divider, Search, Wishlist, Cart) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <span className="hidden lg:inline-block text-[#CBAE9B]/80 font-light select-none">
                |
              </span>

              {/* Desktop Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-1.5 text-[#252522] hover:text-[#6E2023] transition-colors"
                aria-label="Search catalogue"
              >
                <Search className="w-4 h-4 text-[#6E2023]" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/shop?filter=wishlist"
                className="relative p-1.5 text-[#252522] hover:text-[#6E2023] transition-colors"
                aria-label={`Wishlist (${wishlist.length})`}
              >
                <Heart className="w-4 h-4 text-[#6E2023]" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#6E2023] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Client Billing & Account Link */}
              <Link
                href="/billing"
                className="p-1.5 text-[#252522] hover:text-[#6E2023] transition-colors"
                aria-label="Billing & Invoices"
                title="Billing & Invoices"
              >
                <User className="w-4 h-4 text-[#6E2023]" />
              </Link>

              {/* Pillar 4: Cart Button & Bag Link */}
              <button
                type="button"
                onClick={openCart}
                className={`relative flex items-center gap-2 px-2.5 py-1.5 rounded-full transition-all duration-200 ${
                  itemCount > 0
                    ? "bg-[#6E2023]/10 hover:bg-[#6E2023]/20 border border-[#6E2023]/30 shadow-2xs"
                    : "p-1.5 text-[#252522] hover:text-[#6E2023]"
                }`}
                aria-label={`Shopping Cart with ${itemCount} items`}
              >
                <div className="relative">
                  <ShoppingBag className="w-4 h-4 text-[#6E2023]" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 bg-[#6E2023] text-white text-[9px] min-w-3.5 h-3.5 px-1 rounded-full flex items-center justify-center font-bold shadow-2xs">
                      {itemCount}
                    </span>
                  )}
                </div>
                {itemCount > 0 && (
                  <span className="hidden sm:inline-block text-xs font-semibold uppercase tracking-wider text-[#6E2023]">
                    Bag ({itemCount})
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Search Dropdown / Bar */}
          {searchOpen && (
            <div className="mt-3 pt-3 border-t border-[#EADBC8]/60 animate-fade-in">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search dinner sets, platters, dry-fruit boxes, brass ware..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-xs sm:text-sm pl-9 pr-24 py-2.5 bg-white/90 backdrop-blur-md border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023] shadow-inner"
                />
                <Search className="w-4 h-4 text-[#84766A] absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider bg-[#6E2023] text-white px-3.5 py-1.5 font-medium rounded-md hover:bg-[#55181A]"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </nav>

      {/* 3. Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#252522]/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#FFF5E6] border-r border-[#EADBC8] shadow-xl flex flex-col justify-between p-6">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#EADBC8]">
                <div className="flex items-center gap-3">
                  <div className="relative w-9 h-9 rounded-lg overflow-hidden border border-[#EADBC8] shadow-2xs shrink-0">
                    <Image
                      src="/logo.jpg"
                      alt="VITRAG Logo"
                      fill
                      className="object-cover"
                      sizes="36px"
                    />
                  </div>
                  <div>
                    <span className="font-heading text-xl tracking-[0.2em] uppercase font-semibold text-[#6E2023] block leading-none">
                      VITRAG
                    </span>
                    <span className="block text-[8px] uppercase tracking-[0.22em] text-[#84766A] mt-1 font-sans">
                      Tableware & Gifting
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#84766A] hover:text-[#6E2023]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-6 space-y-4 text-sm uppercase tracking-widest font-medium text-[#252522]">
                {/* Pillar 4: Mobile Drawer Cart Link */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openCart();
                  }}
                  className="w-full flex items-center justify-between p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-xl text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <ShoppingBag className="w-4 h-4 text-[#6E2023]" />
                    <span className="text-xs font-bold text-[#6E2023] uppercase tracking-wider">
                      Shopping Bag
                    </span>
                  </div>
                  <span className="bg-[#6E2023] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </button>

                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#6E2023] py-1 border-b border-[#EADBC8]/40"
                >
                  Shop All Products
                </Link>
                <div className="pt-2 pb-1">
                  <span className="text-[10px] text-[#6E2023] tracking-widest uppercase font-semibold">
                    Collections
                  </span>
                </div>
                {collections.slice(0, 6).map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs normal-case tracking-wider hover:text-[#6E2023] pl-2 py-0.5 text-[#252522]/80"
                  >
                    {col.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-[#EADBC8]/60 space-y-2">
                  <Link
                    href="/bulk-orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-widest text-[#6E2023] font-semibold py-1"
                  >
                    Corporate & Bulk Gifting
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-widest hover:text-[#6E2023] py-1 text-[#252522]"
                  >
                    Our Brand Story
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-widest hover:text-[#6E2023] py-1 text-[#252522]"
                  >
                    Showroom & Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-[#EADBC8] space-y-3">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-wider text-[#6E2023] font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                <span>WhatsApp: {siteConfig.contact.displayPhone}</span>
              </a>
              <p className="text-[11px] text-[#84766A]">
                Chennai, Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
