"use client";

import { products as defaultProducts } from "./products";
import { siteConfig } from "./config";
import { Product } from "./types";
import {
  AdminOrder,
  AdminBulkInquiry,
  AdminStoreSettings,
  OrderStatus,
  BulkInquiryStatus,
} from "./adminTypes";

// Versioned storage keys - clean start with no fake data
const STORAGE_KEYS = {
  PRODUCTS: "vitrag_admin_products_v2",
  ORDERS: "vitrag_admin_orders_v2",
  BULK_INQUIRIES: "vitrag_admin_bulk_inquiries_v2",
  SETTINGS: "vitrag_admin_settings_v2",
  AUTH: "vitrag_admin_auth_v2",
};

// No fake orders - starts completely clean for real customer activity
const SEED_ORDERS: AdminOrder[] = [];

// No fake bulk leads - starts completely clean for real corporate inquiries
const SEED_BULK_INQUIRIES: AdminBulkInquiry[] = [];

const DEFAULT_SETTINGS: AdminStoreSettings = {
  whatsappNumber: siteConfig.contact.whatsappNumber || "916369142027",
  displayPhone: siteConfig.contact.displayPhone || "+91 63691 42027",
  email: siteConfig.contact.email || "pranathwork@gmail.com",
  upiId: siteConfig.contact.upiId || "9840610405@pthdfc",
  address: siteConfig.contact.address || "Patni Plaza, Shop No. 3, NSC Bose Road, Sowcarpet, Chennai, Tamil Nadu 600001",
  announcementText: siteConfig.announcement.text || "Complimentary Pan-India Delivery on orders above ₹4,000 • Direct WhatsApp Ordering",
  announcementEnabled: siteConfig.announcement.enabled ?? true,
  freeShippingThresholdPaise: siteConfig.shipping.freeShippingThresholdPaise || 400000,
  standardDeliveryFeePaise: siteConfig.shipping.standardDeliveryFeePaise || 19900,
  adminPasscode: "vitrag2026",
  storeCurrency: "INR",
};

// Safe helper for window.localStorage
function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// Clean up any legacy dummy v1 test keys from user browser
function cleanupLegacyV1Storage(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem("vitrag_admin_products_v1");
    localStorage.removeItem("vitrag_admin_orders_v1");
    localStorage.removeItem("vitrag_admin_bulk_inquiries_v1");
    localStorage.removeItem("vitrag_admin_settings_v1");
    localStorage.removeItem("vitrag_admin_auth_v1");
  } catch {}
}

// ----------------------------------------------------
// PRODUCT CRUD
// ----------------------------------------------------
export function getAdminProducts(): Product[] {
  if (!isBrowser()) return defaultProducts;
  cleanupLegacyV1Storage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      // First time initialization with real catalog products
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
      return defaultProducts;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProducts;
  } catch (err) {
    console.error("Error reading admin products from storage:", err);
    return defaultProducts;
  }
}

export function saveAdminProduct(product: Product): Product[] {
  if (!isBrowser()) return [product];
  const current = getAdminProducts();
  const index = current.findIndex((p) => p.id === product.id);
  let updated: Product[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = { ...product, updatedAt: new Date().toISOString() };
  } else {
    updated = [{ ...product, createdAt: new Date().toISOString() }, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving product to storage:", err);
  }
  return updated;
}

export function deleteAdminProduct(id: string): Product[] {
  if (!isBrowser()) return [];
  const current = getAdminProducts();
  const updated = current.filter((p) => p.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error deleting product from storage:", err);
  }
  return updated;
}

export function updateProductStock(
  id: string,
  stockQuantity: number,
  availability?: Product["availability"]
): Product[] {
  if (!isBrowser()) return [];
  const current = getAdminProducts();
  const updated = current.map((p) => {
    if (p.id === id) {
      let nextAvail = availability;
      if (!nextAvail) {
        if (stockQuantity <= 0) nextAvail = "out-of-stock";
        else nextAvail = "in-stock";
      }
      return {
        ...p,
        stockQuantity,
        availability: nextAvail,
        updatedAt: new Date().toISOString(),
      };
    }
    return p;
  });

  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error updating stock in storage:", err);
  }
  return updated;
}

