import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, collections, products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  ArrowDown,
  Sparkles,
  ShieldCheck,
  Gift,
  Truck,
  MessageSquare,
  Clock,
  Compass,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "VITRAG — Fine Tableware & Curated Gifting | Chennai, India",
  description:
    "Rooted in tradition and designed for modern gatherings. Discover handcrafted ceramic dinner sets, luxury platters, dry-fruit gift boxes, and bespoke festive hampers.",
  openGraph: {
    title: "VITRAG — Fine Living | Tableware & Curated Gifting",
    description:
      "Rooted in tradition and designed for modern gatherings. Handcrafted dinnerware and curated gifts from Chennai, India.",
    url: siteConfig.url,
    siteName: "VITRAG",
  },
};

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);
  const giftingProducts = products.filter((p) => p.collectionIds.includes("dry-fruit-boxes")).slice(0, 4);

  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      {/* ========================================================
          SECTION A: HERO (Designed for Modern Gatherings - Matching Mockup)
         ======================================================== */}
      <section className="relative overflow-hidden bg-[#FAF3E7] border-b border-[#EADBC8] pt-8 sm:pt-12 lg:pt-14 pb-10 sm:pb-14 lg:pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Content: Editorial Headline & Actions */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-7 text-left">
              {/* Pre-title with Festive Diwali Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6E2023] text-[#FFF5E6] rounded-full text-[11px] uppercase tracking-[0.22em] font-semibold shadow-xs">
                <span>🪔</span>
                <span>Diwali Grand Festive Sale</span>
                <span className="bg-[#FFD700] text-[#6E2023] text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                  Up to 46% Off
                </span>
              </div>

              {/* Main Display Headline */}
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-[#5A1218] font-normal leading-[1.06] tracking-tight">
                Designed <br />
                for Meaningful <br />
                Moments.
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base lg:text-lg text-[#7A6B60] max-w-md font-light leading-relaxed">
                Serve snacks, dry fruits or festive treats in unmatched style. Handcrafted luxury sets starting from <strong className="text-[#6E2023] font-semibold">₹6,499</strong> with complimentary pan-India delivery.
              </p>

              {/* Call to Action Buttons */}
              <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/collections/diwali-sale"
                  className="inline-flex items-center justify-center gap-3 bg-[#5A1218] hover:bg-[#430D12] text-white text-xs uppercase tracking-[0.2em] font-medium px-7 py-4 rounded-xs transition-all shadow-md hover:shadow-lg group"
                >
                  <span>Shop Diwali Sale</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/product/diwali-meaningful-moments-6pc-crystal-server-tray"
                  className="inline-flex items-center justify-center gap-2 bg-white/90 hover:bg-white text-[#5A1218] border border-[#CBAE9B] text-xs uppercase tracking-[0.16em] font-medium px-6 py-4 rounded-xs transition-all shadow-xs"
                >
                  <span>6-Pc Crystal Set (₹6,999)</span>
                </Link>
              </div>

              {/* Trust Badges / Stats Bar */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-[#EADBC8] max-w-md">
                <div className="pr-3 sm:pr-4 border-r border-[#CBAE9B]/60">
                  <span className="block font-heading text-2xl sm:text-3xl text-[#5A1218] font-semibold leading-none">
                    46%
                  </span>
                  <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#84766A] mt-1.5 font-medium leading-tight">
                    Festive Savings
                  </span>
                </div>
                <div className="px-3 sm:px-4 border-r border-[#CBAE9B]/60">
                  <span className="block font-heading text-sm sm:text-base text-[#5A1218] font-bold uppercase tracking-wider leading-none">
                    Diwali
                  </span>
                  <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#84766A] mt-1.5 font-medium leading-tight">
                    Gift Boxes
                  </span>
                </div>
                <div className="pl-3 sm:pl-4">
                  <span className="block font-heading text-sm sm:text-base text-[#5A1218] font-bold uppercase tracking-wider leading-none">
                    Free
                  </span>
                  <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.16em] text-[#84766A] mt-1.5 font-medium leading-tight">
                    Pan-India Delivery
                  </span>
                </div>
              </div>
            </div>

            {/* Right Visual: High-Resolution Stock Architectural Arch Cutout with Diwali 6-Piece Feature */}
            <div className="lg:col-span-7 relative flex items-center justify-center lg:justify-end py-4">
              <div className="relative">
                {/* 1. Architectural Arched Frame with Real Stock Tableware Photo */}
                <div className="relative w-[290px] sm:w-[400px] lg:w-[450px] aspect-[4/5] rounded-t-[180px] sm:rounded-t-[240px] rounded-b-3xl overflow-hidden shadow-[0_30px_70px_-20px_rgba(90,18,24,0.25)] border-[5px] border-[#CBAE9B]/70 bg-[#2A1417] group">
                  <Image
                    src="https://res.cloudinary.com/pmip0yum/image/upload/v1792859135/vitrag/diwali_sale/fsb3z2rvcifain5ejhzf.jpg"
                    alt="Designed for Meaningful Moments — Vitrag 6-Piece Crystal Knobs Dry Fruit Server Tray"
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 290px, (max-width: 1024px) 400px, 450px"
                    priority
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-[#CBAE9B]/50 rounded-t-[180px] sm:rounded-t-[240px] rounded-b-3xl pointer-events-none" />
                </div>

                {/* 2. Rotating Luxury Seal Badge (from mockup) */}
                <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-24 h-24 sm:w-28 sm:h-28 z-20 pointer-events-none select-none">
                  {/* Rotating Circular Text */}
                  <svg
                    className="w-full h-full animate-[spin_24s_linear_infinite]"
                    viewBox="0 0 120 120"
                  >
                    <path
                      id="sealCircle"
                      d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] uppercase tracking-[0.24em] fill-[#8C6D58] font-semibold font-serif">
                      <textPath href="#sealCircle" startOffset="0%">
                        • DIWALI FESTIVE SALE • UP TO 50% OFF •
                      </textPath>
                    </text>
                  </svg>
                  {/* Center Star / Crest */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-[#FAF3E7] border border-[#CBAE9B] shadow-xs flex items-center justify-center">
                      <span className="text-sm">🪔</span>
                    </div>
                  </div>
                </div>

                {/* 3. Scroll Down Indicator (from mockup) */}
                <a
                  href="#diwali-exclusives"
                  className="hidden xl:flex flex-col items-center gap-2 absolute -right-12 bottom-6 text-[#84766A] hover:text-[#5A1218] transition-colors group cursor-pointer"
                  aria-label="Scroll to collection"
                >
                  <span className="text-[10px] uppercase tracking-[0.25em] [writing-mode:vertical-lr] font-medium text-[#8C6D58]">
                    Diwali Offers
                  </span>
                  <ArrowDown className="w-3.5 h-3.5 text-[#5A1218] transition-transform duration-300 group-hover:translate-y-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          DIWALI GRAND FESTIVE SALE SPOTLIGHT (META ADS SPECIAL)
         ======================================================== */}
      <section id="diwali-exclusives" className="py-12 sm:py-16 bg-[#FFF5E6] border-b border-[#EADBC8] relative overflow-hidden scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#6E2023] text-[#FFF5E6] text-[11px] uppercase tracking-[0.22em] font-semibold rounded-full border border-[#FFD700]/30 shadow-xs mb-3">
                <span>🪔</span>
                <span>Diwali Festive Flash Sale • Limited Editions</span>
              </div>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#6E2023] font-medium tracking-tight">
                Diwali Marquee Gifting Exclusives
              </h2>
              <p className="text-sm sm:text-base text-[#84766A] mt-2 max-w-2xl font-light">
                Curated especially for the Festival of Lights. Featuring 4-piece and 6-piece luxury dry-fruit servers, tiered crystal diamond knobs, and polished gold chevron platters at special festive prices.
              </p>
            </div>
            <Link
              href="/collections/diwali-sale"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold bg-[#6E2023] hover:bg-[#55181A] text-white px-5 py-3 rounded-xl transition-all shadow-md shrink-0"
            >
              <span>View All Diwali Offers</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Featured Meta Ads Campaign Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Card 1: 6-Pc Crystal Knobs Set */}
            <div className="group bg-white border-2 border-[#EADBC8] hover:border-[#6E2023] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <Link
                href="/product/diwali-meaningful-moments-6pc-crystal-server-tray"
                className="relative aspect-4/3 w-full overflow-hidden block bg-[#252522]"
              >
                <Image
                  src="https://res.cloudinary.com/pmip0yum/image/upload/v1792859135/vitrag/diwali_sale/fsb3z2rvcifain5ejhzf.jpg"
                  alt="Designed for Meaningful Moments — 6-Piece Crystal Knobs Dry Fruit & Snack Server Tray"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-[#6E2023] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span>🪔</span>
                  <span>Diwali Special • 46% OFF</span>
                </div>
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#84766A] uppercase tracking-wider font-medium mb-1">
                    <span>6-Piece Tiered Server</span>
                    <span className="text-[#2D6A4F] font-bold">In Stock</span>
                  </div>
                  <h3 className="font-heading text-lg text-[#6E2023] font-medium leading-snug line-clamp-2">
                    <Link
                      href="/product/diwali-meaningful-moments-6pc-crystal-server-tray"
                      className="hover:underline"
                    >
                      Designed for Meaningful Moments — 6-Piece Crystal Knobs Server Tray
                    </Link>
                  </h3>
                  <p className="text-xs text-[#84766A] mt-1.5 font-light line-clamp-2">
                    Porcelain cube jars with faceted diamond-cut crystal knobs, sealed glass lids & clear gallery railing tray.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EADBC8] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-heading font-bold text-[#6E2023]">
                        ₹6,999
                      </span>
                      <span className="text-xs text-[#84766A] line-through">
                        ₹12,999
                      </span>
                    </div>
                    <span className="text-[10px] text-[#2D6A4F] font-semibold">
                      Save ₹6,000 (46% Discount)
                    </span>
                  </div>
                  <Link
                    href="/product/diwali-meaningful-moments-6pc-crystal-server-tray"
                    className="py-2.5 px-4 bg-[#6E2023] hover:bg-[#55181A] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-all shadow-xs"
                  >
                    View &amp; Buy →
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 2: 6-Pc Petal Ceramic Set */}
            <div className="group bg-white border-2 border-[#EADBC8] hover:border-[#6E2023] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <Link
                href="/product/diwali-elevate-6pc-petal-ceramic-server-tray"
                className="relative aspect-4/3 w-full overflow-hidden block bg-[#252522]"
              >
                <Image
                  src="https://res.cloudinary.com/pmip0yum/image/upload/v1792859137/vitrag/diwali_sale/swmzszvftfbneu6g3nmb.jpg"
                  alt="Elevate Everyday Living — 6-Piece Petal Ceramic Dry Fruit Server with Gold Handle"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-[#6E2023] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span>🪔</span>
                  <span>Diwali Special • 46% OFF</span>
                </div>
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#84766A] uppercase tracking-wider font-medium mb-1">
                    <span>6-Piece Petal Set</span>
                    <span className="text-[#2D6A4F] font-bold">In Stock</span>
                  </div>
                  <h3 className="font-heading text-lg text-[#6E2023] font-medium leading-snug line-clamp-2">
                    <Link
                      href="/product/diwali-elevate-6pc-petal-ceramic-server-tray"
                      className="hover:underline"
                    >
                      Elevate Everyday Living — 6-Piece Petal Server with Gold Handle
                    </Link>
                  </h3>
                  <p className="text-xs text-[#84766A] mt-1.5 font-light line-clamp-2">
                    Droplet petal-shaped ceramic bowls in a scalloped organizer tray with luxury polished gold center handle.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EADBC8] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-heading font-bold text-[#6E2023]">
                        ₹6,999
                      </span>
                      <span className="text-xs text-[#84766A] line-through">
                        ₹12,999
                      </span>
                    </div>
                    <span className="text-[10px] text-[#2D6A4F] font-semibold">
                      Save ₹6,000 (46% Discount)
                    </span>
                  </div>
                  <Link
                    href="/product/diwali-elevate-6pc-petal-ceramic-server-tray"
                    className="py-2.5 px-4 bg-[#6E2023] hover:bg-[#55181A] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-all shadow-xs"
                  >
                    View &amp; Buy →
                  </Link>
                </div>
              </div>
            </div>

            {/* Card 3: 4-Pc Glass Platter Set */}
            <div className="group bg-white border-2 border-[#EADBC8] hover:border-[#6E2023] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col">
              <Link
                href="/product/diwali-elevate-4pc-glass-serving-platter-gold-handles"
                className="relative aspect-4/3 w-full overflow-hidden block bg-[#252522]"
              >
                <Image
                  src="https://res.cloudinary.com/pmip0yum/image/upload/v1792859138/vitrag/diwali_sale/jtdjlo1lbxobu24uwmrp.jpg"
                  alt="Elevate Everyday Living — 4-Piece Glass Serving Platter with Chevron Gold Handles"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute top-3 left-3 bg-[#6E2023] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                  <span>🪔</span>
                  <span>Diwali Special • 41% OFF</span>
                </div>
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-[#84766A] uppercase tracking-wider font-medium mb-1">
                    <span>4-Piece Covered Platter</span>
                    <span className="text-[#2D6A4F] font-bold">In Stock</span>
                  </div>
                  <h3 className="font-heading text-lg text-[#6E2023] font-medium leading-snug line-clamp-2">
                    <Link
                      href="/product/diwali-elevate-4pc-glass-serving-platter-gold-handles"
                      className="hover:underline"
                    >
                      Elevate Everyday Living — 4-Piece Glass Platter with Chevron Gold Handles
                    </Link>
                  </h3>
                  <p className="text-xs text-[#84766A] mt-1.5 font-light line-clamp-2">
                    High-clarity rectangular covered glass dishes arranged along an elongated platter with chevron gold handles.
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EADBC8] flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-heading font-bold text-[#6E2023]">
                        ₹6,499
                      </span>
                      <span className="text-xs text-[#84766A] line-through">
                        ₹10,999
                      </span>
                    </div>
                    <span className="text-[10px] text-[#2D6A4F] font-semibold">
                      Save ₹4,500 (41% Discount)
                    </span>
                  </div>
                  <Link
                    href="/product/diwali-elevate-4pc-glass-serving-platter-gold-handles"
                    className="py-2.5 px-4 bg-[#6E2023] hover:bg-[#55181A] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-all shadow-xs"
                  >
                    View &amp; Buy →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SIGNATURE CATEGORY: EDITORIAL POSTERS SHOWCASE (Category 1)
         ======================================================== */}
      <section id="signature-editions" className="py-8 sm:py-12 bg-[#FFF5E6] border-b border-[#EADBC8] relative overflow-hidden scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6E2023]/10 text-[#6E2023] text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full border border-[#6E2023]/20 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#6E2023]" />
                <span>Category 1 • Signature Editions</span>
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-[#6E2023] font-medium tracking-tight">
                Crafted for Cherished Moments
              </h2>
              <p className="text-xs sm:text-sm text-[#84766A] mt-1 max-w-xl font-light">
                Discover our signature campaign editions — fine lead-free crystal barware and artisan floral ceramics.
              </p>
            </div>
            <Link
              href="/collections/signature-editions"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-[#6E2023] hover:text-[#55181A] transition-colors shrink-0"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3 Compact Vertical Poster Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 justify-items-center">
            {/* Poster 1: Elevate Every Pour */}
            <article className="group flex flex-col bg-white border border-[#EADBC8] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#6E2023]/40 transition-all duration-300 w-full max-w-[220px] sm:max-w-[235px]">
              <Link
                href="/product/elevate-every-pour-crystal-whiskey-glass-set"
                className="relative aspect-9/16 w-full overflow-hidden block bg-[#252522]"
              >
                <Image
                  src="https://res.cloudinary.com/pmip0yum/image/upload/v1792840531/vitrag/products/nfcut030ltu9iza7ded8.png"
                  alt="Elevate Every Pour — 6 Pcs Crystal Whiskey Glass Set"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 220px, 235px"
                />
              </Link>
              <div className="p-3 bg-white flex flex-col justify-between gap-1 border-t border-[#EADBC8]/60">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading text-sm text-[#6E2023] font-medium truncate">
                    Elevate Every Pour
                  </h3>
                  <span className="text-[10px] uppercase font-semibold text-[#6E2023] bg-[#CBAE9B]/25 px-1.5 py-0.5 rounded shrink-0">
                    Price on Request
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#84766A]">
                  <span>6 Pcs Crystal Set</span>
                  <Link
                    href="/product/elevate-every-pour-crystal-whiskey-glass-set"
                    className="text-[#6E2023] font-semibold hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </article>

            {/* Poster 2: Serve Beautifully */}
            <article className="group flex flex-col bg-white border border-[#EADBC8] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#6E2023]/40 transition-all duration-300 w-full max-w-[220px] sm:max-w-[235px]">
              <Link
                href="/product/serve-beautifully-rose-pedestal-serving-bowl"
                className="relative aspect-9/16 w-full overflow-hidden block bg-[#252522]"
              >
                <Image
                  src="https://res.cloudinary.com/pmip0yum/image/upload/v1792840532/vitrag/products/b68vbkwcapraqbr1fqrv.png"
                  alt="Serve Beautifully — Rose Elegance Pedestal Serving Bowl"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 220px, 235px"
                />
              </Link>
              <div className="p-3 bg-white flex flex-col justify-between gap-1 border-t border-[#EADBC8]/60">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading text-sm text-[#6E2023] font-medium truncate">
                    Serve Beautifully
                  </h3>
                  <span className="text-[10px] uppercase font-semibold text-[#6E2023] bg-[#CBAE9B]/25 px-1.5 py-0.5 rounded shrink-0">
                    Price on Request
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#84766A]">
                  <span>Rose Pedestal Bowl</span>
                  <Link
                    href="/product/serve-beautifully-rose-pedestal-serving-bowl"
                    className="text-[#6E2023] font-semibold hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </article>

            {/* Poster 3: A Cup for Every Moment */}
            <article className="group flex flex-col bg-white border border-[#EADBC8] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#6E2023]/40 transition-all duration-300 w-full max-w-[220px] sm:max-w-[235px]">
              <Link
                href="/product/a-cup-for-every-moment-emerald-camellia-cup-saucer-set"
                className="relative aspect-9/16 w-full overflow-hidden block bg-[#252522]"
              >
                <Image
                  src="https://res.cloudinary.com/pmip0yum/image/upload/v1792840533/vitrag/products/n5hycyxmhehrdwjdmtbw.png"
                  alt="A Cup for Every Moment — Emerald Camellia Cup & Saucer Set"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 220px, 235px"
                />
              </Link>
              <div className="p-3 bg-white flex flex-col justify-between gap-1 border-t border-[#EADBC8]/60">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-heading text-sm text-[#6E2023] font-medium truncate">
                    A Cup for Every Moment
                  </h3>
                  <span className="text-[10px] uppercase font-semibold text-[#6E2023] bg-[#CBAE9B]/25 px-1.5 py-0.5 rounded shrink-0">
                    Price on Request
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#84766A]">
                  <span>Emerald Camellia Set</span>
                  <Link
                    href="/product/a-cup-for-every-moment-emerald-camellia-cup-saucer-set"
                    className="text-[#6E2023] font-semibold hover:underline"
                  >
                    Details →
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION B: SHOP BY CATEGORY
         ======================================================== */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#EADBC8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold mb-2">
                Explore Categories
              </p>
              <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl text-[#6E2023]">
                Curated by Ritual &amp; Use
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#6E2023] font-semibold hover:underline inline-flex items-center gap-1.5"
            >
              <span>View All Categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 4 Core Featured Categories */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                id: "signature-editions",
                name: "Signature Editions",
                shortName: "Signature Series",
                slug: "signature-editions",
                image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840537/vitrag/categories/q87rhawi0rlfsfl0lhgl.png",
              },
              {
                id: "dinner-sets",
                name: "Dinner Sets",
                shortName: "Dinnerware",
                slug: "dinner-sets",
                image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840534/vitrag/categories/flvbxuosczgcuepmxcmn.jpg",
              },
              {
                id: "platters-serving",
                name: "Platter & Serving",
                shortName: "Serveware",
                slug: "platters-serving",
                image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840536/vitrag/categories/sm3piv7tv3v21rwcl1gy.jpg",
              },
              {
                id: "dry-fruit-boxes",
                name: "Dry Fruit Boxes",
                shortName: "Gift Box Sets",
                slug: "dry-fruit-boxes",
                image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840536/vitrag/categories/u108qh4mrzwmk5frkpwx.jpg",
              },
            ].map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group flex flex-col items-center bg-[#FFF5E6] border border-[#EADBC8] p-4 sm:p-6 rounded-2xl transition-all duration-300 hover:shadow-xl hover:border-[#6E2023]/50 hover:-translate-y-1.5 text-center"
              >
                {/* Circular Profile Image (Medallion) */}
                <div className="relative aspect-square w-full max-w-[140px] sm:max-w-[170px] rounded-full overflow-hidden border-2 border-[#CBAE9B]/70 shadow-md mb-4 transition-transform duration-500 group-hover:scale-105 group-hover:border-[#6E2023] bg-[#590A14]">
                  <Image
                    src={col.image}
                    alt={col.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 140px, 170px"
                  />
                </div>
                <h3 className="font-heading text-base sm:text-lg text-[#6E2023] group-hover:text-[#55181A] transition-colors font-medium">
                  {col.name}
                </h3>
                <p className="text-[11px] text-[#84766A] mt-1 font-light">
                  {col.shortName}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION C: FEATURED PRODUCTS ("Considered Favourites")
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#FFF5E6] border-b border-[#EADBC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-semibold mb-3">
              Handpicked Selection
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#6E2023]">
              Considered Favourites
            </h2>
            <p className="text-sm sm:text-base text-[#84766A] mt-3 font-light">
              Pieces selected for their architectural form, artisanal glazes, and versatile role on the contemporary table.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12 sm:mt-16">
            <Button
              href="/shop"
              variant="outline"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Browse Complete Catalogue
            </Button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION D: BRAND STORY (Luxury Burgundy Section)
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#6E2023] text-white overflow-hidden relative border-b border-[#55181A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#CBAE9B] font-semibold">
                Our Story & Philosophy
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl text-white leading-tight font-medium">
                Made for Moments Worth Gathering Around.
              </h2>
              <p className="text-base sm:text-lg text-[#FFF5E6]/90 font-light leading-relaxed">
                From everyday meals to festive tables and meaningful gifts, VITRAG brings together carefully selected pieces that make hosting, celebrating, and gifting feel special.
              </p>
              <p className="text-sm text-[#CBAE9B] leading-relaxed font-light">
                Rooted in Chennai, our studio curates tableware with a reverence for authentic Indian craftsmanship—from pure brass repoussé work to high-temperature studio stoneware and fine gilded porcelain.
              </p>

              <div className="pt-4">
                <Button
                  href="/about"
                  variant="champagne"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Discover Our Story
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#55181A] border border-[#8A2B2F] p-8 sm:p-12 rounded-2xl shadow-2xl">
                <div className="border border-[#CBAE9B]/30 p-6 sm:p-8 space-y-6 rounded-xl">
                  <span className="font-heading text-5xl sm:text-6xl text-[#CBAE9B] block opacity-60">
                    &ldquo;
                  </span>
                  <p className="font-heading text-xl sm:text-2xl text-white leading-relaxed italic">
                    We believe the objects we touch every day should carry grace. A dinner plate is not just pottery; it is the stage for nourishment and celebration.
                  </p>
                  <div className="pt-4 border-t border-[#CBAE9B]/30 flex items-center justify-between text-xs tracking-widest uppercase text-[#CBAE9B]">
                    <span>VITRAG Studio</span>
                    <span>Chennai, Tamil Nadu</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION E: GIFTING ("The Art of Thoughtful Gifting")
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#FFF5E6] border-b border-[#EADBC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-semibold mb-2">
                Thoughtfully Packaged
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#6E2023]">
                The Art of Thoughtful Gifting
              </h2>
            </div>
            <Button
              href="/collections/gift-sets"
              variant="outline"
              size="sm"
              className="mt-4 md:mt-0"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Explore Gift Sets
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION F: SHOP BY OCCASION
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#EADBC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-semibold mb-2">
              For Life&apos;s Milestones
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#6E2023]">
              Shop by Occasion
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/collections/wedding-gifts"
              className="group p-8 bg-[#FFF5E6] border border-[#EADBC8] rounded-2xl flex flex-col justify-between h-72 transition-all duration-300 hover:shadow-xl hover:border-[#6E2023]"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#6E2023] font-bold">
                  01 / Milestones
                </span>
                <h3 className="font-heading text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors mt-2">
                  Wedding & Trousseau
                </h3>
                <p className="text-xs text-[#84766A] mt-2 font-light leading-relaxed">
                  Heirloom 24K gold dinner sets and bridal banquet gifts crafted to last generations.
                </p>
              </div>
              <div className="text-xs uppercase tracking-wider text-[#6E2023] font-semibold inline-flex items-center gap-1">
                Explore Weddings <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/collections/gift-sets"
              className="group p-8 bg-[#FFF5E6] border border-[#EADBC8] rounded-2xl flex flex-col justify-between h-72 transition-all duration-300 hover:shadow-xl hover:border-[#6E2023]"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#6E2023] font-bold">
                  02 / New Beginnings
                </span>
                <h3 className="font-heading text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors mt-2">
                  Housewarming Gifts
                </h3>
                <p className="text-xs text-[#84766A] mt-2 font-light leading-relaxed">
                  Platter trios, brass spice boxes, and canister suites that make a new house feel like home.
                </p>
              </div>
              <div className="text-xs uppercase tracking-wider text-[#6E2023] font-semibold inline-flex items-center gap-1">
                Explore Housewarmings <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/collections/dry-fruit-boxes"
              className="group p-8 bg-[#FFF5E6] border border-[#EADBC8] rounded-2xl flex flex-col justify-between h-72 transition-all duration-300 hover:shadow-xl hover:border-[#6E2023]"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#6E2023] font-bold">
                  03 / Celebrations
                </span>
                <h3 className="font-heading text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors mt-2">
                  Festive Gifting
                </h3>
                <p className="text-xs text-[#84766A] mt-2 font-light leading-relaxed">
                  Handcrafted sheesham and brass repoussé dry-fruit chests for Diwali, Eid, and New Year.
                </p>
              </div>
              <div className="text-xs uppercase tracking-wider text-[#6E2023] font-semibold inline-flex items-center gap-1">
                Explore Festive <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/bulk-orders"
              className="group p-8 bg-[#6E2023] text-white border border-[#55181A] rounded-2xl flex flex-col justify-between h-72 transition-all duration-300 hover:shadow-xl"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#CBAE9B] font-bold">
                  04 / Organizations
                </span>
                <h3 className="font-heading text-2xl text-white mt-2">
                  Corporate Gifting
                </h3>
                <p className="text-xs text-[#FFF5E6]/85 mt-2 font-light leading-relaxed">
                  Executive desk drinkware, client hampers, and bulk event keepsakes with tailored proposals.
                </p>
              </div>
              <div className="text-xs uppercase tracking-wider text-[#CBAE9B] font-semibold inline-flex items-center gap-1">
                Request Bulk Proposal <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION G: CORPORATE GIFTING CALLOUT (Champagne Base)
         ======================================================== */}
      <section className="py-20 sm:py-24 bg-[#CBAE9B] border-b border-[#bfa08c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-bold">
              B2B & Executive Services
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl text-[#6E2023]">
              Thoughtful Gifting. Made for Business.
            </h2>
            <p className="text-base text-[#6E2023]/90 font-light leading-relaxed">
              Explore gifting options for teams, clients, events, and special occasions. Share your quantity, budget, and delivery requirements to receive a tailored proposal within 24 business hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/bulk-orders"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Request a Bulk Quote
              </Button>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello VITRAG, I would like to enquire about corporate gifting options.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white hover:bg-[#FFF5E6] text-[#6E2023] border border-[#bfa08c] text-xs uppercase tracking-widest font-semibold transition-colors rounded-lg shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366]" />
                WhatsApp Direct Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION H: CURATED BY OCCASION & RITUAL
         ======================================================== */}
      <section className="py-20 bg-[#FFF5E6] border-b border-[#EADBC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold mb-1">
              Curated Collections
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#6E2023]">
              Curated by Occasion &amp; Ritual
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/collections/mugs-cups"
              className="p-6 bg-white border border-[#EADBC8] rounded-xl text-center hover:border-[#6E2023] hover:shadow-lg transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#84766A]">
                Daily Moments
              </span>
              <span className="font-heading text-xl sm:text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors block mt-1">
                Everyday Dining
              </span>
              <span className="text-[10px] text-[#84766A] mt-2 block">
                Mugs, Cups &amp; Snack Bowls
              </span>
            </Link>

            <Link
              href="/collections/platters-serving"
              className="p-6 bg-white border border-[#EADBC8] rounded-xl text-center hover:border-[#6E2023] hover:shadow-lg transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#84766A]">
                Table Hosting
              </span>
              <span className="font-heading text-xl sm:text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors block mt-1">
                Festive Hosting
              </span>
              <span className="text-[10px] text-[#84766A] mt-2 block">
                Platters, Jars &amp; Serving Bowls
              </span>
            </Link>

            <Link
              href="/collections/dry-fruit-boxes"
              className="p-6 bg-white border border-[#EADBC8] rounded-xl text-center hover:border-[#6E2023] hover:shadow-lg transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#84766A]">
                Thoughtful Keepsakes
              </span>
              <span className="font-heading text-xl sm:text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors block mt-1">
                Artisan Gifting
              </span>
              <span className="text-[10px] text-[#84766A] mt-2 block">
                Dry-Fruit Boxes &amp; Hampers
              </span>
            </Link>

            <Link
              href="/collections/dinner-sets"
              className="p-6 bg-white border border-[#EADBC8] rounded-xl text-center hover:border-[#6E2023] hover:shadow-lg transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#84766A]">
                Grand Occasions
              </span>
              <span className="font-heading text-xl sm:text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors block mt-1">
                Heirloom Dinnerware
              </span>
              <span className="text-[10px] text-[#84766A] mt-2 block">
                Complete Banquet &amp; Trousseau Sets
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION I: SERVICE AND TRUST (Real Value Pillars)
         ======================================================== */}
      <section className="py-20 bg-white border-b border-[#EADBC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5E6] border border-[#EADBC8] flex items-center justify-center text-[#6E2023] mb-4">
                <ShieldCheck className="w-6 h-6 text-[#6E2023]" />
              </div>
              <h3 className="font-heading text-xl text-[#6E2023] mb-1">
                Breakage Replacement
              </h3>
              <p className="text-xs text-[#84766A] font-light leading-relaxed">
                Multi-layer air cushioned packaging. Transit breakage replaced promptly upon sharing unboxing video proof.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5E6] border border-[#EADBC8] flex items-center justify-center text-[#6E2023] mb-4">
                <Gift className="w-6 h-6 text-[#6E2023]" />
              </div>
              <h3 className="font-heading text-xl text-[#6E2023] mb-1">
                Signature Presentation
              </h3>
              <p className="text-xs text-[#84766A] font-light leading-relaxed">
                Luxury burgundy boxes, champagne detailing, and personalized gift notes upon request.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5E6] border border-[#EADBC8] flex items-center justify-center text-[#6E2023] mb-4">
                <Truck className="w-6 h-6 text-[#6E2023]" />
              </div>
              <h3 className="font-heading text-xl text-[#6E2023] mb-1">
                Fast 3–5 Day Delivery
              </h3>
              <p className="text-xs text-[#84766A] font-light leading-relaxed">
                Complimentary Pan-India shipping on orders above ₹4,000. Reliable, insured courier dispatch.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#FFF5E6] border border-[#EADBC8] flex items-center justify-center text-[#6E2023] mb-4">
                <Clock className="w-6 h-6 text-[#6E2023]" />
              </div>
              <h3 className="font-heading text-xl text-[#6E2023] mb-1">
                Personal WhatsApp Care
              </h3>
              <p className="text-xs text-[#84766A] font-light leading-relaxed">
                Direct assistance on 6369142027 for customization, wedding registries, and bulk corporate orders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION J: INSTAGRAM / EDITORIAL GALLERY
         ======================================================== */}
      <section className="py-20 bg-[#FFF5E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-semibold mb-2">
              @vitragtableware
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#6E2023]">
              Tables of Gathering
            </h2>
            <p className="text-xs sm:text-sm text-[#84766A] mt-2 font-light">
              Follow our visual diary of tablescapes, ceramic glazes, and festive host moments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-white border border-[#EADBC8] rounded-xl flex flex-col items-center justify-center p-6 text-center group hover:border-[#6E2023] transition-colors shadow-2xs">
              <span className="font-heading text-base text-[#6E2023] font-medium">Festive Table</span>
              <span className="text-[10px] uppercase tracking-wider text-[#84766A] mt-1">Dinnerware in Use</span>
            </div>
            <div className="aspect-square bg-white border border-[#EADBC8] rounded-xl flex flex-col items-center justify-center p-6 text-center group hover:border-[#6E2023] transition-colors shadow-2xs">
              <span className="font-heading text-base text-[#6E2023] font-medium">Artisan Glaze</span>
              <span className="text-[10px] uppercase tracking-wider text-[#84766A] mt-1">Studio Process</span>
            </div>
            <div className="aspect-square bg-white border border-[#EADBC8] rounded-xl flex flex-col items-center justify-center p-6 text-center group hover:border-[#6E2023] transition-colors shadow-2xs">
              <span className="font-heading text-base text-[#6E2023] font-medium">Gift Hamper</span>
              <span className="text-[10px] uppercase tracking-wider text-[#84766A] mt-1">Trousseau Box</span>
            </div>
            <div className="aspect-square bg-white border border-[#EADBC8] rounded-xl flex flex-col items-center justify-center p-6 text-center group hover:border-[#6E2023] transition-colors shadow-2xs">
              <span className="font-heading text-base text-[#6E2023] font-medium">Morning Chai</span>
              <span className="text-[10px] uppercase tracking-wider text-[#84766A] mt-1">Artisan Kullads</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
