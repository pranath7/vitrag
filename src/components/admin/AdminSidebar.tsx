"use client";

import React from "react";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  ShoppingBag,
  ShoppingCart,
  Gift,
  FolderKanban,
  Settings,
  HardDriveDownload,
  Phone,
  HelpCircle,
  ExternalLink,
} from "lucide-react";

export type AdminTab =
  | "dashboard"
  | "analytics"
  | "products"
  | "orders"
  | "abandoned"
  | "bulk"
  | "collections"
  | "settings"
  | "backup";

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  isOpen: boolean;
  onClose: () => void;
  newOrdersCount: number;
  newBulkCount: number;
  lowStockCount: number;
  abandonedCount?: number;
}

export function AdminSidebar({
  currentTab,
  onSelectTab,
  isOpen,
  onClose,
  newOrdersCount,
  newBulkCount,
  lowStockCount,
  abandonedCount = 0,
}: AdminSidebarProps) {
  const navItems: {
    id: AdminTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
  }[] = [
    {
      id: "dashboard",
      label: "Overview",
      icon: LayoutDashboard,
    },
    {
      id: "analytics",
      label: "Analytics & Trends",
      icon: BarChart3,
    },
    {
      id: "products",
      label: "Products & Stock",
      icon: Package,
      badge: lowStockCount > 0 ? lowStockCount : undefined,
      badgeColor: "bg-rose-100 text-rose-700 border-rose-200",
    },
    {
      id: "orders",
      label: "WhatsApp Orders",
      icon: ShoppingBag,
      badge: newOrdersCount > 0 ? newOrdersCount : undefined,
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
    },
    {
      id: "abandoned",
      label: "Abandoned Carts",
      icon: ShoppingCart,
      badge: abandonedCount > 0 ? abandonedCount : undefined,
      badgeColor: "bg-rose-100 text-rose-800 border-rose-200",
    },
    {
      id: "bulk",
      label: "Corporate & Wedding",
      icon: Gift,
      badge: newBulkCount > 0 ? newBulkCount : undefined,
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
    },
    {
      id: "collections",
      label: "Collections",
      icon: FolderKanban,
    },
    {
      id: "settings",
      label: "Store & UPI Config",
      icon: Settings,
    },
    {
      id: "backup",
      label: "Export & Backup",
      icon: HardDriveDownload,
    },
  ];

  const handleNavClick = (tab: AdminTab) => {
    onSelectTab(tab);
    onClose();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#252522]/50 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-[#EADBC8] flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Navigation list */}
        <div className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-[#84766A]">
            Store Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#6E2023] text-[#FFF5E6] shadow-xs"
                    : "text-[#252522] hover:bg-[#FFF5E6] hover:text-[#6E2023]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#CBAE9B]" : "text-[#84766A]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      isActive
                        ? "bg-[#FFF5E6] text-[#6E2023] border-[#FFF5E6]"
                        : item.badgeColor || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer info card */}
        <div className="p-4 border-t border-[#EADBC8] bg-[#FFF5E6]/40 text-xs text-[#84766A] space-y-2">
          <div className="flex items-center justify-between font-medium text-[#252522]">
            <span>Showroom WhatsApp</span>
            <span className="text-[#25D366] font-semibold text-[11px]">● Connected</span>
          </div>
          <p className="text-[11px] leading-tight text-[#84766A]">
            Orders &amp; inquiries redirect directly to WhatsApp (+91 63691 42027)
          </p>
          <div className="pt-1 flex items-center justify-between text-[10px] text-[#84766A]/75">
            <span>VITRAG Console v2.4</span>
            <span>Chennai, TN</span>
          </div>
        </div>
      </aside>
    </>
  );
}
