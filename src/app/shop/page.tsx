import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getAllProducts } from "@/lib/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Shop All Collections — Crockery, Serveware & Tableware | VITRAG",
  description:
    "Explore our complete range of handcrafted ceramic dinner sets, serving platters, dry-fruit gift boxes, and artisanal kitchenware.",
};

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      <Container size="lg">
        <Breadcrumbs items={[{ label: "Shop All" }]} />
      </Container>
      <Suspense
        fallback={
          <div className="py-20 text-center text-xs uppercase tracking-widest text-[#8B8176]">
            Loading Collections...
          </div>
        }
      >
        <ProductGrid
          initialProducts={products}
          title="Complete Tableware & Gifting Catalogue"
          description="Every piece in the VITRAG collection is curated with intention—bringing enduring craftsmanship, food-safe glazes, and refined aesthetics to your dining table."
        />
      </Suspense>
    </main>
  );
}
