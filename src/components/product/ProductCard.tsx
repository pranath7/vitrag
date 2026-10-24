"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { isProductDeleted, getAdminProducts } from "@/lib/adminStorage";
import { Heart, ShoppingBag, Eye, Check } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { ProductArtwork } from "@/components/product/ProductArtwork";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product: initialProduct }: ProductCardProps) {
  const { addItem, toggleWishlist, isInWishlist } = useCart();

  // Reactive product state (reflects edits and deletes made in Admin Console instantly)
  const [product, setProduct] = useState<Product>(() => {
    if (typeof window === "undefined") return initialProduct;
    try {
      const all = getAdminProducts();
      const match = all.find((p) => p.id === initialProduct.id);
      return match || initialProduct;
    } catch {
      return initialProduct;
    }
  });

  const [isDeleted, setIsDeleted] = useState(() => {
    if (typeof window === "undefined") return false;
    return isProductDeleted(initialProduct.id);
  });

  const isWishlisted = isInWishlist(product.id);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isProductDeleted(initialProduct.id)) {
      setIsDeleted(true);
    }
    const handleDeleted = (e: any) => {
      if (e.detail?.id === initialProduct.id) {
        setIsDeleted(true);
      }
    };
    const handleSaved = (e: any) => {
      const savedProd: Product | undefined = e.detail?.product;
      if (savedProd && savedProd.id === initialProduct.id) {
        setProduct(savedProd);
        setIsDeleted(false);
      }
    };

    window.addEventListener("vitrag:product_deleted", handleDeleted);
    window.addEventListener("vitrag:product_saved", handleSaved);
    return () => {
      window.removeEventListener("vitrag:product_deleted", handleDeleted);
      window.removeEventListener("vitrag:product_saved", handleSaved);
    };
  }, [initialProduct.id]);

  if (isDeleted) return null;

  const handleQuickAdd = () => {
    addItem(product, 1);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const discountPercent = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.price) / product.compareAtPrice) * 100
      )
    : null;

  return (
    <article className="group relative flex flex-col bg-white border border-[#EADBC8] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#6E2023]/40">
      {/* 1. Image Container */}
      <div className="relative aspect-4/5 w-full overflow-hidden bg-[#FFF5E6]">
        {/* Artwork or Poster Presentation */}
        <Link
          href={`/product/${product.slug}`}
          className="w-full h-full block relative transition-transform duration-500 group-hover:scale-105"
        >
          {product.images[0]?.src ? (
            <div className="w-full h-full relative">
              <Image
                src={product.images[0].src}
                alt={product.images[0].alt || product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          ) : (
            <ProductArtwork
              category={product.category}
              name={product.name}
              hasGold={product.tags.includes("24K Gold") || product.name.toLowerCase().includes("gold")}
            />
          )}
        </Link>

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.featured && <Badge variant="burgundy">Curated</Badge>}
          {product.tags.includes("24K Gold") && (
            <Badge variant="rose">24K Gold</Badge>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isWishlisted
              ? "bg-[#6E2023] text-white shadow-md"
              : "bg-white/85 text-[#6E2023] hover:bg-white hover:text-[#55181A] shadow-xs"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? "fill-white" : ""}`} />
        </button>

        {/* Quick Add Overlay on Hover (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 hidden lg:flex gap-2 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`flex-1 py-2.5 text-white text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center gap-1.5 transition-all shadow-md rounded-lg ${
              isAdded
                ? "bg-[#2D6A4F] shadow-[#2D6A4F]/30"
                : "bg-[#6E2023] hover:bg-[#55181A]"
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                Added!
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                Quick Add
              </>
            )}
          </button>
          <Link
            href={`/product/${product.slug}`}
            className="p-2.5 bg-white hover:bg-[#FFF5E6] text-[#6E2023] border border-[#EADBC8] flex items-center justify-center transition-colors shadow-sm rounded-lg"
            aria-label="View product details"
          >
            <Eye className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 2. Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between bg-white border-t border-[#FFF5E6]">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-[#84766A] mb-1 font-sans font-medium">
            {product.category}
          </p>
          <h3 className="font-heading text-base sm:text-lg text-[#6E2023] group-hover:text-[#55181A] transition-colors line-clamp-1 font-medium">
            <Link href={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          <p className="text-xs text-[#84766A] line-clamp-1 mt-1 font-light">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-3 pt-2.5 border-t border-[#FFF5E6]">
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-sm sm:text-base font-bold text-[#6E2023]">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice && product.compareAtPrice > product.price && (
                <span className="text-[10px] text-[#84766A] line-through">
                  {formatPrice(product.compareAtPrice)}
                </span>
              )}
            </div>

            {/* Mobile Quick Add Button with enhanced tap target */}
            <button
              type="button"
              onClick={handleQuickAdd}
              className={`lg:hidden p-2 min-w-[38px] min-h-[38px] flex items-center justify-center border rounded-lg transition-all active:scale-95 ${
                isAdded
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                  : "text-[#6E2023] bg-[#FFF5E6]/40 hover:bg-[#FFF5E6] border-[#EADBC8]"
              }`}
              aria-label={isAdded ? "Added to shopping bag" : "Add to shopping bag"}
            >
              {isAdded ? (
                <Check className="w-4 h-4 stroke-[2.5]" />
              ) : (
                <ShoppingBag className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="mt-1 flex items-center gap-1 text-[10px] text-[#2D6A4F] font-semibold">
            <span>🎁</span>
            <span>+ Free 6-Pc Glasses (Worth ₹2,999)</span>
          </div>
        </div>
      </div>
    </article>
  );
}