export function resetAdminProducts(): Product[] {
  if (!isBrowser()) return defaultProducts;
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(defaultProducts));
  } catch (err) {
    console.error("Error resetting products in storage:", err);
  }
  return defaultProducts;
}

// ----------------------------------------------------
// ORDERS CRUD (Real orders only)
// ----------------------------------------------------
export function getAdminOrders(): AdminOrder[] {
  if (!isBrowser()) return SEED_ORDERS;
  cleanupLegacyV1Storage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(SEED_ORDERS));
      return SEED_ORDERS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_ORDERS;
  } catch (err) {
    console.error("Error reading admin orders:", err);
    return SEED_ORDERS;
  }
}

export function saveAdminOrder(order: AdminOrder): AdminOrder[] {
  if (!isBrowser()) return [order];
  const current = getAdminOrders();
  const index = current.findIndex((o) => o.id === order.id);
  let updated: AdminOrder[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = order;
  } else {
    updated = [order, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving admin order:", err);
  }
  return updated;
}

export function deleteAdminOrder(id: string): AdminOrder[] {
  if (!isBrowser()) return [];
  const current = getAdminOrders();
  const updated = current.filter((o) => o.id !== id);
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error deleting order:", err);
  }
  return updated;
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus,
  extra?: { trackingNumber?: string; courierName?: string; internalNotes?: string }
): AdminOrder[] {
  if (!isBrowser()) return [];
  const current = getAdminOrders();
  const updated = current.map((order) => {
    if (order.id === id) {
      return {
        ...order,
        status,
        ...(extra?.trackingNumber ? { trackingNumber: extra.trackingNumber } : {}),
        ...(extra?.courierName ? { courierName: extra.courierName } : {}),
        ...(extra?.internalNotes !== undefined ? { internalNotes: extra.internalNotes } : {}),
        ...(status === "dispatched" && !order.dispatchDate
          ? { dispatchDate: new Date().toISOString() }
          : {}),
      };
    }
    return order;
  });

  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error updating order status:", err);
  }
  return updated;
}

// ----------------------------------------------------
// BULK INQUIRIES CRUD (Real inquiries only)
// ----------------------------------------------------
export function getAdminBulkInquiries(): AdminBulkInquiry[] {
  if (!isBrowser()) return SEED_BULK_INQUIRIES;
  cleanupLegacyV1Storage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BULK_INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.BULK_INQUIRIES, JSON.stringify(SEED_BULK_INQUIRIES));
      return SEED_BULK_INQUIRIES;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : SEED_BULK_INQUIRIES;
  } catch (err) {
    console.error("Error reading bulk inquiries:", err);
    return SEED_BULK_INQUIRIES;
  }
}

export function saveAdminBulkInquiry(inquiry: AdminBulkInquiry): AdminBulkInquiry[] {
  if (!isBrowser()) return [inquiry];
  const current = getAdminBulkInquiries();
  const index = current.findIndex((i) => i.id === inquiry.id);
  let updated: AdminBulkInquiry[];

  if (index >= 0) {
    updated = [...current];
    updated[index] = inquiry;
  } else {
    updated = [inquiry, ...current];
  }

  try {
    localStorage.setItem(STORAGE_KEYS.BULK_INQUIRIES, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving bulk inquiry:", err);
  }
  return updated;
}

export function updateBulkInquiryStatus(
  id: string,
  status: BulkInquiryStatus,
  internalNotes?: string
): AdminBulkInquiry[] {
  if (!isBrowser()) return [];
  const current = getAdminBulkInquiries();
  const updated = current.map((item) => {
    if (item.id === id) {
      return {
        ...item,
        status,
        ...(internalNotes !== undefined ? { internalNotes } : {}),
      };
    }
    return item;
  });

  try {
    localStorage.setItem(STORAGE_KEYS.BULK_INQUIRIES, JSON.stringify(updated));
  } catch (err) {
    console.error("Error updating bulk inquiry status:", err);
  }
  return updated;
}

// ----------------------------------------------------
// SETTINGS
// ----------------------------------------------------
export function getAdminSettings(): AdminStoreSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS;
  cleanupLegacyV1Storage();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
      return DEFAULT_SETTINGS;
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch (err) {
    console.error("Error reading admin settings:", err);
    return DEFAULT_SETTINGS;
  }
}

