"use client";

import React, { useState } from "react";
import { generateWhatsAppBulkEnquiryUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import type { BulkEnquiry } from "@/lib/types";
import {
  MessageSquare,
  Gift,
  Building2,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Truck,
  Layers,
  ArrowRight,
  Phone,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { saveAdminBulkInquiry } from "@/lib/adminStorage";
import type { AdminBulkInquiry } from "@/lib/adminTypes";

export function BulkOrdersView() {
  const [formData, setFormData] = useState<BulkEnquiry>({
    name: "",
    company: "",
    phone: "",
    email: "",
    productInterest: "Curated Gift Sets",
    quantity: "25 – 50 units",
    budgetPerGift: "₹1,500 – ₹2,500 per gift",
    deliveryDate: "",
    pinCode: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setErrorMsg("Please enter a valid telephone or WhatsApp contact number.");
      return;
    }
    setErrorMsg("");

    try {
      const bulkId = `VIT-BULK-${Math.floor(200 + Math.random() * 800)}`;
      const newBulkInquiry: AdminBulkInquiry = {
        id: bulkId,
        createdAt: new Date().toISOString(),
        name: formData.name,
        company: formData.company || undefined,
        phone: formData.phone,
        email: formData.email || undefined,
        productInterest: formData.productInterest,
        quantity: formData.quantity,
        budgetPerGift: formData.budgetPerGift,
        deliveryDate: formData.deliveryDate || undefined,
        pinCode: formData.pinCode,
        notes: formData.notes || undefined,
        status: "new",
      };
      saveAdminBulkInquiry(newBulkInquiry);
    } catch (saveErr) {
      console.warn("Could not save bulk inquiry to admin storage:", saveErr);
    }

    // Generate WhatsApp direct link
    const url = generateWhatsAppBulkEnquiryUrl(formData);
    window.open(url, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="py-12 sm:py-20">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
        <span className="text-xs uppercase tracking-[0.25em] text-[#6E2023] font-bold">
          Corporate & Bulk Gifting Services
        </span>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-[#6E2023] font-medium">
          Thoughtful Gifting. Made for Business.
        </h1>
        <p className="text-base text-[#84766A] font-light max-w-xl mx-auto leading-relaxed">
          From Diwali executive hampers to wedding trousseau favors and milestone client appreciation, we craft bespoke tableware gifts that leave an enduring impression.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-6xl mx-auto">
        {/* Form Column */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 border border-[#EADBC8] rounded-2xl shadow-sm">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#CBAE9B]/30 border border-[#CBAE9B] flex items-center justify-center mx-auto text-[#6E2023]">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="font-heading text-3xl text-[#6E2023] font-medium">
                Enquiry Dispatched!
              </h2>
              <p className="text-xs sm:text-sm text-[#84766A] max-w-md mx-auto leading-relaxed font-light">
                Thank you, {formData.name}. Your bulk gifting enquiry has been sent to our corporate desk on WhatsApp (6369142027). Our concierge team will review your quantities and budget to prepare a tailored PDF proposal within 24 business hours.
              </p>
              <div className="pt-4">
                <Button
                  onClick={() => setSubmitted(false)}
                  variant="outline"
                  size="sm"
                >
                  Submit Another Enquiry
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-b border-[#EADBC8] pb-4">
                <h2 className="font-heading text-2xl text-[#6E2023] font-medium">
                  Request a Tailored Bulk Proposal
                </h2>
                <p className="text-xs text-[#84766A] mt-1 font-light">
                  Fill in your requirements below to instantly connect with our Chennai gifting concierge on WhatsApp.
                </p>
              </div>

              {errorMsg && (
                <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg animate-in fade-in">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Ramesh Krishnan"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g. Zoho Corp / Personal Event"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98400 54321"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="ramesh@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Product Interest *
                  </label>
                  <select
                    name="productInterest"
                    value={formData.productInterest}
                    onChange={handleChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  >
                    <option value="Curated Gift Sets">Curated Tableware Gift Sets</option>
                    <option value="Dry-Fruit Boxes">Handcrafted Dry-Fruit Boxes</option>
                    <option value="Dinner Sets">Porcelain & Ceramic Dinner Sets</option>
                    <option value="Platters & Serving">Platters & Serving Sets</option>
                    <option value="Mugs & Cups">Executive Coffee Mug Sets</option>
                    <option value="Custom Hamper">Custom Combination Hamper</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Estimated Quantity *
                  </label>
                  <select
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  >
                    <option value="10 – 25 units">10 – 25 units</option>
                    <option value="25 – 50 units">25 – 50 units</option>
                    <option value="50 – 100 units">50 – 100 units</option>
                    <option value="100 – 250 units">100 – 250 units</option>
                    <option value="250+ units">250+ units</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Budget per Gift *
                  </label>
                  <select
                    name="budgetPerGift"
                    value={formData.budgetPerGift}
                    onChange={handleChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  >
                    <option value="Under ₹1,000">Under ₹1,000</option>
                    <option value="₹1,000 – ₹2,000">₹1,000 – ₹2,000</option>
                    <option value="₹2,000 – ₹3,500">₹2,000 – ₹3,500</option>
                    <option value="₹3,500 – ₹5,000">₹3,500 – ₹5,000</option>
                    <option value="₹5,000+ Luxury">₹5,000+ Luxury / Heirloom</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                    Target Delivery PIN *
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    required
                    placeholder="e.g. 600017"
                    value={formData.pinCode}
                    onChange={handleChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                  Required By Date (Optional)
                </label>
                <input
                  type="date"
                  name="deliveryDate"
                  value={formData.deliveryDate}
                  onChange={handleChange}
                  className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1">
                  Additional Notes & Customization Requests
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Specify custom box branding, personalized message cards, or specific event themes..."
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
                />
              </div>

              <Button
                type="submit"
                variant="burgundy"
                size="lg"
                className="w-full py-4 text-xs tracking-widest shadow-md"
                rightIcon={<MessageSquare className="w-4 h-4 fill-white" />}
              >
                Send Request via WhatsApp Concierge (6369142027)
              </Button>
            </form>
          )}
        </div>

        {/* Benefits Column (Champagne Base with Burgundy Typography) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#CBAE9B] p-8 rounded-2xl border border-[#bfa08c] shadow-md space-y-6">
            <h3 className="font-heading text-2xl text-[#6E2023] font-medium">
              The VITRAG Corporate Advantage
            </h3>
            
            <div className="space-y-5 text-xs text-[#6E2023]">
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] mb-0.5 font-serif font-bold">
                    Custom Monogramming & Packaging
                  </strong>
                  Foil-stamped corporate logos on luxury burgundy rigid boxes, champagne satin ribbons, and personalized executive greetings.
                </div>
              </div>

              <div className="flex gap-3">
                <Truck className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] mb-0.5 font-serif font-bold">
                    Multi-Address Pan-India Shipping
                  </strong>
                  Provide an Excel sheet of client addresses across India; we pack, insure, and dispatch directly to individual doorsteps.
                </div>
              </div>

              <div className="flex gap-3">
                <Layers className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] mb-0.5 font-serif font-bold">
                    Volume Tier Pricing & GST Invoicing
                  </strong>
                  Transparent tier discounts for bulk orders. Full GST tax invoices provided for company tax input credit.
                </div>
              </div>

              <div className="flex gap-3">
                <Building2 className="w-5 h-5 text-[#6E2023] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-sm text-[#6E2023] mb-0.5 font-serif font-bold">
                    Showroom Sampling in Chennai
                  </strong>
                  Visit our studio in T. Nagar, Chennai to inspect physical samples, weight, and glazes prior to confirming large runs.
                </div>
              </div>
            </div>

            {/* Clickable Corporate Concierge Contact */}
            <div className="pt-4 border-t border-[#bfa08c] space-y-2 text-xs text-[#6E2023]">
              <p className="font-semibold uppercase tracking-wider text-[11px]">
                Immediate Corporate Desk Inquiries:
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/[^0-9+]/g, "")}`}
                  className="inline-flex items-center gap-1.5 font-bold hover:underline"
                  title="Call Corporate Desk"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {siteConfig.contact.displayPhone}</span>
                </a>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex items-center gap-1.5 font-bold hover:underline"
                  title="Email Corporate Desk"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>{siteConfig.contact.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
