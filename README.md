# VITRAG — Tableware & Gifting

> **"Beautifully Chosen. Thoughtfully Gifted."**  
> Premium Indian Crockery, Serving Platters, Dry-Fruit Boxes & Curated Homeware.

---

## 1. Project Overview

VITRAG is a production-quality, design-led e-commerce website for an Indian crockery, tableware, and gifting brand based in Chennai, Tamil Nadu.

The site is built with an editorial aesthetic inspired by modern luxury lifestyle brands, combining the UI polish and component excellence of **UI.live**, the creative typography and layout art-direction of **Httpster**, the quiet luxury of **Recent Design**, and conversion-focused shopping patterns from **Nicelydone**.

---

## 2. Tech Stack

- **Framework:** Next.js 16 (App Router) with Turbopack
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS v4 with custom brand tokens
- **Typography:** Cormorant Garamond (Editorial serif headings) & Inter (Clean UI & body)
- **Icons:** Lucide React
- **State Management:** React Context (`CartContext`) with automatic `localStorage` persistence
- **Architecture:** Server-side pre-rendered static routes (SSG) with Partial Prerendering (PPR)

---

## 3. Brand Identity & Design System

### Color Palette
- **Ivory (`#F7F4EE`):** Primary background conveying warmth and tactile ceramic texture.
- **Warm Beige (`#E9DFD1`):** Editorial highlight sections and product feature cards.
- **Deep Burgundy (`#5A252E`):** Primary brand accent, primary CTA buttons, and announcement bar.
- **Charcoal (`#252522`):** Primary body text and contrast elements.
- **Muted Taupe (`#8B8176`):** Secondary metadata, breadcrumbs, and subtle borders.
- **Fine Border (`#E7E0D6`):** Subtle dividers throughout the layout.
- **Pure White (`#FFFFFF`):** Product cards and modal containers.

### Typography
- **Headings:** `Cormorant Garamond` — Classical, editorial, high-contrast serif.
- **Body & UI:** `Inter` — High legibility for specifications, prices, and navigation.

---

## 4. Implemented Website Routes

| Route | Description |
|---|---|
| `/` | Editorial Homepage (Sections A–L: Hero, Categories, Favourites, Story, Gifting, Occasions, B2B, Budget, Trust, Gallery, Journal) |
| `/shop` | Complete Product Catalogue with interactive filtering, sorting, price tiers, and product counter |
| `/collections/dinner-sets` | Handcrafted ceramic & fine porcelain dinner sets |
| `/collections/platters-serving` | Ceramic platters, chip-and-dip boards, mango wood serveware |
| `/collections/dry-fruit-boxes` | Brass repoussé caskets & velvet gift boxes |
| `/collections/cracker-sets` | Airtight stoneware & fluted glass snack canisters |
| `/collections/gift-sets` | Curated luxury hampers for housewarmings & celebrations |
| `/collections/wedding-gifts` | 24K gold-accented trousseau dinner services & ceremonial hampers |
| `/collections/corporate-gifts` | Executive desk sets & bulk corporate hampers |
| `/collections/mugs-cups` | Studio pottery mugs, high-tea cups & traditional chai kullads |
| `/collections/kitchenware` | Brass spice boxes (masala daani) & stoneware storage jars |
| `/product/[slug]` | Product Details Page (Gallery, variants, specs accordion, WhatsApp order, related items, JSON-LD Schema) |
| `/search` | Live search across 30+ products by name, tag, category, or material |
| `/cart` | Shopping bag page with quantity editing, item removal, and subtotal calculation |
| `/checkout` | Two-mode checkout: Instant WhatsApp Concierge & Gateway Adapter placeholder |
| `/bulk-orders` | B2B & Corporate bulk quote enquiry page with instant WhatsApp transmission |
| `/contact` | Chennai showroom details, visiting hours, and appointment booking |
| `/about` | Brand story, Chennai origins, and core values |
| `/shipping-policy` | Packaging standards, delivery timeframes, and transit breakage policy |
| `/returns-refunds` | 7-day return guidelines and damaged item replacement protocol |
| `/privacy-policy` | Data handling, cookies, and consumer protection information |
| `/terms` | Commercial terms, pricing accuracy, and legal conditions |
| `/sitemap.xml` | Dynamic XML sitemap indexing all static and product pages |
| `/robots.txt` | Crawler directives |

---

## 5. Checkout & Ordering Modes

### Mode A: WhatsApp & Verified UPI Concierge (Active by Default)
1. Customer curates their cart on the website.
2. At checkout, the customer inputs delivery address and special requests.
3. Clicking **"Confirm Order via WhatsApp"** generates an URL-encoded structured message with exact product titles, variant names, quantities, and prices.
4. The seller verifies stock, confirms exact pincode shipping charges, and shares the official UPI payment QR code.
5. The order is fulfilled with zero gateway transaction fee overhead.

### Mode B: Payment Gateway Adapter (Ready for Activation)
- A provider-neutral abstraction (`siteConfig.features.onlinePaymentEnabled`) is provided.
- Once merchant KYC (Razorpay, Cashfree, or Stripe India) is approved, this mode can be enabled without breaking the WhatsApp concierge flow.

---

## 6. Setup & Local Development

### Prerequisites
- Node.js 18.18+ or Node.js 20+
- npm 9+

### Installation
```bash
# Clone or navigate to the directory
cd Vitrag

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 7. Production Build & Deployment

### Build Command
```bash
npm run build
```
This produces an optimized Next.js build with 62 static and partially prerendered pages.

### Deploying to Vercel
1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Configure the environment variables:
   - `NEXT_PUBLIC_SITE_URL` (e.g. `https://vitrag.in`)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (e.g. `919840123456`)
4. Deploy.

---

## 8. Environment Variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL of the production deployment | `https://vitrag.in` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Business WhatsApp number (Country code + number without spaces or `+`) | `919840123456` |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Brand Instagram account link | `https://instagram.com/vitragtableware` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 Measurement ID | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel Tracking ID | `1234567890` |
