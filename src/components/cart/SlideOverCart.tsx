"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateWhatsAppOrderUrl } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SlideOverCart() {
  const {
    items,
    removeItem,
    updateQuantity,
    subtotalPaise,
    isCartOpen,
    closeCart,
  } = useCart();

  const [notes, setNotes] = useState("");

  if (!isCartOpen) return null;

  const whatsappUrl = generateWhatsAppOrderUrl(items, subtotalPaise, notes);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252522]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#F7F4EE] border-l border-[#E7E0D6] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#E7E0D6] flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <ShoppingBag className="w-5 h-5 text-[#5A252E]" />
              <h2 id="slide-over-title" className="font-heading text-2xl text-[#252522]">
                Your Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={closeCart}
              className="p-2 text-[#8B8176] hover:text-[#252522] transition-colors focus:outline-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E9DFD1]/50 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#8B8176]" />
                </div>
                <h3 className="font-heading text-2xl text-[#252522] mb-2">
                  Your bag is empty
                </h3>
                <p className="text-sm text-[#8B8176] max-w-xs mb-8">
                  Discover our thoughtfully curated collection of dinnerware, serving essentials, and festive gifts.
                </p>
                <div className="space-y-3 w-full">
                  <Button
                    href="/shop"
                    onClick={closeCart}
                    variant="primary"
                    className="w-full"
                  >
                    Explore All Collections
                  </Button>
                  <Button
                    href="/collections/gift-sets"
                    onClick={closeCart}
                    variant="outline"
                    className="w-full"
                  >
                    Shop Curated Gifts
                  </Button>
                </div>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-white border border-[#E7E0D6] rounded-xs shadow-2xs"
                >
                  <div className="relative w-20 h-20 bg-[#F7F4EE] shrink-0 overflow-hidden rounded-xs border border-[#E7E0D6]">
                    <div className="w-full h-full flex items-center justify-center text-xs font-serif text-[#8B8176] bg-[#E9DFD1]/40">
                      VITRAG
                    </div>
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={closeCart}
                          className="font-heading text-base font-medium text-[#252522] hover:text-[#5A252E] line-clamp-1 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#8B8176] hover:text-[#5A252E] p-1 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.variantName && (
                        <p className="text-xs text-[#8B8176] mt-0.5">
                          Variant: {item.variantName}
                        </p>
                      )}

                      <p className="text-sm font-medium text-[#5A252E] mt-1">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#F7F4EE]">
                      <div className="flex items-center border border-[#E7E0D6] rounded-xs bg-[#F7F4EE]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-[#E9DFD1] text-[#252522] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-medium text-[#252522]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.maxStock}
                          className="p-1 hover:bg-[#E9DFD1] text-[#252522] transition-colors disabled:opacity-30"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-[#252522]">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#E7E0D6] bg-white space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-[#8B8176]">
                  <span>Subtotal</span>
                  <span className="text-[#252522] font-semibold text-base">
                    {formatPrice(subtotalPaise)}
                  </span>
                </div>
                <p className="text-xs text-[#8B8176]">
                  Taxes and local shipping calculated at confirmation.
                </p>
              </div>

              {/* Special Instructions or Gift Note */}
              <div>
                <label
                  htmlFor="cart-note"
                  className="block text-xs uppercase tracking-wider text-[#8B8176] mb-1"
                >
                  Gift Note or Delivery Request (Optional)
                </label>
                <input
                  id="cart-note"
                  type="text"
                  placeholder="e.g. Please wrap for a wedding gift"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#E7E0D6] bg-[#F7F4EE] rounded-xs focus:outline-none focus:border-[#5A252E]"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all shadow-sm active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Order via WhatsApp
                </a>

                <Button
                  href="/checkout"
                  onClick={closeCart}
                  variant="primary"
                  className="w-full py-3.5"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Checkout
                </Button>
                
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-xs tracking-wider uppercase text-[#8B8176] hover:text-[#5A252E] py-1 transition-colors"
                >
                  View Full Cart Details
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
