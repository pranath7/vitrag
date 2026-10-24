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

const STORAGE_KEYS = {
  PRODUCTS: "vitrag_admin_products_v1",
  ORDERS: "vitrag_admin_orders_v1",
  BULK_INQUIRIES: "vitrag_admin_bulk_inquiries_v1",
  SETTINGS: "vitrag_admin_settings_v1",
  AUTH: "vitrag_admin_auth_v1",
};

// Seed sample orders for realistic store activity
const SEED_ORDERS: AdminOrder[] = [
  {
    id: "VIT-ORD-1048",
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    customerName: "Dr. Ananya Sundaram",
    customerPhone: "+91 98401 23456",
    customerEmail: "ananya.sundaram@gmail.com",
    shippingAddress: "Flat 4B, Ceebros Heritage, Eldams Road, Alwarpet",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600018",
    giftNote: "Please pack with extra protective bubble wrap and luxury maroon gift ribbon.",
    items: [
      {
        productId: "p1",
        name: "Imperial Jade Handcrafted Porcelain Dinner Set",
        variantName: "24-Piece Dinner Set",
        quantity: 1,
        pricePaise: 1850000,
        image: "/images/hero/hero-stock.jpg",
      },
      {
        productId: "p6",
        name: "Lotus Petal Snack & Dessert Bowls",
        variantName: "Set of 6",
        quantity: 2,
        pricePaise: 320000,
        image: "/images/hero/hero-stock.jpg",
      },
    ],
    status: "paid",
    totalEstimatedPaise: 2490000,
    paymentMode: "upi",
    paymentReference: "UPI Ref: 429810482910 via 9840610405@pthdfc",
    internalNotes: "Payment verified on HDFC UPI app. Ready for gift packing.",
    source: "Website Checkout",
  },
  {
    id: "VIT-ORD-1047",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    customerName: "Rajesh Kothari",
    customerPhone: "+91 94440 98712",
    customerEmail: "rajesh.kothari@kotharitraders.in",
    shippingAddress: "32 Ormes Road, Opp. Bhavan's School, Kilpauk",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600010",
    giftNote: "Diwali family gift hampers.",
    items: [
      {
        productId: "p3",
        name: "Artisanal Sheesham Brass Inlay Dry-Fruit Box",
        variantName: "4-Compartment Velvet Lined",
        quantity: 4,
        pricePaise: 360000,
        image: "/images/hero/hero-stock.jpg",
      },
    ],
    status: "dispatched",
    totalEstimatedPaise: 1440000,
    paymentMode: "upi",
    paymentReference: "UPI Ref: 429800192831",
    courierName: "DTDC Express",
    trackingNumber: "DTDC-CHN-948201",
    dispatchDate: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    internalNotes: "Shipped in double-corrugated carton with unboxing video reminder seal.",
    source: "WhatsApp Direct",
  },
  {
    id: "VIT-ORD-1046",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(), // 18 hours ago
    customerName: "Pooja V. Narayanan",
    customerPhone: "+91 98840 55671",
    customerEmail: "pooja.v.narayanan@gmail.com",
    shippingAddress: "Tower 2, Apt 1104, Ozone Greens, Perumbakkam",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600100",
    items: [
      {
        productId: "p2",
        name: "Royal Cobalt Fluted Ceramic Platter",
        variantName: "14-Inch Oval Serving Platter",
        quantity: 2,
        pricePaise: 420000,
        image: "/images/hero/hero-stock.jpg",
      },
    ],
    status: "processing",
    totalEstimatedPaise: 840000,
    paymentMode: "upi",
    paymentReference: "GPay UPI: 429761928301",
    internalNotes: "Quality check passed. Fragile wrapping completed.",
    source: "Website Checkout",
  },
  {
    id: "VIT-ORD-1045",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString(), // Yesterday
    customerName: "Vikram Singhania",
    customerPhone: "+91 98200 44129",
    customerEmail: "vikram@singhaniagroup.com",
    shippingAddress: "B-202 Silver Arc, Harrington Road, Chetpet",
    city: "Chennai",
    state: "Tamil Nadu",
    pinCode: "600031",
    giftNote: "Corporate client token of appreciation.",
    items: [
      {
        productId: "p4",
        name: "Celadon Glazed Ceramic Platter with Gold Edging",
        variantName: "16-Inch Round Centerpiece",
        quantity: 1,
        pricePaise: 580000,
        image: "/images/hero/hero-stock.jpg",
      },
    ],
    status: "new",
    totalEstimatedPaise: 580000,
    paymentMode: "whatsapp",
    internalNotes: "Inquired via WhatsApp for same-day delivery to Chetpet.",
    source: "Website Checkout",
  },
  {
    id: "VIT-ORD-1044",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // 2 days ago
    customerName: "Meera & Siddharth Raghavan",
    customerPhone: "+91 99001 77654",
    customerEmail: "meera.raghavan@outlook.com",
    shippingAddress: "Villa 14, Prestige Silver Oak, Whitefield",
    city: "Bengaluru",
    state: "Karnataka",
    pinCode: "560066",
    giftNote: "Wedding return gift trial sample.",
    items: [
      {
        productId: "p5",
        name: "24K Gold-Rimmed Porcelain Katori Bowl Set",
        variantName: "Set of 6",
        quantity: 2,
        pricePaise: 290000,
        image: "/images/hero/hero-stock.jpg",
      },
    ],
    status: "delivered",
    totalEstimatedPaise: 580000,
    paymentMode: "upi",
    paymentReference: "UPI Ref: 429618291029",
    courierName: "Blue Dart Express",
    trackingNumber: "BLUEDART-BLR-77281",
    internalNotes: "Customer confirmed delivery and praised packaging. Wedding bulk order pending.",
    source: "WhatsApp Direct",
  },
];

