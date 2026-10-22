import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutView } from "./CheckoutView";

export const metadata: Metadata = {
  title: "Checkout — Order Tableware & Gifting | VITRAG",
  description:
    "Complete your tableware order from VITRAG. Direct WhatsApp ordering, verified UPI payments, and pan-India insured shipping.",
};

export default function CheckoutPage() {
  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      <Container size="lg">
        <Breadcrumbs
          items={[
            { label: "Shopping Bag", href: "/cart" },
            { label: "Checkout" },
          ]}
        />
        <CheckoutView />
      </Container>
    </main>
  );
}
