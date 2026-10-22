import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { BulkOrdersView } from "./BulkOrdersView";

export const metadata: Metadata = {
  title: "Corporate & Bulk Gifting — Tailored Tableware Proposals | VITRAG",
  description:
    "Request tailored proposals for corporate gifting, wedding trousseau favours, and executive tableware hampers. Pan-India multi-destination dispatch available.",
};

export default function BulkOrdersPage() {
  return (
    <main className="bg-[#FFF5E6] min-h-screen">
      <Container size="lg">
        <Breadcrumbs items={[{ label: "Corporate & Bulk Gifting" }]} />
        <BulkOrdersView />
      </Container>
    </main>
  );
}
