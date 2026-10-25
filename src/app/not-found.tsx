import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/lib/config";
import {
  Compass,
  ArrowRight,
  ShoppingBag,
  Sparkles,
  MessageSquare,
  Home,
  Search,
} from "lucide-react";

export const metadata = {
  title: "404 — Page Not Found | VITRAG Tableware & Gifting",
  description:
    "The page or collection you are looking for cannot be found. Discover handcrafted tableware, luxury dinner sets, and curated gift hampers at VITRAG.",
};

export default function NotFound() {
  return (
    <main className="min-h-[80vh] bg-[#FFF5E6] flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white/70 backdrop-blur-md p-8 sm:p-12 rounded-3xl border-2 border-[#EADBC8] shadow-xl">
        {/* Architectural Emblem */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-[#FFF5E6] border border-[#EADBC8] flex items-center justify-center shadow-inner relative">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            <Image
              src="/logo.jpg"
              alt="VITRAG Logo"
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <span className="absolute -bottom-2.5 bg-[#6E2023] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest">
            404
          </span>
        </div>

        {/* Headlines */}
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.28em] text-[#8C6D58] font-semibold">
            Table Setting Incomplete
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl text-[#6E2023] font-medium leading-tight">
            This Page Cannot Be Found
          </h1>
          <p className="text-xs sm:text-sm text-[#54483E] max-w-md mx-auto font-light leading-relaxed">
            The collection, piece, or page you were seeking may have been renamed, archived, or temporarily moved to our private showroom archive.
          </p>
        </div>

        {/* Quick Search Redirect */}
        <form action="/search" method="get" className="max-w-md mx-auto relative">
          <input
            type="text"
            name="q"
            placeholder="Search dinner sets, platters, gift boxes..."
            className="w-full text-xs sm:text-sm pl-10 pr-24 py-3 bg-white border border-[#EADBC8] rounded-xl focus:outline-none focus:border-[#6E2023] shadow-inner"
          />
          <Search className="w-4 h-4 text-[#54483E] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <button
            type="submit"
            className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#6E2023] hover:bg-[#58181A] text-white text-xs font-semibold rounded-lg transition-colors"
          >
            Search
          </button>
        </form>

        {/* Curated Pathways Grid */}
        <div className="pt-4 border-t border-[#EADBC8]/70">
          <p className="text-[11px] uppercase tracking-widest text-[#54483E] font-semibold mb-4">
            Curated Destinations
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
            <Link
              href="/"
              className="p-3 rounded-xl bg-white border border-[#EADBC8] hover:border-[#6E2023] hover:shadow-sm transition-all group"
            >
              <Home className="w-4 h-4 text-[#6E2023] mb-1.5" />
              <p className="text-xs font-semibold text-[#252522] group-hover:text-[#6E2023]">
                Home
              </p>
              <p className="text-[10px] text-[#54483E] font-light">Main Showcase</p>
            </Link>

            <Link
              href="/shop"
              className="p-3 rounded-xl bg-white border border-[#EADBC8] hover:border-[#6E2023] hover:shadow-sm transition-all group"
            >
              <ShoppingBag className="w-4 h-4 text-[#6E2023] mb-1.5" />
              <p className="text-xs font-semibold text-[#252522] group-hover:text-[#6E2023]">
                All Pieces
              </p>
              <p className="text-[10px] text-[#54483E] font-light">Complete Catalogue</p>
            </Link>

            <Link
              href="/collections/signature-editions"
              className="p-3 rounded-xl bg-white border border-[#EADBC8] hover:border-[#6E2023] hover:shadow-sm transition-all group"
            >
              <Sparkles className="w-4 h-4 text-[#6E2023] mb-1.5" />
              <p className="text-xs font-semibold text-[#252522] group-hover:text-[#6E2023]">
                Signature
              </p>
              <p className="text-[10px] text-[#54483E] font-light">Marquee Series</p>
            </Link>

            <Link
              href="/collections/dinner-sets"
              className="p-3 rounded-xl bg-white border border-[#EADBC8] hover:border-[#6E2023] hover:shadow-sm transition-all group"
            >
              <Compass className="w-4 h-4 text-[#6E2023] mb-1.5" />
              <p className="text-xs font-semibold text-[#252522] group-hover:text-[#6E2023]">
                Dinner Sets
              </p>
              <p className="text-[10px] text-[#54483E] font-light">Fine Porcelain</p>
            </Link>
          </div>
        </div>

        {/* Concierge Assistance */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#6E2023] hover:bg-[#58181A] text-white text-xs uppercase tracking-widest font-semibold rounded-xl shadow-md transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Homepage</span>
          </Link>

          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=Hi%20VITRAG,%20I%20encountered%20a%20broken%20link%20and%20need%20assistance.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#1b7e3f] border border-[#25D366]/40 text-xs uppercase tracking-widest font-semibold rounded-xl transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#25D366]" />
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </main>
  );
}
