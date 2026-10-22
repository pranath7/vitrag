"use client";

import React, { useState } from "react";
import Link from "next/link";
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

export function CheckoutView() {
  const { items, subtotalPaise, clearCart } = useCart();

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWhatsAppOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const number = siteConfig.contact.whatsappNumber;
    let message = `*NEW ORDER REQUEST — VITRAG Tableware & Gifting*\n\n`;
    message += `*Customer Details:*\n`;
    message += `• Name: ${formData.fullName}\n`;
    message += `• Phone: ${formData.phone}\n`;
    if (formData.email) message += `• Email: ${formData.email}\n`;
    message += `• Delivery Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pinCode}\n`;
    if (formData.giftNote) message += `• Gift/Order Note: ${formData.giftNote}\n`;

    message += `\n*Ordered Items (${items.reduce((a, b) => a + b.quantity, 0)} pieces):*\n`;
    items.forEach((item, index) => {
      const variantStr = item.variantName ? ` (${item.variantName})` : "";
      message += `${index + 1}. ${item.name}${variantStr} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}\n`;
    });

    message += `\n*Estimated Item Subtotal:* ${formatPrice(subtotalPaise)}\n`;
    message += `_(Please confirm delivery courier charges and share authorized UPI QR/details for payment verification)_\n`;

    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    setLastWhatsAppUrl(url);
    setOrderSent(true);

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
        <div className="bg-white border border-[#E7E0D6] p-8 sm:p-12 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#E9DFD1]/50 border border-[#D9D0C1] flex items-center justify-center mx-auto text-[#25D366]">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase tracking-[0.2em] text-[#5A252E] font-semibold">
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
          <div className="bg-[#F7F4EE] p-5 border border-[#E7E0D6] space-y-3">
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

          <div className="text-left bg-white border border-[#E7E0D6] p-5 space-y-2 text-xs text-[#8B8176]">
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
      <div className="border-b border-[#E7E0D6] pb-6 mb-10">
        <span className="text-xs uppercase tracking-widest text-[#8B8176]">
          Secure Checkout Process
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl text-[#252522] mt-1">
          Complete Your Order
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left: Shipping & Delivery Form */}
        <div className="lg:col-span-7 space-y-8">
          <form id="checkout-form" onSubmit={handleWhatsAppOrder} className="space-y-6">
            {/* 1. Contact Information */}
            <div className="bg-white p-6 sm:p-8 border border-[#E7E0D6] space-y-4">
              <h2 className="font-heading text-xl text-[#252522] border-b border-[#E7E0D6] pb-3 flex items-center justify-between">
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
                    className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] focus:outline-none focus:border-[#5A252E]"
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
                    className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] focus:outline-none focus:border-[#5A252E]"
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
                    className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] focus:outline-none focus:border-[#5A252E]"
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div className="bg-white p-6 sm:p-8 border border-[#E7E0D6] space-y-4">
              <h2 className="font-heading text-xl text-[#252522] border-b border-[#E7E0D6] pb-3 flex items-center justify-between">
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
                    className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] focus:outline-none focus:border-[#5A252E]"
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
                      className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] focus:outline-none focus:border-[#5A252E]"
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
                      className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] focus:outline-none focus:border-[#5A252E]"
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
                      className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] focus:outline-none focus:border-[#5A252E]"
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
                    className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] focus:outline-none focus:border-[#5A252E]"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Mode Selection */}
            <div className="bg-white p-6 sm:p-8 border border-[#E7E0D6] space-y-4">
              <h2 className="font-heading text-xl text-[#252522] border-b border-[#E7E0D6] pb-3">
                3. Choose Payment Method
              </h2>

              <div className="space-y-3">
                {/* Mode A: WhatsApp + UPI Verification */}
                <label className="block p-4 border border-[#5A252E] bg-[#F7F4EE] cursor-pointer">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="whatsapp"
                      checked={paymentMode === "whatsapp"}
                      onChange={() => setPaymentMode("whatsapp")}
                      className="accent-[#5A252E] mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-base font-medium text-[#252522]">
                          Order via WhatsApp & Pay by UPI / Bank Transfer
                        </span>
                        <span className="text-[10px] uppercase tracking-wider bg-[#25D366] text-white px-2 py-0.5 font-bold">
                          Direct Concierge
                        </span>
                      </div>
                      <p className="text-xs text-[#8B8176] mt-1 font-light leading-relaxed">
                        Instant direct service to <strong>{siteConfig.contact.displayPhone}</strong>. We will review your delivery address, calculate exact courier charges, verify stock, and provide direct authorized UPI QR/details for payment.
                      </p>
                    </div>
                  </div>
                </label>

                {/* Mode B: Online Gateway Adapter */}
                <label className="block p-4 border border-[#E7E0D6] bg-white opacity-75 cursor-not-allowed">
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="paymentMode"
                      value="online"
                      disabled
                      className="mt-1"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-base font-medium text-[#8B8176]">
                          Credit Card / Net Banking / Payment Gateway
                        </span>
                        <span className="text-[10px] uppercase tracking-wider bg-[#8B8176]/20 text-[#8B8176] px-2 py-0.5">
                          In Verification
                        </span>
                      </div>
                      <p className="text-xs text-[#8B8176] mt-1 font-light leading-relaxed">
                        Automatic gateway processing will activate as soon as merchant banking verification is completed. Currently accepting orders via WhatsApp concierge above.
                      </p>
                    </div>
                  </div>
                </label>
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
              Confirm Order & Send to WhatsApp (+91 63691 42027)
            </Button>
          </form>
        </div>

        {/* Right: Order Summary Sidebar */}
        <div className="lg:col-span-5 bg-white border border-[#E7E0D6] p-6 sm:p-8 space-y-6 sticky top-28">
          <h2 className="font-heading text-2xl text-[#252522] border-b border-[#E7E0D6] pb-4">
            Items in Your Order ({items.length})
          </h2>

          <div className="divide-y divide-[#E7E0D6] max-h-80 overflow-y-auto pr-2 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="pt-3 flex justify-between gap-3 text-xs">
                <div>
                  <span className="font-medium text-[#252522] block line-clamp-1">
                    {item.name}
                  </span>
                  <span className="text-[#8B8176]">
                    Qty: {item.quantity} × {formatPrice(item.price)}
                  </span>
                  {item.variantName && (
                    <span className="text-[#8B8176] block">
                      Finish: {item.variantName}
                    </span>
                  )}
                </div>
                <span className="font-semibold text-[#252522] shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="border-t border-[#E7E0D6] pt-4 space-y-2 text-xs">
            <div className="flex justify-between text-[#8B8176]">
              <span>Subtotal</span>
              <span className="text-sm font-semibold text-[#252522]">
                {formatPrice(subtotalPaise)}
              </span>
            </div>
            <div className="flex justify-between text-[#8B8176]">
              <span>Taxes</span>
              <span className="text-[#252522]">Included</span>
            </div>
            <div className="flex justify-between text-[#8B8176]">
              <span>Estimated Shipping</span>
              <span className="text-[#5A252E] font-medium">
                Calculated by PIN Code
              </span>
            </div>
            <div className="border-t border-[#E7E0D6] pt-3 flex justify-between text-base font-bold text-[#5A252E]">
              <span>Estimated Total</span>
              <span>{formatPrice(subtotalPaise)}</span>
            </div>
          </div>

          <div className="bg-[#F7F4EE] p-4 border border-[#E7E0D6] space-y-2 text-[11px] text-[#8B8176]">
            <p className="font-medium text-[#252522]">Order Flow Guarantee:</p>
            <p>1. Send your cart order via WhatsApp with a single tap.</p>
            <p>2. We verify stock availability and confirm final delivery amount.</p>
            <p>3. Pay via authorized UPI QR; order ships with live tracking.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
