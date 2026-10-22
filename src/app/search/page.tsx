import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { SearchView } from "./SearchView";

export const metadata: Metadata = {
  title: "Search Catalogue — Crockery, Dinnerware & Gifts | VITRAG",
  description:
    "Search VITRAG's collection of ceramic dinnerware, handcrafted serving platters, and festive gifting boxes.",
};

export default function SearchPage() {
  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      <Container size="lg">
        <Breadcrumbs items={[{ label: "Search Catalogue" }]} />
        <Suspense
          fallback={
            <div className="py-20 text-center text-[#8B8176]">
              Loading catalogue...
            </div>
          }
        >
          <SearchView />
        </Suspense>
      </Container>
    </main>
  );
}
