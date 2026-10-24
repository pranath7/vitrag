"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ShoppingCart,
  MessageSquare,
  CheckCircle2,
  Trash2,
  Search,
  ExternalLink,
  Clock,
  Phone,
  User,
  ArrowRight,
  Sparkles,
  RefreshCw,
  AlertTriangle,
} from "lucide-react";
import { AbandonedCart } from "@/lib/adminTypes";
import { formatPrice } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

interface AdminAbandonedTabProps {
  abandonedCarts: AbandonedCart[];
  onMarkRecovered: (id: string) => void;
  onDeleteCart: (id: string) => void;
  onRefresh: () => void;
}

export function AdminAbandonedTab({
  abandonedCarts,
  onMarkRecovered,
  onDeleteCart,
  onRefresh,
}: AdminAbandonedTabProps) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "abandoned" | "recovered">("all");

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = abandonedCarts.length;
    const abandonedOnly = abandonedCarts.filter((c) => !c.recovered);
    const recoveredOnly = abandonedCarts.filter((c) => c.recovered);

    const abandonedValuePaise = abandonedOnly.reduce(
      (sum, c) => sum + (c.totalEstimatedPaise || 0),
      0
    );
    const recoveredValuePaise = recoveredOnly.reduce(
      (sum, c) => sum + (c.totalEstimatedPaise || 0),
      0
    );
    const recoveryRate = total > 0 ? Math.round((recoveredOnly.length / total) * 100) : 0;

    return {
      total,
      abandonedCount: abandonedOnly.length,
      recoveredCount: recoveredOnly.length,
      abandonedValuePaise,
      recoveredValuePaise,
      recoveryRate,
    };
  }, [abandonedCarts]);

  // Filtered carts
  const filteredCarts = useMemo(() => {
    return abandonedCarts.filter((c) => {
      if (filter === "abandoned" && c.recovered) return false;
      if (filter === "recovered" && !c.recovered) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      const matchName = c.customerName?.toLowerCase().includes(q);
      const matchPhone = c.customerPhone?.toLowerCase().includes(q);
      const matchItem = c.items?.some((i) => i.name.toLowerCase().includes(q));
      return matchName || matchPhone || matchItem;
    });
  }, [abandonedCarts, search, filter]);

  // Generate 1-Click WhatsApp Recovery link
  const getWhatsAppRecoveryUrl = (cart: AbandonedCart) => {
    if (!cart.customerPhone) return null;
    const cleanPhone = cart.customerPhone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.startsWith("91")
      ? cleanPhone
      : cleanPhone.length === 10
      ? `91${cleanPhone}`
      : cleanPhone;

    const itemsSummary = cart.items
      .map((i) => `• ${i.name} (Qty: ${i.quantity})`)
      .join("\n");

    const message = `*Greetings from VITRAG Tableware & Gifting!* 🌸\n\nHello ${
      cart.customerName || "there"
    },\n\nWe noticed you were browsing our handcrafted tableware and left a curated selection in your bag:\n\n${itemsSummary}\n\n*Cart Total:* ${formatPrice(
      cart.totalEstimatedPaise
    )}\n\nWould you like us to assist you with free Pan-India courier packaging, custom gifting notes, or answer any questions about our artisanal pieces?\n\nReply directly to this chat and our concierge team will be delighted to complete your reservation! ✨\n\n— Team VITRAG Chennai`;

    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading text-2xl sm:text-3xl text-[#252522]">
              Abandoned Carts &amp; Visitors
            </h1>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-semibold border border-amber-200">
              {metrics.abandonedCount} Active Leftout
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#8B8176] mt-1">
            Capture prospective buyers who started checkout. Recover lost revenue via 1-click WhatsApp concierge.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-[#D9D0C1] rounded-lg text-xs font-medium text-[#252522] hover:bg-[#FFF5E6] transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh Carts
        </button>
      </div>

      {/* KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#EADBC8] shadow-sm">
          <div className="flex items-center justify-between text-[#8B8176] text-xs">
            <span>Potential Lost Value</span>
            <ShoppingCart className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#6E2023] mt-2 font-heading">
            {formatPrice(metrics.abandonedValuePaise)}
          </div>
          <p className="text-[11px] text-[#8B8176] mt-1">
            {metrics.abandonedCount} uncompleted carts
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#EADBC8] shadow-sm">
          <div className="flex items-center justify-between text-[#8B8176] text-xs">
            <span>Recovered Revenue</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-emerald-700 mt-2 font-heading">
            {formatPrice(metrics.recoveredValuePaise)}
          </div>
          <p className="text-[11px] text-[#8B8176] mt-1">
            {metrics.recoveredCount} converted carts
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#EADBC8] shadow-sm">
          <div className="flex items-center justify-between text-[#8B8176] text-xs">
            <span>Recovery Conversion</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#252522] mt-2 font-heading">
            {metrics.recoveryRate}%
          </div>
          <p className="text-[11px] text-[#8B8176] mt-1">
            Target benchmark: &gt;15%
          </p>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#EADBC8] shadow-sm">
          <div className="flex items-center justify-between text-[#8B8176] text-xs">
            <span>Total Tracked Visitors</span>
            <User className="w-4 h-4 text-[#8B8176]" />
          </div>
          <div className="text-xl sm:text-2xl font-bold text-[#252522] mt-2 font-heading">
            {metrics.total}
          </div>
          <p className="text-[11px] text-[#8B8176] mt-1">
            Real-time Firestore sync
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-3 rounded-xl border border-[#EADBC8] flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#8B8176]" />
          <input
            type="text"
            placeholder="Search by customer phone, name, or product in bag..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#FFF5E6]/40 border border-[#D9D0C1] rounded-lg focus:outline-none focus:border-[#6E2023]"
          />
        </div>

        <div className="flex gap-1.5 self-end sm:self-auto">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "all"
                ? "bg-[#6E2023] text-white"
                : "bg-stone-100 text-[#8B8176] hover:bg-stone-200"
            }`}
          >
            All ({abandonedCarts.length})
          </button>
          <button
            onClick={() => setFilter("abandoned")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "abandoned"
                ? "bg-amber-600 text-white"
                : "bg-stone-100 text-[#8B8176] hover:bg-stone-200"
            }`}
          >
            Leftout ({metrics.abandonedCount})
          </button>
          <button
            onClick={() => setFilter("recovered")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filter === "recovered"
                ? "bg-emerald-600 text-white"
                : "bg-stone-100 text-[#8B8176] hover:bg-stone-200"
            }`}
          >
            Recovered ({metrics.recoveredCount})
          </button>
        </div>
      </div>

      {/* Abandoned Carts Table / List */}
      {filteredCarts.length === 0 ? (
        <div className="bg-white rounded-xl border border-[#EADBC8] p-12 text-center space-y-4 shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#FFF5E6] flex items-center justify-center mx-auto text-[#6E2023]">
            <ShoppingCart className="w-7 h-7" />
          </div>
          <div className="max-w-md mx-auto">
            <h3 className="font-heading text-lg text-[#252522]">No Abandoned Carts Found</h3>
            <p className="text-xs text-[#8B8176] mt-1 leading-relaxed">
              When shoppers add tableware to their cart and initiate checkout on your storefront, their contact info and items will automatically show here in real time.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredCarts.map((cart) => {
            const recoveryUrl = getWhatsAppRecoveryUrl(cart);
            const totalItemsCount = cart.items.reduce((s, i) => s + i.quantity, 0);

            return (
              <div
                key={cart.id}
                className={`bg-white rounded-xl border transition-all p-4 sm:p-5 shadow-sm ${
                  cart.recovered
                    ? "border-emerald-200 bg-emerald-50/20"
                    : "border-[#EADBC8] hover:border-[#6E2023]/40"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Customer & Cart Info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-xs font-semibold text-[#6E2023]">
                        {cart.id}
                      </span>

                      {cart.recovered ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Recovered
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                          <Clock className="w-3 h-3" />
                          Abandoned / Pending
                        </span>
                      )}

                      <span className="text-[11px] text-[#8B8176] flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(cart.lastActive).toLocaleString("en-IN", {
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div className="flex items-center gap-1.5 font-medium text-[#252522]">
                        <User className="w-3.5 h-3.5 text-[#8B8176]" />
                        {cart.customerName || "Anonymous Shopper"}
                      </div>

                      {cart.customerPhone ? (
                        <div className="flex items-center gap-1.5 font-mono text-[#25D366] font-semibold">
                          <Phone className="w-3.5 h-3.5" />
                          {cart.customerPhone}
                        </div>
                      ) : (
                        <span className="text-[11px] text-[#8B8176] italic">No phone entered yet</span>
                      )}

                      {cart.customerEmail && (
                        <span className="text-[#8B8176]">{cart.customerEmail}</span>
                      )}
                    </div>
                  </div>

                  {/* Cart Total & Action Buttons */}
                  <div className="flex flex-wrap items-center gap-3 lg:self-center">
                    <div className="text-right pr-2">
                      <div className="text-xs text-[#8B8176]">{totalItemsCount} pieces</div>
                      <div className="text-base sm:text-lg font-bold text-[#6E2023] font-heading">
                        {formatPrice(cart.totalEstimatedPaise)}
                      </div>
                    </div>

                    {recoveryUrl && !cart.recovered && (
                      <a
                        href={recoveryUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Send WhatsApp Recovery
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}

                    {!cart.recovered && (
                      <button
                        onClick={() => onMarkRecovered(cart.id)}
                        className="px-3 py-2 bg-stone-100 hover:bg-emerald-100 text-stone-700 hover:text-emerald-800 rounded-lg text-xs font-medium border border-stone-200 transition-colors"
                        title="Mark as recovered sale"
                      >
                        Mark Recovered
                      </button>
                    )}

                    <button
                      onClick={() => {
                        if (confirm("Delete this abandoned cart record?")) {
                          onDeleteCart(cart.id);
                        }
                      }}
                      className="p-2 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Leftout Items Carousel / Preview */}
                <div className="mt-4 pt-3 border-t border-[#EADBC8]/60 flex flex-wrap gap-2.5">
                  {cart.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 bg-[#FFF5E6]/50 border border-[#D9D0C1]/60 px-2.5 py-1.5 rounded-lg text-xs text-[#252522]"
                    >
                      {item.image && (
                        <div className="relative w-6 h-6 rounded overflow-hidden flex-shrink-0 bg-stone-100">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                            sizes="24px"
                          />
                        </div>
                      )}
                      <span className="font-medium truncate max-w-[160px] sm:max-w-[220px]">
                        {item.name}
                      </span>
                      {item.variantName && (
                        <span className="text-[10px] text-[#8B8176]">({item.variantName})</span>
                      )}
                      <span className="text-[11px] font-semibold text-[#6E2023]">
                        ×{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}