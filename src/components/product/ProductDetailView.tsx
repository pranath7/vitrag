"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product, ProductVariant } from "@/lib/types";
import { formatPrice, generateWhatsAppProductEnquiryUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { isProductDeleted } from "@/lib/adminStorage";
import {
  ShoppingBag,
  Heart,
  Plus,
  Minus,
  MessageSquare,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "./ProductCard";
import { ProductArtwork } from "./ProductArtwork";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const { addItem, toggleWishlist, isInWishlist, openCart } = useCart();
  const isWishlisted = isInWishlist(product.id);

  // Variant & purchase state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAdded, setIsAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  // Feedback intrusion style: Option 1 (Toast) vs Option 2 (Drawer)
  const [feedbackOption, setFeedbackOption] = useState<"toast" | "drawer">("toast");

  // Accordion state
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    description: true,
    specs: true,
    care: false,
    shipping: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const currentCompareAtPrice = product.compareAtPrice;
  const maxStock = selectedVariant ? selectedVariant.stockQuantity : product.stockQuantity;

  const handleAddToCart = () => {
    const shouldOpenDrawer = feedbackOption === "drawer";
    addItem(product, quantity, selectedVariant, shouldOpenDrawer);
    setIsAdded(true);
    setShowToast(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2500);
  };

  const whatsappEnquiryUrl = generateWhatsAppProductEnquiryUrl(
    product.name,
    product.sku,
    currentPrice,
    typeof window !== "undefined" ? window.location.href : undefined
  );

  const [isDeleted, setIsDeleted] = useState(false);

  useEffect(() => {
    if (isProductDeleted(product.id)) {
      setIsDeleted(true);
    }
    const handleDeleted = (e: any) => {
      if (e.detail?.id === product.id) {
        setIsDeleted(true);
      }
    };
    window.addEventListener("vitrag:product_deleted", handleDeleted);
    return () => window.removeEventListener("vitrag:product_deleted", handleDeleted);
  }, [product.id]);

  if (isDeleted) {
    return (
      <div className="py-20 text-center max-w-lg mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#FFF5E6] border border-[#EADBC8] flex items-center justify-center mx-auto text-[#6E2023]">
          <ShoppingBag className="w-8 h-8 opacity-40" />
        </div>
        <h2 className="font-heading text-3xl text-[#6E2023] font-medium">
          Piece Archived
        </h2>
        <p className="text-xs text-[#84766A] leading-relaxed font-light">
          This product has been removed from the current catalog by our showroom curation desk.
        </p>
        <div className="pt-2">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6E2023] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-[#55181A] transition-colors"
          >
            Explore Active Collection →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 pb-24 lg:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-4/5 w-full bg-[#FFF5E6] border border-[#EADBC8] rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-sm">
            {product.images[activeImageIndex]?.src ? (
              <div className="w-full h-full relative">
                <Image
                  src={product.images[activeImageIndex].src}
                  alt={product.images[activeImageIndex].alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>
            ) : (
              <ProductArtwork
                category={product.category}
                name={product.name}
                className="w-full h-full"
                hasGold={product.tags.includes("24K Gold") || product.name.toLowerCase().includes("gold")}
              />
            )}

            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2">
              {product.featured && <Badge variant="burgundy">Curated</Badge>}
              {product.availability === "in-stock" ? (
                <Badge variant="champagne">In Stock ({maxStock} Available)</Badge>
              ) : (
                <Badge variant="rose">{product.availability}</Badge>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={() => toggleWishlist(product.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all duration-200 ${
                isWishlisted
                  ? "bg-[#6E2023] text-white shadow-md"
                  : "bg-white/85 text-[#6E2023] hover:bg-white hover:text-[#55181A] shadow-xs"
              }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`w-4 h-4 ${isWishlisted ? "fill-white" : ""}`} />
            </button>
          </div>

          {/* Gallery Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-20 shrink-0 rounded-xl border overflow-hidden bg-white transition-all ${
                    activeImageIndex === idx
                      ? "border-[#6E2023] ring-2 ring-[#6E2023]"
                      : "border-[#EADBC8] opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt={img.alt || product.name} fill className="object-cover" sizes="80px" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Purchasing & Specifications */}
        <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#84766A] mb-2 font-medium">
              <span>{product.category}</span>
              <span>•</span>
              <span>SKU: {selectedVariant?.sku || product.sku}</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl text-[#6E2023] leading-tight font-medium">
              {product.name}
            </h1>

            <p className="text-sm text-[#84766A] mt-2 font-light leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Price on Request Notice */}
            <div className="mt-4 pt-4 border-t border-[#EADBC8] space-y-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#CBAE9B]/25 text-[#6E2023] rounded-lg border border-[#CBAE9B]/50">
                <span className="text-xs uppercase tracking-widest font-semibold">
                  Price on Request
                </span>
                <span className="text-[10px] text-[#6E2023]/70">• Direct Showroom Quote</span>
              </div>
              <p className="text-xs text-[#84766A] font-light pt-1">
                Enquire via WhatsApp for custom piece counts, personalization, and verified pricing.
              </p>
            </div>
          </div>

          {/* 1. OUTLINE VARIANT SELECTION (Pillar 1) */}
          <div className="p-4 sm:p-5 rounded-2xl border-2 border-[#EADBC8] bg-white/70 shadow-2xs space-y-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#6E2023]" />
                <span className="text-xs uppercase tracking-widest text-[#6E2023] font-bold">
                  Step 1: Select Specification &amp; Finish
                </span>
              </div>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#FFF5E6] text-[#6E2023] border border-[#EADBC8]">
                {product.variants.length > 0 ? "Selection Required" : "Standard Edition"}
              </span>
            </div>

            {product.variants.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {product.variants.map((variant) => {
                  const isSelected = selectedVariant?.id === variant.id;
                  return (
                    <button
                      key={variant.id}
                      type="button"
                      onClick={() => setSelectedVariant(variant)}
                      className={`relative text-left p-3.5 rounded-xl border-2 transition-all flex items-start gap-3 ${
                        isSelected
                          ? "border-[#6E2023] bg-[#FFF5E6] shadow-sm ring-2 ring-[#6E2023]/20"
                          : "border-[#EADBC8] bg-white hover:border-[#6E2023]/60 hover:bg-[#FFF5E6]/40"
                      }`}
                    >
                      {/* Outlined Radio / Active Check Indicator */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 border transition-all ${
                          isSelected
                            ? "bg-[#6E2023] border-[#6E2023] text-white"
                            : "border-[#CBAE9B] bg-white text-transparent"
                        }`}
                      >
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <span
                            className={`text-xs font-semibold truncate ${
                              isSelected ? "text-[#6E2023]" : "text-[#252522]"
                            }`}
                          >
                            {variant.name}
                          </span>
                          {isSelected && (
                            <span className="text-[9px] uppercase font-bold text-[#6E2023] tracking-wider shrink-0">
                              Selected
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-[#84766A] mt-0.5 font-light">
                          {variant.stockQuantity > 0
                            ? `✓ In Stock (${variant.stockQuantity} ready)`
                            : "Showroom Quote"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="p-3.5 rounded-xl border border-[#EADBC8] bg-[#FFF5E6]/50 flex items-center justify-between text-xs text-[#252522]">
                <div className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-[#6E2023] text-white flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#6E2023]">Standard Artisan Edition</p>
                    <p className="text-[11px] text-[#84766A]">
                      Full piece curation • Pan-India insured dispatch
                    </p>
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 bg-white text-[#6E2023] border border-[#EADBC8] rounded">
                  In Stock
                </span>
              </div>
            )}
          </div>

          {/* 2. PRIMARY ACTION: ADD TO CART (Pillar 2) */}
          <div className="space-y-4 pt-1">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              {/* Quantity Picker */}
              <div className="flex items-center justify-between sm:justify-start border-2 border-[#EADBC8] bg-white rounded-xl overflow-hidden shadow-2xs">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3.5 text-[#6E2023] hover:bg-[#FFF5E6] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-bold text-[#252522]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                  disabled={quantity >= maxStock}
                  className="p-3.5 text-[#6E2023] hover:bg-[#FFF5E6] transition-colors disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Primary Add to Cart CTA Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                className={`flex-1 py-4 px-6 rounded-xl font-heading text-sm uppercase tracking-[0.16em] font-semibold transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg active:scale-[0.99] ${
                  isAdded
                    ? "bg-[#2D6A4F] text-white shadow-[#2D6A4F]/30 scale-[1.01]"
                    : "bg-[#6E2023] hover:bg-[#58181A] text-white shadow-[#6E2023]/25 hover:shadow-xl hover:-translate-y-0.5"
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-5 h-5 stroke-[2.5] animate-bounce" />
                    <span>Added to Shopping Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-5 h-5" />
                    <span>Add to Shopping Bag</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct WhatsApp Ordering (Secondary Action) */}
            <a
              href={whatsappEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#1b7e3f] border border-[#25D366]/30 text-xs uppercase tracking-widest font-semibold transition-all rounded-xl"
            >
              <MessageSquare className="w-4 h-4 text-[#25D366]" />
              Instant WhatsApp Enquiry / Showroom Order
            </a>

            {/* Pillar 3: Feedback Intrusion Style Selector */}
            <div className="pt-1 flex items-center justify-between text-[11px] text-[#84766A] bg-[#FFF5E6]/60 p-2.5 rounded-lg border border-[#EADBC8]/70">
              <span className="font-medium text-[#6E2023]">Cart Feedback Mode:</span>
              <div className="inline-flex rounded-lg border border-[#EADBC8] bg-white p-0.5 text-[10px]">
                <button
                  type="button"
                  onClick={() => setFeedbackOption("toast")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    feedbackOption === "toast"
                      ? "bg-[#6E2023] text-white shadow-2xs"
                      : "text-[#84766A] hover:text-[#252522]"
                  }`}
                  title="Option 1: Low Intrusion Toast Banner & button confirmation"
                >
                  Subtle Toast (Option 1)
                </button>
                <button
                  type="button"
                  onClick={() => setFeedbackOption("drawer")}
                  className={`px-2.5 py-1 rounded-md font-semibold transition-colors ${
                    feedbackOption === "drawer"
                      ? "bg-[#6E2023] text-white shadow-2xs"
                      : "text-[#84766A] hover:text-[#252522]"
                  }`}
                  title="Option 2: High Intrusion Slide-over drawer"
                >
                  Slide Drawer (Option 2)
                </button>
              </div>
            </div>
          </div>

          {/* Service Promises */}
          <div className="p-4 bg-white border border-[#EADBC8] rounded-xl space-y-2.5 text-xs text-[#84766A]">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 text-[#6E2023] shrink-0" />
              <span>Transit Breakage Guarantee: Free immediate replacement if damaged.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Truck className="w-4 h-4 text-[#6E2023] shrink-0" />
              <span>Pan-India insured shipping with tracking. Local Chennai dispatch in 24h.</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#6E2023] shrink-0" />
              <span>Luxury burgundy box presentation with champagne detailing.</span>
            </div>
          </div>

          {/* Specifications Accordion */}
          <div className="divide-y divide-[#EADBC8] border-y border-[#EADBC8] pt-2">
            {/* 1. Description */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleSection("description")}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-heading text-lg text-[#6E2023] font-medium">
                  The Design & Story
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6E2023] transition-transform ${
                    openSections.description ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections.description && (
                <div className="mt-3 text-xs sm:text-sm text-[#252522]/85 leading-relaxed font-light">
                  {product.description}
                </div>
              )}
            </div>

            {/* 2. Specs */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleSection("specs")}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-heading text-lg text-[#6E2023] font-medium">
                  Dimensions & Piece Count
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6E2023] transition-transform ${
                    openSections.specs ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections.specs && (
                <div className="mt-3 space-y-2 text-xs text-[#252522]/85 font-light">
                  {product.pieceCount && (
                    <div className="flex justify-between py-1 border-b border-[#FFF5E6]">
                      <span className="text-[#84766A]">Total Pieces:</span>
                      <span className="font-medium">{product.pieceCount} Piece Set</span>
                    </div>
                  )}
                  {product.material && (
                    <div className="flex justify-between py-1 border-b border-[#FFF5E6]">
                      <span className="text-[#84766A]">Material & Finish:</span>
                      <span className="font-medium">{product.material}</span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex justify-between py-1 border-b border-[#FFF5E6]">
                      <span className="text-[#84766A]">Dimensions:</span>
                      <span className="font-medium text-right max-w-xs">{product.dimensions}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 3. Care Instructions */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleSection("care")}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-heading text-lg text-[#6E2023] font-medium">
                  Care & Maintenance
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6E2023] transition-transform ${
                    openSections.care ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections.care && (
                <div className="mt-3 text-xs sm:text-sm text-[#252522]/85 leading-relaxed font-light">
                  {product.careInstructions ||
                    "Gentle hand wash recommended for pieces with gold or brass accents. Avoid abrasive scouring pads."}
                </div>
              )}
            </div>

            {/* 4. Shipping & Returns */}
            <div className="py-4">
              <button
                type="button"
                onClick={() => toggleSection("shipping")}
                className="w-full flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-heading text-lg text-[#6E2023] font-medium">
                  Delivery & Returns
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#6E2023] transition-transform ${
                    openSections.shipping ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openSections.shipping && (
                <div className="mt-3 text-xs sm:text-sm text-[#252522]/85 space-y-2 font-light">
                  <p>
                    <strong>Delivery:</strong> 2–4 business days within Tamil Nadu; 4–7 business days across other Indian states.
                  </p>
                  <p>
                    <strong>Returns:</strong> 7-day hassle-free return window for unused items in original packaging. Immediate zero-cost replacement for transit breakage.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 pt-16 border-t border-[#EADBC8]">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-semibold mb-1">
              Complete Your Table
            </p>
            <h2 className="font-heading text-3xl sm:text-4xl text-[#6E2023]">
              Complementary Pieces
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Pillar 3 (Option 1): Subtle Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 max-w-sm w-full bg-white/95 backdrop-blur-md border-2 border-[#6E2023] rounded-2xl shadow-2xl p-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-start justify-between gap-3 pb-3 border-b border-[#EADBC8]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#2D6A4F] uppercase tracking-wider">
                  Added to Shopping Bag
                </p>
                <p className="text-[11px] text-[#84766A]">
                  Quantity: {quantity} • {selectedVariant ? selectedVariant.name : "Standard Edition"}
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowToast(false)}
              className="p-1 text-[#84766A] hover:text-[#6E2023] rounded-md transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-2.5 flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#FFF5E6] border border-[#EADBC8] shrink-0">
              {product.images[0]?.src ? (
                <Image
                  src={product.images[0].src}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <ProductArtwork category={product.category} name={product.name} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-[#252522] truncate">{product.name}</p>
              <p className="text-[10px] text-[#6E2023] font-medium uppercase tracking-wider mt-0.5">
                Ready for Enquiry &amp; Dispatch
              </p>
            </div>
          </div>

          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setShowToast(false);
                openCart();
              }}
              className="py-2 px-3 bg-[#FFF5E6] hover:bg-[#EADBC8]/50 text-[#6E2023] border border-[#EADBC8] text-[11px] uppercase tracking-wider font-semibold rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              View Bag
            </button>
            <Link
              href="/checkout"
              onClick={() => setShowToast(false)}
              className="py-2 px-3 bg-[#6E2023] hover:bg-[#58181A] text-white text-[11px] uppercase tracking-wider font-semibold rounded-lg text-center transition-colors shadow-xs"
            >
              Checkout →
            </Link>
          </div>
        </div>
      )}

      {/* Pillar 2: Mobile Sticky Add-to-Cart Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EADBC8] px-4 pt-3 pb-[max(env(safe-area-inset-bottom),12px)] shadow-2xl flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold text-[#6E2023] truncate leading-tight">
            {product.name}
          </p>
          <p className="text-[10px] text-[#84766A] truncate">
            {selectedVariant ? selectedVariant.name : "Artisan Edition"} • Qty: {quantity}
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className={`py-3 px-5 rounded-xl font-heading text-xs uppercase tracking-widest font-bold transition-all flex items-center gap-2 shrink-0 shadow-md ${
            isAdded
              ? "bg-[#2D6A4F] text-white"
              : "bg-[#6E2023] text-white active:scale-95"
          }`}
        >
          {isAdded ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Added!</span>
            </>
          ) : (
            <>
              <ShoppingBag className="w-4 h-4" />
              <span>Add to Bag</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
