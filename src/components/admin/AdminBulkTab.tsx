"use client";

import React, { useState, useMemo } from "react";
import {
  Gift,
  Search,
  MessageSquare,
  Building2,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  Trash2,
  Sparkles,
} from "lucide-react";
import { AdminBulkInquiry, BulkInquiryStatus } from "@/lib/adminTypes";

interface AdminBulkTabProps {
  inquiries: AdminBulkInquiry[];
  onUpdateStatus: (id: string, status: BulkInquiryStatus, internalNotes?: string) => void;
  onSaveInquiry: (inquiry: AdminBulkInquiry) => void;
}

export function AdminBulkTab({
  inquiries,
  onUpdateStatus,
  onSaveInquiry,
}: AdminBulkTabProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      if (search) {
        const q = search.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchCompany = (item.company || "").toLowerCase().includes(q);
        const matchPhone = item.phone.includes(q);
        const matchProduct = item.productInterest.toLowerCase().includes(q);
        if (!matchName && !matchCompany && !matchPhone && !matchProduct) return false;
      }
      if (statusFilter !== "all" && item.status !== statusFilter) return false;
      return true;
    });
  }, [inquiries, search, statusFilter]);

  const statusStyles: Record<BulkInquiryStatus, string> = {
    new: "bg-amber-100 text-amber-800 border-amber-300",
    contacted: "bg-blue-100 text-blue-800 border-blue-300",
    sample_sent: "bg-purple-100 text-purple-800 border-purple-300",
    quote_shared: "bg-indigo-100 text-indigo-800 border-indigo-300",
    converted: "bg-emerald-100 text-emerald-800 border-emerald-300",
    closed: "bg-gray-100 text-gray-800 border-gray-300",
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-semibold">
          Corporate &amp; Wedding Bulk Gifting Leads
        </h1>
        <p className="text-xs sm:text-sm text-[#84766A]">
          Track high-volume corporate hampers, wedding favors, and custom branding inquiries.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-[#EADBC8] shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#84766A]">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by company, client name, phone or product..."
              className="w-full pl-9 pr-3 py-2 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522] placeholder-[#84766A] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
            />
          </div>

          <div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full py-2 px-3 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs text-[#252522] focus:outline-none focus:ring-1 focus:ring-[#6E2023]"
            >
              <option value="all">All Inquiry Statuses ({inquiries.length})</option>
              <option value="new">New Inquiries</option>
              <option value="contacted">Client Contacted</option>
              <option value="sample_sent">Sample Box Sent</option>
              <option value="quote_shared">Formal Quote Shared</option>
              <option value="converted">Deal Converted / Won</option>
              <option value="closed">Closed / Archived</option>
            </select>
          </div>
        </div>
      </div>

      {/* Inquiries Cards */}
      <div className="space-y-4">
        {filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-xl border border-[#EADBC8] p-12 text-center text-[#84766A] shadow-xs">
            <Gift className="w-10 h-10 text-[#CBAE9B] mx-auto mb-3" />
            <h3 className="font-heading text-lg font-medium text-[#252522]">
              No bulk gifting leads found
            </h3>
            <p className="text-xs mt-1">Check back once clients submit the bulk order form.</p>
          </div>
        ) : (
          filteredInquiries.map((item) => {
            const cleanPhone = item.phone.replace(/[^\d]/g, "");
            const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
              `Hello ${item.name}, thank you for reaching out to VITRAG Tableware & Gifting regarding your bulk gifting inquiry for "${item.productInterest}". How can we assist with samples and pricing?`
            )}`;

            return (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-[#EADBC8] shadow-xs hover:border-[#6E2023]/30 transition-all p-5 space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EADBC8]/60 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#6E2023]">
                      #{item.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                        statusStyles[item.status]
                      }`}
                    >
                      {item.status.replace("_", " ")}
                    </span>
                    <span className="text-xs text-[#84766A]">
                      Received{" "}
                      {new Date(item.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold rounded-md transition-colors self-start sm:self-auto shadow-2xs"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-white" />
                    <span>WhatsApp Client</span>
                  </a>
                </div>

                {/* Grid details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  {/* Client Info */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-[#84766A]">
                      Contact Person &amp; Organization
                    </span>
                    <p className="text-sm font-semibold text-[#252522]">
                      {item.name}
                    </p>
                    {item.company && (
                      <p className="text-xs font-medium text-[#6E2023] flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-[#CBAE9B]" />
                        <span>{item.company}</span>
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-[#84766A] pt-1">
                      <Phone className="w-3 h-3 text-[#6E2023]" />
                      <a href={`tel:${item.phone}`} className="font-mono hover:underline">
                        {item.phone}
                      </a>
                    </div>
                    {item.email && (
                      <div className="flex items-center gap-2 text-[#84766A]">
                        <Mail className="w-3 h-3 text-[#6E2023]" />
                        <span>{item.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Requirements */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-[#84766A]">
                      Project Requirements
                    </span>
                    <div>
                      <span className="text-[#84766A]">Interest: </span>
                      <strong className="text-[#252522]">{item.productInterest}</strong>
                    </div>
                    <div>
                      <span className="text-[#84766A]">Quantity: </span>
                      <strong className="text-[#6E2023]">{item.quantity}</strong>
                    </div>
                    <div>
                      <span className="text-[#84766A]">Budget Bracket: </span>
                      <strong className="text-[#252522]">{item.budgetPerGift}</strong>
                    </div>
                    {item.deliveryDate && (
                      <div className="flex items-center gap-1 text-[#84766A]">
                        <Calendar className="w-3 h-3 text-[#6E2023]" />
                        <span>Target Delivery: {item.deliveryDate}</span>
                      </div>
                    )}
                  </div>

                  {/* Pipeline Stage & Notes */}
                  <div className="space-y-2">
                    <span className="text-[10px] uppercase font-bold text-[#84766A]">
                      Pipeline Stage
                    </span>
                    <select
                      value={item.status}
                      onChange={(e) =>
                        onUpdateStatus(
                          item.id,
                          e.target.value as BulkInquiryStatus,
                          item.internalNotes
                        )
                      }
                      className="w-full p-2 bg-[#FFF5E6]/40 border border-[#D9D0C1] rounded-lg text-xs font-semibold text-[#252522] focus:ring-1 focus:ring-[#6E2023]"
                    >
                      <option value="new">New Inquiry</option>
                      <option value="contacted">Contacted via Phone/WhatsApp</option>
                      <option value="sample_sent">Sample Box Sent</option>
                      <option value="quote_shared">Formal Quote Shared</option>
                      <option value="converted">Deal Converted / Won</option>
                      <option value="closed">Closed / Not Interested</option>
                    </select>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase font-bold text-[#84766A]">
                        Internal Staff Notes
                      </label>
                      <input
                        type="text"
                        defaultValue={item.internalNotes || ""}
                        placeholder="Log meeting notes, custom logo details..."
                        onBlur={(e) => {
                          if (e.target.value !== (item.internalNotes || "")) {
                            onUpdateStatus(item.id, item.status, e.target.value);
                          }
                        }}
                        className="w-full p-2 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>

                {item.notes && (
                  <div className="bg-[#FFF5E6]/40 p-3 rounded-lg border border-[#EADBC8]/60 text-xs">
                    <span className="font-semibold text-[#6E2023]">Client Note: </span>
                    <span className="text-[#252522]">{item.notes}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
