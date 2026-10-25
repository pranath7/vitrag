import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { SlideOverCart } from "@/components/cart/SlideOverCart";
import { siteConfig } from "@/lib/config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#6E2023",
};

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
      className={`${cormorant.variable} ${inter.variable} h-full antialiased overflow-x-hidden`}
    >
      <head>
        {/* Preconnect to critical image CDN for fast mobile LCP */}
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        {/* Google Tag Manager */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4VXF36F');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body className="min-h-full flex flex-col bg-[#FFF5E6] text-[#252522] font-body selection:bg-[#6E2023] selection:text-white overflow-x-hidden max-w-full">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W4VXF36F"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <CartProvider>
          <Header />
          <div className="flex-1 w-full max-w-full overflow-x-hidden pb-16 lg:pb-0">{children}</div>
          <SlideOverCart />
          <Footer />
          <MobileBottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
