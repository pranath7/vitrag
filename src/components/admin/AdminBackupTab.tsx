"use client";

import React, { useState } from "react";
import {
  HardDriveDownload,
  FileSpreadsheet,
  FileCode,
  UploadCloud,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Database,
  CloudUpload,
  Loader2,
} from "lucide-react";
import {
  exportDataAsJSON,
  exportOrdersCSV,
  resetAdminProducts,
  getAdminProducts,
} from "@/lib/adminStorage";
import { seedAllProductsToFirestore } from "@/lib/firestoreService";
import { isFirebaseConfigured } from "@/lib/firebase";

interface AdminBackupTabProps {
  onRefreshAllData: () => void;
}

export function AdminBackupTab({ onRefreshAllData }: AdminBackupTabProps) {
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const [syncingFirestore, setSyncingFirestore] = useState(false);

  const handleSyncFirestore = async () => {
    if (!isFirebaseConfigured()) {
      setStatusMessage({
        type: "error",
        text: "Firebase is not configured. Please ensure NEXT_PUBLIC_FIREBASE_PROJECT_ID and API key are set.",
      });
      return;
    }

    try {
      setSyncingFirestore(true);
      const prods = getAdminProducts();
      const res = await seedAllProductsToFirestore(prods);
      if (res.success) {
        setStatusMessage({
          type: "success",
          text: `Successfully synced all ${prods.length} real tableware products directly to your Cloud Firestore database!`,
        });
      } else {
        setStatusMessage({
          type: "error",
          text: `Firestore sync failed: ${res.error || "Permission denied. Check that rules are published in Firebase Console."}`,
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: "Error syncing to Firestore: " + (err?.message || String(err)),
      });
    } finally {
      setSyncingFirestore(false);
    }
  };

  const handleDownloadJSON = () => {
    try {
      const dataStr = exportDataAsJSON();
      const blob = new Blob([dataStr], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vitrag-backup-${new Date().toISOString().slice(0, 10)}.json`;
      link.click();
      URL.revokeObjectURL(url);
      setStatusMessage({
        type: "success",
        text: "Store backup JSON generated and downloaded successfully.",
      });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Failed to generate JSON backup: " + String(err),
      });
    }
  };

  const handleDownloadCSV = () => {
    try {
      const csvStr = exportOrdersCSV();
      const blob = new Blob([csvStr], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vitrag-orders-${new Date().toISOString().slice(0, 10)}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      setStatusMessage({
        type: "success",
        text: "Orders CSV generated and downloaded. Open with Excel or Google Sheets.",
      });
    } catch (err) {
      setStatusMessage({
        type: "error",
        text: "Failed to generate CSV: " + String(err),
      });
    }
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);

        if (parsed.products && Array.isArray(parsed.products)) {
          localStorage.setItem("vitrag_admin_products_v2", JSON.stringify(parsed.products));
        }
        if (parsed.orders && Array.isArray(parsed.orders)) {
          localStorage.setItem("vitrag_admin_orders_v2", JSON.stringify(parsed.orders));
        }
        if (parsed.bulkInquiries && Array.isArray(parsed.bulkInquiries)) {
          localStorage.setItem("vitrag_admin_bulk_inquiries_v2", JSON.stringify(parsed.bulkInquiries));
        }
        if (parsed.abandonedCarts && Array.isArray(parsed.abandonedCarts)) {
          localStorage.setItem("vitrag_admin_abandoned_carts_v2", JSON.stringify(parsed.abandonedCarts));
        }
        if (parsed.settings) {
          localStorage.setItem("vitrag_admin_settings_v2", JSON.stringify(parsed.settings));
        }

        onRefreshAllData();
        setStatusMessage({
          type: "success",
          text: "Backup file successfully restored into local database!",
        });
      } catch (err) {
        setStatusMessage({
          type: "error",
          text: "Invalid JSON backup file: " + String(err),
        });
      }
    };
    reader.readAsText(file);
  };

  const handleResetCatalog = () => {
    if (
      confirm(
        "Are you sure you want to reset all products back to original codebase catalog? Any custom edits to stock and items will be restored."
      )
    ) {
      resetAdminProducts();
      onRefreshAllData();
      setStatusMessage({
        type: "success",
        text: "Catalog restored to default 10 authentic products from codebase.",
      });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Top Header */}
      <div>
        <h1 className="font-heading text-2xl sm:text-3xl text-[#6E2023] font-semibold">
          Data Export &amp; Backup
        </h1>
        <p className="text-xs sm:text-sm text-[#84766A]">
          Export orders to Excel/CSV, generate JSON store snapshots, or restore catalog.
        </p>
      </div>

      {statusMessage && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center gap-2 shadow-xs ${
            statusMessage.type === "success"
              ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
              : "bg-rose-50 border border-rose-200 text-rose-800"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span className="font-semibold">{statusMessage.text}</span>
        </div>
      )}

      {/* Export & Cloud Sync Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* CSV Orders Export */}
        <div className="bg-white p-5 rounded-xl border border-[#EADBC8] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-semibold text-[#252522]">
              Export Orders to CSV
            </h3>
            <p className="text-xs text-[#84766A] leading-relaxed">
              Download customer orders, delivery addresses, phone numbers, and courier tracking formatted for Excel.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadCSV}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Download Orders.csv</span>
          </button>
        </div>

        {/* JSON Full Backup */}
        <div className="bg-white p-5 rounded-xl border border-[#EADBC8] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-semibold text-[#252522]">
              Store JSON Snapshot
            </h3>
            <p className="text-xs text-[#84766A] leading-relaxed">
              Export an exhaustive JSON snapshot of all products, stock levels, orders, inquiries, and settings.
            </p>
          </div>

          <button
            type="button"
            onClick={handleDownloadJSON}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#6E2023] hover:bg-[#55181A] text-[#FFF5E6] rounded-lg text-xs font-semibold shadow-xs transition-colors"
          >
            <HardDriveDownload className="w-4 h-4" />
            <span>Download vitrag-backup.json</span>
          </button>
        </div>

        {/* Cloud Firestore Live Sync */}
        <div className="bg-white p-5 rounded-xl border border-[#EADBC8] shadow-xs space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <CloudUpload className="w-5 h-5" />
            </div>
            <h3 className="font-heading text-base font-semibold text-[#252522]">
              Sync Products to Firestore
            </h3>
            <p className="text-xs text-[#84766A] leading-relaxed">
              Push your authentic tableware catalog directly into your newly configured Cloud Firestore database.
            </p>
          </div>

          <button
            type="button"
            onClick={handleSyncFirestore}
            disabled={syncingFirestore}
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-amber-600 hover:bg-amber-700 disabled:opacity-50 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {syncingFirestore ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Syncing Catalog...</span>
              </>
            ) : (
              <>
                <CloudUpload className="w-4 h-4" />
                <span>Seed Firestore Products</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Restore & Danger Zone */}
      <div className="bg-white p-6 rounded-xl border border-[#EADBC8] shadow-xs space-y-5">
        <div className="flex items-center gap-2 text-[#6E2023] font-semibold text-sm border-b border-[#EADBC8]/70 pb-3">
          <Database className="w-4 h-4 text-[#CBAE9B]" />
          <span>Restore &amp; Catalog Maintenance</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
          {/* Import JSON */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#252522]">Restore from JSON Backup</h4>
            <p className="text-[#84766A]">
              Upload a previously exported backup file to restore catalog items and inquiry logs.
            </p>
            <label className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-[#D9D0C1] hover:border-[#6E2023] text-[#252522] rounded-lg text-xs font-semibold cursor-pointer shadow-xs transition-colors">
              <UploadCloud className="w-4 h-4 text-[#6E2023]" />
              <span>Select Backup JSON File</span>
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
              />
            </label>
          </div>

          {/* Reset catalog */}
          <div className="space-y-2">
            <h4 className="font-semibold text-[#252522]">Factory Catalog Reset</h4>
            <p className="text-[#84766A]">
              Reset the store catalog back to the original 38 products from the codebase.
            </p>
            <button
              type="button"
              onClick={handleResetCatalog}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Products to Defaults</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
