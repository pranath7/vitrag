import React from "react";
import Link from "next/link";
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
    <main className="bg-[#F7F4EE] min-h-screen">
      {/* ========================================================
          SECTION A: HERO (Editorial, Art-Directed Composition)
         ======================================================== */}
      <section className="relative overflow-hidden bg-[#F7F4EE] border-b border-[#E7E0D6] py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E9DFD1] text-[#5A252E] text-[11px] uppercase tracking-[0.2em] font-medium border border-[#D9D0C1]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Chennai Tableware & Festive Gifting</span>
              </div>

              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl text-[#252522] leading-[1.08] tracking-tight">
                Set the Table for <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#5A252E]">
                  Something Beautiful.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#8B8176] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Discover thoughtfully curated dinnerware, serving essentials, and heirloom gifts that bring people together across festive tables and everyday dinners.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Button
                  href="/shop"
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explore the Collection
                </Button>
                <Button
                  href="/collections/gift-sets"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Discover Gifting
                </Button>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#E7E0D6]/80 text-[#8B8176]">
                <div>
                  <span className="block font-heading text-xl sm:text-2xl text-[#252522]">100%</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">Food Grade Ceramic</span>
                </div>
                <div>
                  <span className="block font-heading text-xl sm:text-2xl text-[#252522]">Pan-India</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">Safe Transit Guarantee</span>
                </div>
                <div>
                  <span className="block font-heading text-xl sm:text-2xl text-[#252522]">Custom</span>
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider">Bulk & Wedding Orders</span>
                </div>
              </div>
            </div>

            {/* Right Editorial Visual Artwork */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="aspect-4/5 w-full bg-[#E9DFD1] border border-[#D9D0C1] p-8 sm:p-12 flex flex-col justify-between shadow-xl relative overflow-hidden">
                  <div className="border border-[#8B8176]/30 p-6 sm:p-8 h-full flex flex-col justify-between bg-white/60 backdrop-blur-xs">
                    <div className="space-y-2">
                      <span className="text-[10px] uppercase tracking-[0.25em] text-[#5A252E] font-semibold">
                        Curated Series 2026
                      </span>
                      <h2 className="font-heading text-2xl sm:text-3xl text-[#252522]">
                        The Royal Heritage Banquet Suite
                      </h2>
                    </div>

                    <div className="py-6 flex flex-col items-center justify-center">
                      <div className="w-32 h-32 rounded-full border border-[#D9D0C1] flex items-center justify-center bg-[#F7F4EE]">
                        <span className="font-heading text-base tracking-[0.2em] text-[#5A252E]">
                          VITRAG
                        </span>
                      </div>
                      <p className="font-heading italic text-sm text-[#8B8176] mt-4 text-center">
                        Fine porcelain • 24K hand-painted gold trim
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#E7E0D6]">
                      <span className="text-xs uppercase tracking-wider text-[#8B8176]">
                        Dinner Sets
                      </span>
                      <Link
                        href="/collections/dinner-sets"
                        className="text-xs uppercase tracking-wider text-[#5A252E] font-medium hover:underline inline-flex items-center gap-1"
                      >
                        View Suite <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Floating Tag */}
                <div className="absolute -bottom-4 -left-4 bg-[#5A252E] text-white p-4 shadow-lg hidden sm:block border border-[#431b22]">
                  <p className="text-[10px] uppercase tracking-widest text-[#E9DFD1]">
                    Featured Occasion
                  </p>
                  <p className="font-heading text-base">
                    Festive & Wedding Tables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION B: SHOP BY CATEGORY
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-white border-b border-[#E7E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#8B8176] font-medium mb-2">
                Explore Categories
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#252522]">
                Curated by Ritual & Use
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-4 md:mt-0 text-xs uppercase tracking-widest text-[#5A252E] font-medium hover:underline inline-flex items-center gap-1.5"
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
                className="group flex flex-col bg-[#F7F4EE] border border-[#E7E0D6] p-5 sm:p-6 transition-all duration-300 hover:shadow-md hover:border-[#8B8176]/50 hover:-translate-y-1 text-center"
              >
                <div className="aspect-square w-full rounded-full bg-[#E9DFD1]/50 border border-[#D9D0C1] mx-auto flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                  <span className="font-heading text-sm text-[#5A252E] tracking-wider uppercase">
                    {col.name.slice(0, 2)}
                  </span>
                </div>
                <h3 className="font-heading text-base sm:text-lg text-[#252522] group-hover:text-[#5A252E] transition-colors line-clamp-1">
                  {col.name}
                </h3>
                <p className="text-[11px] text-[#8B8176] mt-1 font-light line-clamp-1">
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
      <section className="py-20 sm:py-28 bg-[#F7F4EE] border-b border-[#E7E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#8B8176] font-medium mb-3">
              Handpicked Selection
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#252522]">
              Considered Favourites
            </h2>
            <p className="text-sm sm:text-base text-[#8B8176] mt-3 font-light">
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
          SECTION D: BRAND STORY (Editorial Asymmetric Section)
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#5A252E] text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E9DFD1]/80 font-medium">
                Our Story & Philosophy
              </span>
              <h2 className="font-heading text-3xl sm:text-5xl text-white leading-tight">
                Made for Moments Worth Gathering Around.
              </h2>
              <p className="text-base sm:text-lg text-[#E9DFD1]/90 font-light leading-relaxed">
                From everyday meals to festive tables and meaningful gifts, VITRAG brings together carefully selected pieces that make hosting, celebrating, and gifting feel special.
              </p>
              <p className="text-sm text-[#E9DFD1]/80 leading-relaxed font-light">
                Rooted in Chennai, our studio curates tableware with a reverence for authentic Indian craftsmanship—from pure brass repoussé work to high-temperature studio stoneware and fine gilded porcelain.
              </p>

              <div className="pt-4">
                <Button
                  href="/about"
                  variant="beige"
                  size="md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Discover Our Story
                </Button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-[#431b22] border border-[#753440] p-8 sm:p-12 relative shadow-2xl">
                <div className="border border-[#753440] p-6 sm:p-8 space-y-6">
                  <span className="font-heading text-5xl sm:text-6xl text-[#E9DFD1] block opacity-40">
                    &ldquo;
                  </span>
                  <p className="font-heading text-xl sm:text-2xl text-white leading-relaxed italic">
                    We believe the objects we touch every day should carry grace. A dinner plate is not just pottery; it is the stage for nourishment and celebration.
                  </p>
                  <div className="pt-4 border-t border-[#753440] flex items-center justify-between text-xs tracking-widest uppercase text-[#E9DFD1]/70">
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
      <section className="py-20 sm:py-28 bg-[#F7F4EE] border-b border-[#E7E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#8B8176] font-medium mb-2">
                Thoughtfully Packaged
              </p>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#252522]">
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
      <section className="py-20 sm:py-28 bg-white border-b border-[#E7E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <p className="text-xs uppercase tracking-[0.25em] text-[#8B8176] font-medium mb-2">
              For Life&apos;s Milestones
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#252522]">
              Shop by Occasion
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/collections/wedding-gifts"
              className="group p-8 bg-[#F7F4EE] border border-[#E7E0D6] flex flex-col justify-between h-72 transition-all duration-300 hover:shadow-lg hover:border-[#5A252E]"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A252E] font-semibold">
                  01 / Milestones
                </span>
                <h3 className="font-heading text-2xl text-[#252522] group-hover:text-[#5A252E] transition-colors mt-2">
                  Wedding & Trousseau
                </h3>
                <p className="text-xs text-[#8B8176] mt-2 font-light leading-relaxed">
                  Heirloom 24K gold dinner sets and bridal banquet gifts crafted to last generations.
                </p>
              </div>
              <div className="text-xs uppercase tracking-wider text-[#5A252E] font-medium inline-flex items-center gap-1">
                Explore Weddings <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/collections/gift-sets"
              className="group p-8 bg-[#F7F4EE] border border-[#E7E0D6] flex flex-col justify-between h-72 transition-all duration-300 hover:shadow-lg hover:border-[#5A252E]"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A252E] font-semibold">
                  02 / New Beginnings
                </span>
                <h3 className="font-heading text-2xl text-[#252522] group-hover:text-[#5A252E] transition-colors mt-2">
                  Housewarming Gifts
                </h3>
                <p className="text-xs text-[#8B8176] mt-2 font-light leading-relaxed">
                  Platter trios, brass spice boxes, and canister suites that make a new house feel like home.
                </p>
              </div>
              <div className="text-xs uppercase tracking-wider text-[#5A252E] font-medium inline-flex items-center gap-1">
                Explore Housewarmings <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/collections/dry-fruit-boxes"
              className="group p-8 bg-[#F7F4EE] border border-[#E7E0D6] flex flex-col justify-between h-72 transition-all duration-300 hover:shadow-lg hover:border-[#5A252E]"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A252E] font-semibold">
                  03 / Celebrations
                </span>
                <h3 className="font-heading text-2xl text-[#252522] group-hover:text-[#5A252E] transition-colors mt-2">
                  Festive Gifting
                </h3>
                <p className="text-xs text-[#8B8176] mt-2 font-light leading-relaxed">
                  Handcrafted sheesham and brass repoussé dry-fruit chests for Diwali, Eid, and New Year.
                </p>
              </div>
              <div className="text-xs uppercase tracking-wider text-[#5A252E] font-medium inline-flex items-center gap-1">
                Explore Festive <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <Link
              href="/bulk-orders"
              className="group p-8 bg-[#5A252E] text-white border border-[#431b22] flex flex-col justify-between h-72 transition-all duration-300 hover:shadow-lg"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E9DFD1] font-semibold">
                  04 / Organizations
                </span>
                <h3 className="font-heading text-2xl text-white mt-2">
                  Corporate Gifting
                </h3>
                <p className="text-xs text-[#E9DFD1]/80 mt-2 font-light leading-relaxed">
                  Executive desk drinkware, client hampers, and bulk event keepsakes with tailored proposals.
                </p>
              </div>
              <div className="text-xs uppercase tracking-wider text-[#E9DFD1] font-medium inline-flex items-center gap-1">
                Request Bulk Proposal <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION G: CORPORATE GIFTING CALLOUT
         ======================================================== */}
      <section className="py-20 sm:py-28 bg-[#E9DFD1] border-b border-[#D9D0C1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#5A252E] font-medium">
              B2B & Executive Services
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl text-[#252522]">
              Thoughtful Gifting. Made for Business.
            </h2>
            <p className="text-base text-[#252522]/80 font-light leading-relaxed">
              Explore gifting options for teams, clients, events, and special occasions. Share your quantity, budget, and delivery requirements to receive a tailored proposal within 24 business hours.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                href="/bulk-orders"
                variant="burgundy"
                size="lg"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Request a Bulk Quote
              </Button>
              <a
                href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent("Hello VITRAG, I would like to enquire about corporate gifting options.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#F7F4EE] text-[#252522] border border-[#D9D0C1] text-xs uppercase tracking-widest font-medium transition-colors"
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
      <section className="py-20 bg-[#F7F4EE] border-b border-[#E7E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8B8176] font-medium mb-1">
              Curated Budget Guides
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#252522]">
              Shop by Gift Budget
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              href="/shop?price=under-999"
              className="p-6 bg-white border border-[#E7E0D6] text-center hover:border-[#5A252E] hover:shadow-md transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#8B8176]">
                Everyday Gestures
              </span>
              <span className="font-heading text-2xl text-[#252522] group-hover:text-[#5A252E] transition-colors block mt-1">
                Gifts Under ₹999
              </span>
              <span className="text-[10px] text-[#8B8176] mt-2 block">
                Mugs, Kullads & Dip Sets
              </span>
            </Link>

            <Link
              href="/shop?price=under-1999"
              className="p-6 bg-white border border-[#E7E0D6] text-center hover:border-[#5A252E] hover:shadow-md transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#8B8176]">
                Popular Celebrations
              </span>
              <span className="font-heading text-2xl text-[#252522] group-hover:text-[#5A252E] transition-colors block mt-1">
                Gifts Under ₹1,999
              </span>
              <span className="text-[10px] text-[#8B8176] mt-2 block">
                Platters, Jars & Spice Boxes
              </span>
            </Link>

            <Link
              href="/shop?price=under-4999"
              className="p-6 bg-white border border-[#E7E0D6] text-center hover:border-[#5A252E] hover:shadow-md transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#8B8176]">
                Premium Homeware
              </span>
              <span className="font-heading text-2xl text-[#252522] group-hover:text-[#5A252E] transition-colors block mt-1">
                ₹2,000 – ₹4,999
              </span>
              <span className="text-[10px] text-[#8B8176] mt-2 block">
                Dinner Sets & Velvet Boxes
              </span>
            </Link>

            <Link
              href="/shop?price=wedding"
              className="p-6 bg-white border border-[#E7E0D6] text-center hover:border-[#5A252E] hover:shadow-md transition-all group"
            >
              <span className="block text-[11px] uppercase tracking-wider text-[#8B8176]">
                Luxury & Heirloom
              </span>
              <span className="font-heading text-2xl text-[#252522] group-hover:text-[#5A252E] transition-colors block mt-1">
                Heirloom ₹5,000+
              </span>
              <span className="text-[10px] text-[#8B8176] mt-2 block">
                32 & 36-Piece Trousseau Sets
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION I: SERVICE AND TRUST (Real Value Pillars)
         ======================================================== */}
      <section className="py-20 bg-white border-b border-[#E7E0D6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#E9DFD1]/50 border border-[#D9D0C1] flex items-center justify-center text-[#5A252E] mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl text-[#252522] mb-1">
                Breakage-Safe Transit
              </h3>
              <p className="text-xs text-[#8B8176] font-light leading-relaxed">
                Multi-layer air cushioned packaging. Transit breakage replaced promptly without dispute.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#E9DFD1]/50 border border-[#D9D0C1] flex items-center justify-center text-[#5A252E] mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl text-[#252522] mb-1">
                Signature Presentation
              </h3>
              <p className="text-xs text-[#8B8176] font-light leading-relaxed">
                Rigid ivory boxes, satin ribbon seals, and personalized gift notes upon request.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#E9DFD1]/50 border border-[#D9D0C1] flex items-center justify-center text-[#5A252E] mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl text-[#252522] mb-1">
                Chennai & Pan-India
              </h3>
              <p className="text-xs text-[#8B8176] font-light leading-relaxed">
                Prompt dispatch across Tamil Nadu and reliable insured courier coverage pan-India.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-4">
              <div className="w-12 h-12 rounded-full bg-[#E9DFD1]/50 border border-[#D9D0C1] flex items-center justify-center text-[#5A252E] mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl text-[#252522] mb-1">
                Personal WhatsApp Care
              </h3>
              <p className="text-xs text-[#8B8176] font-light leading-relaxed">
                Real assistance for customization, wedding registries, and bulk corporate deadlines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION J: INSTAGRAM / EDITORIAL GALLERY
         ======================================================== */}
      <section className="py-20 bg-[#F7F4EE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#8B8176] font-medium mb-2">
              @vitragtableware
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#252522]">
              Tables of Gathering
            </h2>
            <p className="text-xs sm:text-sm text-[#8B8176] mt-2 font-light">
              Follow our visual diary of tablescapes, ceramic glazes, and festive host moments.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="aspect-square bg-[#E9DFD1] border border-[#D9D0C1] flex flex-col items-center justify-center p-6 text-center group hover:bg-[#ded1c0] transition-colors">
              <span className="font-heading text-base text-[#5A252E]">Festive Table</span>
              <span className="text-[10px] uppercase tracking-wider text-[#8B8176] mt-1">Dinnerware in Use</span>
            </div>
            <div className="aspect-square bg-[#E9DFD1] border border-[#D9D0C1] flex flex-col items-center justify-center p-6 text-center group hover:bg-[#ded1c0] transition-colors">
              <span className="font-heading text-base text-[#5A252E]">Artisan Glaze</span>
              <span className="text-[10px] uppercase tracking-wider text-[#8B8176] mt-1">Studio Process</span>
            </div>
            <div className="aspect-square bg-[#E9DFD1] border border-[#D9D0C1] flex flex-col items-center justify-center p-6 text-center group hover:bg-[#ded1c0] transition-colors">
              <span className="font-heading text-base text-[#5A252E]">Gift Hamper</span>
              <span className="text-[10px] uppercase tracking-wider text-[#8B8176] mt-1">Trousseau Box</span>
            </div>
            <div className="aspect-square bg-[#E9DFD1] border border-[#D9D0C1] flex flex-col items-center justify-center p-6 text-center group hover:bg-[#ded1c0] transition-colors">
              <span className="font-heading text-base text-[#5A252E]">Morning Chai</span>
              <span className="text-[10px] uppercase tracking-wider text-[#8B8176] mt-1">Artisan Kullads</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
