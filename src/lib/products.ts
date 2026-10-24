import { Product, Collection } from "./types";

export const collections: Collection[] = [
  {
    id: "signature-editions",
    slug: "signature-editions",
    name: "Signature Editions",
    shortName: "Signature Series",
    description:
      "Exclusive editorial masterpieces from VITRAG. Discover our cut-crystal whiskey glasses, sculpted floral pedestal serving bowls, and emerald camellia tea sets.",
    image: "/images/categories/signature-editions.png",
    seoTitle: "Signature Editions — Fine Tableware & Crystal Glassware | VITRAG",
    seoDescription:
      "Explore VITRAG's marquee Signature Editions: Elevate Every Pour crystal barware, Serve Beautifully rose pedestal bowl, and A Cup for Every Moment tea set.",
  },
  {
    id: "dinner-sets",
    slug: "dinner-sets",
    name: "Dinner Sets",
    shortName: "Dinnerware",
    description:
      "Handcrafted ceramic and fine porcelain dinner services tailored for festive Indian celebrations, wedding banquets, and daily dining elegance.",
    image: "/images/categories/dinner-sets.jpg",
    seoTitle: "Premium Dinner Sets & Dinnerware Collections | VITRAG",
    seoDescription:
      "Explore luxury handcrafted ceramic, bone china, and porcelain dinner sets in Chennai. Available for pan-India shipping and bespoke gifting.",
  },
  {
    id: "platters-serving",
    slug: "platters-serving",
    name: "Platter & Serving",
    shortName: "Serveware",
    description:
      "Sculptural serving platters, chip-and-dip centerpieces, and dessert bowls designed to elevate culinary presentation.",
    image: "/images/categories/platter-and-serving.jpg",
    seoTitle: "Artisanal Serving Platters & Table Bowls | VITRAG",
    seoDescription:
      "Discover luxury ceramic serving platters, chip and dip sets, and appetizer boards for refined hosting.",
  },
  {
    id: "dry-fruit-boxes",
    slug: "dry-fruit-boxes",
    name: "Dry Fruit Boxes",
    shortName: "Dry-Fruit Boxes",
    description:
      "Ornamental handcrafted dry-fruit gift boxes crafted in solid sheesham timber with polished brass repoussé inlays and velvet-lined compartments.",
    image: "/images/categories/dry-fruit-boxes.jpg",
    seoTitle: "Handcrafted Dry-Fruit Gift Boxes | Festive & Wedding Gifting | VITRAG",
    seoDescription:
      "Exquisite dry-fruit gift boxes crafted in solid wood, brass, and enamel. Ideal for Diwali, weddings, and corporate gifting.",
  },
];

