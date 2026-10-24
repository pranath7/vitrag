"use client";

import { db, isFirebaseConfigured } from "./firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { Product } from "./types";
import {
  AdminOrder,
  AdminBulkInquiry,
  AdminStoreSettings,
  AbandonedCart,
} from "./adminTypes";

// ------------------------------------------------------------------
// Real-time Firestore or Local Storage Unified Operations
// ------------------------------------------------------------------

export async function fetchFirestoreProducts(): Promise<Product[] | null> {
  if (!isFirebaseConfigured() || !db) return null;
  try {
    const colRef = collection(db, "products");
    const snap = await getDocs(colRef);
    if (snap.empty) return null;
    return snap.docs.map((d) => d.data() as Product);
  } catch (err) {
    console.warn("Firestore fetchProducts error:", err);
    return null;
  }
}

export async function syncProductToFirestore(product: Product): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    const docRef = doc(db, "products", product.id);
    await setDoc(docRef, { ...product, updatedAt: new Date().toISOString() }, { merge: true });
  } catch (err) {
    console.warn("Firestore syncProduct error:", err);
  }
}

export async function seedAllProductsToFirestore(
  products: Product[]
): Promise<{ success: boolean; error?: string }> {
  if (!isFirebaseConfigured() || !db) {
    return { success: false, error: "Firebase credentials not configured." };
  }
  try {
    for (const prod of products) {
      const docRef = doc(db, "products", prod.id);
      await setDoc(docRef, { ...prod, updatedAt: new Date().toISOString() }, { merge: true });
    }
    return { success: true };
  } catch (err: any) {
    console.error("Firestore seed error:", err);
    return { success: false, error: err?.message || String(err) };
  }
}

export async function deleteProductFromFirestore(id: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    await deleteDoc(doc(db, "products", id));
  } catch (err) {
    console.warn("Firestore deleteProduct error:", err);
  }
}

// ------------------------------------------------------------------
// Orders Sync
// ------------------------------------------------------------------

export async function fetchFirestoreOrders(): Promise<AdminOrder[] | null> {
  if (!isFirebaseConfigured() || !db) return null;
  try {
    const colRef = collection(db, "orders");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as AdminOrder);
  } catch (err) {
    console.warn("Firestore fetchOrders error:", err);
    return null;
  }
}

export async function syncOrderToFirestore(order: AdminOrder): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    const docRef = doc(db, "orders", order.id);
    await setDoc(docRef, order, { merge: true });
  } catch (err) {
    console.warn("Firestore syncOrder error:", err);
  }
}

export async function deleteOrderFromFirestore(id: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    await deleteDoc(doc(db, "orders", id));
  } catch (err) {
    console.warn("Firestore deleteOrder error:", err);
  }
}

// ------------------------------------------------------------------
// Abandoned / Leftout Carts
// ------------------------------------------------------------------

export async function fetchFirestoreAbandonedCarts(): Promise<AbandonedCart[] | null> {
  if (!isFirebaseConfigured() || !db) return null;
  try {
    const colRef = collection(db, "abandoned_carts");
    const q = query(colRef, orderBy("lastActive", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as AbandonedCart);
  } catch (err) {
    console.warn("Firestore fetchAbandonedCarts error:", err);
    return null;
  }
}

export async function syncAbandonedCartToFirestore(cart: AbandonedCart): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    const docRef = doc(db, "abandoned_carts", cart.id);
    await setDoc(docRef, cart, { merge: true });
  } catch (err) {
    console.warn("Firestore syncAbandonedCart error:", err);
  }
}

export async function markAbandonedCartRecovered(cartId: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    const docRef = doc(db, "abandoned_carts", cartId);
    await setDoc(docRef, { recovered: true, recoveryMessageSent: true }, { merge: true });
  } catch (err) {
    console.warn("Firestore markRecovered error:", err);
  }
}

export async function deleteAbandonedCartFromFirestore(cartId: string): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    await deleteDoc(doc(db, "abandoned_carts", cartId));
  } catch (err) {
    console.warn("Firestore deleteAbandonedCart error:", err);
  }
}

// ------------------------------------------------------------------
// Bulk Inquiries
// ------------------------------------------------------------------

export async function fetchFirestoreBulkInquiries(): Promise<AdminBulkInquiry[] | null> {
  if (!isFirebaseConfigured() || !db) return null;
  try {
    const colRef = collection(db, "bulk_inquiries");
    const q = query(colRef, orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => d.data() as AdminBulkInquiry);
  } catch (err) {
    console.warn("Firestore fetchBulkInquiries error:", err);
    return null;
  }
}

export async function syncBulkInquiryToFirestore(inquiry: AdminBulkInquiry): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    const docRef = doc(db, "bulk_inquiries", inquiry.id);
    await setDoc(docRef, inquiry, { merge: true });
  } catch (err) {
    console.warn("Firestore syncBulkInquiry error:", err);
  }
}

// ------------------------------------------------------------------
// Store Settings
// ------------------------------------------------------------------

export async function fetchFirestoreSettings(): Promise<AdminStoreSettings | null> {
  if (!isFirebaseConfigured() || !db) return null;
  try {
    const docRef = doc(db, "store_settings", "general");
    const snap = await getDoc(docRef);
    if (!snap.exists()) return null;
    return snap.data() as AdminStoreSettings;
  } catch (err) {
    console.warn("Firestore fetchSettings error:", err);
    return null;
  }
}

export async function syncSettingsToFirestore(settings: AdminStoreSettings): Promise<void> {
  if (!isFirebaseConfigured() || !db) return;
  try {
    const docRef = doc(db, "store_settings", "general");
    await setDoc(docRef, settings, { merge: true });
  } catch (err) {
    console.warn("Firestore syncSettings error:", err);
  }
}