// Seed sample bulk gifting inquiries
const SEED_BULK_INQUIRIES: AdminBulkInquiry[] = [
  {
    id: "VIT-BULK-201",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    name: "Suresh Balakrishnan",
    company: "TVS Motor Corporate Office",
    phone: "+91 98410 77123",
    email: "suresh.b@tvsmotor.com",
    productInterest: "Handcrafted Sheesham Dry-Fruit Boxes with Custom Brass Crest",
    quantity: "150 units",
    budgetPerGift: "₹2,000 – ₹3,500 per gift",
    deliveryDate: "2026-11-10",
    pinCode: "600006",
    notes: "Requires custom laser engraving of corporate logo on the brass latch. Need physical sample to show director.",
    status: "sample_sent",
    estimatedValuePaise: 37500000, // ₹3,75,000
    internalNotes: "Sample box dispatched via Dunzo to TVS office. Meeting scheduled for Friday.",
  },
  {
    id: "VIT-BULK-202",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
    name: "Kavitha Sundar",
    company: "Sundar & Co. Wedding Planners",
    phone: "+91 98844 11982",
    email: "kavitha@sundarweddings.in",
    productInterest: "Curated 6-Piece Ceramic Katori & Sweet Platter Sets",
    quantity: "300 units",
    budgetPerGift: "₹1,500 – ₹2,000 per gift",
    deliveryDate: "2026-12-05",
    pinCode: "600028",
    notes: "Destination wedding at Mahabalipuram. Needs traditional gold and burgundy gift wrapping.",
    status: "quote_shared",
    estimatedValuePaise: 52500000, // ₹5,25,000
    internalNotes: "Formal PDF quote sent on WhatsApp. Follow up on Tuesday.",
  },
  {
    id: "VIT-BULK-203",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
    name: "Anand Rangarajan",
    company: "Apex Healthcare Pvt Ltd",
    phone: "+91 97909 33211",
    email: "anand.r@apexhealthcare.in",
    productInterest: "Signature Ceramic Tea & Coffee Cups Set with Coasters",
    quantity: "80 units",
    budgetPerGift: "₹1,000 – ₹1,500 per gift",
    deliveryDate: "2026-11-20",
    pinCode: "600034",
    notes: "Doctor's day appreciation gifting for senior consultants.",
    status: "new",
    estimatedValuePaise: 9600000, // ₹96,000
    internalNotes: "Fresh lead from bulk orders form.",
  },
];

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

// ----------------------------------------------------
// PRODUCT CRUD
// ----------------------------------------------------
export function getAdminProducts(): Product[] {
  if (!isBrowser()) return defaultProducts;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      // First time initialization
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
// ORDERS CRUD
// ----------------------------------------------------
export function getAdminOrders(): AdminOrder[] {
  if (!isBrowser()) return SEED_ORDERS;
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
// BULK INQUIRIES CRUD
// ----------------------------------------------------
export function getAdminBulkInquiries(): AdminBulkInquiry[] {
  if (!isBrowser()) return SEED_BULK_INQUIRIES;
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
    const auth = sessionStorage.getItem(STORAGE_KEYS.AUTH) || localStorage.getItem(STORAGE_KEYS.AUTH);
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
