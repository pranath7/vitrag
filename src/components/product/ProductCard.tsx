"use client";

import React from "react";
import Link from "next/link";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, toggleWishlist, isInWishlist } = useCart();
  const isWishlisted = isInWishlist(product.id);

  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : null;

  return (
    <article className="group relative flex flex-col bg-white border border-[#E7E0D6] transition-all duration-300 hover:shadow-lg hover:border-[#8B8176]/50">
      {/* 1. Image Container */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#F7F4EE]">
        {/* Placeholder Artwork Presentation */}
        <Link
          href={`/product/${product.slug}`}
          className="w-full h-full flex flex-col items-center justify-center p-6 text-center transition-transform duration-500 group-hover:scale-105"
        >
          <div className="w-24 h-24 rounded-full border border-[#D9D0C1] bg-[#E9DFD1]/40 flex items-center justify-center mb-3">
            <span className="font-heading text-xs tracking-widest text-[#5A252E] uppercase">
              VITRAG
            </span>
          </div>
          <span className="text-[11px] uppercase tracking-widest text-[#8B8176] font-medium max-w-[180px] line-clamp-2">
            {product.category}
          </span>
          <span className="text-[10px] text-[#8B8176]/70 mt-1">
            {product.pieceCount ? `${product.pieceCount} Pieces` : product.material || "Artisan Crafted"}
          </span>
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.featured && <Badge variant="burgundy">Curated</Badge>}
          {discountPercent && <Badge variant="gold">Save {discountPercent}%</Badge>}
          {product.tags.includes("24K Gold") && (
            <Badge variant="beige">24K Gold</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isWishlisted
              ? "bg-[#5A252E] text-white shadow-md"
              : "bg-white/80 text-[#252522] hover:bg-white hover:text-[#5A252E] shadow-xs"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden lg:flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          <button
            type="button"
            onClick={() => addItem(product, 1)}
            className="flex-1 py-2.5 bg-[#5A252E] hover:bg-[#431b22] text-white text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-md"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Quick Add
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="p-2.5 bg-white hover:bg-[#F7F4EE] text-[#252522] border border-[#E7E0D6] flex items-center justify-center transition-colors shadow-sm"
            aria-label="View product details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white border-t border-[#F7F4EE]">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#8B8176] mb-1 font-sans">
            {product.category}
          </p>
          <h3 className="font-heading text-base sm:text-lg text-[#252522] group-hover:text-[#5A252E] transition-colors line-clamp-1">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-[#8B8176] line-clamp-1 mt-1 font-light">
            {product.shortDescription}
          </p>
        </div>

        {/* Pricing & Mobile Action */}
        <div className="mt-4 pt-3 border-t border-[#F7F4EE] flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-sm sm:text-base font-semibold text-[#252522]">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-[#8B8176] line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>

          {/* Mobile Quick Add Button */}
          <button
            type="button"
            onClick={() => addItem(product, 1)}
            className="lg:hidden p-2 text-[#5A252E] hover:bg-[#F7F4EE] border border-[#E7E0D6] transition-colors"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
