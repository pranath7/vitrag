import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SlideOverCart } from "@/components/cart/SlideOverCart";
import { siteConfig } from "@/lib/config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "VITRAG — Tableware & Gifting | Beautifully Chosen. Thoughtfully Gifted.",
    template: "%s | VITRAG Tableware & Gifting",
  },
  description:
    "Discover handcrafted ceramic dinner sets, luxury platters, sheesham dry-fruit gift boxes, and bespoke wedding hampers from Chennai, India.",
  keywords: [
    "crockery online India",
    "premium tableware Chennai",
    "ceramic dinner sets",
    "dry fruit gift boxes",
    "wedding crockery gifts",
    "corporate gifting Chennai",
    "luxury serveware",
    "VITRAG",
  ],
  authors: [{ name: "VITRAG Tableware & Gifting" }],
  creator: "VITRAG",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    title: "VITRAG — Tableware & Gifting",
    description: "Beautifully Chosen. Thoughtfully Gifted. Handcrafted ceramics and fine tableware.",
    siteName: "VITRAG",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/logo.jpg" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" },
      { url: "/icon.png" },
    ],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#FFF5E6] text-[#252522] font-body selection:bg-[#6E2023] selection:text-white">
        <CartProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <SlideOverCart />
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
