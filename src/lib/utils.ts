import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CartItem, BulkEnquiry } from "./types";
import { siteConfig } from "./config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats monetary amounts in paise to INR string: e.g. 129900 -> ₹1,299
 */
export function formatPrice(paise: number): string {
  const rupees = Math.round(paise / 100);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

/**
 * Formats rupees directly: e.g. 1299 -> ₹1,299
 */
export function formatRupees(rupees: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Generates an encoded WhatsApp ordering URL with cart items and accurate details
 */
export function generateWhatsAppOrderUrl(
  items: CartItem[],
  subtotalPaise: number,
  notes?: string
): string {
  const number = siteConfig.contact.whatsappNumber;
  
  let message = `Hello VITRAG Tableware & Gifting,\n\nI would like to place an order from your website:\n\n`;
  
  items.forEach((item, index) => {
    const variantInfo = item.variantName ? ` (${item.variantName})` : "";
    message += `${index + 1}. *${item.name}*${variantInfo} — Qty: ${item.quantity}\n`;
  });

  message += `\n*Delivery Timeline:* 3–5 Business Days\n`;
  message += `*UPI Payment Destination:* 9840610405@pthdfc\n`;

  if (notes && notes.trim()) {
    message += `\n*Customer Note:* ${notes.trim()}\n`;
  }

  message += `\nPlease confirm product availability, shipping charges to my address, and share payment details. Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp enquiry URL for a single product
 */
export function generateWhatsAppProductEnquiryUrl(
  productName: string,
  sku: string,
  _pricePaise?: number,
  productUrl?: string
): string {
  const number = siteConfig.contact.whatsappNumber;
  let message = `Hello VITRAG,\n\nI am interested in learning more about:\n*${productName}* (SKU: ${sku})\n`;
  if (productUrl) {
    message += `Link: ${productUrl}\n`;
  }
  message += `\nCould you please share details on availability, pricing, or customisation options?`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

/**
 * Generates WhatsApp URL for bulk/corporate enquiry
 */
export function generateWhatsAppBulkEnquiryUrl(data: BulkEnquiry): string {
  const number = siteConfig.contact.whatsappNumber;
  let message = `Hello VITRAG Corporate & Bulk Gifting Team,\n\nI would like to request a bulk quote:\n\n`;
  message += `*Name:* ${data.name}\n`;
  if (data.company) message += `*Company/Org:* ${data.company}\n`;
  message += `*Phone:* ${data.phone}\n`;
  if (data.email) message += `*Email:* ${data.email}\n`;
  message += `*Product Interest:* ${data.productInterest}\n`;
  message += `*Estimated Quantity:* ${data.quantity}\n`;
  message += `*Budget per Gift:* ${data.budgetPerGift}\n`;
  if (data.deliveryDate) message += `*Target Date:* ${data.deliveryDate}\n`;
  message += `*Delivery PIN:* ${data.pinCode}\n`;
  if (data.notes) message += `*Notes:* ${data.notes}\n`;
  message += `\nPlease share a tailored proposal and catalogue. Thank you!`;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
