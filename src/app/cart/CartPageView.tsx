"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateWhatsAppOrderUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
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
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductArtwork } from "@/components/product/ProductArtwork";

export function CartPageView() {
  const { items, removeItem, updateQuantity, clearCart, subtotalPaise } = useCart();
  const [customerNotes, setCustomerNotes] = useState("");

  const whatsappUrl = generateWhatsAppOrderUrl(items, subtotalPaise, customerNotes);

  if (items.length === 0) {
    return (
      <div className="py-20 text-center max-w-md mx-auto">
        <div className="w-20 h-20 rounded-full bg-[#CBAE9B]/30 border border-[#CBAE9B]/60 flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10 text-[#6E2023]" />
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl text-[#6E2023] mb-3 font-medium">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-[#54483E] font-light leading-relaxed mb-8">
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
      <div className="flex items-baseline justify-between border-b border-[#EADBC8] pb-6 mb-8">
        <div>
          <h1 className="font-heading text-3xl sm:text-4xl text-[#6E2023] font-medium">
            Shopping Bag
          </h1>
          <p className="text-xs uppercase tracking-wider text-[#54483E] mt-1 font-medium">
            {items.reduce((a, b) => a + b.quantity, 0)} pieces selected
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs uppercase tracking-wider text-[#54483E] hover:text-[#6E2023] flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Clear Bag
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Items Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-3 border-b border-[#EADBC8] text-[11px] uppercase tracking-wider text-[#54483E] font-semibold">
            <span className="col-span-6">Item</span>
            <span className="col-span-2 text-center">Quantity</span>
            <span className="col-span-2 text-right">Price</span>
            <span className="col-span-2 text-right">Total</span>
          </div>

          <div className="divide-y divide-[#EADBC8]">
            {/* 🎁 UNLOCKED FREE GIFT ITEM ROW */}
            <div className="py-4 px-4 bg-gradient-to-r from-[#FFF5E6] via-[#FFF9F2] to-[#FFF5E6] border-2 border-[#FFD700]/70 rounded-xl flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center shadow-2xs mb-4">
              <div className="w-full sm:col-span-6 flex gap-4 items-center">
                <div className="w-16 h-16 bg-[#6E2023] text-[#FFD700] rounded-lg flex items-center justify-center shrink-0 shadow-xs">
                  <Gift className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[#2D6A4F] text-white rounded shadow-2xs">
                      UNLOCKED BONUS
                    </span>
                    <span className="text-xs font-bold text-[#6E2023]">
                      Diwali Bundle Gift
                    </span>
                  </div>
                  <h4 className="font-heading text-sm sm:text-base font-semibold text-[#6E2023] mt-0.5">
                    6-Piece Luxury Crystal Glassware Set
                  </h4>
                  <p className="text-[11px] text-[#54483E]">
                    Lead-free crystal drinking glasses • Included with every order
                  </p>
                </div>
              </div>
              <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-center">
                <span className="sm:hidden text-xs text-[#54483E]">Quantity:</span>
                <span className="text-xs font-semibold px-2.5 py-1 bg-white border border-[#EADBC8] rounded-md">
                  1 Set (6 Pcs)
                </span>
              </div>
              <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-end text-xs text-[#54483E] line-through">
                <span className="sm:hidden">MRP:</span>
                <span>₹2,999</span>
              </div>
              <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-end font-bold text-xs sm:text-sm text-[#2D6A4F]">
                <span className="sm:hidden">Total:</span>
                <span>FREE (₹0)</span>
              </div>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="py-6 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center bg-white p-4 border border-[#EADBC8] rounded-xl sm:border-0 sm:p-0 sm:bg-transparent"
              >
                {/* Product Info */}
                <div className="w-full sm:col-span-6 flex gap-4 items-center">
                  <div className="relative w-20 h-20 bg-white border border-[#EADBC8] rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    ) : (
                      <ProductArtwork category={item.name} name={item.name} />
                    )}
                  </div>
                  <div>
                    <Link
                      href={`/product/${item.slug}`}
                      className="font-heading text-base sm:text-lg text-[#6E2023] hover:text-[#55181A] transition-colors line-clamp-1 font-medium"
                    >
                      {item.name}
                    </Link>
                    {item.variantName && (
                      <p className="text-xs text-[#54483E] mt-0.5">
                        Finish: {item.variantName}
                      </p>
                    )}
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-xs text-[#54483E] hover:text-[#6E2023] flex items-center gap-1 mt-2 sm:hidden"
                    >
                      <Trash2 className="w-3 h-3" />
                      Remove
                    </button>
                  </div>
                </div>

                {/* Quantity */}
                <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-center">
                  <span className="sm:hidden text-xs text-[#54483E]">Quantity:</span>
                  <div className="flex items-center border border-[#EADBC8] bg-white rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 hover:bg-[#FFF5E6] text-[#6E2023]"
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
                      className="p-1.5 hover:bg-[#FFF5E6] text-[#6E2023] disabled:opacity-30"
                      aria-label="Increase"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Unit Price */}
                <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-end text-xs sm:text-sm text-[#54483E]">
                  <span className="sm:hidden">Unit Price:</span>
                  <span>{formatPrice(item.price)}</span>
                </div>

                {/* Subtotal & Delete */}
                <div className="w-full sm:col-span-2 flex items-center justify-between sm:justify-end gap-3">
                  <span className="sm:hidden font-semibold">Item Total:</span>
                  <span className="text-sm sm:text-base font-semibold text-[#6E2023]">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="hidden sm:block text-[#54483E] hover:text-[#6E2023] p-1 transition-colors"
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
              className="text-xs uppercase tracking-widest text-[#6E2023] font-semibold hover:underline inline-flex items-center gap-1.5"
            >
              ← Continue Browsing Catalogue
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 bg-white border border-[#EADBC8] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h2 className="font-heading text-2xl text-[#6E2023] border-b border-[#EADBC8] pb-4 font-medium">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-[#54483E]">
              <span>Estimated Subtotal</span>
              <span className="font-semibold text-[#6E2023] text-base">
                {formatPrice(subtotalPaise)}
              </span>
            </div>
            <div className="flex justify-between text-[#54483E]">
              <span>Taxes & GST</span>
              <span className="text-[#252522] font-medium">Included</span>
            </div>
            <div className="flex justify-between text-[#54483E]">
              <span>Diwali Festive Bonus</span>
              <span className="text-xs text-[#2D6A4F] font-bold">
                6-Pc Glasses Free (₹0)
              </span>
            </div>
            <div className="flex justify-between text-[#54483E]">
              <span>Shipping</span>
              <span className="text-xs text-[#6E2023] font-semibold">
                Free Pan-India Insured
              </span>
            </div>
            <div className="border-t border-[#EADBC8] pt-3 flex justify-between font-bold text-lg text-[#6E2023]">
              <span>Estimated Total</span>
              <span>{formatPrice(subtotalPaise)}</span>
            </div>
          </div>

          {/* Special Delivery or Gift Note */}
          <div>
            <label
              htmlFor="cart-order-notes"
              className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1"
            >
              Order & Gifting Notes (Optional)
            </label>
            <textarea
              id="cart-order-notes"
              rows={3}
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              placeholder="Provide delivery instructions, wedding gift message, or custom packing requests..."
              className="w-full text-xs p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg focus:outline-none focus:border-[#6E2023]"
            />
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all rounded-lg shadow-md active:scale-[0.99]"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              Order Instantly on WhatsApp ({siteConfig.contact.phone})
            </a>

            <Button
              href="/checkout"
              variant="primary"
              size="lg"
              className="w-full py-4 shadow-md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Proceed to Checkout
            </Button>
          </div>

          {/* Guarantee Badges */}
          <div className="pt-4 border-t border-[#EADBC8] space-y-2 text-xs text-[#54483E]">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#6E2023]" />
              <span>Safe Transit Guarantee • Breakage Insurance</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#6E2023]" />
              <span>{siteConfig.shipping.deliveryChennai} • {siteConfig.shipping.deliveryPromiseNeutral}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