export const products: Product[] = [
  // --- SIGNATURE EDITIONS ---
  {
    id: "elevate-every-pour-whiskey-set",
    slug: "elevate-every-pour-crystal-whiskey-glass-set",
    name: "Elevate Every Pour — 6-Piece Crystal Whiskey Glass Set",
    shortDescription: "Timeless cut-crystal whiskey glasses in luxury burgundy & gold gift box.",
    description:
      "Elevate Every Pour: crafted with timeless precision, this 6-piece premium crystal glass set combines brilliant clarity with a deep geometric cut base. Designed for fine single malts, classic cocktails, and festive celebrations. Presented in VITRAG's signature gold-lined burgundy presentation box, ready for luxury gifting.",
    category: "Signature Editions",
    collectionIds: ["signature-editions"],
    sku: "VIT-SIG-01-WHS",
    price: 249900, // ₹2,499
    compareAtPrice: 299900,
    currency: "INR",
    images: [
      {
        src: "/images/category1vit/104534.png",
        alt: "Elevate Every Pour — 6-Piece Crystal Whiskey Glass Gift Set in Luxury Presentation Box",
      },
    ],
    variants: [
      {
        id: "whiskey-6pc-box",
        name: "6-Piece Gift Box Set",
        price: 249900,
        sku: "VIT-SIG-01-WHS-6",
        stockQuantity: 24,
        availability: "in-stock",
      },
    ],
    material: "Lead-Free Crystal Glass with Diamond Facet Cut Base",
    dimensions: "6 Glasses (310 ml each, Height: 9.5cm, Diameter: 8.2cm)",
    weight: "2.1 kg (with luxury presentation box)",
    pieceCount: 6,
    careInstructions:
      "Hand wash with mild detergent or dishwashing sponge. Avoid abrasive metallic scrubbers to maintain pristine glass clarity.",
    tags: ["Signature Edition", "Crystal Glass", "Whiskey Glasses", "Barware", "Gifting Box", "Bestseller"],
    featured: true,
    bestseller: true,
    newArrival: true,
    stockQuantity: 24,
    availability: "in-stock",
    seoTitle: "Elevate Every Pour — 6 Pcs Crystal Whiskey Glass Set | VITRAG",
    seoDescription:
      "Shop luxury 6-piece crystal cut whiskey glasses in burgundy & gold presentation gift box. Perfect for cocktails and wedding gifting.",
  },
  {
    id: "serve-beautifully-rose-pedestal-bowl",
    slug: "serve-beautifully-rose-pedestal-serving-bowl",
    name: "Serve Beautifully — Rose Pedestal Ceramic Serving Bowl with Ladle",
    shortDescription: "Blush ceramic pedestal bowl with hand-painted gold rim and sculpted rose detail.",
    description:
      "Little Details Make Special Moments: an exquisite centerpiece serving bowl standing gracefully on an elevated pedestal base. Hand-finished in a delicate blush glaze with sculpted rose petals, 24K gold accented rim, and an accompanying ceramic serving ladle. Perfect for festive halwa, kheer, fruit salads, dry fruits, or artisan dips.",
    category: "Signature Editions",
    collectionIds: ["signature-editions", "platters-serving"],
    sku: "VIT-SIG-02-ROSE",
    price: 169900, // ₹1,699
    compareAtPrice: 199900,
    currency: "INR",
    images: [
      {
        src: "/images/category1vit/104546.png",
        alt: "Serve Beautifully — Rose Elegance Pedestal Serving Bowl with Gold Rim and Ladle",
      },
    ],
    variants: [
      {
        id: "rose-pedestal-pink",
        name: "Blush Pink & Gold",
        price: 169900,
        sku: "VIT-SIG-02-ROSE-PK",
        stockQuantity: 18,
        availability: "in-stock",
      },
    ],
    material: "Food-Grade Glazed Ceramic with 24K Gold Lined Rim",
    dimensions: "Pedestal Bowl (Diameter: 18cm, Height: 12cm) + Porcelain Serving Spoon",
    weight: "850 grams",
    pieceCount: 2,
    careInstructions:
      "Hand wash gently with mild soap and soft sponge. Not suitable for microwave due to metallic gold rim.",
    tags: ["Signature Edition", "Pedestal Bowl", "Serveware", "Gold Trim", "Blush Pink", "Handmade"],
    featured: true,
    bestseller: true,
    newArrival: true,
    stockQuantity: 18,
    availability: "in-stock",
    seoTitle: "Serve Beautifully — Rose Elegance Pedestal Serving Bowl | VITRAG",
    seoDescription:
      "Exquisite blush pink ceramic pedestal serving bowl with sculpted rose and porcelain ladle. High-fired food safe tableware.",
  },
  {
    id: "a-cup-for-every-moment-camellia-tea-set",
    slug: "a-cup-for-every-moment-emerald-camellia-cup-saucer-set",
    name: "A Cup for Every Moment — Emerald & Pearl Camellia Cup & Saucer Set",
    shortDescription: "Artisan emerald ceramic cups with sculpted 3D camellia blossom and gold bead handle.",
    description:
      "A Cup for Every Moment: where royal emerald glaze meets sculpted ceramic artistry. Each cup features an embossed multi-layered camellia blossom with gold stamens, paired with a rippled wave-edge saucer and a distinctive spherical gold bead on the ergonomic handle. Crafted for slow morning coffees, evening teas, and cherished conversations.",
    category: "Signature Editions",
    collectionIds: ["signature-editions"],
    sku: "VIT-SIG-03-CAM",
    price: 219900, // ₹2,199
    compareAtPrice: 259900,
    currency: "INR",
    images: [
      {
        src: "/images/category1vit/104547.png",
        alt: "A Cup for Every Moment — Emerald Camellia Cup and Saucer Set with Gold Bead Handles",
      },
    ],
    variants: [
      {
        id: "camellia-2pc-set",
        name: "Set of 2 Cups & Saucers",
        price: 219900,
        sku: "VIT-SIG-03-CAM-02",
        stockQuantity: 20,
        availability: "in-stock",
      },
    ],
    material: "Fine Stoneware Ceramic with Reactive Emerald & Ivory Glaze",
    dimensions: "Cups: 220 ml (Height: 8.5cm), Saucers: 15.5cm Diameter",
    weight: "1.4 kg (2-cup set)",
    pieceCount: 4,
    careInstructions:
      "Hand wash with soft sponge to preserve hand-painted gold lustre and sculpted flower petals.",
    tags: ["Signature Edition", "Cup and Saucer", "Emerald", "Gold Accent", "Camellia Rose", "Teaware"],
    featured: true,
    bestseller: true,
    newArrival: true,
    stockQuantity: 20,
    availability: "in-stock",
    seoTitle: "A Cup for Every Moment — Emerald Camellia Cup & Saucer Set | VITRAG",
    seoDescription:
      "Artisanal emerald ceramic cup and saucer set with 3D camellia blossom and gold bead handle. Premium teaware for gifting.",
  },

  // --- DINNER SETS ---
  {
    id: "royal-heritage-dinner-set",
    slug: "royal-heritage-24-piece-porcelain-dinner-set",
    name: "Royal Heritage 24-Piece Porcelain Dinner Set",
    shortDescription: "Fine porcelain dinner set with subtle 24K gold rim detailing.",
    description:
      "Crafted from fine translucent porcelain, the Royal Heritage collection celebrates royal banquet traditions with a modern minimalist sensibility. Each piece is bordered with hand-painted gold lining and finished with a scratch-resistant satin glaze.",
    category: "Dinner Sets",
    collectionIds: ["dinner-sets"],
    sku: "VIT-DS-01",
    price: 499900, // ₹4,999
    compareAtPrice: 599900,
    currency: "INR",
    images: [
      {
        src: "/images/categories/dinner-sets.jpg",
        alt: "Royal Heritage 24-piece porcelain dinner set displayed on banquet table",
      },
    ],
    variants: [
      {
        id: "rh-ivory-gold",
        name: "Ivory & 24K Gold",
        price: 499900,
        sku: "VIT-DS-01-IG",
        stockQuantity: 16,
        availability: "in-stock",
      },
    ],
    material: "Fine Porcelain with Hand-painted 24K Gold Accents",
    dimensions:
      "6 Dinner Plates (27cm), 6 Quarter Plates (21cm), 6 Katori Bowls (10cm), 2 Curry Bowls (20cm), 1 Oval Rice Platter (35cm), 3 Condiment Dishes",
    pieceCount: 24,
    careInstructions:
      "Gentle hand wash recommended to preserve metallic lustre. Not suitable for microwave due to real gold content.",
    stockQuantity: 16,
    availability: "in-stock",
    featured: true,
    tags: ["Gold Accent", "Porcelain", "Banquet", "Wedding Registry", "Bestseller"],
    seoTitle: "Royal Heritage 24-Piece Porcelain Dinner Set | VITRAG",
    seoDescription:
      "Shop the handcrafted Royal Heritage 24-Piece porcelain dinner set with 24K gold gilding. Ideal for celebrations and luxury weddings.",
  },
  {
    id: "imperial-banquet-dinner-set",
    slug: "imperial-banquet-32-piece-handcrafted-dinnerware",
    name: "Imperial Banquet 32-Piece Handcrafted Dinnerware Service",
    shortDescription: "Grand 8-person banquet service featuring fluted rim designs and deep curry bowls.",
    description:
      "Designed for grand family dinners and festive gatherings in Chennai, the Imperial Banquet service brings together 32 pieces of vitrified porcelain. Highlights include fluted soup and curry bowls, twin rice platters, and heat-retaining ceramic serving tureens.",
    category: "Dinner Sets",
    collectionIds: ["dinner-sets"],
    sku: "VIT-DS-02",
    price: 699900, // ₹6,999
    compareAtPrice: 799900,
    currency: "INR",
    images: [
      {
        src: "/images/hero/hero-stock.jpg",
        alt: "Imperial Banquet 32-piece grand dinnerware collection with fluted edges",
      },
    ],
    variants: [
      {
        id: "ib-ivory-fluted",
        name: "Classic Fluted Ivory",
        price: 699900,
        sku: "VIT-DS-02-FL",
        stockQuantity: 12,
        availability: "in-stock",
      },
    ],
    material: "High-fired Vitrified Porcelain with Fluted Texture",
    dimensions:
      "8 Dinner Plates (27cm), 8 Side Plates (20cm), 8 Katori Bowls (11cm), 4 Serving Bowls (21cm), 2 Oval Platters (36cm), 2 Spoons",
    pieceCount: 32,
    careInstructions: "Dishwasher safe on gentle cycle. Thermal shock resistant.",
    stockQuantity: 12,
    availability: "in-stock",
    featured: true,
    tags: ["Grand Set", "Banquet", "Porcelain", "Chennai"],
    seoTitle: "Imperial Banquet 32-Piece Dinnerware Service | VITRAG",
    seoDescription:
      "Grand 32-piece handcrafted vitrified porcelain dinner service for 8 settings. Available in Chennai.",
  },
  {
    id: "artisanal-scalloped-dinner-set",
    slug: "artisanal-scalloped-ceramic-dinner-set",
    name: "Artisanal Scalloped Ceramic Dinner Set (18-Piece)",
    shortDescription: "Tactile stoneware dinnerware with delicate fluted rims.",
    description:
      "The Artisanal Scalloped dinner set features organic scalloped edges inspired by wild jasmine petals. Formed with natural stoneware and dipped in an opaque ivory matte glaze, it brings warmth and understated luxury to weeknight dinners and weekend hosting.",
    category: "Dinner Sets",
    collectionIds: ["dinner-sets"],
    sku: "VIT-DS-03",
    price: 349900, // ₹3,499
    currency: "INR",
    images: [
      {
        src: "/images/hero/unsplash-tableware-1.jpg",
        alt: "Artisanal scalloped ceramic dinnerware in soft warm ivory glaze",
      },
    ],
    variants: [
      {
        id: "as-matte-ivory",
        name: "Matte Ivory",
        price: 349900,
        sku: "VIT-DS-03-IV",
        stockQuantity: 22,
        availability: "in-stock",
      },
    ],
    material: "High-fired Ceramic Stoneware",
    dimensions: "6 Dinner Plates (26cm), 6 Side Plates (19cm), 6 Soup/Curry Bowls (15cm)",
    pieceCount: 18,
    careInstructions: "Microwave and dishwasher safe. Lead-free and 100% food grade.",
    stockQuantity: 22,
    availability: "in-stock",
    featured: true,
    tags: ["Stoneware", "Minimalist", "Dishwasher Safe", "Everyday Luxury"],
    seoTitle: "Artisanal Scalloped Ceramic Dinner Set (18-Piece) | VITRAG",
    seoDescription:
      "Elevate daily dining with the Artisanal Scalloped 18-piece ceramic stoneware dinner set.",
  },

  // --- PLATTERS & SERVING ---
  {
    id: "grand-centerpiece-serving-platter",
    slug: "grand-centerpiece-ceramic-serving-platter",
    name: "Grand Centerpiece Ceramic Serving Platter",
    shortDescription: "Sculptural 38cm centerpiece platter with rippled organic rim.",
    description:
      "An eye-catching centerpiece platter designed for fragrant biryanis, grilled kebabs, or roasted harvest vegetables. Hand-shaped with an undulating edge that creates gentle shadows across your dining table.",
    category: "Platter & Serving",
    collectionIds: ["platters-serving"],
    sku: "VIT-PL-01",
    price: 149900, // ₹1,499
    currency: "INR",
    images: [
      {
        src: "/images/categories/platter-and-serving.jpg",
        alt: "Grand Centerpiece Ceramic Serving Platter styled on dining table",
      },
    ],
    variants: [
      {
        id: "gop-ivory",
        name: "Glazed Ivory",
        price: 149900,
        sku: "VIT-PL-01-IV",
        stockQuantity: 28,
        availability: "in-stock",
      },
    ],
    material: "High-fire Ceramic with Satin Finish",
    dimensions: "Length: 38cm, Width: 26cm, Height: 3.5cm",
    pieceCount: 1,
    careInstructions: "Microwave safe. Hand wash recommended for long-term finish.",
    stockQuantity: 28,
    availability: "in-stock",
    featured: true,
    tags: ["Centerpiece", "Platter", "Stoneware", "Hosting"],
    seoTitle: "Grand Centerpiece Ceramic Serving Platter | VITRAG",
    seoDescription: "Artisanal 38cm ceramic oval platter with rippled edge for festive entertaining.",
  },
  {
    id: "lotus-bloom-platter-dip-set",
    slug: "lotus-bloom-serving-platter-dip-bowl-set",
    name: "Lotus Bloom Tiered Serving Platter & Dip Bowl Set",
    shortDescription: "Fluted petal serving platter with a centered condiment katori.",
    description:
      "Inspired by the opening petals of the sacred lotus, this serveware set features a generous fluted platter with a centered condiment katori. Finished in a dual ivory glaze with delicate hairline gold lining, it makes serving snacks, kebabs, and mezze effortless.",
    category: "Platter & Serving",
    collectionIds: ["platters-serving"],
    sku: "VIT-PL-02",
    price: 119900, // ₹1,199
    currency: "INR",
    images: [
      {
        src: "/images/hero/unsplash-tableware-2.jpg",
        alt: "Lotus bloom fluted ceramic platter and condiment bowl set",
      },
    ],
    variants: [
      {
        id: "lotus-ivory",
        name: "Warm Ivory & Gold",
        price: 119900,
        sku: "VIT-PL-02-IV",
        stockQuantity: 35,
        availability: "in-stock",
      },
    ],
    material: "Glazed Porcelain with Hairline Gilded Rim",
    dimensions: "Platter: 32cm Diameter, Dip Bowl: 11cm Diameter",
    pieceCount: 2,
    careInstructions: "Hand wash with soft sponge recommended.",
    stockQuantity: 35,
    availability: "in-stock",
    featured: false,
    tags: ["Platter", "Dip Bowl", "Lotus", "Finger Foods"],
    seoTitle: "Lotus Bloom Serving Platter & Dip Bowl Set | VITRAG",
    seoDescription: "Ceramic lotus fluted serving platter with dip katori for appetizers and chaats.",
  },

  // --- DRY FRUIT BOXES ---
  {
    id: "sheesham-brass-dry-fruit-box",
    slug: "sheesham-brass-inlay-dry-fruit-box",
    name: "Handcrafted Sheesham & Antique Brass Inlay Dry-Fruit Box",
    shortDescription: "Solid timber box with hand-cut floral brass inlays and 4 removable canisters.",
    description:
      "A celebration of classical Indian woodwork. Hand-carved from seasoned solid sheesham wood and adorned with hand-beaten floral brass repoussé inlays on the lid. The interior is lined with rich royal velvet and holds 4 removable brass canisters for cashews, almonds, pistachios, and raisins.",
    category: "Dry Fruit Boxes",
    collectionIds: ["dry-fruit-boxes"],
    sku: "VIT-DF-01",
    price: 189900, // ₹1,899
    compareAtPrice: 229900,
    currency: "INR",
    images: [
      {
        src: "/images/categories/dry-fruit-boxes.jpg",
        alt: "Handcrafted Sheesham wood and brass inlay dry fruit gift box with canisters",
      },
    ],
    variants: [
      {
        id: "df-sheesham-brass",
        name: "Solid Sheesham & Antique Brass",
        price: 189900,
        sku: "VIT-DF-01-SB",
        stockQuantity: 40,
        availability: "in-stock",
      },
    ],
    material: "Seasoned Sheesham Wood, Pure Brass Foil & Velvet Lining",
    dimensions: "Length: 26cm, Width: 26cm, Height: 8cm",
    pieceCount: 5,
    weight: "1.6 kg",
    careInstructions: "Wipe with a soft dry cloth. Keep away from direct water immersion.",
    stockQuantity: 40,
    availability: "in-stock",
    featured: true,
    bestseller: true,
    tags: ["Dry Fruit Box", "Sheesham Wood", "Brass Inlay", "Diwali Gifting", "Wedding Favors"],
    seoTitle: "Sheesham & Brass Inlay Dry-Fruit Box | VITRAG",
    seoDescription:
      "Traditional handcrafted sheesham timber dry fruit box with brass repoussé work and 4 compartments.",
  },
  {
    id: "royal-velvet-dry-fruit-caddy",
    slug: "royal-velvet-dry-fruit-gift-caddy",
    name: "Royal Velvet-Lined 4-Compartment Dry Fruit Gift Caddy",
    shortDescription: "Luxury velvet-lined dry fruit gift caddy with airtight glass canisters.",
    description:
      "Crafted with seasoned timber and lined in deep burgundy velvet, this caddy features 4 airtight glass jars with polished brass lids to keep dry fruits fresh and crisp. A favorite for wedding trousseau gifting and corporate Diwali hampers in Chennai.",
    category: "Dry Fruit Boxes",
    collectionIds: ["dry-fruit-boxes"],
    sku: "VIT-DF-02",
    price: 229900, // ₹2,299
    currency: "INR",
    images: [
      {
        src: "/images/categories/dry-fruit-boxes.jpg",
        alt: "Luxury velvet-lined dry fruit gift caddy with airtight glass canisters",
      },
    ],
    variants: [
      {
        id: "caddy-burgundy-gold",
        name: "Burgundy Velvet & Polished Brass",
        price: 229900,
        sku: "VIT-DF-02-BG",
        stockQuantity: 25,
        availability: "in-stock",
      },
    ],
    material: "Lacquered Teakwood, Velvet Lining & Airtight Glass Jars with Brass Lids",
    dimensions: "Length: 28cm, Width: 28cm, Height: 9cm",
    pieceCount: 5,
    weight: "1.9 kg",
    careInstructions: "Wipe wooden box with a clean dry microfiber cloth. Glass jars are hand washable.",
    stockQuantity: 25,
    availability: "in-stock",
    featured: true,
    tags: ["Gift Caddy", "Dry Fruit", "Glass Jars", "Corporate Hampers", "Chennai"],
    seoTitle: "Royal Velvet 4-Compartment Dry Fruit Gift Caddy | VITRAG",
    seoDescription:
      "Velvet-lined wooden dry fruit gift chest with airtight glass jars for wedding favors and corporate gifting.",
  },
];

// Helper query functions
export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCollection(collectionId: string): Product[] {
  return products.filter((p) => p.collectionIds.includes(collectionId));
}

export function getFeaturedProducts(limit = 8): Product[] {
  return products.filter((p) => p.featured).slice(0, limit);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id || c.slug === id);
}

export function searchProducts(query: string): Product[] {
  if (!query || query.trim() === "") return [];
  const q = query.toLowerCase().trim();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.shortDescription.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.material?.toLowerCase().includes(q) ||
      p.tags.some((tag) => tag.toLowerCase().includes(q))
  );
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.category === product.category ||
          p.collectionIds.some((cid) => product.collectionIds.includes(cid)))
    )
    .slice(0, limit);
}
