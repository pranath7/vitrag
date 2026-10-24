"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import { ArrowRight, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-[#6E2023] text-[#FFF5E6] pt-16 sm:pt-20 pb-12 border-t border-[#55181A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand Story & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#CBAE9B]/25">
          <div className="lg:col-span-5 space-y-4">
            <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#CBAE9B]/40 shadow-sm mb-4">
              <Image
                src="/logo.jpg"
                alt="VITRAG Logo"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <span className="font-heading text-3xl sm:text-4xl tracking-[0.2em] uppercase font-light text-white block">
              {siteConfig.name}
            </span>
            <p className="text-xs uppercase tracking-[0.25em] text-[#CBAE9B] font-sans font-medium">
              {siteConfig.descriptor}
            </p>
            <p className="text-sm text-[#FFF5E6]/85 max-w-md leading-relaxed pt-2 font-light">
              From everyday meals to festive tables and meaningful gifts, VITRAG brings together carefully selected pieces that make hosting, celebrating, and gifting feel special.
            </p>
            <p className="font-heading italic text-base text-[#CBAE9B] pt-1">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10 flex flex-col justify-center">
            <div className="bg-[#55181A] p-6 sm:p-8 rounded-2xl border border-[#8A2B2F]">
              <h3 className="font-heading text-2xl text-white mb-2">
                Join the VITRAG Journal
              </h3>
              <p className="text-xs text-[#CBAE9B] max-w-lg mb-6 leading-relaxed font-light">
                Receive private invitations to seasonal dinnerware releases, table styling guides, and festive gifting edits.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#CBAE9B] bg-[#6E2023] p-3 rounded-lg border border-[#CBAE9B]/50">
                  <CheckCircle2 className="w-4 h-4 text-[#CBAE9B]" />
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
                    className="flex-1 bg-[#6E2023] border border-[#CBAE9B]/40 px-4 py-3 text-xs text-white placeholder-[#CBAE9B]/60 rounded-lg focus:outline-none focus:border-[#CBAE9B]"
                  />
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#CBAE9B] hover:bg-[#bfa08c] text-[#6E2023] text-xs uppercase tracking-widest font-semibold transition-colors rounded-lg shadow-sm"
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[#CBAE9B]/25 text-xs">
          {/* Col 1: Shop */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase font-medium">
              Tableware
            </h4>
            <ul className="space-y-2.5 text-[#FFF5E6]/80 font-light">
              <li>
                <Link href="/shop" className="hover:text-white hover:underline transition-colors">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/signature-editions" className="hover:text-white hover:underline transition-colors font-medium text-[#CBAE9B]">
                  Signature Editions (Category 1)
                </Link>
              </li>
              <li>
                <Link href="/collections/dinner-sets" className="hover:text-white hover:underline transition-colors">
                  Dinner Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/platters-serving" className="hover:text-white hover:underline transition-colors">
                  Platters & Serving
                </Link>
              </li>
              <li>
                <Link href="/collections/mugs-cups" className="hover:text-white hover:underline transition-colors">
                  Mugs & Teaware
                </Link>
              </li>
              <li>
                <Link href="/collections/kitchenware" className="hover:text-white hover:underline transition-colors">
                  Artisan Kitchenware
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Gifting */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase font-medium">
              Gifting
            </h4>
            <ul className="space-y-2.5 text-[#FFF5E6]/80 font-light">
              <li>
                <Link href="/collections/gift-sets" className="hover:text-white hover:underline transition-colors">
                  Curated Gift Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/dry-fruit-boxes" className="hover:text-white hover:underline transition-colors">
                  Dry-Fruit Boxes
                </Link>
              </li>
              <li>
                <Link href="/collections/cracker-sets" className="hover:text-white hover:underline transition-colors">
                  Cracker Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/wedding-gifts" className="hover:text-white hover:underline transition-colors">
                  Wedding & Trousseau
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white text-[#CBAE9B] transition-colors font-medium">
                  Corporate & Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Brand & Policies */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase font-medium">
              Client Care
            </h4>
            <ul className="space-y-2.5 text-[#FFF5E6]/80 font-light">
              <li>
                <Link href="/billing" className="hover:text-white text-[#CBAE9B] hover:underline transition-colors font-medium">
                  Billing & Invoices
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-white text-[#CBAE9B] hover:underline transition-colors font-medium">
                  Why VITRAG vs Others
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors">
                  Our Story & Values
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                  Showroom & Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white hover:underline transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns-refunds" className="hover:text-white hover:underline transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white hover:underline transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white hover:underline transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Showroom */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase font-medium">
              Showroom
            </h4>
            <div className="space-y-3 text-[#FFF5E6]/80 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#CBAE9B] shrink-0 mt-0.5" />
                <span>{siteConfig.contact.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CBAE9B] shrink-0" />
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  className="hover:text-white transition-colors text-[#CBAE9B] font-medium"
                >
                  {siteConfig.contact.displayPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#CBAE9B] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <InstagramIcon className="w-4 h-4 text-[#CBAE9B] shrink-0" />
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors text-[#CBAE9B] font-medium"
                >
                  {siteConfig.social.instagramHandle}
                </a>
              </div>
              <p className="text-[11px] text-[#CBAE9B]/80 pt-1">
                {siteConfig.contact.hours}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#CBAE9B] gap-4">
          <p>© 2026 VITRAG Tableware & Gifting. All rights reserved.</p>
          <div className="flex items-center gap-6 text-[#FFF5E6]/75">
            <span>Chennai • Pan-India Shipping</span>
            <span>Handcrafted Ceramics & Fine Dinnerware</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
