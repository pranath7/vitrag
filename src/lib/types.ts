export interface ProductImage {
  src: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  price: number; // in paise (e.g. 129900 = ₹1,299)
  compareAtPrice?: number;
  sku: string;
  stockQuantity: number;
  availability: 'in-stock' | 'out-of-stock' | 'made-to-order' | 'enquiry-only';
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: string;
  collectionIds: string[];
  sku: string;
  price: number; // base price in paise
  compareAtPrice?: number;
  currency: 'INR';
  images: ProductImage[];
  variants: ProductVariant[];
  material?: string;
  dimensions?: string;
  pieceCount?: number;
  careInstructions?: string;
  stockQuantity: number;
  availability: 'in-stock' | 'out-of-stock' | 'made-to-order' | 'enquiry-only';
  featured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  description: string;
  image: string;
  productCount?: number;
  seoTitle: string;
  seoDescription: string;
}

export interface CartItem {
  id: string; // unique item id = `${productId}-${variantId || 'default'}`
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number; // in paise
  quantity: number;
  variantId?: string;
  variantName?: string;
  maxStock: number;
}

export interface BulkEnquiry {
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
}

export interface NavigationItem {
  name: string;
  href: string;
  badge?: string;
  children?: {
    name: string;
    href: string;
    description?: string;
  }[];
}
