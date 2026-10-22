import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactView } from "./ContactView";

export const metadata: Metadata = {
  title: "Contact & Showroom Studio — Chennai | VITRAG",
  description:
    "Visit our tableware design studio and showroom in T. Nagar, Chennai. Schedule styling appointments or consult on wedding trousseau registries.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#F7F4EE] min-h-screen">
      <Container size="lg">
        <Breadcrumbs items={[{ label: "Showroom & Contact" }]} />
        <ContactView />
      </Container>
    </main>
  );
}
