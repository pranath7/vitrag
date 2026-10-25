"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { formatPrice, generateWhatsAppOrderUrl } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, MessageSquare, Gift } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductArtwork } from "@/components/product/ProductArtwork";

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
  const pathname = usePathname();

  // Automatically close cart when navigating to any page (e.g., checkout, cart, or product)
  useEffect(() => {
    closeCart();
  }, [pathname, closeCart]);

  if (!isCartOpen || pathname?.startsWith("/admin")) return null;

  const whatsappUrl = generateWhatsAppOrderUrl(items, subtotalPaise, notes);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#252522]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeCart}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 flex max-w-full pl-0 sm:pl-10 w-full sm:w-auto">
        <div className="w-full sm:max-w-md bg-[#FFF5E6] border-l border-[#EADBC8] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-[#EADBC8] flex items-center justify-between bg-white">
            <Link
              href="/"
              onClick={closeCart}
              aria-label="VITRAG Tableware & Gifting Home"
              className="flex items-center gap-3 group focus:outline-none"
            >
              <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#EADBC8] shrink-0 group-hover:scale-105 transition-transform duration-200">
                <Image
                  src="/logo.jpg"
                  alt="VITRAG"
                  fill
                  className="object-cover"
                  sizes="32px"
                />
              </div>
              <h2 id="slide-over-title" className="font-heading text-2xl text-[#6E2023] font-medium group-hover:text-[#55181A] transition-colors">
                Your Shopping Bag ({items.reduce((a, b) => a + b.quantity, 0)})
              </h2>
            </Link>
            <button
              onClick={closeCart}
              className="p-2 text-[#54483E] hover:text-[#6E2023] transition-colors focus:outline-none"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#CBAE9B]/30 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8 text-[#6E2023]" />
                </div>
                <h3 className="font-heading text-2xl text-[#6E2023] mb-2 font-medium">
                  Your bag is empty
                </h3>
                <p className="text-sm text-[#54483E] max-w-xs mb-8 font-light">
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
              <>
                {/* 🎁 UNLOCKED COMPLIMENTARY 6-PIECE GLASSES GIFT */}
                <div className="p-3.5 bg-gradient-to-r from-[#FFF5E6] via-[#FFF9F2] to-[#FFF5E6] border-2 border-[#FFD700]/70 rounded-xl flex items-center gap-3.5 shadow-2xs">
                  <div className="w-12 h-12 rounded-lg bg-[#6E2023] text-[#FFD700] flex items-center justify-center shrink-0 shadow-xs">
                    <Gift className="w-6 h-6 animate-pulse" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 bg-[#2D6A4F] text-white rounded shadow-2xs">
                        UNLOCKED GIFT
                      </span>
                      <span className="text-xs font-bold text-[#6E2023] truncate">
                        6-Piece Crystal Glasses Set
                      </span>
                    </div>
                    <p className="text-[11px] text-[#54483E] mt-0.5 font-light">
                      Complimentary Diwali Festive Gift (Qty: 1)
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs text-[#54483E] line-through block">₹2,999</span>
                    <span className="text-xs font-bold text-[#2D6A4F]">FREE</span>
                  </div>
                </div>

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 bg-white border border-[#EADBC8] rounded-xl shadow-2xs"
                  >
                    <div className="relative w-20 h-20 bg-[#FFF5E6] shrink-0 overflow-hidden rounded-lg border border-[#EADBC8]">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                      ) : (
                        <ProductArtwork category={item.name} name={item.name} />
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <Link
                            href={`/product/${item.slug}`}
                            onClick={closeCart}
                            className="font-heading text-base font-medium text-[#6E2023] hover:text-[#55181A] line-clamp-1 transition-colors"
                          >
                            {item.name}
                          </Link>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-[#54483E] hover:text-[#6E2023] p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {item.variantName && (
                          <p className="text-xs text-[#54483E] mt-0.5">
                            Variant: {item.variantName}
                          </p>
                        )}

                        {item.price > 0 ? (
                          <span className="inline-block text-xs font-heading font-bold text-[#6E2023] mt-1.5">
                            ₹{(item.price / 100).toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="inline-block text-[10px] uppercase tracking-wider font-semibold text-[#6E2023] bg-[#CBAE9B]/20 px-2 py-0.5 rounded mt-1.5">
                            Price on Request
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#FFF5E6]">
                        <div className="flex items-center border border-[#EADBC8] rounded-lg bg-[#FFF5E6] overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 hover:bg-[#CBAE9B]/30 text-[#6E2023] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-xs font-semibold text-[#252522]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="p-1 hover:bg-[#CBAE9B]/30 text-[#6E2023] transition-colors disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs text-[#54483E]">
                          {item.quantity} {item.quantity === 1 ? "piece" : "pieces"}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer & Actions */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#EADBC8] bg-white space-y-4">
              {/* Service Notice */}
              <div className="p-3 bg-[#FFF5E6] border border-[#EADBC8] rounded-lg text-xs space-y-1">
                <p className="text-[#6E2023] font-semibold flex items-center gap-1.5">
                  <span>✓</span> Direct Showroom Concierge &amp; Order Dispatch
                </p>
                <p className="text-[11px] text-[#54483E]">
                  Pricing and courier details confirmed directly with our showroom team on WhatsApp.
                </p>
              </div>

              <div className="space-y-1.5">
                {subtotalPaise > 0 && (
                  <div className="flex justify-between text-base font-heading font-bold text-[#6E2023] border-b border-[#EADBC8]/70 pb-2">
                    <span>Order Subtotal</span>
                    <span>₹{(subtotalPaise / 100).toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs text-[#54483E]">
                  <span>Items Selected</span>
                  <span className="text-[#6E2023] font-semibold">
                    {items.reduce((a, b) => a + b.quantity, 0)} pieces + 6-Pc Glasses (Free)
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#54483E]">
                  <span>Festive Bundle Bonus</span>
                  <span className="text-[#2D6A4F] font-bold">6-Pc Glasses Free (₹0)</span>
                </div>
                <div className="flex justify-between text-xs text-[#54483E]">
                  <span>Delivery Estimate</span>
                  <span className="text-[#2D6A4F] font-semibold">{siteConfig.shipping.deliveryTimelineShort}</span>
                </div>
              </div>

              {/* Special Instructions or Gift Note */}
              <div>
                <label
                  htmlFor="cart-note"
                  className="block text-xs uppercase tracking-wider text-[#6E2023] font-semibold mb-1"
                >
                  Gift Note or Delivery Request (Optional)
                </label>
                <input
                  id="cart-note"
                  type="text"
                  placeholder="e.g. Please wrap with luxury burgundy box & note"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full text-xs px-3 py-2 border border-[#EADBC8] bg-[#FFF5E6] rounded-lg focus:outline-none focus:border-[#6E2023]"
                />
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs uppercase tracking-widest font-semibold transition-all rounded-lg shadow-sm active:scale-[0.99]"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  Order via WhatsApp ({siteConfig.contact.displayPhone})
                </a>

                <Button
                  href="/checkout"
                  onClick={closeCart}
                  variant="primary"
                  className="w-full py-3.5 shadow-md"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Proceed to Checkout
                </Button>
                
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="block text-center text-xs tracking-wider uppercase text-[#54483E] hover:text-[#6E2023] py-1 transition-colors font-medium"
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
