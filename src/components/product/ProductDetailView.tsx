"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product, ProductVariant } from "@/lib/types";
import { formatPrice, generateWhatsAppProductEnquiryUrl } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
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
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  // Variant state
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product.variants.length > 0 ? product.variants[0] : undefined
  );
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

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
    addItem(product, quantity, selectedVariant);
  };

  const whatsappEnquiryUrl = generateWhatsAppProductEnquiryUrl(
    product.name,
    product.sku,
    currentPrice,
    typeof window !== "undefined" ? window.location.href : undefined
  );

  return (
    <div className="py-8 sm:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Visual Display */}
          <div className="relative aspect-4/5 w-full bg-[#FFF5E6] border border-[#EADBC8] rounded-2xl overflow-hidden flex flex-col items-center justify-center shadow-sm">
            <ProductArtwork
              category={product.category}
              name={product.name}
              className="w-full h-full"
              hasGold={product.tags.includes("24K Gold") || product.name.toLowerCase().includes("gold")}
            />

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
                  className={`w-20 h-20 shrink-0 rounded-xl border p-2 flex flex-col items-center justify-center bg-white transition-all ${
                    activeImageIndex === idx
                      ? "border-[#6E2023] ring-2 ring-[#6E2023]"
                      : "border-[#EADBC8] opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="text-[10px] uppercase font-serif text-[#6E2023] font-medium">
                    View {idx + 1}
                  </span>
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

            {/* Price Box */}
            <div className="mt-4 pt-4 border-t border-[#EADBC8] flex items-baseline gap-3">
              <span className="text-2xl sm:text-3xl font-semibold text-[#6E2023]">
                {formatPrice(currentPrice)}
              </span>
              {currentCompareAtPrice && (
                <span className="text-base text-[#84766A] line-through">
                  {formatPrice(currentCompareAtPrice)}
                </span>
              )}
              <span className="text-xs text-[#84766A] font-light">
                (Inclusive of all taxes)
              </span>
            </div>
          </div>

          {/* Variant Selection */}
          {product.variants.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs uppercase tracking-widest text-[#6E2023] font-semibold">
                Finish / Variant: <span className="text-[#252522] font-bold">{selectedVariant?.name}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(variant)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-medium rounded-lg border transition-all ${
                      selectedVariant?.id === variant.id
                        ? "border-[#6E2023] bg-[#6E2023] text-white shadow-sm"
                        : "border-[#EADBC8] bg-white text-[#252522] hover:border-[#6E2023]"
                    }`}
                  >
                    {variant.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Controls & Add to Bag */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-[#EADBC8] bg-white rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-[#6E2023] hover:bg-[#FFF5E6] transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold text-[#252522]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.min(maxStock, q + 1))}
                  disabled={quantity >= maxStock}
                  className="p-3 text-[#6E2023] hover:bg-[#FFF5E6] transition-colors disabled:opacity-30"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                variant="primary"
                size="lg"
                className="flex-1 py-3.5 shadow-md"
                leftIcon={<ShoppingBag className="w-4 h-4" />}
              >
                Add to Shopping Bag
              </Button>
            </div>

            {/* Direct WhatsApp Ordering */}
            <a
              href={whatsappEnquiryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all rounded-lg shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Order / Enquire via WhatsApp
            </a>
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
    </div>
  );
}
