"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  X,
  ExternalLink,
  LogOut,
  Bell,
  Store,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

interface AdminHeaderProps {
  onToggleSidebar: () => void;
  sidebarOpen: boolean;
  onLogout: () => void;
  pendingOrdersCount: number;
  lowStockCount: number;
}

export function AdminHeader({
  onToggleSidebar,
  sidebarOpen,
  onLogout,
  pendingOrdersCount,
  lowStockCount,
}: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-[#6E2023] text-[#FFF5E6] border-b border-[#55181A] shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Mobile hamburger & Brand */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-lg text-[#FFF5E6]/80 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex items-center gap-2.5 group focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#FFF5E6] text-[#6E2023] flex items-center justify-center font-heading font-bold text-base shadow-sm">
                V
              </div>
              <div className="leading-tight">
                <span className="font-heading text-lg sm:text-xl font-medium tracking-wider block">
                  VITRAG
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#CBAE9B] block font-semibold">
                  Merchant Console
                </span>
              </div>
            </Link>

            <span className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#55181A] text-[#CBAE9B] border border-[#CBAE9B]/20">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
              Sowcarpet HQ • Active
            </span>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Notifications summary pill */}
          {(pendingOrdersCount > 0 || lowStockCount > 0) && (
            <div className="hidden sm:flex items-center gap-2 text-xs bg-[#55181A] px-3 py-1.5 rounded-full border border-[#CBAE9B]/20">
              {pendingOrdersCount > 0 && (
                <span className="text-amber-300 font-medium flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  {pendingOrdersCount} New Lead{pendingOrdersCount > 1 ? "s" : ""}
                </span>
              )}
              {pendingOrdersCount > 0 && lowStockCount > 0 && (
                <span className="text-[#CBAE9B]/40">•</span>
              )}
              {lowStockCount > 0 && (
                <span className="text-rose-300 font-medium">
                  {lowStockCount} Low Stock
                </span>
              )}
            </div>
          )}

          {/* View Live Storefront */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white/10 hover:bg-white/20 text-[#FFF5E6] rounded-lg transition-colors border border-white/10"
            title="Open customer storefront in a new tab"
          >
            <Store className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">View Store</span>
            <ExternalLink className="w-3 h-3 text-[#CBAE9B]" />
          </Link>

          {/* Logout / Lock button */}
          <button
            type="button"
            onClick={onLogout}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#CBAE9B] hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Lock console and sign out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
