import React from "react";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { BillingDashboardView } from "./BillingDashboardView";
import { CreditCard, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Client Billing & Retainer Invoices | VITRAG Tableware & Gifting",
  description:
    "Manage your Vitrag Atelier subscription plan, payment methods, GST tax invoices, promo codes, and corporate dispatch quotas.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BillingPage() {
  return (
    <main className="bg-[#FFF5E6] min-h-screen text-[#252522]">
      {/* 0. Breadcrumb Nav */}
      <Container size="lg">
        <Breadcrumbs
          items={[
            { label: "Client Account", href: "/billing" },
            { label: "Billing & Subscriptions" },
          ]}
        />
      </Container>

      {/* Header Banner */}
      <section className="py-8 sm:py-12 bg-[#FAF3E7] border-b border-[#EADBC8] mb-8 sm:mb-12">
        <Container size="lg">
          <div className="max-w-4xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#6E2023]/10 text-[#6E2023] text-[11px] uppercase tracking-[0.2em] font-semibold rounded-full border border-[#6E2023]/20">
              <Sparkles className="w-3.5 h-3.5 text-[#6E2023]" />
              <span>Client Financial Portal</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-[#6E2023] font-medium tracking-tight">
              Billing, Retainers &amp; Invoices
            </h1>
            <p className="text-xs sm:text-sm text-[#84766A] font-light max-w-2xl leading-relaxed">
              Review active hospitality membership tiers, download audit-ready PDF invoices, update authorized payment methods, and manage corporate concierge gifting seats.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Billing Dashboard View */}
      <Container size="lg">
        <BillingDashboardView />
      </Container>
    </main>
  );
}
