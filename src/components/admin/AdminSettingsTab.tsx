"use client";

import React, { useState } from "react";
import {
  Settings,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  Bell,
  Lock,
  CheckCircle2,
  AlertCircle,
  Save,
} from "lucide-react";
import { AdminStoreSettings } from "@/lib/adminTypes";

interface AdminSettingsTabProps {
  settings: AdminStoreSettings;
  onSaveSettings: (settings: Partial<AdminStoreSettings>) => void;
}

export function AdminSettingsTab({
  settings,
  onSaveSettings,
}: AdminSettingsTabProps) {
  const [formData, setFormData] = useState<AdminStoreSettings>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-semibold">
          Store &amp; Payment Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#84766A]">
          Configure Sowcarpet showroom contact, UPI payments, shipping rules, and admin security.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-semibold">
            Store settings saved successfully and updated in console storage!
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact & WhatsApp Ordering */}
        <div className="bg-white p-6 rounded-xl border border-[#EADBC8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#6E2023] font-semibold text-sm border-b border-[#EADBC8]/70 pb-3">
            <Phone className="w-4 h-4 text-[#CBAE9B]" />
            <span>Showroom Contact &amp; WhatsApp Channel</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#252522]">
                WhatsApp Number (with country code, no +) *
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) =>
                  setFormData({ ...formData, whatsappNumber: e.target.value })
                }
                className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg font-mono text-xs"
              />
              <span className="text-[10px] text-[#84766A]">
                Customer checkout orders and quote requests route here (6369142027).
              </span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#252522]">
                Display Telephone
              </label>
              <input
                type="text"
                value={formData.displayPhone}
                onChange={(e) =>
                  setFormData({ ...formData, displayPhone: e.target.value })
                }
                className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#252522]">
                Showroom Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#252522]">
                Verified UPI Destination ID *
              </label>
              <input
                type="text"
                required
                value={formData.upiId}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg font-mono font-semibold text-xs text-[#6E2023]"
              />
              <span className="text-[10px] text-[#84766A]">
                Official HDFC UPI: 9840610405@pthdfc
              </span>
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-[#252522]">
              Showroom Physical Address
            </label>
            <textarea
              rows={2}
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Shipping & Delivery Policies */}
        <div className="bg-white p-6 rounded-xl border border-[#EADBC8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#6E2023] font-semibold text-sm border-b border-[#EADBC8]/70 pb-3">
            <Truck className="w-4 h-4 text-[#CBAE9B]" />
            <span>Shipping &amp; Courier Charges</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[#252522]">
                Free Delivery Threshold (₹)
              </label>
              <input
                type="number"
                value={formData.freeShippingThresholdPaise / 100}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    freeShippingThresholdPaise: Math.round(
                      parseFloat(e.target.value || "0") * 100
                    ),
                  })
                }
                className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs font-semibold"
              />
              <span className="text-[10px] text-[#84766A]">
                Orders equal or exceeding ₹4,000 qualify for complimentary pan-India delivery.
              </span>
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[#252522]">
                Standard Courier Fee (₹)
              </label>
              <input
                type="number"
                value={formData.standardDeliveryFeePaise / 100}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    standardDeliveryFeePaise: Math.round(
                      parseFloat(e.target.value || "0") * 100
                    ),
                  })
                }
                className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Announcement Banner */}
        <div className="bg-white p-6 rounded-xl border border-[#EADBC8] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#EADBC8]/70 pb-3">
            <div className="flex items-center gap-2 text-[#6E2023] font-semibold text-sm">
              <Bell className="w-4 h-4 text-[#CBAE9B]" />
              <span>Top Announcement Bar</span>
            </div>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#252522]">
              <input
                type="checkbox"
                checked={formData.announcementEnabled}
                onChange={(e) =>
                  setFormData({ ...formData, announcementEnabled: e.target.checked })
                }
                className="w-4 h-4 text-[#6E2023] rounded focus:ring-[#6E2023]"
              />
              <span>Enable Announcement Banner</span>
            </label>
          </div>

          <div className="space-y-1 text-xs">
            <label className="font-semibold text-[#252522]">
              Banner Message Text
            </label>
            <input
              type="text"
              value={formData.announcementText}
              onChange={(e) =>
                setFormData({ ...formData, announcementText: e.target.value })
              }
              className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg text-xs"
            />
          </div>
        </div>

        {/* Security & Access */}
        <div className="bg-white p-6 rounded-xl border border-[#EADBC8] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#6E2023] font-semibold text-sm border-b border-[#EADBC8]/70 pb-3">
            <Lock className="w-4 h-4 text-[#CBAE9B]" />
            <span>Admin Console Security Passcode</span>
          </div>

          <div className="space-y-1 text-xs max-w-sm">
            <label className="font-semibold text-[#252522]">
              Console Passcode *
            </label>
            <input
              type="text"
              required
              value={formData.adminPasscode}
              onChange={(e) =>
                setFormData({ ...formData, adminPasscode: e.target.value })
              }
              className="w-full p-2.5 bg-[#FFF5E6]/30 border border-[#D9D0C1] rounded-lg font-mono text-xs"
            />
            <span className="text-[10px] text-[#84766A]">
              Default is "vitrag2026". You can update it here for showroom staff.
            </span>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6E2023] hover:bg-[#55181A] text-[#FFF5E6] font-semibold text-xs rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Store Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