export function saveAdminSettings(settings: Partial<AdminStoreSettings>): AdminStoreSettings {
  if (!isBrowser()) return DEFAULT_SETTINGS;
  const current = getAdminSettings();
  const updated = { ...current, ...settings };
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
  } catch (err) {
    console.error("Error saving admin settings:", err);
  }
  return updated;
}

// ----------------------------------------------------
// AUTHENTICATION & SESSION
// ----------------------------------------------------
export function checkAdminAuth(): boolean {
  if (!isBrowser()) return false;
  try {
    const auth =
      sessionStorage.getItem(STORAGE_KEYS.AUTH) ||
      localStorage.getItem(STORAGE_KEYS.AUTH) ||
      sessionStorage.getItem("vitrag_admin_auth_v1") ||
      localStorage.getItem("vitrag_admin_auth_v1");
    return auth === "authenticated_true";
  } catch {
    return false;
  }
}

export function loginAdmin(passcode: string, remember: boolean = true): { success: boolean; error?: string } {
  if (!isBrowser()) return { success: false, error: "Browser environment required." };
  const settings = getAdminSettings();
  const validCode = settings.adminPasscode || "vitrag2026";

  if (passcode.trim() === validCode) {
    try {
      if (remember) {
        localStorage.setItem(STORAGE_KEYS.AUTH, "authenticated_true");
      }
      sessionStorage.setItem(STORAGE_KEYS.AUTH, "authenticated_true");
    } catch {}
    return { success: true };
  }

  return { success: false, error: "Incorrect admin passcode. Try 'vitrag2026'." };
}

export function logoutAdmin(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    sessionStorage.removeItem(STORAGE_KEYS.AUTH);
    localStorage.removeItem("vitrag_admin_auth_v1");
    sessionStorage.removeItem("vitrag_admin_auth_v1");
  } catch {}
}

// ----------------------------------------------------
// EXPORT & BACKUP HELPERS
// ----------------------------------------------------
export function exportDataAsJSON(): string {
  const data = {
    exportDate: new Date().toISOString(),
    store: "VITRAG Tableware & Gifting",
    products: getAdminProducts(),
    orders: getAdminOrders(),
    bulkInquiries: getAdminBulkInquiries(),
    settings: getAdminSettings(),
  };
  return JSON.stringify(data, null, 2);
}

export function exportOrdersCSV(): string {
  const orders = getAdminOrders();
  const headers = [
    "Order ID",
    "Date",
    "Customer Name",
    "Phone",
    "Email",
    "City",
    "Items Count",
    "Total (INR)",
    "Status",
    "Payment Mode",
    "Courier",
    "Tracking Number",
  ];

  const rows = orders.map((o) => [
    `"${o.id}"`,
    `"${new Date(o.createdAt).toLocaleDateString("en-IN")}"`,
    `"${o.customerName.replace(/"/g, '""')}"`,
    `"${o.customerPhone}"`,
    `"${o.customerEmail || ""}"`,
    `"${o.city}"`,
    o.items.reduce((sum, item) => sum + item.quantity, 0),
    (o.totalEstimatedPaise / 100).toFixed(2),
    `"${o.status}"`,
    `"${o.paymentMode}"`,
    `"${o.courierName || ""}"`,
    `"${o.trackingNumber || ""}"`,
  ]);

  return [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
}
