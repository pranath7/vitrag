import { Product } from "./types";

export type OrderStatus =
  | "new"
  | "quoted"
  | "paid"
  | "processing"
  | "dispatched"
  | "delivered"
  | "cancelled";

export interface AdminOrderItem {
  productId: string;
  name: string;
  variantName?: string;
  quantity: number;
  pricePaise?: number;
  image?: string;
}

export interface AdminOrder {
  id: string;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  city: string;
  state: string;
  pinCode: string;
  giftNote?: string;
  items: AdminOrderItem[];
  status: OrderStatus;
  totalEstimatedPaise: number;
  paymentMode: "whatsapp" | "upi" | "cod" | "bank_transfer";
  paymentReference?: string;
  courierName?: string;
  trackingNumber?: string;
  dispatchDate?: string;
  internalNotes?: string;
  source: "Website Checkout" | "WhatsApp Direct" | "Showroom Walk-in" | "Phone Order";
}

export type BulkInquiryStatus =
  | "new"
  | "contacted"
  | "sample_sent"
  | "quote_shared"
  | "converted"
  | "closed";

export interface AdminBulkInquiry {
  id: string;
  createdAt: string;
  name: string;
  company?: string;
  phone: string;
  email?: string;
  productInterest: string;
  quantity: string;
  budgetPerGift: string;
  deliveryDate?: string;
  pinCode: string;
  notes?: string;
  status: BulkInquiryStatus;
  estimatedValuePaise?: number;
  internalNotes?: string;
}

export interface AdminStoreSettings {
  whatsappNumber: string;
  displayPhone: string;
  email: string;
  upiId: string;
  address: string;
  announcementText: string;
  announcementEnabled: boolean;
  freeShippingThresholdPaise: number;
  standardDeliveryFeePaise: number;
  storeCurrency: string;
}

export interface AbandonedCart {
  id: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  items: AdminOrderItem[];
  totalEstimatedPaise: number;
  lastActive: string;
  recovered: boolean;
  recoveryMessageSent?: boolean;
  notes?: string;
}
