"use client";

import React, { useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // In production, connect to mailing list provider
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#252522] text-[#F7F4EE] pt-16 sm:pt-20 pb-12 border-t border-[#3a3a35]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand Story & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#3a3a35]">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-heading text-3xl sm:text-4xl tracking-[0.2em] uppercase font-light text-white block">
              {siteConfig.name}
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[#E9DFD1]/70 font-sans">
              {siteConfig.descriptor}
            </p>
            <p className="text-sm text-[#F7F4EE]/80 max-w-md leading-relaxed pt-2">
              From everyday meals to festive tables and meaningful gifts, VITRAG brings together carefully selected pieces that make hosting, celebrating, and gifting feel special.
            </p>
            <p className="font-heading italic text-base text-[#E9DFD1] pt-1">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10 flex flex-col justify-center">
            <div className="bg-[#2e2e2a] p-6 sm:p-8 border border-[#44443e]">
              <h3 className="font-heading text-2xl text-white mb-2">
                Join the VITRAG Journal
              </h3>
              <p className="text-xs text-[#F7F4EE]/70 max-w-lg mb-6 leading-relaxed">
                Receive private invitations to seasonal dinnerware releases, table styling guides, and festive gifting edits.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#E9DFD1] bg-[#5A252E]/40 p-3 border border-[#5A252E]">
                  <CheckCircle2 className="w-4 h-4 text-[#E9DFD1]" />
                  <span>Thank you for subscribing to the VITRAG Journal.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-[#252522] border border-[#505048] px-4 py-3 text-xs text-white placeholder-[#8B8176] focus:outline-none focus:border-[#E9DFD1]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#5A252E] hover:bg-[#431b22] text-white text-xs uppercase tracking-widest font-medium transition-colors"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[#3a3a35] text-xs">
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase">
              Tableware
            </h4>
            <ul className="space-y-2.5 text-[#F7F4EE]/75">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/dinner-sets" className="hover:text-white transition-colors">
                  Dinner Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/platters-serving" className="hover:text-white transition-colors">
                  Platters & Serving
                </Link>
              </li>
              <li>
                <Link href="/collections/mugs-cups" className="hover:text-white transition-colors">
                  Mugs & Teaware
                </Link>
              </li>
              <li>
                <Link href="/collections/kitchenware" className="hover:text-white transition-colors">
                  Artisan Kitchenware
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Gifting */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase">
              Gifting
            </h4>
            <ul className="space-y-2.5 text-[#F7F4EE]/75">
              <li>
                <Link href="/collections/gift-sets" className="hover:text-white transition-colors">
                  Curated Gift Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/dry-fruit-boxes" className="hover:text-white transition-colors">
                  Dry-Fruit Boxes
                </Link>
              </li>
              <li>
                <Link href="/collections/cracker-sets" className="hover:text-white transition-colors">
                  Cracker Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/wedding-gifts" className="hover:text-white transition-colors">
                  Wedding & Trousseau
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white text-[#E9DFD1] transition-colors font-medium">
                  Corporate & Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand & Policies */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-[#F7F4EE]/75">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story & Values
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Showroom & Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns-refunds" className="hover:text-white transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Showroom */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase">
              Showroom
            </h4>
            <div className="space-y-3 text-[#F7F4EE]/75">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#E9DFD1] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#E9DFD1] shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#E9DFD1] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <p className="text-[11px] text-[#8B8176] pt-1">
                {siteConfig.contact.hours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#8B8176] gap-4">
          <p>© 2026 VITRAG Tableware & Gifting. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Chennai • Pan-India Shipping</span>
            <span>Handcrafted Ceramics & Fine Dinnerware</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
