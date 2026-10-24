"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import {
  MessageSquare,
  ShieldCheck,
  Truck,
  CreditCard,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { saveAdminOrder, saveAdminAbandonedCart, markCartRecovered } from "@/lib/adminStorage";
import type { AdminOrder } from "@/lib/adminTypes";

export function CheckoutView() {
  const { items, subtotalPaise, clearCart } = useCart();

  // Unique session identifier for cart tracking
  const [cartSessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let existing = sessionStorage.getItem("vitrag_active_cart_id");
      if (!existing) {
        existing = `CART-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`.toUpperCase();
        sessionStorage.setItem("vitrag_active_cart_id", existing);
      }
      return existing;
    }
    return `CART-${Date.now()}`;
  });

  // Customer Delivery Information Form
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "",
    giftNote: "",
  });

  const [paymentMode, setPaymentMode] = useState<"whatsapp" | "online">("whatsapp");
  const [orderSent, setOrderSent] = useState(false);
  const [lastWhatsAppUrl, setLastWhatsAppUrl] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState("");

  // Track Leftout / Abandoned Carts in real time (debounced)
  useEffect(() => {
    if (items.length === 0 || orderSent) return;
    if (formData.phone.trim().length >= 4 || formData.fullName.trim().length >= 2) {
      const timer = setTimeout(() => {
        saveAdminAbandonedCart({
          id: cartSessionId,
          customerName: formData.fullName.trim() || undefined,
          customerPhone: formData.phone.trim() || undefined,
          customerEmail: formData.email.trim() || undefined,
          items: items.map((i) => ({
            productId: i.productId,
            name: i.name,
            variantName: i.variantName,
            quantity: i.quantity,
            pricePaise: i.price,
            image: i.image,
          })),
          totalEstimatedPaise: subtotalPaise,
          lastActive: new Date().toISOString(),
          recovered: false,
        });
      }, 1200);

      return () => clearTimeout(timer);
    }
  }, [formData.fullName, formData.phone, formData.email, items, subtotalPaise, orderSent, cartSessionId]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (checkoutError) setCheckoutError("");
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setCheckoutError("Please enter your full delivery name.");
      return;
    }
    if (!formData.phone.trim() || formData.phone.trim().length < 8) {
      setCheckoutError("Please enter a valid phone or WhatsApp number.");
      return;
    }
    if (!formData.address.trim()) {
      setCheckoutError("Please enter your street delivery address.");
      return;
    }
    if (!formData.pinCode.trim()) {
      setCheckoutError("Please enter your 6-digit postal PIN code.");
      return;
    }

    setCheckoutError("");
    const number = siteConfig.contact.whatsappNumber;
    let message = `*NEW ORDER REQUEST — VITRAG Tableware & Gifting*\n\n`;
    message += `*Customer Details:*\n`;
    message += `• Name: ${formData.fullName}\n`;
    message += `• Phone: ${formData.phone}\n`;
    if (formData.email) message += `• Email: ${formData.email}\n`;
    message += `• Delivery Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pinCode}\n`;
    if (formData.giftNote) message += `• Gift/Order Note: ${formData.giftNote}\n`;
    if (promoApplied) message += `• Applied Promo Code: ${promoApplied} (Discount Applied)\n`;

    message += `\n*Ordered Items (${items.reduce((a, b) => a + b.quantity, 0)} pieces):*\n`;
    items.forEach((item, index) => {
      const variantStr = item.variantName ? ` (${item.variantName})` : "";
      message += `${index + 1}. *${item.name}*${variantStr} — Qty: ${item.quantity}\n`;
    });

    message += `\n*Delivery Location:* ${formData.city}, ${formData.state} (PIN: ${formData.pinCode})\n`;
    message += `*Payment Destination:* UPI to 9840610405@pthdfc\n\n`;
    message += `_(Please confirm stock availability, order total, and delivery courier charges. Unboxing video policy noted.)_\n`;

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    setLastWhatsAppUrl(url);
    setOrderSent(true);

    try {
      const orderId = `VIT-ORD-${Math.floor(1000 + Math.random() * 9000)}`;
      const newAdminOrder: AdminOrder = {
        id: orderId,
        createdAt: new Date().toISOString(),
        customerName: formData.fullName,
        customerPhone: formData.phone,
        customerEmail: formData.email || undefined,
        shippingAddress: formData.address,
        city: formData.city,
        state: formData.state,
        pinCode: formData.pinCode,
        giftNote: formData.giftNote || undefined,
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          variantName: i.variantName,
          quantity: i.quantity,
          pricePaise: i.price,
          image: i.image,
        })),
        status: "new",
        totalEstimatedPaise: subtotalPaise,
        paymentMode: "whatsapp",
        source: "Website Checkout",
      };
      saveAdminOrder(newAdminOrder);
      markCartRecovered(cartSessionId);
    } catch (saveErr) {
      console.warn("Could not save to admin order history:", saveErr);
    }

    try {
      window.open(url, "_blank");
    } catch {
      // In case window.open is blocked by browser, user can click the button on screen
    }
  };

  // Order Confirmed / Dispatched State
  if (orderSent) {
    return (
      <div className="py-12 sm:py-20 max-w-2xl mx-auto">
        <div className="bg-white border border-[#EADBC8] p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#CBAE9B]/50 border border-[#D9D0C1] flex items-center justify-center mx-auto text-[#25D366]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#6E2023] font-semibold">
              Order Dispatched to WhatsApp
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl text-[#252522] mt-2">
              Thank You, {formData.fullName}!
            </h1>
            <p className="text-xs sm:text-sm text-[#8B8176] mt-2 max-w-md mx-auto leading-relaxed">
              Your order breakdown has been prepared for WhatsApp number <strong>{siteConfig.contact.displayPhone}</strong>.
            </p>
          </div>

          {/* Action button in case popup was blocked */}
          <div className="bg-[#FFF5E6] p-5 border border-[#EADBC8] space-y-3">
            <p className="text-xs text-[#252522] font-medium">
              Did WhatsApp not open automatically?
            </p>
            <a
              href={lastWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm w-full sm:w-auto"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Click to Open WhatsApp Chat</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="text-left bg-white border border-[#EADBC8] p-5 space-y-2 text-xs text-[#8B8176]">
            <strong className="block text-[#252522] font-medium">Next Steps:</strong>
            <p>1. Our concierge desk will review your items and confirm immediate stock.</p>
            <p>2. We will calculate exact postal/courier charges to PIN code <strong>{formData.pinCode}</strong>.</p>
            <p>3. Pay securely via authorized UPI QR code or bank transfer.</p>
            <p>4. Once verified, your pieces are packed with breakage protection and dispatched.</p>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => {
                clearCart();
                window.location.href = "/shop";
              }}
              variant="primary"
              size="md"
            >
              Clear Bag & Return to Shop
            </Button>
            <Button
              onClick={() => setOrderSent(false)}
              variant="outline"
              size="md"
            >
              Review Order Form
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <h1 className="font-heading text-3xl text-[#252522] mb-3">
          Your bag is empty
        </h1>
        <p className="text-xs text-[#8B8176] mb-6">
          Please add items to your shopping bag before proceeding to checkout.
        </p>
        <Button href="/shop" variant="primary">
          Explore Catalogue
        </Button>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="border-b border-[#EADBC8] pb-6 mb-10 flex items-center justify-between">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#84766A]">
            Secure Checkout Process
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl text-[#6E2023] mt-1 font-medium">
            Complete Your Order
          </h1>
        </div>
        <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-[#EADBC8] shadow-2xs shrink-0">
          <Image
            src="/logo.jpg"
            alt="VITRAG Emblem"
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Shipping & Delivery Form */}
        <div className="lg:col-span-7 space-y-8">
          <form id="checkout-form" onSubmit={handleWhatsAppOrder} className="space-y-6">
            {checkoutError && (
              <div className="flex items-center gap-2.5 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                <span>{checkoutError}</span>
              </div>
            )}

            {/* 1. Contact Information */}
            <div className="bg-white p-6 sm:p-8 border border-[#EADBC8] space-y-4">
              <h2 className="font-heading text-xl text-[#252522] border-b border-[#EADBC8] pb-3 flex items-center justify-between">
                <span>1. Contact & Customer Details</span>
                <span className="text-xs text-[#8B8176] font-sans font-normal">
                  Step 1 of 2
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    placeholder="e.g. Priya Sundaram"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] focus:outline-none focus:border-[#6E2023]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="+91 98400 12345"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] focus:outline-none focus:border-[#6E2023]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="priya@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] focus:outline-none focus:border-[#6E2023]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 sm:p-8 border border-[#EADBC8] space-y-4">
              <h2 className="font-heading text-xl text-[#252522] border-b border-[#EADBC8] pb-3 flex items-center justify-between">
                <span>2. Delivery Address</span>
                <span className="text-xs text-[#8B8176] font-sans font-normal">
                  Step 2 of 2
                </span>
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1">
                    Street Address, Flat/Apartment *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    placeholder="No. 14, 2nd Cross Street, Alwarpet"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] focus:outline-none focus:border-[#6E2023]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] focus:outline-none focus:border-[#6E2023]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] focus:outline-none focus:border-[#6E2023]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1">
                      PIN Code *
                    </label>
                    <input
                      type="text"
                      name="pinCode"
                      required
                      placeholder="600018"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] focus:outline-none focus:border-[#6E2023]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1">
                    Special Packaging or Delivery Instructions
                  </label>
                  <textarea
                    name="giftNote"
                    rows={2}
                    placeholder="e.g. Please add a handwritten card wishing Happy Anniversary..."
                    value={formData.giftNote}
                    onChange={handleInputChange}
                    className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] focus:outline-none focus:border-[#6E2023]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Mode Selection */}
            <div className="bg-white p-6 sm:p-8 border border-[#EADBC8] space-y-4">
              <h2 className="font-heading text-xl text-[#252522] border-b border-[#EADBC8] pb-3">
                3. Payment & Direct WhatsApp Dispatch
              </h2>

              <div className="space-y-3">
                {/* Direct WhatsApp + UPI Payment */}
                <div className="p-4 border-2 border-[#6E2023] bg-[#FFF5E6] rounded-xl space-y-3">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="whatsapp"
                      checked={true}
                      readOnly
                      className="accent-[#6E2023] mt-1"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-heading text-base font-medium text-[#252522]">
                          Direct Order to WhatsApp & UPI Transfer
                        </span>
                        <span className="text-[10px] uppercase tracking-wider bg-[#25D366] text-white px-2 py-0.5 font-bold rounded">
                          Official Store Flow
                        </span>
                      </div>
                      <p className="text-xs text-[#8B8176] font-light leading-relaxed">
                        Orders are confirmed directly with our showroom team on WhatsApp <strong>+91 63691 42027</strong>. Complete your payment via UPI to:
                      </p>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-[#EADBC8] rounded-lg mt-1">
                        <span className="text-[11px] text-[#8B8176]">UPI ID:</span>
                        <code className="text-xs font-bold text-[#6E2023] tracking-wider select-all">
                          9840610405@pthdfc
                        </code>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Unboxing Policy Advisory Box */}
                <div className="p-4 bg-[#FFF0F0] border border-[#E8C5C8] rounded-xl flex items-start gap-3 text-xs text-[#6E2023]">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#6E2023]" />
                  <div className="leading-relaxed">
                    <strong className="block font-semibold">Mandatory Delivery Verification:</strong>
                    Kindly record a continuous, unedited unboxing video when receiving and unpacking your package. Replacements or refunds for transit damage will strictly be processed with this video proof.
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="burgundy"
              size="lg"
              className="w-full py-4 text-sm"
              leftIcon={<MessageSquare className="w-5 h-5 fill-white" />}
            >
              Send Order to WhatsApp (+91 63691 42027)
            </Button>
          </form>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white border border-[#EADBC8] p-6 sm:p-8 space-y-6 sticky top-28 rounded-xl shadow-xs">
          <h2 className="font-heading text-2xl text-[#252522] border-b border-[#EADBC8] pb-4">
            Items in Your Order ({items.length})
          </h2>

          <div className="divide-y divide-[#EADBC8] max-h-80 overflow-y-auto pr-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="pt-3 flex justify-between gap-3 text-xs">
                <div>
                  <span className="font-medium text-[#252522] block line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-[#8B8176]">
                    Qty: {item.quantity} {item.quantity === 1 ? "piece" : "pieces"}
                  </span>
                  {item.variantName && (
                    <span className="text-[#8B8176] block">
                      Finish: {item.variantName}
                    </span>
                  )}
                </div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#6E2023] bg-[#CBAE9B]/20 px-2 py-0.5 rounded self-start">
                  Price on Request
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#EADBC8] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#8B8176]">
              <span>Total Selected Items</span>
              <span className="text-sm font-semibold text-[#252522]">
                {items.reduce((a, b) => a + b.quantity, 0)} pieces
              </span>
            </div>
            <div className="flex justify-between text-[#8B8176]">
              <span>Delivery Timeline</span>
              <span className="text-[#252522] font-medium">3–5 Business Days</span>
            </div>
            <div className="flex justify-between text-[#8B8176]">
              <span>Pricing &amp; Shipping</span>
              <span className="text-[#6E2023] font-medium">Confirmed on WhatsApp</span>
            </div>
            <div className="border-t border-[#EADBC8] pt-3 flex justify-between text-base font-bold text-[#6E2023]">
              <span>Payment Mode</span>
              <span>Direct UPI ({siteConfig.contact.upiId})</span>
            </div>
          </div>

          {/* Promo / Discount Code Box */}
          <div className="pt-3 border-t border-[#EADBC8]">
            <label className="block text-[11px] uppercase tracking-wider text-[#8B8176] font-semibold mb-1.5">
              Promo or Voucher Code
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. VITRAGVIP"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                className="flex-1 text-xs uppercase tracking-wider p-2.5 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023] font-medium"
              />
              <button
                type="button"
                onClick={() => {
                  if (promoCode.trim()) {
                    setPromoApplied(promoCode.trim());
                  }
                }}
                className="text-xs uppercase tracking-wider font-semibold bg-[#6E2023] hover:bg-[#55181A] text-white px-3.5 py-2.5 rounded-lg transition-colors shrink-0 shadow-2xs"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <div className="flex items-center justify-between text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1.5 rounded-md mt-2">
                <span className="flex items-center gap-1 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Code &ldquo;{promoApplied}&rdquo; applied
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setPromoApplied(null);
                    setPromoCode("");
                  }}
                  className="text-emerald-950 underline hover:font-bold"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#FFF5E6] p-4 border border-[#EADBC8] rounded-lg space-y-2 text-[11px] text-[#8B8176]">
            <p className="font-medium text-[#252522]">Our Commitment:</p>
            <p>• Fast delivery within <strong>3–5 business days</strong> with professional crockery packing.</p>
            <p>• Verified UPI payment directly to <strong>9840610405@pthdfc</strong>.</p>
            <p>• Replacement guarantee on breakage with unboxing video verification.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
