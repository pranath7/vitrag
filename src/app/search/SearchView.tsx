"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { searchProducts, getAllProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/ProductCard";
import { Product } from "@/lib/types";
import { Search, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function SearchView() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialQuery.trim()) {
      setQuery(initialQuery);
      const matches = searchProducts(initialQuery);
      setResults(matches);
      setHasSearched(true);
    } else {
      setResults([]);
      setHasSearched(false);
    }
  }, [initialQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      const matches = searchProducts(query);
      setResults(matches);
      setHasSearched(true);
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    router.push("/search");
  };

  const popularSearches = [
    "Dinner Set",
    "Platter",
    "Dry Fruit Box",
    "24K Gold",
    "Kullad",
    "Brass",
    "Wedding",
  ];

  return (
    <div className="py-12 sm:py-16">
      {/* Search Bar Header */}
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="font-heading text-4xl sm:text-5xl text-[#252522]">
          Search Our Catalogue
        </h1>
        <p className="text-sm text-[#8B8176] font-light">
          Find handcrafted dinnerware, serving platters, dry-fruit boxes, and curated gifts.
        </p>

        <form onSubmit={handleSearch} className="relative mt-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by product name, category, material, or keyword..."
            className="w-full pl-12 pr-28 py-4 bg-white border border-[#E7E0D6] text-sm text-[#252522] rounded-none focus:outline-none focus:border-[#5A252E] shadow-sm"
          />
          <Search className="w-5 h-5 text-[#8B8176] absolute left-4 top-1/2 -translate-y-1/2" />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-24 top-1/2 -translate-y-1/2 text-[#8B8176] hover:text-[#252522] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#5A252E] hover:bg-[#431b22] text-white text-xs uppercase tracking-widest font-semibold px-5 py-2.5 transition-colors"
          >
            Search
          </button>
        </form>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs uppercase tracking-wider text-[#8B8176]">
            Popular:
          </span>
          {popularSearches.map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                router.push(`/search?q=${encodeURIComponent(term)}`);
              }}
              className="text-xs px-2.5 py-1 bg-white border border-[#E7E0D6] text-[#252522] hover:border-[#5A252E] hover:text-[#5A252E] transition-colors"
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-16">
        {hasSearched ? (
          <div>
            <div className="border-b border-[#E7E0D6] pb-4 mb-8 flex justify-between items-baseline">
              <h2 className="font-heading text-2xl text-[#252522]">
                Results for &ldquo;{initialQuery}&rdquo;
              </h2>
              <span className="text-xs uppercase tracking-wider text-[#8B8176]">
                Found {results.length} piece{results.length === 1 ? "" : "s"}
              </span>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[#E7E0D6] p-12 text-center space-y-4 max-w-lg mx-auto">
                <h3 className="font-heading text-2xl text-[#252522]">
                  No matching items found
                </h3>
                <p className="text-xs text-[#8B8176] font-light leading-relaxed">
                  We couldn&apos;t find anything matching &ldquo;{initialQuery}&rdquo;. Try checking the spelling or browse our popular collections.
                </p>
                <div className="pt-2">
                  <Button href="/shop" variant="primary" size="sm">
                    Browse All Products
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center pt-8">
            <h3 className="font-heading text-2xl text-[#252522] mb-6">
              Browse by Featured Collections
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <Link
                href="/collections/dinner-sets"
                className="p-6 bg-white border border-[#E7E0D6] hover:border-[#5A252E] transition-colors group"
              >
                <span className="font-heading text-xl text-[#252522] group-hover:text-[#5A252E] block">
                  Dinner Sets
                </span>
                <span className="text-[11px] text-[#8B8176] mt-1 block">
                  Porcelain & Stoneware
                </span>
              </Link>
              <Link
                href="/collections/platters-serving"
                className="p-6 bg-white border border-[#E7E0D6] hover:border-[#5A252E] transition-colors group"
              >
                <span className="font-heading text-xl text-[#252522] group-hover:text-[#5A252E] block">
                  Platters & Serving
                </span>
                <span className="text-[11px] text-[#8B8176] mt-1 block">
                  Ceramic & Mango Wood
                </span>
              </Link>
              <Link
                href="/collections/gift-sets"
                className="p-6 bg-white border border-[#E7E0D6] hover:border-[#5A252E] transition-colors group"
              >
                <span className="font-heading text-xl text-[#252522] group-hover:text-[#5A252E] block">
                  Curated Gift Sets
                </span>
                <span className="text-[11px] text-[#8B8176] mt-1 block">
                  Hostess & Celebration
                </span>
              </Link>
              <Link
                href="/collections/dry-fruit-boxes"
                className="p-6 bg-white border border-[#E7E0D6] hover:border-[#5A252E] transition-colors group"
              >
                <span className="font-heading text-xl text-[#252522] group-hover:text-[#5A252E] block">
                  Dry-Fruit Boxes
                </span>
                <span className="text-[11px] text-[#8B8176] mt-1 block">
                  Brass & Velvet Caskets
                </span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
