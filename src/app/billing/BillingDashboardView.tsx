"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CreditCard,
  Download,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Users,
  Package,
  Calendar,
  X,
  Building,
  Check,
  FileText,
  Lock,
} from "lucide-react";
import { downloadInvoicePdf, InvoiceData } from "@/lib/pdfInvoice";

// Initial available subscription plans
const AVAILABLE_PLANS = [
  {
    id: "atelier-silver",
    name: "Atelier Silver (Starter Dining)",
    price: "₹7,499",
    period: "/ quarter",
    features: [
      "10% VIP Patron discount across all dinnerware",
      "Semi-annual curated gifting caskets",
      "Transit breakage insurance with unboxing video guarantee",
      "2 Authorized concierge seats",
    ],
  },
  {
    id: "atelier-gold",
    name: "Atelier Gold (Host & Corporate Retainer)",
    price: "₹14,999",
    period: "/ quarter",
    recommended: true,
    features: [
      "15% VIP Patron discount across all porcelain & crystal",
      "Quarterly curated festive luxury gift caskets",
      "Zero-transit breakage insurance with express 48hr replacement",
      "Unlimited private viewings at Sowcarpet showroom",
      "5 Authorized concierge seats & 25 quarterly dispatch quota",
    ],
  },
  {
    id: "heritage-patron",
    name: "Heritage Bespoke Patron (Estate Hospitality)",
    price: "₹34,999",
    period: "/ quarter",
    features: [
      "25% VIP Patron pricing & custom family monograms",
      "Bespoke wedding trousseau table styling & gifting",
      "White-glove delivery in Chennai & priority PAN-India dispatch",
      "Unlimited concierge seats & customized brass gift caskets",
    ],
  },
];

