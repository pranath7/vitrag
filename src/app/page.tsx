import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, collections, products } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Gift,
  Truck,
  MessageSquare,
  Clock,
  Compass,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts(8);
  const giftingProducts = products.filter((p) => p.collectionIds.includes("gift-sets") || p.collectionIds.includes("dry-fruit-boxes")).slice(0, 4);

  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      {/* ========================================================
          SECTION A: HERO (Editorial Ivory Background + Burgundy Typography)
         ======================================================== */}
      <section className="relative overflow-hidden bg-[#FFF5E6] border-b border-[#EADBC8] py-16 sm:py-24 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#CBAE9B]/25 text-[#6E2023] text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full border border-[#CBAE9B]/50">
                <Sparkles className="w-3.5 h-3.5 text-[#6E2023]" />
                <span>Crockery, Serveware & Thoughtful Gifting</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-[#6E2023] leading-[1.08] tracking-tight font-medium">
                Set the Table for <br className="hidden sm:inline" />
                <span className="italic font-normal">
                  Something Beautiful.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#84766A] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Discover thoughtfully curated dinnerware, serving essentials, and heirloom gifts that bring people together across festive tables and everyday dinners.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  href="/shop"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Shop Collection
                </Button>
                <Button
                  href="/collections/gift-sets"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explore Gifting
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#EADBC8] text-[#84766A]">
                <div>
                  <span className="block font-heading text-xl sm:text-2xl text-[#6E2023]">100%</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">Food Grade Ceramic</span>
                </div>
                <div>
                  <span className="block font-heading text-xl sm:text-2xl text-[#6E2023]">Pan-India</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">Transit Guarantee</span>
                </div>
                <div>
                  <span className="block font-heading text-xl sm:text-2xl text-[#6E2023]">Custom</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">Bulk & Wedding Sets</span>
                </div>
              </div>
            </div>

            {/* Right Visual Composition - Dual Cards inspired by User's Spec */}
            <div className="lg:col-span-5 relative">
              <div className="space-y-4">
                {/* 1. Packaging Concept Card: Luxury Burgundy Box with Champagne Detailing */}
                <div className="bg-[#6E2023] text-white p-7 sm:p-8 rounded-2xl shadow-xl border border-[#55181A] relative overflow-hidden">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-4">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#CBAE9B] font-semibold block">
                        Signature Packaging
                      </span>
                      <h3 className="font-heading text-2xl sm:text-3xl text-white">
                        VITRAG
                      </h3>
                      <hr className="border-[#CBAE9B]/30" />
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-white">
                          Crockery & Gifting
                        </p>
                        <p className="text-xs text-[#CBAE9B] font-light">
                          Luxury burgundy box with champagne detailing
                        </p>
                      </div>
                    </div>
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-[#CBAE9B]/40 shadow-md shrink-0">
                      <Image
                        src="/logo.jpg"
                        alt="VITRAG Logo Crest"
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Gift Card Concept Card: Champagne Base with Burgundy Typography */}
                <div className="bg-[#CBAE9B] text-[#6E2023] p-7 sm:p-8 rounded-2xl shadow-md border border-[#bda08d] relative">
                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#6E2023] font-bold block">
                      Gift Card Concept
                    </span>
                    <h3 className="font-heading text-2xl text-[#6E2023]">
                      A gift, beautifully chosen.
                    </h3>
                    <hr className="border-[#6E2023]/25" />
                    <div className="space-y-1">
                      <p className="text-xs font-serif italic text-[#6E2023]">
                        With love, from Vitrag.
                      </p>
                      <p className="text-[11px] text-[#6E2023]/80 font-light">
                        Champagne base with burgundy typography
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION B: SHOP BY CATEGORY
         ======================================================== */}
      <section className="py-20 sm:py-24 bg-white border-b border-[#EADBC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold mb-2">
                Explore Categories
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#6E2023]">
                Curated by Ritual & Use
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {collections.slice(0, 6).map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group flex flex-col bg-[#FFF5E6] border border-[#EADBC8] p-5 sm:p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:border-[#6E2023]/50 hover:-translate-y-1 text-center"
              >
                <div className="aspect-square w-full rounded-full bg-[#CBAE9B]/30 border border-[#CBAE9B]/60 mx-auto flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                  <span className="font-heading text-sm text-[#6E2023] font-bold tracking-wider uppercase">
                    {col.name.slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-heading text-base sm:text-lg text-[#6E2023] group-hover:text-[#55181A] transition-colors line-clamp-1 font-medium">
                  {col.name}
                </h3>
                <p className="text-[11px] text-[#84766A] mt-1 font-light line-clamp-1">
                  {col.shortName || "Collection"}
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
              Browse Complete Catalogue (30+ Pieces)
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
          SECTION H: SHOP BY PRICE
         ======================================================== */}
      <section className="py-20 bg-[#FFF5E6] border-b border-[#EADBC8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold mb-1">
              Curated Budget Guides
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#6E2023]">
              Shop by Gift Budget
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/shop?price=under-999"
              className="p-6 bg-white border border-[#EADBC8] rounded-xl text-center hover:border-[#6E2023] hover:shadow-lg transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#84766A]">
                Everyday Gestures
              </span>
              <span className="font-heading text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors block mt-1">
                Gifts Under ₹999
              </span>
              <span className="text-[10px] text-[#84766A] mt-2 block">
                Mugs, Kullads & Dip Sets
              </span>
            </Link>

            <Link
              href="/shop?price=under-1999"
              className="p-6 bg-white border border-[#EADBC8] rounded-xl text-center hover:border-[#6E2023] hover:shadow-lg transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#84766A]">
                Popular Celebrations
              </span>
              <span className="font-heading text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors block mt-1">
                Gifts Under ₹1,999
              </span>
              <span className="text-[10px] text-[#84766A] mt-2 block">
                Platters, Jars & Spice Boxes
              </span>
            </Link>

            <Link
              href="/shop?price=under-4999"
              className="p-6 bg-white border border-[#EADBC8] rounded-xl text-center hover:border-[#6E2023] hover:shadow-lg transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#84766A]">
                Premium Homeware
              </span>
              <span className="font-heading text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors block mt-1">
                ₹2,000 – ₹4,999
              </span>
              <span className="text-[10px] text-[#84766A] mt-2 block">
                Dinner Sets & Velvet Boxes
              </span>
            </Link>

            <Link
              href="/shop?price=wedding"
              className="p-6 bg-white border border-[#EADBC8] rounded-xl text-center hover:border-[#6E2023] hover:shadow-lg transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#84766A]">
                Luxury & Heirloom
              </span>
              <span className="font-heading text-2xl text-[#6E2023] group-hover:text-[#55181A] transition-colors block mt-1">
                Heirloom ₹5,000+
              </span>
              <span className="text-[10px] text-[#84766A] mt-2 block">
                32 & 36-Piece Trousseau Sets
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
