"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { CartItem, Product, ProductVariant } from "@/lib/types";

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number, variant?: ProductVariant) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotalPaise: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "vitrag_cart_v1";
const WISHLIST_STORAGE_KEY = "vitrag_wishlist_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage after mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch {
      // Ignore localStorage parse errors
    }
    setMounted(true);
  }, []);

  // Save to localStorage when items change
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Handle quota errors silently
    }
  }, [items, mounted]);

  // Save wishlist to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Handle quota errors silently
    }
  }, [wishlist, mounted]);

  const addItem = (product: Product, quantity = 1, variant?: ProductVariant) => {
    const variantId = variant?.id || "default";
    const itemId = `${product.id}-${variantId}`;
    const price = variant ? variant.price : product.price;
    const variantName = variant?.name;
    const maxStock = variant ? variant.stockQuantity : product.stockQuantity;
    const image = product.images[0]?.src || "/images/placeholder.jpg";

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const next = [...prevItems];
        const newQty = Math.min(next[existingIndex].quantity + quantity, maxStock);
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: newQty,
        };
        return next;
      } else {
        return [
          ...prevItems,
          {
            id: itemId,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            image,
            price,
            quantity: Math.min(quantity, maxStock),
            variantId: variant ? variant.id : undefined,
            variantName,
            maxStock,
          },
        ];
      }
    });

    setIsCartOpen(true);
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return {
            ...item,
            quantity: Math.min(quantity, item.maxStock),
          };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotalPaise = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);
  const toggleCart = useCallback(() => setIsCartOpen((prev) => !prev), []);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        itemCount,
        subtotalPaise,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart,
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
