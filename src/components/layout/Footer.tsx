"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { InstagramIcon } from "@/components/ui/Icons";

export function Footer() {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed) {
      setErrorMsg("Please enter your email address.");
      return;
    }
    // Basic RFC 5322 regex validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setErrorMsg("Please enter a valid email address (e.g., name@example.com).");
      return;
    }
    setErrorMsg("");
    setSubscribed(true);
  };

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#6E2023] text-[#FFF5E6] pt-16 sm:pt-20 pb-12 border-t border-[#55181A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section: Brand Story & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[#CBAE9B]/25">
          <div className="lg:col-span-5 space-y-4">
            {/* Clickable Brand Logo & Wordmark */}
            <Link
              href="/"
              aria-label="VITRAG Tableware & Gifting — Return to Homepage"
              className="inline-flex items-center gap-3.5 group focus:outline-none"
            >
              <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#CBAE9B]/40 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo.jpg"
                  alt="VITRAG Logo"
                  fill
                  className="object-cover"
                  sizes="48px"
                />
              </div>
              <div>
                <span className="font-heading text-2xl sm:text-3xl tracking-[0.16em] uppercase font-light text-white block leading-tight group-hover:text-[#FFF5E6]/90 transition-colors">
                  {siteConfig.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-[#CBAE9B] font-sans font-medium block">
                  {siteConfig.descriptor}
                </span>
              </div>
            </Link>

            <p className="text-sm text-[#FFF5E6]/85 max-w-md leading-relaxed pt-2 font-light">
              From everyday meals to festive tables and meaningful gifts, VITRAG brings together carefully selected pieces that make hosting, celebrating, and gifting feel special.
            </p>
            <p className="font-heading italic text-base text-[#CBAE9B] pt-1">
              &ldquo;{siteConfig.tagline}&rdquo;
            </p>
          </div>

          <div className="lg:col-span-7 lg:pl-10 flex flex-col justify-center">
            <div className="bg-[#55181A] p-6 sm:p-8 rounded-2xl border border-[#8A2B2F] shadow-lg">
              <h3 className="font-heading text-2xl text-white mb-2">
                Join the VITRAG Journal
              </h3>
              <p className="text-xs text-[#CBAE9B] max-w-lg mb-6 leading-relaxed font-light">
                Receive private invitations to seasonal dinnerware releases, table styling guides, and festive gifting edits.
              </p>

              {subscribed ? (
                <div className="flex items-center gap-3 text-xs tracking-wider text-[#CBAE9B] bg-[#6E2023] p-4 rounded-xl border border-[#CBAE9B]/50 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-[#25D366] shrink-0" />
                  <div>
                    <p className="font-bold text-white uppercase text-[11px]">
                      Subscription Confirmed!
                    </p>
                    <p className="text-xs text-[#FFF5E6]/80 mt-0.5">
                      Thank you for joining the VITRAG Journal. A curated welcome note has been dispatched.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMsg) setErrorMsg("");
                      }}
                      className="flex-1 bg-[#6E2023] border border-[#CBAE9B]/40 px-4 py-3 text-[16px] sm:text-xs text-white placeholder-[#CBAE9B]/60 rounded-xl focus:outline-none focus:border-[#CBAE9B]"
                    />
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#CBAE9B] hover:bg-[#bfa08c] text-[#6E2023] text-xs uppercase tracking-widest font-semibold transition-colors rounded-xl shadow-sm active:scale-95 min-h-[44px]"
                    >
                      <span>Subscribe</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>

                  {/* Error Message Feedback */}
                  {errorMsg && (
                    <div className="flex items-center gap-2 text-xs text-[#FFA8A8] bg-[#6E2023]/80 p-2.5 rounded-lg border border-[#FFA8A8]/30 animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 text-[#FFA8A8]" />
                      <span>{errorMsg}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Section: Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-14 border-b border-[#CBAE9B]/25 text-xs">
          {/* Col 1: Core Collections */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase font-medium">
              Curated Collections
            </h4>
            <ul className="space-y-2.5 text-[#FFF5E6]/80 font-light">
              <li>
                <Link href="/shop" className="hover:text-white hover:underline transition-colors font-medium">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections/signature-editions" className="hover:text-white hover:underline transition-colors font-medium text-[#CBAE9B]">
                  ✨ Signature Editions
                </Link>
              </li>
              <li>
                <Link href="/collections/dinner-sets" className="hover:text-white hover:underline transition-colors">
                  Dinner Sets
                </Link>
              </li>
              <li>
                <Link href="/collections/platters-serving" className="hover:text-white hover:underline transition-colors">
                  Platters &amp; Serving
                </Link>
              </li>
              <li>
                <Link href="/collections/dry-fruit-boxes" className="hover:text-white hover:underline transition-colors">
                  Dry-Fruit Boxes
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white text-[#CBAE9B] transition-colors font-medium">
                  Corporate &amp; Wedding Bulk
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Showroom & Ordering */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg text-white tracking-wider uppercase font-medium">
              Direct Ordering
            </h4>
            <ul className="space-y-2.5 text-[#FFF5E6]/80 font-light">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-[#25D366] transition-colors font-medium inline-flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-[#25D366]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white hover:underline transition-colors">
                  Shopping Bag
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="hover:text-white hover:underline transition-colors">
                  Checkout &amp; UPI
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="hover:text-white hover:underline transition-colors">
                  Bulk &amp; Custom Hampers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                  Sowcarpet Showroom
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
                <Link href="/compare" className="hover:text-white text-[#CBAE9B] hover:underline transition-colors font-medium">
                  Why VITRAG vs Others
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white hover:underline transition-colors">
                  Our Story &amp; Values
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white hover:underline transition-colors">
                  Showroom &amp; Contact
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="hover:text-white hover:underline transition-colors">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link href="/returns-refunds" className="hover:text-white hover:underline transition-colors">
                  Returns &amp; Refunds
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

              {/* Clickable Direct Phone Call & WhatsApp */}
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#CBAE9B] shrink-0" />
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="hover:text-white transition-colors text-[#CBAE9B] font-medium"
                  title="Call Showroom Concierge"
                >
                  {siteConfig.contact.displayPhone}
                </a>
                <span className="text-[#CBAE9B]/50">•</span>
                <a
                  href={`https://wa.me/${siteConfig.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] transition-colors inline-flex items-center gap-1 text-[11px] text-[#25D366]"
                  title="Chat on WhatsApp"
                >
                  <MessageSquare className="w-3 h-3 fill-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Clickable Email */}
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#CBAE9B] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors underline decoration-[#CBAE9B]/40"
                  title="Send Email to Concierge"
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
          <p>© {new Date().getFullYear()} VITRAG Tableware &amp; Gifting. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6 text-[#FFF5E6]/75">
            <span>Chennai • Pan-India Insured Shipping</span>
            <span>Handcrafted Ceramics &amp; Fine Dinnerware</span>
            <Link
              href="/admin"
              className="text-[#CBAE9B]/50 hover:text-white transition-colors underline decoration-[#CBAE9B]/20"
              title="Store Owner & Staff Administration Console"
            >
              Merchant Console
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