export function BillingDashboardView() {
  // 1. Current Plan State
  const [currentPlanId, setCurrentPlanId] = useState("atelier-gold");
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const currentPlan =
    AVAILABLE_PLANS.find((p) => p.id === currentPlanId) || AVAILABLE_PLANS[1];

  // 2. Promo Code State
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoMessage, setPromoMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // 3. Payment Methods State
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: "pm-1",
      type: "card",
      brand: "HDFC Business Corporate Visa",
      last4: "4242",
      expiry: "08/28",
      isDefault: true,
    },
    {
      id: "pm-2",
      type: "upi",
      brand: "Showroom Verified UPI AutoPay",
      last4: "9840610405@pthdfc",
      expiry: "Active",
      isDefault: false,
    },
    {
      id: "pm-3",
      type: "netbanking",
      brand: "ICICI Corporate NetBanking",
      last4: "A/C •••• 8819",
      expiry: "Active",
      isDefault: false,
    },
  ]);

  const [paymentAlert, setPaymentAlert] = useState<string | null>(null);
  const [isAddPaymentModalOpen, setIsAddPaymentModalOpen] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState<"card" | "upi">("card");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardExpiry, setNewCardExpiry] = useState("");
  const [newUpiId, setNewUpiId] = useState("");

  // 4. Invoices State
  const [invoices] = useState<InvoiceData[]>([
    {
      invoiceNumber: "VTR-INV-2026-104",
      date: "15 Oct 2026",
      description: "Atelier Host Retainer — Q4 Festive Gifting Tier",
      amount: "14,999.00",
      paymentMethod: "HDFC Card ending in •••• 4242",
      status: "Paid",
      customerName: "Corporate Patron",
      customerCompany: "Fine Living Client",
      gstin: "33AAAPV1234F1Z8",
    },
    {
      invoiceNumber: "VTR-INV-2026-088",
      date: "15 Jul 2026",
      description: "Atelier Host Retainer — Q3 Monsoon Dining Edition",
      amount: "14,999.00",
      paymentMethod: "HDFC Card ending in •••• 4242",
      status: "Paid",
      customerName: "Corporate Patron",
      customerCompany: "Fine Living Client",
      gstin: "33AAAPV1234F1Z8",
    },
    {
      invoiceNumber: "VTR-INV-2026-042",
      date: "15 Apr 2026",
      description: "Atelier Host Retainer — Q2 Summer Hosting Collection",
      amount: "14,999.00",
      paymentMethod: "UPI 9840610405@pthdfc",
      status: "Paid",
      customerName: "Corporate Patron",
      customerCompany: "Fine Living Client",
      gstin: "33AAAPV1234F1Z8",
    },
    {
      invoiceNumber: "VTR-INV-2026-011",
      date: "15 Jan 2026",
      description: "Atelier Retainer Initiation & Welcome Casket",
      amount: "14,999.00",
      paymentMethod: "HDFC Card ending in •••• 4242",
      status: "Paid",
      customerName: "Corporate Patron",
      customerCompany: "Fine Living Client",
      gstin: "33AAAPV1234F1Z8",
    },
  ]);

  // Handler: Apply Promo Code
  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();

    if (!cleanCode) {
      setPromoMessage({ text: "Please enter a valid promotional code.", type: "error" });
      return;
    }

    if (cleanCode === "VITRAGVIP" || cleanCode === "DIWALI2026" || cleanCode === "SOWCARPET10") {
      setAppliedPromo(cleanCode);
      setPromoMessage({
        text: `Promo code "${cleanCode}" applied! 15% discount will be reflected on your next billing date.`,
        type: "success",
      });
      setPromoInput("");
    } else {
      setPromoMessage({
        text: "Invalid promo code. Please verify your code with your Sowcarpet concierge.",
        type: "error",
      });
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoMessage(null);
  };

  // Handler: Set Default Payment Method
  const handleSetDefaultPayment = (id: string) => {
    setPaymentMethods((prev) =>
      prev.map((pm) => ({
        ...pm,
        isDefault: pm.id === id,
      }))
    );
    setPaymentAlert(null);
  };

  // Handler: Remove Payment Method (With Protection Rule)
  const handleRemovePaymentMethod = (id: string) => {
    const targetMethod = paymentMethods.find((pm) => pm.id === id);

    // Rule: Prevent removing default method or last remaining method on an active plan
    if (targetMethod?.isDefault || paymentMethods.length <= 1) {
      setPaymentAlert(
        "Cannot remove payment method: An active subscription service requires at least one default payment method on file to prevent service disruption. Please designate or add another default method before removing this one."
      );
      return;
    }

    setPaymentMethods((prev) => prev.filter((pm) => pm.id !== id));
    setPaymentAlert(null);
  };

  // Handler: Add New Payment Method
  const handleAddPaymentMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPaymentType === "card" && newCardNumber.trim().length >= 4) {
      const last4 = newCardNumber.trim().slice(-4);
      setPaymentMethods((prev) => [
        ...prev,
        {
          id: `pm-${Date.now()}`,
          type: "card",
          brand: "Visa Debit/Credit Card",
          last4: last4,
          expiry: newCardExpiry || "12/29",
          isDefault: false,
        },
      ]);
    } else if (newPaymentType === "upi" && newUpiId.trim()) {
      setPaymentMethods((prev) => [
        ...prev,
        {
          id: `pm-${Date.now()}`,
          type: "upi",
          brand: "UPI AutoPay Account",
          last4: newUpiId.trim(),
          expiry: "Active",
          isDefault: false,
        },
      ]);
    }
    setIsAddPaymentModalOpen(false);
    setNewCardNumber("");
    setNewCardExpiry("");
    setNewUpiId("");
    setPaymentAlert(null);
  };

  return (
    <div className="space-y-10 pb-16">
      {/* ========================================================
          1. PLAN DETAILS SECTION
         ======================================================== */}
      <section className="bg-white border border-[#EADBC8] rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-[#EADBC8]/70">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-[#6E2023] text-white">
                <Sparkles className="w-3 h-3 text-[#CBAE9B]" />
                Active Membership Plan
              </span>
              <span className="text-xs text-[#84766A]">Renews Quarterly</span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-medium">
              {currentPlan.name}
            </h2>
            <p className="text-xs sm:text-sm text-[#84766A] font-light max-w-xl">
              Tailored for hospitality hosts and corporate partners in Chennai and pan-India with curated dinnerware rotations and bespoke gift dispatching.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4">
            <div className="text-left lg:text-right">
              <div className="flex items-baseline gap-1 lg:justify-end">
                <span className="font-heading text-3xl sm:text-4xl text-[#6E2023] font-semibold">
                  {currentPlan.price}
                </span>
                <span className="text-xs text-[#84766A] font-light">
                  {currentPlan.period}
                </span>
              </div>
              <p className="text-[11px] text-[#84766A] mt-1">
                Next Billing Date: <strong className="text-[#252522]">November 15, 2026</strong>
              </p>
              <p className="text-[10px] text-[#84766A]">
                Billed to: HDFC Corporate Card ending in •••• 4242
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsPlanModalOpen(true)}
              className="inline-flex items-center gap-2 bg-[#6E2023] hover:bg-[#55181A] text-white text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <span>Change or Upgrade Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Features included in current plan */}
        <div className="pt-6">
          <h4 className="text-xs uppercase tracking-wider font-semibold text-[#84766A] mb-3">
            Plan Features Included:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs text-[#252522]">
            {currentPlan.features.map((feature, idx) => (
              <div key={idx} className="flex items-start gap-2 bg-[#FFF5E6] p-3 rounded-xl border border-[#EADBC8]/70">
                <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span className="font-light">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          2. ADDITIONAL DETAILS (Seats, Roles, Usage, Metrics)
         ======================================================== */}
      <section className="bg-white border border-[#EADBC8] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="mb-6">
          <span className="text-[11px] uppercase tracking-[0.2em] text-[#6E2023] font-semibold block mb-1">
            Account Governance
          </span>
          <h3 className="font-heading text-xl sm:text-2xl text-[#252522] font-medium">
            Additional Details &amp; Plan Decision Metrics
          </h3>
          <p className="text-xs text-[#84766A] mt-1 font-light">
            Real-time parameters that influence subscription tier sizing and billing quotas.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Metric 1: Seats & Roles */}
          <div className="bg-[#FAF3E7] p-5 rounded-2xl border border-[#EADBC8]/80 space-y-2">
            <div className="flex items-center justify-between text-[#6E2023]">
              <Users className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-wider bg-white px-2 py-0.5 rounded border border-[#EADBC8]">
                Role: Super Admin
              </span>
            </div>
            <div>
              <p className="text-xs text-[#84766A] font-medium">Concierge Seats</p>
              <h4 className="font-heading text-xl text-[#252522] font-semibold mt-0.5">
                3 of 5 In Use
              </h4>
            </div>
            <p className="text-[11px] text-[#84766A] font-light">
              Authorized managers permitted to trigger corporate hamper orders.
            </p>
          </div>

          {/* Metric 2: Hamper Quota */}
          <div className="bg-[#FAF3E7] p-5 rounded-2xl border border-[#EADBC8]/80 space-y-2">
            <div className="flex items-center justify-between text-[#6E2023]">
              <Package className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                72% Utilized
              </span>
            </div>
            <div>
              <p className="text-xs text-[#84766A] font-medium">Seasonal Gift Quota</p>
              <h4 className="font-heading text-xl text-[#252522] font-semibold mt-0.5">
                18 of 25 Dispatched
              </h4>
            </div>
            <div className="w-full bg-[#EADBC8] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#6E2023] h-full w-[72%] rounded-full" />
            </div>
            <p className="text-[11px] text-[#84766A] font-light">
              7 luxury caskets remaining before November 15 renewal.
            </p>
          </div>

          {/* Metric 3: Showroom Allowance */}
          <div className="bg-[#FAF3E7] p-5 rounded-2xl border border-[#EADBC8]/80 space-y-2">
            <div className="flex items-center justify-between text-[#6E2023]">
              <Building className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-wider bg-white px-2 py-0.5 rounded border border-[#EADBC8]">
                Sowcarpet Flagship
              </span>
            </div>
            <div>
              <p className="text-xs text-[#84766A] font-medium">Showroom Access</p>
              <h4 className="font-heading text-xl text-[#252522] font-semibold mt-0.5">
                Unlimited Private
              </h4>
            </div>
            <p className="text-[11px] text-[#84766A] font-light">
              Private table setting appointments at Patni Plaza, Sowcarpet.
            </p>
          </div>

          {/* Metric 4: GSTIN & Billing Entity */}
          <div className="bg-[#FAF3E7] p-5 rounded-2xl border border-[#EADBC8]/80 space-y-2">
            <div className="flex items-center justify-between text-[#6E2023]">
              <FileText className="w-5 h-5" />
              <span className="text-[10px] uppercase font-bold tracking-wider bg-white px-2 py-0.5 rounded border border-[#EADBC8]">
                Tamil Nadu Tax
              </span>
            </div>
            <div>
              <p className="text-xs text-[#84766A] font-medium">Tax Invoicing Entity</p>
              <h4 className="font-mono text-sm text-[#252522] font-bold mt-0.5 truncate">
                33AAAPV1234F1Z8
              </h4>
            </div>
            <p className="text-[11px] text-[#84766A] font-light">
              B2B GST input credit applied automatically to all downloadable PDF receipts.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. PROMO OR DISCOUNT CODE SECTION
         ======================================================== */}
      <section className="bg-white border border-[#EADBC8] rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-1">
            <Tag className="w-4 h-4 text-[#6E2023]" />
            <h3 className="font-heading text-xl text-[#252522] font-medium">
              Promo or Corporate Discount Code
            </h3>
          </div>
          <p className="text-xs text-[#84766A] font-light mb-4">
            Have a festive partner code or corporate coupon? Apply it here to activate rate reductions on your next subscription cycle.
          </p>

          <form onSubmit={handleApplyPromo} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              placeholder="e.g. VITRAGVIP, DIWALI2026, SOWCARPET10"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              className="flex-1 text-xs uppercase tracking-wider p-3.5 bg-[#FFF5E6] border border-[#EADBC8] rounded-xl focus:outline-none focus:border-[#6E2023] font-medium text-[#252522]"
            />
            <button
              type="submit"
              className="bg-[#6E2023] hover:bg-[#55181A] text-white text-xs uppercase tracking-widest font-semibold px-6 py-3.5 rounded-xl transition-all shadow-sm"
            >
              Apply Code
            </button>
          </form>

          {/* Feedback messages */}
          {promoMessage && (
            <div
              className={`mt-3 p-3 rounded-xl text-xs flex items-center justify-between ${
                promoMessage.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                  : "bg-rose-50 text-rose-800 border border-rose-200"
              }`}
            >
              <span>{promoMessage.text}</span>
              {promoMessage.type === "success" && (
                <button
                  type="button"
                  onClick={handleRemovePromo}
                  className="underline text-[11px] font-semibold hover:text-emerald-950 ml-3"
                >
                  Remove
                </button>
              )}
            </div>
          )}

          {appliedPromo && !promoMessage && (
            <div className="mt-3 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs flex items-center justify-between">
              <span>
                Active Code: <strong>{appliedPromo}</strong> (15% Retainer Discount Active)
              </span>
              <button
                type="button"
                onClick={handleRemovePromo}
                className="underline text-[11px] font-semibold"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================
          4. PAYMENT METHODS (With Active Plan Protection Rule)
         ======================================================== */}
      <section className="bg-white border border-[#EADBC8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CreditCard className="w-5 h-5 text-[#6E2023]" />
              <h3 className="font-heading text-xl sm:text-2xl text-[#252522] font-medium">
                Payment Methods on File
              </h3>
            </div>
            <p className="text-xs text-[#84766A] font-light">
              Manage corporate cards, UPI AutoPay, and netbanking accounts used for membership charges.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsAddPaymentModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#FFF5E6] hover:bg-[#FAF3E7] text-[#6E2023] border border-[#EADBC8] text-xs uppercase tracking-wider font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Add Payment Method</span>
          </button>
        </div>

        {/* Protection Rule Warning Alert */}
        {paymentAlert && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs flex items-start gap-3 animate-fade-in">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="block font-semibold">Payment Protection Active:</strong>
              <p className="font-light">{paymentAlert}</p>
            </div>
            <button
              onClick={() => setPaymentAlert(null)}
              className="p-1 text-amber-700 hover:text-amber-900 ml-auto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Payment Methods List */}
        <div className="space-y-3">
          {paymentMethods.map((pm) => (
            <div
              key={pm.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                pm.isDefault
                  ? "bg-[#FAF3E7] border-[#6E2023]/40 shadow-xs"
                  : "bg-white border-[#EADBC8] hover:border-[#6E2023]/30"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#EADBC8] flex items-center justify-center text-[#6E2023] shrink-0 shadow-2xs">
                  {pm.type === "card" && <CreditCard className="w-5 h-5" />}
                  {pm.type === "upi" && <span className="font-bold text-[10px]">UPI</span>}
                  {pm.type === "netbanking" && <Building className="w-5 h-5" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-[#252522]">
                      {pm.brand}
                    </span>
                    {pm.isDefault && (
                      <span className="text-[10px] uppercase font-bold tracking-wider bg-[#6E2023] text-white px-2 py-0.5 rounded-full">
                        Primary / Default
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#84766A] mt-0.5 font-mono">
                    {pm.type === "card" ? `•••• •••• •••• ${pm.last4}` : pm.last4}
                    {pm.expiry !== "Active" && ` • Exp: ${pm.expiry}`}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                {!pm.isDefault && (
                  <button
                    type="button"
                    onClick={() => handleSetDefaultPayment(pm.id)}
                    className="text-xs text-[#6E2023] hover:underline font-semibold px-2 py-1"
                  >
                    Set as Default
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleRemovePaymentMethod(pm.id)}
                  title={pm.isDefault ? "Cannot remove default payment method" : "Remove method"}
                  className={`p-2 rounded-lg transition-colors ${
                    pm.isDefault
                      ? "text-[#84766A]/40 cursor-not-allowed"
                      : "text-rose-600 hover:bg-rose-50"
                  }`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================
          5. BILLING HISTORY & DOWNLOADABLE PDF INVOICES
         ======================================================== */}
      <section className="bg-white border border-[#EADBC8] rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FileText className="w-5 h-5 text-[#6E2023]" />
            <h3 className="font-heading text-xl sm:text-2xl text-[#252522] font-medium">
              Billing History &amp; Downloadable Invoices
            </h3>
          </div>
          <p className="text-xs text-[#84766A] font-light">
            Download standard PDF invoices formatted for corporate accounting, audits, and GST tax credit reporting.
          </p>
        </div>

        <div className="overflow-x-auto border border-[#EADBC8] rounded-2xl">
          <table className="w-full min-w-[560px] text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#FAF3E7] border-b border-[#EADBC8] text-[#84766A] text-[11px] uppercase tracking-wider font-semibold">
                <th className="py-3.5 px-4 sm:px-6">Invoice #</th>
                <th className="py-3.5 px-4 sm:px-6">Date</th>
                <th className="py-3.5 px-4 sm:px-6">Description</th>
                <th className="py-3.5 px-4 sm:px-6">Amount</th>
                <th className="py-3.5 px-4 sm:px-6">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EADBC8] text-[#252522]">
              {invoices.map((inv) => (
                <tr key={inv.invoiceNumber} className="hover:bg-[#FFF5E6]/40 transition-colors">
                  <td className="py-4 px-4 sm:px-6 font-mono font-medium text-[#6E2023]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-[#84766A]">
                    {inv.date}
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-light">
                    {inv.description}
                  </td>
                  <td className="py-4 px-4 sm:px-6 font-semibold">
                    ₹{inv.amount}
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800">
                      <Check className="w-3 h-3" />
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right">
                    <button
                      type="button"
                      onClick={() => downloadInvoicePdf(inv)}
                      className="inline-flex items-center gap-1.5 text-xs text-[#6E2023] hover:text-[#55181A] font-semibold bg-[#FFF5E6] hover:bg-[#FAF3E7] border border-[#EADBC8] px-3 py-1.5 rounded-lg transition-colors shadow-2xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ========================================================
          MODAL: CHANGE OR UPGRADE PLAN
         ======================================================== */}
      {isPlanModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#EADBC8] max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#EADBC8]">
              <div>
                <h3 className="font-heading text-2xl text-[#6E2023] font-medium">
                  Select Subscription Plan
                </h3>
                <p className="text-xs text-[#84766A] font-light mt-0.5">
                  Upgrade or modify your Vitrag Atelier Tableware &amp; Gifting Retainer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(false)}
                className="p-1 text-[#84766A] hover:text-[#252522]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {AVAILABLE_PLANS.map((plan) => (
                <label
                  key={plan.id}
                  className={`block p-5 rounded-2xl border cursor-pointer transition-all ${
                    currentPlanId === plan.id
                      ? "border-[#6E2023] bg-[#FAF3E7] shadow-sm"
                      : "border-[#EADBC8] bg-white hover:border-[#6E2023]/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="plan"
                        checked={currentPlanId === plan.id}
                        onChange={() => setCurrentPlanId(plan.id)}
                        className="accent-[#6E2023] mt-1"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-lg text-[#252522] font-semibold">
                            {plan.name}
                          </h4>
                          {plan.recommended && (
                            <span className="text-[9px] uppercase font-bold tracking-wider bg-[#6E2023] text-white px-2 py-0.5 rounded-full">
                              Popular
                            </span>
                          )}
                        </div>
                        <ul className="space-y-1 text-xs text-[#84766A] mt-2 font-light">
                          {plan.features.map((f, i) => (
                            <li key={i} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-heading text-xl text-[#6E2023] font-bold">
                        {plan.price}
                      </span>
                      <span className="text-[11px] text-[#84766A] block">
                        {plan.period}
                      </span>
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EADBC8] flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(false)}
                className="px-5 py-2.5 text-xs uppercase tracking-wider font-semibold text-[#84766A] hover:text-[#252522]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(false)}
                className="bg-[#6E2023] hover:bg-[#55181A] text-white text-xs uppercase tracking-widest font-semibold px-6 py-2.5 rounded-xl shadow-md"
              >
                Confirm Plan Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD PAYMENT METHOD
         ======================================================== */}
      {isAddPaymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl border border-[#EADBC8] max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-[#EADBC8]">
              <h3 className="font-heading text-xl text-[#6E2023] font-medium">
                Add Payment Method
              </h3>
              <button
                type="button"
                onClick={() => setIsAddPaymentModalOpen(false)}
                className="p-1 text-[#84766A] hover:text-[#252522]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex gap-2 p-1 bg-[#FFF5E6] rounded-xl border border-[#EADBC8]">
              <button
                type="button"
                onClick={() => setNewPaymentType("card")}
                className={`flex-1 text-xs py-2 rounded-lg font-semibold uppercase tracking-wider transition-all ${
                  newPaymentType === "card"
                    ? "bg-[#6E2023] text-white shadow-xs"
                    : "text-[#84766A] hover:text-[#252522]"
                }`}
              >
                Credit / Debit Card
              </button>
              <button
                type="button"
                onClick={() => setNewPaymentType("upi")}
                className={`flex-1 text-xs py-2 rounded-lg font-semibold uppercase tracking-wider transition-all ${
                  newPaymentType === "upi"
                    ? "bg-[#6E2023] text-white shadow-xs"
                    : "text-[#84766A] hover:text-[#252522]"
                }`}
              >
                UPI AutoPay
              </button>
            </div>

            <form onSubmit={handleAddPaymentMethod} className="space-y-4">
              {newPaymentType === "card" ? (
                <>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#84766A] font-semibold mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="4111 2222 3333 4444"
                      value={newCardNumber}
                      onChange={(e) => setNewCardNumber(e.target.value)}
                      className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-xl focus:outline-none focus:border-[#6E2023]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#84766A] font-semibold mb-1">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="08/29"
                      value={newCardExpiry}
                      onChange={(e) => setNewCardExpiry(e.target.value)}
                      className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-xl focus:outline-none focus:border-[#6E2023]"
                    />
                  </div>
                </>
              ) : (
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#84766A] font-semibold mb-1">
                    Virtual Payment Address (VPA / UPI ID)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="yourname@okhdfcbank"
                    value={newUpiId}
                    onChange={(e) => setNewUpiId(e.target.value)}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-xl focus:outline-none focus:border-[#6E2023]"
                  />
                  <p className="text-[10px] text-[#84766A] mt-1">
                    UPI AutoPay mandate authorization will be sent to your UPI app.
                  </p>
                </div>
              )}

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddPaymentModalOpen(false)}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-semibold text-[#84766A]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#6E2023] hover:bg-[#55181A] text-white text-xs uppercase tracking-widest font-semibold px-5 py-2.5 rounded-xl shadow-md"
                >
                  Save Method
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
