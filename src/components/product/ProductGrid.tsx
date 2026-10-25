"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/product/ProductCard";
import { collections } from "@/lib/products";
import { useCart } from "@/context/CartContext";
import { Filter, X, ArrowUpDown, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { subscribeToFirestoreProducts } from "@/lib/firestoreService";
import { getDeletedProductIds } from "@/lib/adminStorage";

interface ProductGridProps {
  initialProducts: Product[];
  currentCollectionId?: string;
  title: string;
  description?: string;
}

export function ProductGrid({
  initialProducts,
  currentCollectionId,
  title,
  description,
}: ProductGridProps) {
  const { wishlist } = useCart();
  const searchParams = useSearchParams();

  const urlFilter = searchParams.get("filter");
  const urlPrice = searchParams.get("price");
  const urlCollection = searchParams.get("collection");
  
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(
    currentCollectionId || urlCollection || "all"
  );
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("featured");
  const [onlyWishlist, setOnlyWishlist] = useState<boolean>(urlFilter === "wishlist");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Live synchronized product list (combines static, Firestore, and instant Admin deletions)
  const [liveProducts, setLiveProducts] = useState<Product[]>(() => {
    const deleted = getDeletedProductIds();
    return initialProducts.filter((p) => !deleted.includes(p.id));
  });

  // Sync with Firestore & Admin real-time events
  useEffect(() => {
    const filterActive = (prods: Product[]) => {
      const deleted = getDeletedProductIds();
      return prods.filter((p) => !deleted.includes(p.id));
    };

    setLiveProducts(filterActive(initialProducts));

    // Listen to live Cloud Firestore changes
    const unsubscribe = subscribeToFirestoreProducts((firestoreProds) => {
      if (firestoreProds && firestoreProds.length > 0) {
        if (currentCollectionId) {
          const colFiltered = firestoreProds.filter((p) =>
            p.collectionIds.includes(currentCollectionId)
          );
          setLiveProducts(filterActive(colFiltered));
        } else {
          setLiveProducts(filterActive(firestoreProds));
        }
      }
    });

    // Instant local cross-tab / Admin deletion listener (0ms delay)
    const handleDeleted = (e: any) => {
      const deletedId = e.detail?.id;
      if (deletedId) {
        setLiveProducts((prev) => prev.filter((p) => p.id !== deletedId));
      }
    };

    const handleSaved = (e: any) => {
      const savedProd: Product | undefined = e.detail?.product;
      if (savedProd) {
        setLiveProducts((prev) => {
          const exists = prev.some((p) => p.id === savedProd.id);
          if (exists) {
            return prev.map((p) => (p.id === savedProd.id ? savedProd : p));
          }
          return [savedProd, ...prev];
        });
      }
    };

    window.addEventListener("vitrag:product_deleted", handleDeleted);
    window.addEventListener("vitrag:product_saved", handleSaved);
    window.addEventListener("storage", () => {
      setLiveProducts((prev) => filterActive(prev));
    });

    return () => {
      unsubscribe();
      window.removeEventListener("vitrag:product_deleted", handleDeleted);
      window.removeEventListener("vitrag:product_saved", handleSaved);
    };
  }, [initialProducts, currentCollectionId]);

  // Sync with URL parameters if user navigated from homepage price guide or wishlist icon
  useEffect(() => {
    if (urlFilter === "wishlist") {
      setOnlyWishlist(true);
    }
    if (urlPrice) {
      if (urlPrice === "under-999") setPriceRange("under-999");
      else if (urlPrice === "under-1999") setPriceRange("under-1999");
      else if (urlPrice === "under-4999") setPriceRange("2000-4999");
      else if (urlPrice === "wedding" || urlPrice === "5000-above") setPriceRange("5000-above");
    }
    if (urlCollection) {
      setSelectedCategory(urlCollection);
    }
  }, [urlFilter, urlPrice, urlCollection]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...liveProducts];

    // Filter by Wishlist
    if (onlyWishlist) {
      result = result.filter((p) => wishlist.includes(p.id));
    }

    // Filter by Collection / Category
    if (selectedCategory !== "all") {
      result = result.filter(
        (p) =>
          p.collectionIds.includes(selectedCategory) ||
          p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by Price Range
    if (priceRange === "under-999") {
      result = result.filter((p) => p.price <= 99900);
    } else if (priceRange === "under-1999") {
      result = result.filter((p) => p.price <= 199900);
    } else if (priceRange === "2000-4999") {
      result = result.filter((p) => p.price >= 200000 && p.price <= 499900);
    } else if (priceRange === "5000-above") {
      result = result.filter((p) => p.price >= 500000);
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // "featured" default
      result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [initialProducts, selectedCategory, priceRange, sortBy, onlyWishlist, wishlist]);

  const resetFilters = () => {
    setSelectedCategory(currentCollectionId || "all");
    setPriceRange("all");
    setSortBy("featured");
    setOnlyWishlist(false);
  };

  const hasActiveFilters =
    (selectedCategory !== "all" && selectedCategory !== currentCollectionId) ||
    priceRange !== "all" ||
    onlyWishlist;

  return (
    <div className="w-full">
      {/* Header Banner */}
      <div className="py-12 sm:py-16 border-b border-[#EADBC8] bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-semibold mb-2">
            VITRAG Tableware & Gifting
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#6E2023] font-medium">
            {title}
          </h1>
          {description && (
            <p className="mt-3 text-sm sm:text-base text-[#54483E] max-w-2xl font-light leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Control Bar: Product Count, Mobile Filter Button, Sort Dropdown */}
      <div className="bg-[#FFF5E6] border-b border-[#EADBC8] sticky top-[65px] sm:top-[77px] z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#EADBC8] text-xs uppercase tracking-wider font-medium text-[#252522]"
            >
              <Filter className="w-3.5 h-3.5 text-[#6E2023]" />
              <span>Filters</span>
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-[#6E2023]" />
              )}
            </button>
            <span className="text-xs uppercase tracking-wider text-[#54483E]">
              Showing <span className="font-semibold text-[#252522]">{filteredProducts.length}</span> Pieces
            </span>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="hidden sm:inline-block text-xs uppercase tracking-wider text-[#54483E]">
              Sort By:
            </label>
            <div className="relative">
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-[#EADBC8] text-[16px] sm:text-xs uppercase tracking-wider font-medium text-[#252522] pl-3 pr-8 py-2 sm:py-1.5 rounded-none focus:outline-none focus:border-[#6E2023]"
              >
                <option value="featured">Curated (Featured)</option>
                <option value="name-asc">Alphabetical: A to Z</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-[#54483E] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid & Desktop Filter Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 items-start">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block space-y-8 sticky top-36 bg-white p-6 border border-[#EADBC8] rounded-2xl shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#EADBC8]">
              <h3 className="font-heading text-lg text-[#6E2023] font-medium">
                Refine Selection
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[11px] uppercase tracking-wider text-[#6E2023] hover:underline flex items-center gap-1 font-medium"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* Collection Filter */}
            {!currentCollectionId && (
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-[#54483E] font-semibold">
                  Collections
                </h4>
                <div className="space-y-2 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                      className="accent-[#6E2023]"
                    />
                    <span>All Collections</span>
                  </label>
                  {collections.map((col) => (
                    <label key={col.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === col.id}
                        onChange={() => setSelectedCategory(col.id)}
                        className="accent-[#6E2023]"
                      />
                      <span>{col.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Wishlist Quick Toggle */}
            <div className="pt-4 border-t border-[#EADBC8]">
              <label className="flex items-center gap-2 cursor-pointer text-xs">
                <input
                  type="checkbox"
                  checked={onlyWishlist}
                  onChange={(e) => setOnlyWishlist(e.target.checked)}
                  className="accent-[#6E2023]"
                />
                <span>Saved to Wishlist ({wishlist.length})</span>
              </label>
            </div>
          </aside>

          {/* Product Cards Grid */}
          <div className={`${currentCollectionId ? "lg:col-span-3" : "lg:col-span-3"}`}>
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#EADBC8] p-12 text-center space-y-4">
                <h3 className="font-heading text-2xl text-[#252522]">
                  No pieces matched your selection
                </h3>
                <p className="text-xs text-[#54483E] max-w-sm mx-auto font-light">
                  Try clearing active price or category filters to explore our full tableware range.
                </p>
                <Button onClick={resetFilters} variant="primary" size="sm">
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Slide-out Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#252522]/60 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#EADBC8]">
                <h3 className="font-heading text-xl text-[#6E2023]">
                  Filter Catalogue
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 text-[#54483E] hover:text-[#6E2023]"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Collection Filter */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-[#6E2023] font-semibold">
                  Collections
                </h4>
                <div className="space-y-2.5 text-xs text-[#252522]">
                  <label className="flex items-center gap-2.5 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="mobile-category"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
                      className="accent-[#6E2023]"
                    />
                    <span className="font-medium">All Collections</span>
                  </label>
                  {collections.map((col) => (
                    <label key={col.id} className="flex items-center gap-2.5 cursor-pointer py-1">
                      <input
                        type="radio"
                        name="mobile-category"
                        checked={selectedCategory === col.id}
                        onChange={() => setSelectedCategory(col.id)}
                        className="accent-[#6E2023]"
                      />
                      <span>{col.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Mobile Wishlist Quick Toggle */}
              <div className="pt-4 border-t border-[#EADBC8]">
                <label className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#6E2023]">
                  <input
                    type="checkbox"
                    checked={onlyWishlist}
                    onChange={(e) => setOnlyWishlist(e.target.checked)}
                    className="accent-[#6E2023]"
                  />
                  <span>Show Wishlisted Only ({wishlist.length})</span>
                </label>
              </div>
            </div>

            <div className="pt-6 border-t border-[#EADBC8] space-y-2 mt-6">
              <Button
                onClick={() => setMobileFilterOpen(false)}
                variant="primary"
                className="w-full py-3"
              >
                Apply Filters ({filteredProducts.length} Results)
              </Button>
              <button
                onClick={resetFilters}
                className="w-full text-center text-xs uppercase tracking-wider text-[#54483E] hover:text-[#6E2023] py-2 font-medium"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
