import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CartPageView } from "./CartPageView";

export const metadata: Metadata = {
  title: "Your Shopping Bag — Tableware & Gifting | VITRAG",
  description:
    "Review your selected dinner sets, serving platters, and curated gifting hampers. Direct WhatsApp ordering and verified checkout available.",
};

export default function CartPage() {
  return (
    <main className="bg-[#F7F4EE] min-h-screen">
      <Container size="lg">
        <Breadcrumbs items={[{ label: "Shopping Bag" }]} />
        <CartPageView />
      </Container>
    </main>
  );
}
