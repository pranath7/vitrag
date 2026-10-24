"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import {
  ShoppingBag,
  Search,
  Filter,
  Plus,
  MessageSquare,
  Phone,
  Mail,
  Truck,
  CheckCircle2,
  Clock,
  Copy,
  Trash2,
  ExternalLink,
  ChevronDown,
  X,
  FileText,
  AlertCircle,
} from "lucide-react";
import { AdminOrder, OrderStatus } from "@/lib/adminTypes";
import { Product } from "@/lib/types";

interface AdminOrdersTabProps {
  orders: AdminOrder[];
  products: Product[];
  onSaveOrder: (order: AdminOrder) => void;
  onDeleteOrder: (id: string) => void;
  onUpdateStatus: (
    id: string,
    status: OrderStatus,
    extra?: { trackingNumber?: string; courierName?: string; internalNotes?: string }
  ) => void;
  openAddModal: boolean;
  setOpenAddModal: (open: boolean) => void;
}

export function AdminOrdersTab({
  orders,
  products,
  onSaveOrder,
  onDeleteOrder,
  onUpdateStatus,
  openAddModal,
  setOpenAddModal,
}: AdminOrdersTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);

  // Manual Order Form state
  const [manualForm, setManualForm] = useState<{
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    address: string;
    city: string;
    state: string;
    pinCode: string;
    giftNote: string;
    selectedProductId: string;
    quantity: number;
    totalAmountPaise: number;
    paymentMode: "whatsapp" | "upi" | "cod" | "bank_transfer";
    internalNotes: string;
    source: "Showroom Walk-in" | "Phone Order" | "WhatsApp Direct";
  }>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    address: "",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600001",
    giftNote: "",
    selectedProductId: products[0]?.id || "",
    quantity: 1,
    totalAmountPaise: products[0]?.price || 450000,
    paymentMode: "upi",
    internalNotes: "Walk-in purchase at Sowcarpet showroom.",
    source: "Showroom Walk-in",
  });

  const handleOpenAddManual = () => {
    setManualForm({
      customerName: "",
      customerPhone: "",
      customerEmail: "",
      address: "Sowcarpet Showroom Pickup",
      city: "Chennai",
      state: "Tamil Nadu",
      pinCode: "600001",
      giftNote: "",
      selectedProductId: products[0]?.id || "",
      quantity: 1,
      totalAmountPaise: products[0]?.price || 450000,
      paymentMode: "upi",
      internalNotes: "Walk-in order at Sowcarpet showroom.",
      source: "Showroom Walk-in",
    });
    setOpenAddModal(true);
  };

  const handleSaveManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.customerName.trim() || !manualForm.customerPhone.trim()) return;

    const prod = products.find((p) => p.id === manualForm.selectedProductId) || products[0];
    const orderId = `VIT-ORD-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: AdminOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customerName: manualForm.customerName,
      customerPhone: manualForm.customerPhone,
      customerEmail: manualForm.customerEmail || undefined,
      shippingAddress: manualForm.address,
      city: manualForm.city,
      state: manualForm.state,
      pinCode: manualForm.pinCode,
      giftNote: manualForm.giftNote || undefined,
      items: [
        {
          productId: prod?.id || "p1",
          name: prod?.name || "Tableware Item",
          quantity: manualForm.quantity,
          pricePaise: prod?.price || 450000,
          image: prod?.images?.[0]?.src || "/images/hero/hero-stock.jpg",
        },
      ],
      status: "paid",
      totalEstimatedPaise: manualForm.totalAmountPaise,
      paymentMode: manualForm.paymentMode,
      internalNotes: manualForm.internalNotes,
      source: manualForm.source,
    };

    onSaveOrder(newOrder);
    setOpenAddModal(false);
  };

  const handleCopyOrderSummary = (order: AdminOrder) => {
    let text = `*VITRAG TABLEWARE — ORDER SUMMARY #${order.id}*\n`;
    text += `Customer: ${order.customerName} (${order.customerPhone})\n`;
    text += `Address: ${order.shippingAddress}, ${order.city} - ${order.pinCode}\n`;
    text += `Status: ${order.status.toUpperCase()}\n\n`;
    text += `*Items:*\n`;
    order.items.forEach((item, idx) => {
      text += `${idx + 1}. ${item.name} × ${item.quantity}\n`;
    });
    text += `\n*Total Amount:* ₹${(order.totalEstimatedPaise / 100).toLocaleString("en-IN")}\n`;
    text += `*UPI ID:* 9840610405@pthdfc\n`;
    if (order.trackingNumber) {
      text += `*Tracking:* ${order.courierName || "Courier"}: ${order.trackingNumber}\n`;
    }

    navigator.clipboard.writeText(text);
    setCopyFeedback(order.id);
    setTimeout(() => setCopyFeedback(null), 2500);
  };

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      if (search) {
        const q = search.toLowerCase();
        const matchId = o.id.toLowerCase().includes(q);
        const matchName = o.customerName.toLowerCase().includes(q);
        const matchPhone = o.customerPhone.includes(q);
        const matchCity = o.city.toLowerCase().includes(q);
        if (!matchId && !matchName && !matchPhone && !matchCity) return false;
      }
      if (statusFilter !== "all" && o.status !== statusFilter) return false;
      return true;
    });
  }, [orders, search, statusFilter]);

  const statusStyles: Record<OrderStatus, string> = {
    new: "bg-amber-100 text-amber-800 border-amber-300",
    quoted: "bg-blue-100 text-blue-800 border-blue-300",
    paid: "bg-emerald-100 text-emerald-800 border-emerald-300",
    processing: "bg-indigo-100 text-indigo-800 border-indigo-300",
    dispatched: "bg-purple-100 text-purple-800 border-purple-300",
    delivered: "bg-green-100 text-green-800 border-green-300",
    cancelled: "bg-rose-100 text-rose-800 border-rose-300",
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-semibold">
            WhatsApp Orders &amp; Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-[#84766A]">
            Manage client quotes, UPI payments, courier tracking, and direct WhatsApp chats.
          </p>
        </div>

        <button
          type="button"
          onClick={handleOpenAddManual}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#6E2023] hover:bg-[#55181A] text-[#FFF5E6] rounded-lg text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-[#CBAE9B]" />
          <span>Record Walk-in / Phone Order</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#EADBC8] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Search */}
          <div className="sm:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#84766A]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by customer name, phone, order ID, city..."
              className="w-full pl-9 pr-3 py-2 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522] placeholder-[#84766A] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
            >
              <option value="all">All Statuses ({orders.length})</option>
              <option value="new">New Inquiries</option>
              <option value="quoted">Quote Sent</option>
              <option value="paid">Payment Received (UPI)</option>
              <option value="processing">In Packaging</option>
              <option value="dispatched">Dispatched (with AWB)</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Status Badges */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#EADBC8]/50 text-xs">
          <span className="text-[#84766A] mr-1 text-[11px] font-medium">Quick Filter:</span>
          {(
            [
              "all",
              "new",
              "paid",
              "processing",
              "dispatched",
              "delivered",
            ] as const
          ).map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-colors capitalize ${
                statusFilter === st
                  ? "bg-[#6E2023] text-white"
                  : "bg-[#FFF5E6] text-[#84766A] hover:text-[#252522]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#EADBC8] p-12 text-center text-[#84766A] shadow-xs">
            <ShoppingBag className="w-10 h-10 text-[#CBAE9B] mx-auto mb-3" />
            <h3 className="font-heading text-lg font-medium text-[#252522]">
              No orders matched your criteria
            </h3>
            <p className="text-xs mt-1">Try resetting the search or filter.</p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const cleanPhone = order.customerPhone.replace(/[^\d]/g, "");
            const whatsappChatUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hello ${order.customerName}, this is VITRAG Tableware & Gifting (Sowcarpet, Chennai) regarding your order ${order.id}.`
            )}`;

            return (
              <div
                key={order.id}
                className="bg-white rounded-xl border border-[#EADBC8] shadow-xs hover:border-[#6E2023]/30 transition-all overflow-hidden"
              >
                {/* Order Card Header */}
                <div className="p-4 sm:px-6 bg-[#FFF5E6]/40 border-b border-[#EADBC8]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <span className="font-mono font-bold text-sm text-[#6E2023]">
                      #{order.id}
                    </span>
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        statusStyles[order.status]
                      }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-xs text-[#84766A]">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                    <span className="text-xs text-[#84766A]">• {order.source}</span>
                  </div>

                  {/* Top Right Action Tools */}
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      type="button"
                      onClick={() => handleCopyOrderSummary(order)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-[#84766A] hover:text-[#252522] bg-white border border-[#D9D0C1] rounded-md transition-colors"
                      title="Copy formatted order summary to clipboard"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{copyFeedback === order.id ? "Copied!" : "Copy"}</span>
                    </button>

                    <a
                      href={whatsappChatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-md transition-colors shadow-2xs"
                      title="Direct Chat on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5 fill-white" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>

                {/* Order Body Details */}
                <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Customer & Delivery (5 cols) */}
                  <div className="lg:col-span-5 space-y-2 text-xs border-b lg:border-b-0 lg:border-r border-[#EADBC8]/70 pb-4 lg:pb-0 lg:pr-4">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#84766A]">
                        Customer Details
                      </span>
                      <p className="text-sm font-semibold text-[#252522]">
                        {order.customerName}
                      </p>
                      <div className="flex items-center gap-2 text-[#84766A]">
                        <Phone className="w-3 h-3 text-[#6E2023]" />
                        <a
                          href={`tel:${order.customerPhone}`}
                          className="hover:underline font-mono"
                        >
                          {order.customerPhone}
                        </a>
                      </div>
                      {order.customerEmail && (
                        <div className="flex items-center gap-2 text-[#84766A]">
                          <Mail className="w-3 h-3 text-[#6E2023]" />
                          <span>{order.customerEmail}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-[#84766A]">
                        Delivery Destination
                      </span>
                      <p className="text-[#252522] font-medium leading-relaxed">
                        {order.shippingAddress}, {order.city}, {order.state} - {order.pinCode}
                      </p>
                    </div>

                    {order.giftNote && (
                      <div className="pt-2 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                        <span className="text-[10px] uppercase font-bold text-amber-900 block">
                          Gift Note / Customer Request:
                        </span>
                        <p className="text-[11px] text-amber-800 italic mt-0.5">
                          "{order.giftNote}"
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Ordered Items (4 cols) */}
                  <div className="lg:col-span-4 space-y-3 text-xs border-b lg:border-b-0 lg:border-r border-[#EADBC8]/70 pb-4 lg:pb-0 lg:pr-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#84766A]">
                      Ordered Tableware Items
                    </span>

                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {order.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#FFF5E6]/40 border border-[#EADBC8]/50"
                        >
                          <div className="min-w-0">
                            <p className="font-semibold text-[#252522] truncate">
                              {item.name}
                            </p>
                            {item.variantName && (
                              <p className="text-[10px] text-[#84766A]">
                                {item.variantName}
                              </p>
                            )}
                          </div>
                          <span className="text-xs font-bold text-[#6E2023] shrink-0">
                            × {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#EADBC8]/50 font-semibold">
                      <span className="text-[#84766A]">Total Estimated Value:</span>
                      <span className="text-sm font-bold text-[#252522]">
                        ₹{(order.totalEstimatedPaise / 100).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>

                  {/* Order Status & Shipping Tracking Workflow (3 cols) */}
                  <div className="lg:col-span-3 space-y-3 text-xs">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#84766A]">
                      Status &amp; Courier Tracking
                    </span>

                    {/* Change Status Dropdown */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#84766A] block">
                        Update Status:
                      </label>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          onUpdateStatus(order.id, e.target.value as OrderStatus)
                        }
                        className="w-full p-2 bg-white border border-[#D9D0C1] rounded-lg text-xs font-semibold text-[#252522] focus:ring-1 focus:ring-[#6E2023]"
                      >
                        <option value="new">New Lead</option>
                        <option value="quoted">Quote Sent</option>
                        <option value="paid">Payment Received (UPI)</option>
                        <option value="processing">In Packaging</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>

                    {/* Courier Tracking Input */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#84766A] block">
                        Courier AWB / Tracking:
                      </label>
                      <input
                        type="text"
                        defaultValue={order.trackingNumber || ""}
                        placeholder="e.g. DTDC-CHN-948201"
                        onBlur={(e) => {
                          if (e.target.value !== (order.trackingNumber || "")) {
                            onUpdateStatus(order.id, order.status, {
                              trackingNumber: e.target.value,
                              courierName: order.courierName || "DTDC / Blue Dart",
                            });
                          }
                        }}
                        className="w-full p-2 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs font-mono"
                      />
                    </div>

                    {/* Internal Staff Notes */}
                    <div className="space-y-1">
                      <label className="text-[11px] text-[#84766A] block">
                        Internal Staff Note:
                      </label>
                      <input
                        type="text"
                        defaultValue={order.internalNotes || ""}
                        placeholder="Notes on packaging or payment..."
                        onBlur={(e) => {
                          if (e.target.value !== (order.internalNotes || "")) {
                            onUpdateStatus(order.id, order.status, {
                              internalNotes: e.target.value,
                            });
                          }
                        }}
                        className="w-full p-2 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522]"
                      />
                    </div>

                    {/* Delete button */}
                    <div className="pt-2 text-right">
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete order #${order.id}?`)) {
                            onDeleteOrder(order.id);
                          }
                        }}
                        className="text-xs text-rose-600 hover:text-rose-800 transition-colors inline-flex items-center gap-1"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete Order</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Manual Order Creation Modal */}
      {openAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-[#252522]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-[#EADBC8] shadow-2xl overflow-hidden my-8">
            <div className="p-5 bg-[#6E2023] text-[#FFF5E6] flex items-center justify-between">
              <div>
                <h3 className="font-heading text-lg font-semibold">
                  Record Showroom / Phone Order
                </h3>
                <p className="text-xs text-[#CBAE9B]">
                  Add an order placed by a customer in person or over the phone.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpenAddModal(false)}
                className="p-1.5 rounded-lg text-[#FFF5E6]/80 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form
              onSubmit={handleSaveManualOrder}
              className="p-6 space-y-4 max-h-[75vh] overflow-y-auto text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">
                    Customer Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualForm.customerName}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, customerName: e.target.value })
                    }
                    placeholder="e.g. Arvind Mehta"
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={manualForm.customerPhone}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, customerPhone: e.target.value })
                    }
                    placeholder="e.g. +91 98400 12345"
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522]">Email Address</label>
                <input
                  type="email"
                  value={manualForm.customerEmail}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, customerEmail: e.target.value })
                  }
                  placeholder="e.g. arvind.mehta@example.com"
                  className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2 space-y-1">
                  <label className="font-semibold text-[#252522]">Address</label>
                  <input
                    type="text"
                    value={manualForm.address}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, address: e.target.value })
                    }
                    placeholder="Street, locality or Showroom Pickup"
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">PIN Code</label>
                  <input
                    type="text"
                    value={manualForm.pinCode}
                    onChange={(e) =>
                      setManualForm({ ...manualForm, pinCode: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Product Selection */}
              <div className="space-y-1">
                <label className="font-semibold text-[#252522]">
                  Select Product Item *
                </label>
                <select
                  value={manualForm.selectedProductId}
                  onChange={(e) => {
                    const sel = products.find((p) => p.id === e.target.value);
                    setManualForm({
                      ...manualForm,
                      selectedProductId: e.target.value,
                      totalAmountPaise: (sel?.price || 450000) * manualForm.quantity,
                    });
                  }}
                  className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                >
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ₹{(p.price / 100).toLocaleString("en-IN")}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={manualForm.quantity}
                    onChange={(e) => {
                      const qty = Math.max(1, parseInt(e.target.value || "1"));
                      const sel = products.find((p) => p.id === manualForm.selectedProductId);
                      setManualForm({
                        ...manualForm,
                        quantity: qty,
                        totalAmountPaise: (sel?.price || 450000) * qty,
                      });
                    }}
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Total Amount (₹)</label>
                  <input
                    type="number"
                    value={manualForm.totalAmountPaise / 100}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        totalAmountPaise: Math.round(parseFloat(e.target.value || "0") * 100),
                      })
                    }
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Payment Mode</label>
                  <select
                    value={manualForm.paymentMode}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        paymentMode: e.target.value as any,
                      })
                    }
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  >
                    <option value="upi">UPI to 9840610405@pthdfc</option>
                    <option value="whatsapp">Direct WhatsApp Coordination</option>
                    <option value="cod">Cash at Sowcarpet Counter</option>
                    <option value="bank_transfer">Bank NEFT / RTGS</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#252522]">Order Source</label>
                  <select
                    value={manualForm.source}
                    onChange={(e) =>
                      setManualForm({
                        ...manualForm,
                        source: e.target.value as any,
                      })
                    }
                    className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                  >
                    <option value="Showroom Walk-in">Showroom Walk-in</option>
                    <option value="Phone Order">Phone Order</option>
                    <option value="WhatsApp Direct">WhatsApp Direct</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#252522]">Internal Notes</label>
                <textarea
                  rows={2}
                  value={manualForm.internalNotes}
                  onChange={(e) =>
                    setManualForm({ ...manualForm, internalNotes: e.target.value })
                  }
                  placeholder="Packaging preferences, gift ribbon, etc."
                  className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                />
              </div>

              <div className="pt-4 border-t border-[#EADBC8] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setOpenAddModal(false)}
                  className="px-4 py-2 border border-[#D9D0C1] rounded-lg text-xs font-semibold text-[#84766A] hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#6E2023] hover:bg-[#55181A] text-[#FFF5E6] rounded-lg text-xs font-semibold shadow-xs"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
