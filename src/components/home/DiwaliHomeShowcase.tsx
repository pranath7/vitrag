"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Gift } from "lucide-react";
import { getDeletedProductIds } from "@/lib/adminStorage";
import { subscribeToFirestoreProducts } from "@/lib/firestoreService";
import { Product } from "@/lib/types";

interface DiwaliHomeShowcaseProps {
  initialProducts: Product[];
}

export function DiwaliHomeShowcase({ initialProducts }: DiwaliHomeShowcaseProps) {
  const [activeProducts, setActiveProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return initialProducts;
    const deleted = getDeletedProductIds();
    return initialProducts.filter((p) => !deleted.includes(p.id));
  });

  useEffect(() => {
    const filterActive = (prods: Product[]) => {
      const deleted = getDeletedProductIds();
      return prods.filter((p) => !deleted.includes(p.id));
    };

    setActiveProducts(filterActive(initialProducts));

    // Listen to real-time Firestore updates
    const unsubscribe = subscribeToFirestoreProducts((firestoreProds) => {
      if (firestoreProds && firestoreProds.length > 0) {
        const diwaliOnes = firestoreProds.filter((p) =>
          p.collectionIds.includes("diwali-sale")
        );
        if (diwaliOnes.length > 0) {
          setActiveProducts(filterActive(diwaliOnes));
        }
      }
    });

    // Instant local event when deleted from Admin console
    const handleDeleted = (e: any) => {
      const deletedId = e.detail?.id;
      if (deletedId) {
        setActiveProducts((prev) => prev.filter((p) => p.id !== deletedId));
      }
    };

    window.addEventListener("vitrag:product_deleted", handleDeleted);
    window.addEventListener("storage", () => {
      setActiveProducts((prev) => filterActive(prev));
    });

    return () => {
      unsubscribe();
      window.removeEventListener("vitrag:product_deleted", handleDeleted);
    };
  }, [initialProducts]);

  if (activeProducts.length === 0) return null;

  return (
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

        {/* 🎁 GRAND DIWALI BUNDLE BANNER */}
        <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#6E2023] via-[#85272B] to-[#6E2023] text-white border-2 border-[#FFD700]/50 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#FFF5E6] text-[#6E2023] flex items-center justify-center shrink-0 shadow-md">
              <Gift className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-widest bg-[#FFD700] text-[#6E2023] px-2 py-0.5 rounded-full shadow-2xs">
                  Diwali Sale &amp; Bundle Offer
                </span>
                <span className="text-xs text-[#FFD700] font-semibold">
                  Storewide Special
                </span>
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-medium text-[#FFF5E6] mt-0.5">
                Buy Any Item from the Store — Get a 6-Piece Luxury Crystal Glass Set FREE!
              </h3>
              <p className="text-xs text-[#FFF5E6]/80 font-light mt-0.5">
                Worth ₹2,999 • Free Pan-India insured delivery • Automatically included in your order at ₹0
              </p>
            </div>
          </div>
          <Link
            href="/shop"
            className="shrink-0 px-5 py-2.5 bg-[#FFD700] hover:bg-[#F3CA00] text-[#6E2023] text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95"
          >
            Claim Free Glass Set →
          </Link>
        </div>

        {/* Dynamic Cards: Automatically updates/removes if admin deletes any */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {activeProducts.map((prod) => {
            const savings =
              prod.compareAtPrice && prod.compareAtPrice > prod.price
                ? prod.compareAtPrice - prod.price
                : 0;
            const discountPercent =
              prod.compareAtPrice && prod.compareAtPrice > prod.price
                ? Math.round(
                    ((prod.compareAtPrice - prod.price) / prod.compareAtPrice) * 100
                  )
                : 0;

            return (
              <div
                key={prod.id}
                className="group bg-white border-2 border-[#EADBC8] hover:border-[#6E2023] rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col"
              >
                <Link
                  href={`/product/${prod.slug}`}
                  className="relative aspect-4/3 w-full overflow-hidden block bg-[#252522]"
                >
                  {prod.images[0]?.src && (
                    <Image
                      src={prod.images[0].src}
                      alt={prod.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  )}
                  <div className="absolute top-3 left-3 bg-[#6E2023] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <span>🪔</span>
                    <span>Diwali Special • {discountPercent}% OFF</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/95 text-[#2D6A4F] text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm border border-[#2D6A4F]/20 flex items-center gap-1">
                    <span>🎁</span>
                    <span>+ Free 6-Pc Glasses Included</span>
                  </div>
                </Link>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#84766A] uppercase tracking-wider font-medium mb-1">
                      <span>{prod.category}</span>
                      <span className="text-[#2D6A4F] font-bold">
                        {prod.availability === "in-stock" ? "In Stock" : prod.availability}
                      </span>
                    </div>
                    <h3 className="font-heading text-lg text-[#6E2023] font-medium leading-snug line-clamp-2">
                      <Link href={`/product/${prod.slug}`} className="hover:underline">
                        {prod.name}
                      </Link>
                    </h3>
                    <p className="text-xs text-[#84766A] mt-1.5 font-light line-clamp-2">
                      {prod.shortDescription || prod.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#EADBC8] flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-heading font-bold text-[#6E2023]">
                          ₹{(prod.price / 100).toLocaleString("en-IN")}
                        </span>
                        {prod.compareAtPrice && (
                          <span className="text-xs text-[#84766A] line-through">
                            ₹{(prod.compareAtPrice / 100).toLocaleString("en-IN")}
                          </span>
                        )}
                      </div>
                      {savings > 0 && (
                        <span className="text-[10px] text-[#2D6A4F] font-semibold">
                          Save ₹{(savings / 100).toLocaleString("en-IN")} ({discountPercent}% Discount)
                        </span>
                      )}
                    </div>
                    <Link
                      href={`/product/${prod.slug}`}
                      className="py-2.5 px-4 bg-[#6E2023] hover:bg-[#55181A] text-white text-xs uppercase tracking-wider font-semibold rounded-lg transition-all shadow-xs"
                    >
                      View &amp; Buy →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
