"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  checkAdminAuth,
  logoutAdmin,
  getAdminProducts,
  saveAdminProduct,
  deleteAdminProduct,
  updateProductStock,
  resetAdminProducts,
  getAdminOrders,
  saveAdminOrder,
  deleteAdminOrder,
  updateOrderStatus,
  getAdminBulkInquiries,
  updateBulkInquiryStatus,
  saveAdminBulkInquiry,
  getAdminAbandonedCarts,
  markCartRecovered,
  deleteAdminAbandonedCart,
  getAdminSettings,
  saveAdminSettings,
} from "@/lib/adminStorage";
import { Product } from "@/lib/types";
import {
  AdminOrder,
  AdminBulkInquiry,
  AdminStoreSettings,
  AbandonedCart,
  OrderStatus,
  BulkInquiryStatus,
} from "@/lib/adminTypes";
import { AdminLoginView } from "@/components/admin/AdminLoginView";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar, AdminTab } from "@/components/admin/AdminSidebar";
import { AdminDashboardTab } from "@/components/admin/AdminDashboardTab";
import { AdminAnalyticsTab } from "@/components/admin/AdminAnalyticsTab";
import { AdminProductsTab } from "@/components/admin/AdminProductsTab";
import { AdminOrdersTab } from "@/components/admin/AdminOrdersTab";
import { AdminAbandonedTab } from "@/components/admin/AdminAbandonedTab";
import { AdminBulkTab } from "@/components/admin/AdminBulkTab";
import { AdminCollectionsTab } from "@/components/admin/AdminCollectionsTab";
import { AdminSettingsTab } from "@/components/admin/AdminSettingsTab";
import { AdminBackupTab } from "@/components/admin/AdminBackupTab";
import { CheckCircle2, AlertCircle, X } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentTab, setCurrentTab] = useState<AdminTab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [bulkInquiries, setBulkInquiries] = useState<AdminBulkInquiry[]>([]);
  const [abandonedCarts, setAbandonedCarts] = useState<AbandonedCart[]>([]);
  const [settings, setSettings] = useState<AdminStoreSettings | null>(null);

  // Modals state
  const [openAddProductModal, setOpenAddProductModal] = useState(false);
  const [openAddOrderModal, setOpenAddOrderModal] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(
    null
  );

  const showToast = useCallback((text: string, type: "success" | "error" = "success") => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Refresh all state from local storage and firestore
  const refreshAllData = useCallback(() => {
    setProducts(getAdminProducts());
    setOrders(getAdminOrders());
    setBulkInquiries(getAdminBulkInquiries());
    setAbandonedCarts(getAdminAbandonedCarts());
    setSettings(getAdminSettings());
  }, []);

  // Initial check on mount
  useEffect(() => {
    const authed = checkAdminAuth();
    setIsAuthenticated(authed);
    if (authed) {
      refreshAllData();
    }
  }, [refreshAllData]);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    refreshAllData();
    showToast("Welcome to VITRAG Merchant Console!");
  };

  const handleLogout = () => {
    logoutAdmin();
    setIsAuthenticated(false);
  };

  // Product Actions
  const handleSaveProduct = (prod: Product) => {
    const updated = saveAdminProduct(prod);
    setProducts(updated);
    showToast(`Product "${prod.name}" saved successfully.`);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = deleteAdminProduct(id);
    setProducts(updated);
    showToast("Product deleted from catalog.");
  };

  const handleUpdateStock = (
    id: string,
    newStock: number,
    availability?: Product["availability"]
  ) => {
    const updated = updateProductStock(id, newStock, availability);
    setProducts(updated);
    showToast("Stock quantity updated.");
  };

  const handleResetProducts = () => {
    const reset = resetAdminProducts();
    setProducts(reset);
    showToast("Catalog reset to default 38 products.");
  };

  // Order Actions
  const handleSaveOrder = (order: AdminOrder) => {
    const updated = saveAdminOrder(order);
    setOrders(updated);
    showToast(`Order #${order.id} saved successfully.`);
  };

  const handleDeleteOrder = (id: string) => {
    const updated = deleteAdminOrder(id);
    setOrders(updated);
    showToast(`Order #${id} deleted.`);
  };

  const handleUpdateOrderStatus = (
    id: string,
    status: OrderStatus,
    extra?: { trackingNumber?: string; courierName?: string; internalNotes?: string }
  ) => {
    const updated = updateOrderStatus(id, status, extra);
    setOrders(updated);
    showToast(`Order #${id} status updated to "${status}".`);
  };

  // Bulk Inquiry Actions
  const handleUpdateBulkStatus = (
    id: string,
    status: BulkInquiryStatus,
    internalNotes?: string
  ) => {
    const updated = updateBulkInquiryStatus(id, status, internalNotes);
    setBulkInquiries(updated);
    showToast(`Bulk inquiry #${id} status updated to "${status}".`);
  };

  // Abandoned Cart Actions
  const handleMarkCartRecovered = (id: string) => {
    const updated = markCartRecovered(id);
    setAbandonedCarts(updated);
    showToast(`Cart #${id} marked as recovered!`);
  };

  const handleDeleteAbandonedCart = (id: string) => {
    const updated = deleteAdminAbandonedCart(id);
    setAbandonedCarts(updated);
    showToast("Abandoned cart record removed.");
  };

  // Settings Action
  const handleSaveSettings = (newSettings: Partial<AdminStoreSettings>) => {
    const updated = saveAdminSettings(newSettings);
    setSettings(updated);
    showToast("Store configuration saved.");
  };

  // Notification Counts
  const newOrdersCount = orders.filter((o) => o.status === "new").length;
  const newBulkCount = bulkInquiries.filter((b) => b.status === "new").length;
  const lowStockCount = products.filter(
    (p) => p.stockQuantity <= 3 || p.availability === "out-of-stock"
  ).length;
  const abandonedCount = abandonedCarts.filter((c) => !c.recovered).length;

  // Loading screen before checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#FFF5E6] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 rounded-full border-4 border-[#6E2023] border-t-transparent animate-spin mx-auto" />
          <p className="text-xs uppercase tracking-widest text-[#6E2023] font-semibold">
            Loading Merchant Console...
          </p>
        </div>
      </div>
    );
  }

  // Not authenticated screen
  if (!isAuthenticated) {
    return <AdminLoginView onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#252522] flex flex-col antialiased">
      {/* Top Navbar */}
      <AdminHeader
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        sidebarOpen={sidebarOpen}
        onLogout={handleLogout}
        pendingOrdersCount={newOrdersCount}
        lowStockCount={lowStockCount}
      />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex">
        {/* Navigation Sidebar */}
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={setCurrentTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          newOrdersCount={newOrdersCount}
          newBulkCount={newBulkCount}
          lowStockCount={lowStockCount}
          abandonedCount={abandonedCount}
        />

        {/* Content Area */}
        <main className="flex-1 lg:pl-64 min-w-0">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            {currentTab === "dashboard" && (
              <AdminDashboardTab
                products={products}
                orders={orders}
                bulkInquiries={bulkInquiries}
                onNavigateTab={setCurrentTab}
                onOpenAddProduct={() => {
                  setCurrentTab("products");
                  setOpenAddProductModal(true);
                }}
                onOpenAddOrder={() => {
                  setCurrentTab("orders");
                  setOpenAddOrderModal(true);
                }}
                onUpdateStock={handleUpdateStock}
                onUpdateOrderStatus={(id, st) => handleUpdateOrderStatus(id, st)}
              />
            )}

            {currentTab === "analytics" && (
              <AdminAnalyticsTab
                products={products}
                orders={orders}
                bulkInquiries={bulkInquiries}
              />
            )}

            {currentTab === "products" && (
              <AdminProductsTab
                products={products}
                onSaveProduct={handleSaveProduct}
                onDeleteProduct={handleDeleteProduct}
                onUpdateStock={handleUpdateStock}
                onResetProducts={handleResetProducts}
                openAddModal={openAddProductModal}
                setOpenAddModal={setOpenAddProductModal}
              />
            )}

            {currentTab === "orders" && (
              <AdminOrdersTab
                orders={orders}
                products={products}
                onSaveOrder={handleSaveOrder}
                onDeleteOrder={handleDeleteOrder}
                onUpdateStatus={handleUpdateOrderStatus}
                openAddModal={openAddOrderModal}
                setOpenAddModal={setOpenAddOrderModal}
              />
            )}

            {currentTab === "abandoned" && (
              <AdminAbandonedTab
                abandonedCarts={abandonedCarts}
                onMarkRecovered={handleMarkCartRecovered}
                onDeleteCart={handleDeleteAbandonedCart}
                onRefresh={refreshAllData}
              />
            )}

            {currentTab === "bulk" && (
              <AdminBulkTab
                inquiries={bulkInquiries}
                onUpdateStatus={handleUpdateBulkStatus}
                onSaveInquiry={(inq) => {
                  const updated = saveAdminBulkInquiry(inq);
                  setBulkInquiries(updated);
                  showToast("Bulk inquiry updated.");
                }}
              />
            )}

            {currentTab === "collections" && (
              <AdminCollectionsTab
                products={products}
                onSelectCollection={(colId) => {
                  setCurrentTab("products");
                }}
              />
            )}

            {currentTab === "settings" && settings && (
              <AdminSettingsTab
                settings={settings}
                onSaveSettings={handleSaveSettings}
              />
            )}

            {currentTab === "backup" && (
              <AdminBackupTab onRefreshAllData={refreshAllData} />
            )}
          </div>
        </main>
      </div>

      {/* Floating Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounce-in max-w-sm">
          <div
            className={`p-3.5 rounded-xl shadow-xl flex items-center gap-3 border text-xs font-semibold ${
              toast.type === "success"
                ? "bg-[#6E2023] text-[#FFF5E6] border-[#55181A]"
                : "bg-rose-700 text-white border-rose-800"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-4 h-4 text-[#25D366] shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-300 shrink-0" />
            )}
            <span className="flex-1">{toast.text}</span>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="p-1 hover:bg-white/20 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
