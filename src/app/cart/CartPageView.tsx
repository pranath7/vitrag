"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateWhatsAppOrderUrl } from "@/lib/utils";
import {
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export function CartPageView() {
  const { items, removeItem, updateQuantity, clearCart, subtotalPaise } = useCart();
  const [customerNotes, setCustomerNotes] = useState("");

  const whatsappUrl = generateWhatsAppOrderUrl(items, subtotalPaise, customerNotes);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[#E9DFD1]/50 border border-[#D9D0C1] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-[#5A252E]" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl text-[#252522] mb-3">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-[#8B8176] font-light leading-relaxed mb-8">
          Explore our handcrafted ceramic dinnerware, artisanal platters, and luxury gifting boxes to begin setting your table.
        </p>
        <div className="space-y-3">
          <Button href="/shop" variant="primary" size="lg" className="w-full">
            Explore All Collections
          </Button>
          <Button
            href="/collections/dinner-sets"
            variant="outline"
            size="md"
            className="w-full"
          >
            Shop Dinner Sets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-16">
      <div className="flex items-baseline justify-between border-b border-[#E7E0D6] pb-6 mb-8">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl text-[#252522]">
            Shopping Bag
          </h1>
          <p className="text-xs uppercase tracking-wider text-[#8B8176] mt-1">
            {items.reduce((a, b) => a + b.quantity, 0)} pieces selected
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs uppercase tracking-wider text-[#8B8176] hover:text-[#5A252E] flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-[#E7E0D6] text-[11px] uppercase tracking-wider text-[#8B8176] font-semibold">
            <span className="col-span-6">Item</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Price</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          <div className="divide-y divide-[#E7E0D6]">
            {items.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center bg-white p-4 border border-[#E7E0D6] sm:border-0 sm:p-0 sm:bg-transparent"
              >
                {/* Product Info */}
                <div className="w-full sm:col-span-6 flex gap-4 items-center">
                  <div className="w-20 h-20 bg-white border border-[#E7E0D6] flex items-center justify-center shrink-0">
                    <span className="font-heading text-xs tracking-widest text-[#5A252E]">
                      VITRAG
                    </span>
                  </div>
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-heading text-base sm:text-lg text-[#252522] hover:text-[#5A252E] transition-colors line-clamp-1"
                    >
                      {item.name}
                    </Link>
                    {item.variantName && (
                      <p className="text-xs text-[#8B8176] mt-0.5">
                        Finish: {item.variantName}
                      </p>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-[#8B8176] hover:text-[#5A252E] flex items-center gap-1 mt-2 sm:hidden"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-center">
                  <span className="sm:hidden text-xs text-[#8B8176]">Quantity:</span>
                  <div className="flex items-center border border-[#E7E0D6] bg-white">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-[#F7F4EE] text-[#252522]"
                      aria-label="Decrease"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center text-xs font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.maxStock}
                      className="p-1.5 hover:bg-[#F7F4EE] text-[#252522] disabled:opacity-30"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-end text-xs sm:text-sm text-[#8B8176]">
                  <span className="sm:hidden">Unit Price:</span>
                  <span>{formatPrice(item.price)}</span>
                </div>

                {/* Subtotal & Delete */}
                <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-end gap-3">
                  <span className="sm:hidden font-semibold">Item Total:</span>
                  <span className="text-sm sm:text-base font-semibold text-[#5A252E]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="hidden sm:block text-[#8B8176] hover:text-[#5A252E] p-1 transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <Link
              href="/shop"
              className="text-xs uppercase tracking-widest text-[#5A252E] font-medium hover:underline inline-flex items-center gap-1.5"
            >
              ← Continue Browsing Catalogue
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white border border-[#E7E0D6] p-6 sm:p-8 space-y-6">
          <h2 className="font-heading text-2xl text-[#252522] border-b border-[#E7E0D6] pb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-[#8B8176]">
              <span>Estimated Subtotal</span>
              <span className="font-semibold text-[#252522] text-base">
                {formatPrice(subtotalPaise)}
              </span>
            </div>
            <div className="flex justify-between text-[#8B8176]">
              <span>Taxes & GST</span>
              <span className="text-[#252522] font-medium">Included</span>
            </div>
            <div className="flex justify-between text-[#8B8176]">
              <span>Shipping</span>
              <span className="text-xs text-[#5A252E]">
                Calculated on Delivery PIN
              </span>
            </div>
            <div className="border-t border-[#E7E0D6] pt-3 flex justify-between font-semibold text-lg text-[#5A252E]">
              <span>Estimated Total</span>
              <span>{formatPrice(subtotalPaise)}</span>
            </div>
          </div>

          {/* Special Delivery or Gift Note */}
          <div>
            <label
              htmlFor="cart-order-notes"
              className="block text-xs uppercase tracking-wider text-[#8B8176] font-semibold mb-1"
            >
              Order & Gifting Notes (Optional)
            </label>
            <textarea
              id="cart-order-notes"
              rows={3}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Provide delivery instructions, wedding gift message, or custom packing requests..."
              className="w-full text-xs p-3 bg-[#F7F4EE] border border-[#E7E0D6] rounded-none focus:outline-none focus:border-[#5A252E]"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-md active:scale-[0.99]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Order Instantly on WhatsApp
            </a>

            <Button
              href="/checkout"
              variant="primary"
              size="lg"
              className="w-full py-4"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Checkout
            </Button>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-4 border-t border-[#E7E0D6] space-y-2 text-xs text-[#8B8176]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#5A252E]" />
              <span>Safe Transit Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#5A252E]" />
              <span>Insured dispatch from Chennai</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
