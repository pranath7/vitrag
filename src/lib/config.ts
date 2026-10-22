export const siteConfig = {
  name: "VITRAG",
  descriptor: "Tableware & Gifting",
  tagline: "Beautifully Chosen. Thoughtfully Gifted.",
  subTagline: "Make Every Table a Celebration.",
  description:
    "VITRAG crafts and curates premium Indian dinner sets, ceramic platters, dry-fruit gift boxes, and artisanal homeware. Based in Chennai, Tamil Nadu.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://vitrag.in",
  market: "Chennai, Tamil Nadu, India",
  currency: "INR",
  currencySymbol: "₹",

  contact: {
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916369142027",
    displayPhone: "+91 63691 42027",
    email: "enquiries@vitrag.in",
    city: "Chennai",
    state: "Tamil Nadu",
    country: "India",
    address: "Showroom & Studio: T. Nagar, Chennai, Tamil Nadu 600017",
    hours: "Monday – Saturday: 10:30 AM – 7:30 PM",
  },

  social: {
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com/vitragtableware",
    facebook: "https://facebook.com/vitragtableware",
    pinterest: "https://pinterest.com/vitragtableware",
  },

  announcement: {
    text: "Thoughtfully curated tableware and gifts for every occasion • Pan-India Delivery",
    enabled: true,
  },

  features: {
    onlinePaymentEnabled: false, // Flag: false means WhatsApp / Manual verified UPI mode
    wishlistEnabled: true,
  },
};
