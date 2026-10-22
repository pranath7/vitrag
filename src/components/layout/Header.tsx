"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
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
} from "lucide-react";
import { collections } from "@/lib/products";

export function Header() {
  const pathname = usePathname();
  const { itemCount, openCart, wishlist } = useCart();
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
        <div className="bg-[#5A252E] text-[#F7F4EE] py-2 px-4 text-center text-[11px] sm:text-xs font-medium tracking-widest uppercase border-b border-[#431b22]">
          <div className="flex items-center justify-center gap-4">
            <span>{siteConfig.announcement.text}</span>
            <span className="hidden md:inline-block opacity-40">|</span>
            <Link
              href="/bulk-orders"
              className="hidden md:inline-flex items-center gap-1 hover:underline text-[#E9DFD1]"
            >
              Bulk & Corporate Enquiries
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* 2. Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? "bg-[#F7F4EE]/95 backdrop-blur-md border-[#E7E0D6] shadow-xs py-3"
            : "bg-[#F7F4EE] border-[#E7E0D6] py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 -ml-2 text-[#252522] hover:text-[#5A252E] focus:outline-none"
                aria-label="Open mobile menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="p-2 text-[#252522] hover:text-[#5A252E] focus:outline-none ml-1"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>

            {/* Brand Wordmark (Logo) */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block group focus:outline-none">
                <span className="font-heading text-2xl sm:text-3xl md:text-3xl tracking-[0.22em] uppercase font-medium text-[#252522] group-hover:text-[#5A252E] transition-colors">
                  {siteConfig.name}
                </span>
                <span className="block text-[9px] uppercase tracking-[0.25em] text-[#8B8176] -mt-1 font-sans">
                  {siteConfig.descriptor}
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-widest font-medium text-[#252522]">
              <Link
                href="/shop"
                className={`hover:text-[#5A252E] transition-colors py-1 ${
                  pathname === "/shop" ? "text-[#5A252E] border-b-2 border-[#5A252E]" : ""
                }`}
              >
                Shop All
              </Link>
              <Link
                href="/collections/dinner-sets"
                className={`hover:text-[#5A252E] transition-colors py-1 ${
                  pathname === "/collections/dinner-sets" ? "text-[#5A252E] border-b-2 border-[#5A252E]" : ""
                }`}
              >
                Dinner Sets
              </Link>
              <Link
                href="/collections/platters-serving"
                className={`hover:text-[#5A252E] transition-colors py-1 ${
                  pathname === "/collections/platters-serving" ? "text-[#5A252E] border-b-2 border-[#5A252E]" : ""
                }`}
              >
                Serving & Platters
              </Link>

              {/* Gifting Dropdown / Mega Menu */}
              <div
                className="relative py-1"
                onMouseEnter={() => setGiftingDropdownOpen(true)}
                onMouseLeave={() => setGiftingDropdownOpen(false)}
              >
                <button
                  type="button"
                  className="flex items-center gap-1 hover:text-[#5A252E] transition-colors focus:outline-none uppercase tracking-widest text-xs font-medium"
                >
                  Gifting
                  <ChevronDown className="w-3 h-3 transition-transform duration-200" />
                </button>

                {giftingDropdownOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-80 bg-white border border-[#E7E0D6] shadow-xl p-4 mt-2 grid gap-2 z-50 animate-fade-in">
                    <p className="text-[10px] tracking-widest uppercase text-[#8B8176] border-b border-[#E7E0D6] pb-2 mb-1">
                      Curated Gifting Collections
                    </p>
                    <Link
                      href="/collections/gift-sets"
                      className="block px-3 py-2 text-xs text-[#252522] hover:bg-[#F7F4EE] hover:text-[#5A252E] transition-colors"
                    >
                      Curated Gift Sets
                    </Link>
                    <Link
                      href="/collections/dry-fruit-boxes"
                      className="block px-3 py-2 text-xs text-[#252522] hover:bg-[#F7F4EE] hover:text-[#5A252E] transition-colors"
                    >
                      Dry-Fruit Boxes
                    </Link>
                    <Link
                      href="/collections/wedding-gifts"
                      className="block px-3 py-2 text-xs text-[#252522] hover:bg-[#F7F4EE] hover:text-[#5A252E] transition-colors"
                    >
                      Wedding Gifts & Trousseau
                    </Link>
                    <Link
                      href="/collections/corporate-gifts"
                      className="block px-3 py-2 text-xs text-[#252522] hover:bg-[#F7F4EE] hover:text-[#5A252E] transition-colors"
                    >
                      Corporate Hampers
                    </Link>
                    <Link
                      href="/collections/cracker-sets"
                      className="block px-3 py-2 text-xs text-[#252522] hover:bg-[#F7F4EE] hover:text-[#5A252E] transition-colors"
                    >
                      Cracker & Snack Sets
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href="/bulk-orders"
                className={`hover:text-[#5A252E] transition-colors py-1 ${
                  pathname === "/bulk-orders" ? "text-[#5A252E] border-b-2 border-[#5A252E]" : ""
                }`}
              >
                Corporate Gifts
              </Link>

              <Link
                href="/about"
                className={`hover:text-[#5A252E] transition-colors py-1 ${
                  pathname === "/about" ? "text-[#5A252E] border-b-2 border-[#5A252E]" : ""
                }`}
              >
                Our Story
              </Link>
            </div>

            {/* Utility Actions (Search, Wishlist, Cart) */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              {/* Desktop Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen((prev) => !prev)}
                className="hidden lg:flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#252522] hover:text-[#5A252E] transition-colors p-1"
                aria-label="Search catalogue"
              >
                <Search className="w-4 h-4" />
                <span className="text-[11px]">Search</span>
              </button>

              {/* Wishlist Link */}
              <Link
                href="/shop?filter=wishlist"
                className="relative p-1.5 text-[#252522] hover:text-[#5A252E] transition-colors"
                aria-label={`Wishlist (${wishlist.length})`}
              >
                <Heart className="w-4 h-4" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#5A252E] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Button */}
              <button
                type="button"
                onClick={openCart}
                className="relative flex items-center gap-2 p-1.5 text-[#252522] hover:text-[#5A252E] transition-colors"
                aria-label={`Shopping Cart with ${itemCount} items`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span className="hidden sm:inline-block text-xs uppercase tracking-wider font-medium">
                  Bag
                </span>
                <span className="bg-[#5A252E] text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center font-bold">
                  {itemCount}
                </span>
              </button>
            </div>
          </div>

          {/* Search Dropdown / Bar */}
          {searchOpen && (
            <div className="mt-3 pt-3 border-t border-[#E7E0D6] animate-fade-in">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search dinner sets, platters, dry-fruit boxes, brass ware..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full text-xs sm:text-sm pl-9 pr-20 py-2.5 bg-white border border-[#E7E0D6] rounded-none focus:outline-none focus:border-[#5A252E]"
                />
                <Search className="w-4 h-4 text-[#8B8176] absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider bg-[#5A252E] text-white px-3 py-1 font-medium hover:bg-[#431b22]"
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

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-[#F7F4EE] border-r border-[#E7E0D6] shadow-xl flex flex-col justify-between p-6">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#E7E0D6]">
                <div>
                  <span className="font-heading text-2xl tracking-[0.2em] uppercase font-medium text-[#252522]">
                    VITRAG
                  </span>
                  <span className="block text-[8px] uppercase tracking-[0.25em] text-[#8B8176]">
                    Tableware & Gifting
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-[#8B8176] hover:text-[#252522]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Links */}
              <div className="py-6 space-y-4 text-sm uppercase tracking-widest font-medium text-[#252522]">
                <Link
                  href="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block hover:text-[#5A252E] py-1 border-b border-[#E7E0D6]/40"
                >
                  Shop All Products
                </Link>
                <div className="pt-2 pb-1">
                  <span className="text-[10px] text-[#8B8176] tracking-widest uppercase">
                    Collections
                  </span>
                </div>
                {collections.slice(0, 6).map((col) => (
                  <Link
                    key={col.id}
                    href={`/collections/${col.slug}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs normal-case tracking-wider hover:text-[#5A252E] pl-2 py-0.5 text-[#252522]/80"
                  >
                    {col.name}
                  </Link>
                ))}

                <div className="pt-4 border-t border-[#E7E0D6]/60">
                  <Link
                    href="/bulk-orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-widest text-[#5A252E] font-semibold py-1"
                  >
                    Corporate & Bulk Gifting
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-widest hover:text-[#5A252E] py-1 text-[#252522]"
                  >
                    Our Brand Story
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block text-xs uppercase tracking-widest hover:text-[#5A252E] py-1 text-[#252522]"
                  >
                    Showroom & Contact
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Drawer Footer */}
            <div className="pt-6 border-t border-[#E7E0D6] space-y-3">
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs tracking-wider text-[#5A252E] font-medium"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp: {siteConfig.contact.displayPhone}</span>
              </a>
              <p className="text-[11px] text-[#8B8176]">
                Chennai, Tamil Nadu, India
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
