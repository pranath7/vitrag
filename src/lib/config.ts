export const siteConfig = {
  name: "VITRAG",
  descriptor: "Tableware & Gifting",
  tagline: "Beautifully Chosen. Thoughtfully Gifted.",
  subTagline: "Make Every Table a Celebration.",
  description:
    "VITRAG crafts and curates premium Indian dinner sets, ceramic platters, dry-fruit gift boxes, and artisanal homeware. Showroom at Sowcarpet, Chennai.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vitrag.in",
  market: "Chennai, Tamil Nadu, India",
  currency: "INR",
  currencySymbol: "₹",

  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916369142027",
    displayPhone: "+91 63691 42027",
    email: "pranathwork@gmail.com",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    address: "Patni Plaza, Shop No. 3, NSC Bose Road, Sowcarpet, Chennai, Tamil Nadu 600001",
    shortAddress: "Patni Plaza, Shop No. 3, NSC Bose Road, Sowcarpet, Chennai 600001",
    hours: "Monday – Saturday: 10:30 AM – 8:00 PM",
    upiId: "9840610405@pthdfc",
  },

  social: {
    instagram: "https://instagram.com/vitrag.crockery",
    instagramHandle: "@vitrag.crockery",
  },

  shipping: {
    freeShippingThresholdPaise: 400000, // Free above ₹4,000
    freeShippingThresholdDisplay: "₹4,000",
    standardDeliveryFeePaise: 19900, // ₹199
    deliveryTime: "3–5 Days",
    unboxingVideoMandatory: true,
  },

  announcement: {
    text: "Complimentary Pan-India Delivery on orders above ₹4,000 • Direct WhatsApp Ordering",
    enabled: true,
  },

  features: {
    onlinePaymentEnabled: false, // Strictly WhatsApp Direct Dispatch
    wishlistEnabled: true,
  },
};
