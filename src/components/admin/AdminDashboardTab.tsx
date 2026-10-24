"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Package,
  ShoppingBag,
  Gift,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  MessageSquare,
  Plus,
  FileSpreadsheet,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
} from "lucide-react";
import { Product } from "@/lib/types";
import { AdminOrder, AdminBulkInquiry } from "@/lib/adminTypes";
import { AdminTab } from "./AdminSidebar";
import { formatPrice } from "@/lib/utils";

interface AdminDashboardTabProps {
  products: Product[];
  orders: AdminOrder[];
  bulkInquiries: AdminBulkInquiry[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenAddProduct: () => void;
  onOpenAddOrder: () => void;
  onUpdateStock: (id: string, newStock: number) => void;
  onUpdateOrderStatus: (id: string, status: AdminOrder["status"]) => void;
}

export function AdminDashboardTab({
  products,
  orders,
  bulkInquiries,
  onNavigateTab,
  onOpenAddProduct,
  onOpenAddOrder,
  onUpdateStock,
  onUpdateOrderStatus,
}: AdminDashboardTabProps) {
  // Calculations
  const totalProducts = products.length;
  const inStockProducts = products.filter((p) => p.availability === "in-stock").length;
  const lowStockProducts = products.filter(
    (p) => p.stockQuantity <= 3 || p.availability === "out-of-stock"
  );
  const newOrders = orders.filter((o) => o.status === "new");
  const newBulk = bulkInquiries.filter((b) => b.status === "new");

  const totalOrderValuePaise = orders.reduce(
    (acc, o) => acc + (o.totalEstimatedPaise || 0),
    0
  );
  const bulkPipelinePaise = bulkInquiries.reduce(
    (acc, b) => acc + (b.estimatedValuePaise || 0),
    0
  );

  return (
    <div className="space-y-8">
      {/* Page Title & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-semibold">
            Merchant Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#84766A]">
            Overview of Sowcarpet showroom catalog, WhatsApp inquiries, and orders.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={onOpenAddOrder}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-[#D9D0C1] hover:border-[#6E2023] text-[#252522] rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-[#6E2023]" />
            <span>Record Walk-in Order</span>
          </button>

          <button
            type="button"
            onClick={onOpenAddProduct}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6E2023] hover:bg-[#55181A] text-[#FFF5E6] rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4 text-[#CBAE9B]" />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* Action Notification Banner if any new leads or low stock */}
      {(newOrders.length > 0 || lowStockProducts.length > 0) && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-amber-900">
                Action Items Awaiting Attention
              </h2>
              <p className="text-xs text-amber-800 mt-0.5">
                {newOrders.length > 0 && (
                  <span className="font-semibold text-amber-950">
                    {newOrders.length} new WhatsApp order{newOrders.length > 1 ? "s" : ""} require confirmation.{" "}
                  </span>
                )}
                {lowStockProducts.length > 0 && (
                  <span>
                    {lowStockProducts.length} product{lowStockProducts.length > 1 ? "s" : ""} have 3 or fewer units remaining.
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            {newOrders.length > 0 && (
              <button
                type="button"
                onClick={() => onNavigateTab("orders")}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Review Orders
              </button>
            )}
            {lowStockProducts.length > 0 && (
              <button
                type="button"
                onClick={() => onNavigateTab("products")}
                className="px-3 py-1.5 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-medium transition-colors"
              >
                Inspect Stock
              </button>
            )}
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div
          onClick={() => onNavigateTab("products")}
          className="bg-white p-5 rounded-xl border border-[#EADBC8] shadow-xs hover:border-[#6E2023]/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#84766A]">
              Active Catalog
            </span>
            <div className="p-2 rounded-lg bg-[#FFF5E6] text-[#6E2023] group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#252522]">
              {totalProducts}
            </span>
            <span className="text-xs text-[#84766A]">items</span>
          </div>
          <div className="mt-2 text-xs text-[#84766A] flex items-center justify-between">
            <span className="text-emerald-700 font-medium">
              {inStockProducts} in stock
            </span>
            <span className="text-[#6E2023] font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Manage →
            </span>
          </div>
        </div>

        {/* WhatsApp Orders */}
        <div
          onClick={() => onNavigateTab("orders")}
          className="bg-white p-5 rounded-xl border border-[#EADBC8] shadow-xs hover:border-[#6E2023]/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#84766A]">
              Orders &amp; Inquiries
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#252522]">
              {orders.length}
            </span>
            {newOrders.length > 0 && (
              <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                {newOrders.length} new
              </span>
            )}
          </div>
          <div className="mt-2 text-xs text-[#84766A] flex items-center justify-between">
            <span>₹{(totalOrderValuePaise / 100).toLocaleString("en-IN")} logged</span>
            <span className="text-[#6E2023] font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              View →
            </span>
          </div>
        </div>

        {/* Bulk & Wedding Pipeline */}
        <div
          onClick={() => onNavigateTab("bulk")}
          className="bg-white p-5 rounded-xl border border-[#EADBC8] shadow-xs hover:border-[#6E2023]/40 cursor-pointer transition-all group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#84766A]">
              Corporate &amp; Wedding
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:scale-110 transition-transform">
              <Gift className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-bold text-[#252522]">
              {bulkInquiries.length}
            </span>
            <span className="text-xs text-[#84766A]">leads</span>
          </div>
          <div className="mt-2 text-xs text-[#84766A] flex items-center justify-between">
            <span className="text-emerald-700 font-medium">
              ₹{(bulkPipelinePaise / 100).toLocaleString("en-IN")} pipeline
            </span>
            <span className="text-[#6E2023] font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Leads →
            </span>
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div
          onClick={() => onNavigateTab("products")}
          className={`bg-white p-5 rounded-xl border shadow-xs cursor-pointer transition-all group ${
            lowStockProducts.length > 0
              ? "border-rose-200 hover:border-rose-400"
              : "border-[#EADBC8] hover:border-[#6E2023]/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#84766A]">
              Stock Alerts
            </span>
            <div
              className={`p-2 rounded-lg group-hover:scale-110 transition-transform ${
                lowStockProducts.length > 0
                  ? "bg-rose-50 text-rose-700"
                  : "bg-gray-50 text-gray-600"
              }`}
            >
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span
              className={`text-2xl sm:text-3xl font-bold ${
                lowStockProducts.length > 0 ? "text-rose-700" : "text-[#252522]"
              }`}
            >
              {lowStockProducts.length}
            </span>
            <span className="text-xs text-[#84766A]">under threshold</span>
          </div>
          <div className="mt-2 text-xs text-[#84766A] flex items-center justify-between">
            <span>≤ 3 units</span>
            <span className="text-[#6E2023] font-medium group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
              Restock →
            </span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Stock Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Orders List (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#EADBC8] shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-[#EADBC8] flex items-center justify-between">
            <div>
              <h2 className="font-heading text-lg text-[#6E2023] font-semibold">
                Recent WhatsApp Orders
              </h2>
              <p className="text-xs text-[#84766A]">
                Latest customer order requests from website and WhatsApp.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("orders")}
              className="text-xs text-[#6E2023] hover:underline font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#EADBC8]/60">
            {orders.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#84766A] space-y-3">
                <ShoppingBag className="w-8 h-8 text-[#CBAE9B] mx-auto" />
                <div>
                  <p className="font-semibold text-[#252522]">No Customer Orders Yet</p>
                  <p className="text-[11px] mt-0.5">
                    Real orders placed via WhatsApp checkout or showroom walk-ins will appear here.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenAddOrder}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#6E2023] hover:bg-[#55181A] text-white rounded-lg text-xs font-medium transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Record Walk-in Order</span>
                </button>
              </div>
            ) : (
              orders.slice(0, 4).map((order) => {
                const statusColors: Record<AdminOrder["status"], string> = {
                  new: "bg-amber-100 text-amber-800 border-amber-200",
                  quoted: "bg-blue-100 text-blue-800 border-blue-200",
                  paid: "bg-emerald-100 text-emerald-800 border-emerald-200",
                  processing: "bg-indigo-100 text-indigo-800 border-indigo-200",
                  dispatched: "bg-purple-100 text-purple-800 border-purple-200",
                  delivered: "bg-green-100 text-green-800 border-green-200",
                  cancelled: "bg-rose-100 text-rose-800 border-rose-200",
                };

                const whatsappUrl = `https://wa.me/${order.customerPhone.replace(
                  /[^\d]/g,
                  ""
                )}?text=${encodeURIComponent(
                  `Hello ${order.customerName}, this is VITRAG Tableware regarding your order #${order.id}.`
                )}`;

                return (
                  <div
                    key={order.id}
                    className="p-4 hover:bg-[#FFF5E6]/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[#6E2023]">
                          {order.id}
                        </span>
                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-[11px] text-[#84766A]">
                          {new Date(order.createdAt).toLocaleDateString("en-IN", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>

                      <div className="font-medium text-sm text-[#252522]">
                        {order.customerName}{" "}
                        <span className="text-xs text-[#84766A] font-normal">
                          ({order.city})
                        </span>
                      </div>

                      <div className="text-xs text-[#84766A] line-clamp-1">
                        {order.items.map((i) => `${i.name} (×${i.quantity})`).join(", ")}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <span className="text-xs font-bold text-[#252522] mr-1">
                        ₹{(order.totalEstimatedPaise / 100).toLocaleString("en-IN")}
                      </span>

                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366] rounded-lg transition-colors"
                        title="Direct Chat on WhatsApp"
                      >
                        <MessageSquare className="w-4 h-4 fill-[#25D366]" />
                      </a>

                      <select
                        value={order.status}
                        onChange={(e) =>
                          onUpdateOrderStatus(
                            order.id,
                            e.target.value as AdminOrder["status"]
                          )
                        }
                        className="text-xs py-1 px-2 bg-white border border-[#D9D0C1] rounded-md text-[#252522] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
                      >
                        <option value="new">New</option>
                        <option value="quoted">Quoted</option>
                        <option value="paid">Paid</option>
                        <option value="processing">Processing</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Low Stock Watchlist (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#EADBC8] shadow-xs overflow-hidden flex flex-col">
          <div className="p-4 sm:p-5 border-b border-[#EADBC8] flex items-center justify-between">
            <div>
              <h2 className="font-heading text-lg text-[#6E2023] font-semibold">
                Low Stock Watchlist
              </h2>
              <p className="text-xs text-[#84766A]">
                Items requiring restock or production order.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("products")}
              className="text-xs text-[#6E2023] hover:underline font-semibold"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-[#EADBC8]/60 flex-1">
            {lowStockProducts.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#84766A] space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                <p className="font-medium text-[#252522]">Inventory in Good Health</p>
                <p>All items have sufficient stock units.</p>
              </div>
            ) : (
              lowStockProducts.slice(0, 5).map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 hover:bg-[#FFF5E6]/30 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[#FFF5E6] border border-[#EADBC8] flex items-center justify-center font-heading text-sm text-[#6E2023] font-bold shrink-0">
                      {p.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-[#252522] truncate">
                        {p.name}
                      </p>
                      <p className="text-[11px] text-[#84766A]">
                        SKU: {p.sku} • {p.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        p.stockQuantity === 0
                          ? "bg-rose-100 text-rose-700"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {p.stockQuantity} left
                    </span>

                    <button
                      type="button"
                      onClick={() => onUpdateStock(p.id, p.stockQuantity + 5)}
                      className="px-2 py-1 bg-white hover:bg-[#6E2023] hover:text-white border border-[#D9D0C1] rounded text-[11px] font-semibold text-[#252522] transition-colors"
                      title="Add 5 units of stock"
                    >
                      +5
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Corporate Gifting Pipeline Preview */}
      <div className="bg-white rounded-xl border border-[#EADBC8] shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-[#EADBC8] flex items-center justify-between">
          <div>
            <h2 className="font-heading text-lg text-[#6E2023] font-semibold">
              Corporate &amp; Wedding Gifting Pipeline
            </h2>
            <p className="text-xs text-[#84766A]">
              High-value client inquiries from companies &amp; wedding organizers.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab("bulk")}
            className="text-xs text-[#6E2023] hover:underline font-semibold flex items-center gap-1"
          >
            <span>Manage All Leads</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-[#EADBC8]/60">
          {bulkInquiries.length === 0 ? (
            <div className="p-8 text-center text-xs text-[#84766A] space-y-2">
              <Gift className="w-8 h-8 text-[#CBAE9B] mx-auto" />
              <p className="font-semibold text-[#252522]">No Corporate &amp; Wedding Leads Yet</p>
              <p className="text-[11px]">
                Inquiries submitted by clients on the /bulk-orders page will automatically log here.
              </p>
            </div>
          ) : (
            bulkInquiries.slice(0, 3).map((lead) => (
            <div
              key={lead.id}
              className="p-4 hover:bg-[#FFF5E6]/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#6E2023]">
                    {lead.id}
                  </span>
                  <span className="text-xs font-semibold text-[#252522]">
                    {lead.company || lead.name}
                  </span>
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {lead.status.replace("_", " ")}
                  </span>
                </div>
                <p className="text-xs text-[#84766A]">
                  <strong className="text-[#252522]">{lead.quantity}</strong> of {lead.productInterest} • Budget: {lead.budgetPerGift}
                </p>
                {lead.notes && (
                  <p className="text-[11px] text-[#84766A] italic line-clamp-1">
                    "{lead.notes}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <a
                  href={`https://wa.me/${lead.phone.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-medium rounded-lg transition-colors shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp Lead</span>
                </a>
              </div>
            </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
