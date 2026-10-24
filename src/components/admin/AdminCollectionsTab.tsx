"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FolderKanban, ExternalLink, ArrowRight, Package } from "lucide-react";
import { collections } from "@/lib/products";
import { Product } from "@/lib/types";

interface AdminCollectionsTabProps {
  products: Product[];
  onSelectCollection: (collectionId: string) => void;
}

export function AdminCollectionsTab({
  products,
  onSelectCollection,
}: AdminCollectionsTabProps) {
  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-semibold">
          Tableware Collections
        </h1>
        <p className="text-xs sm:text-sm text-[#84766A]">
          Manage and review all {collections.length} curated product collections.
        </p>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {collections.map((col) => {
          const count = products.filter((p) => p.collectionIds.includes(col.id)).length;

          return (
            <div
              key={col.id}
              className="bg-white rounded-xl border border-[#EADBC8] shadow-xs hover:border-[#6E2023]/40 transition-all overflow-hidden flex flex-col group"
            >
              {/* Collection Image */}
              <div className="h-40 w-full relative bg-[#FFF5E6] overflow-hidden">
                <Image
                  src={col.image}
                  alt={col.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="font-heading text-lg font-bold drop-shadow-sm">
                    {col.name}
                  </h3>
                  <span className="text-[11px] text-[#FFF5E6]/90 block">
                    Slug: /{col.slug}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs text-[#84766A] line-clamp-2 leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-3 border-t border-[#EADBC8]/60 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#252522]">
                    <Package className="w-3.5 h-3.5 text-[#6E2023]" />
                    <span>{count} Products</span>
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/collections/${col.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-[#84766A] hover:text-[#6E2023] hover:bg-[#FFF5E6] rounded-md transition-colors"
                      title="View public collection page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => onSelectCollection(col.id)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-[#6E2023] hover:underline"
                    >
                      <span>View Items</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
