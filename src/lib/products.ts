import { Product, Collection } from "./types";

export const collections: Collection[] = [
  {
    id: "diwali-sale",
    slug: "diwali-sale",
    name: "Diwali Grand Sale",
    shortName: "Diwali Sale",
    description:
      "Exclusive Diwali Festive Offers — Up to 70% Off Luxury Dry Fruit Servers, Tiered Crystal Sets & Glass Platters. Ready for festive gifting.",
    image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792859135/vitrag/diwali_sale/fsb3z2rvcifain5ejhzf.jpg",
    seoTitle: "Diwali Festive Sale — Luxury Dry Fruit Servers & Tableware | VITRAG",
    seoDescription:
      "Shop limited-edition 4-piece and 6-piece dry fruit trays and crystal servers on Diwali Sale. Complimentary pan-India dispatch and signature festive packaging.",
  },
  {
    id: "signature-editions",
    slug: "signature-editions",
    name: "Signature Editions",
    shortName: "Signature Series",
    description:
      "Exclusive editorial masterpieces from VITRAG. Discover our cut-crystal whiskey glasses, sculpted floral pedestal serving bowls, and emerald camellia tea sets.",
    image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840537/vitrag/categories/q87rhawi0rlfsfl0lhgl.png",
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
    image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840534/vitrag/categories/flvbxuosczgcuepmxcmn.jpg",
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
    image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840536/vitrag/categories/sm3piv7tv3v21rwcl1gy.jpg",
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
    image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840536/vitrag/categories/u108qh4mrzwmk5frkpwx.jpg",
    seoTitle: "Handcrafted Dry-Fruit Gift Boxes | Festive & Wedding Gifting | VITRAG",
    seoDescription:
      "Exquisite dry-fruit gift boxes crafted in solid wood, brass, and enamel. Ideal for Diwali, weddings, and corporate gifting.",
  },
  {
    id: "gift-sets",
    slug: "gift-sets",
    name: "Curated Gift Sets",
    shortName: "Gift Sets",
    description:
      "Thoughtfully packaged luxury gift hampers combining dining essentials, artisanal trays, and festive tableware for housewarmings and milestones.",
    image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840536/vitrag/categories/u108qh4mrzwmk5frkpwx.jpg",
    seoTitle: "Curated Tableware Gift Sets & Hampers | VITRAG",
    seoDescription:
      "Discover beautifully packaged tableware gift sets for housewarmings, anniversaries, and festive celebrations.",
  },
  {
    id: "wedding-gifts",
    slug: "wedding-gifts",
    name: "Wedding & Trousseau Gifts",
    shortName: "Wedding Gifting",
    description:
      "Opulent 24K gold-accented dinner sets, grand banquet services, and bespoke trousseau dining collections for newlyweds.",
    image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840534/vitrag/categories/flvbxuosczgcuepmxcmn.jpg",
    seoTitle: "Luxury Wedding Tableware & Trousseau Gifts | VITRAG",
    seoDescription:
      "Bespoke wedding gifts and bridal dinner sets handcrafted with luxury presentation for weddings across India.",
  },
  {
    id: "mugs-cups",
    slug: "mugs-cups",
    name: "Mugs, Cups & Teaware",
    shortName: "Teaware & Barware",
    description:
      "Hand-finished stoneware cups, emerald camellia teaware, and cut-crystal glassware for daily rituals and celebratory pours.",
    image: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840533/vitrag/products/n5hycyxmhehrdwjdmtbw.png",
    seoTitle: "Artisanal Ceramic Cups, Teaware & Crystal Glassware | VITRAG",
    seoDescription:
      "Shop handcrafted studio pottery tea cup and saucer sets and luxury lead-free crystal glassware.",
  },
];

export const products: Product[] = [
  // --- DIWALI FESTIVE SALE SPECIALS (META ADS FEATURED) ---
  {
    id: "diwali-6pc-crystal-knobs-server-tray",
    slug: "diwali-meaningful-moments-6pc-crystal-server-tray",
    name: "6-Piece Crystal Knobs Dry Fruit & Snack Server Tray",
    shortDescription: "Diwali Special: 6 porcelain cube jars with faceted crystal diamond-cut knobs, sealed glass lids & clear gallery railing tray.",
    description:
      "Designed for Meaningful Moments — celebrate the Festival of Lights with VITRAG's marquee 6-piece luxury snack and dry fruit server. Featuring 6 individual pristine white porcelain jars topped with brilliant diamond-cut crystal knobs and airtight glass lids, resting within an elevated transparent acrylic gallery railing tray. Ideal for serving premium almonds, cashews, chocolate pearls, apricots, walnuts, and festive Diwali confections. Delivered in luxury presentation gift packaging.",
    category: "Dry Fruit Boxes",
    collectionIds: ["diwali-sale", "dry-fruit-boxes", "signature-editions", "gift-sets"],
    sku: "VIT-DWL-01-CRY6",
    price: 849900, // ₹8,499 (Discounted Diwali Price - 70% Off)
    compareAtPrice: 2849900, // ₹28,499 (MRP)
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792859135/vitrag/diwali_sale/fsb3z2rvcifain5ejhzf.jpg",
        alt: "VITRAG Designed for Meaningful Moments 6-Piece Crystal Knobs Dry Fruit and Snack Server Tray",
      },
    ],
    variants: [
      {
        id: "dwl-crystal-6pc-box",
        name: "6-Piece Tiered Crystal Server Tray (Festive Gift Box)",
        price: 849900,
        compareAtPrice: 2849900,
        sku: "VIT-DWL-01-CRY6-SET",
        stockQuantity: 35,
        availability: "in-stock",
      },
    ],
    material: "High-Grade Glazed Ceramic, Faceted Crystal Diamond Knobs, Tempered Glass Lids & Luxury Clear Acrylic Railing Tray",
    dimensions: "Acrylic Tray: 34cm x 24cm x 12cm; 6 Removable Porcelain Cube Jars with Airtight Lids",
    weight: "2.8 kg (with signature festive presentation gift packaging)",
    pieceCount: 6,
    careInstructions:
      "Wipe acrylic tray with a soft microfiber cloth. Ceramic bowls and glass lids are dishwasher safe. Handle crystal knobs with gentle care.",
    tags: [
      "Diwali Sale",
      "Diwali Special",
      "6-Piece Set",
      "Crystal Knobs",
      "Dry Fruit Box",
      "Festive Gifting",
      "Bestseller",
      "70% Off",
    ],
    featured: true,
    bestseller: true,
    newArrival: true,
    stockQuantity: 35,
    availability: "in-stock",
    seoTitle: "6 Pcs Crystal Knobs Dry Fruit & Snack Server Tray | Diwali Sale | VITRAG",
    seoDescription:
      "Shop the marquee VITRAG 6-piece crystal knobs dry fruit & snack server tray on Diwali festive sale. Luxury presentation gift packaging and pan-India delivery.",
  },
  {
    id: "diwali-6pc-petal-ceramic-server-gold-handle",
    slug: "diwali-elevate-6pc-petal-ceramic-server-tray",
    name: "6-Piece Petal Ceramic Dry Fruit Server with Gold Handle",
    shortDescription: "Diwali Special: 6 droplet petal ceramic bowls with luxury gold center handle and scalloped organizer tray.",
    description:
      "Elevate Everyday Living — bringing refined festive warmth to your Diwali gathering. This 6-piece set features sculpted droplet petal-shaped porcelain bowls nestled into a custom scalloped white acrylic tray, accented by an ergonomic polished gold center handle. Created for slow festive conversations and serving dry fruits, berries, roasted nuts, and Diwali sweets in unmatched elegance.",
    category: "Dry Fruit Boxes",
    collectionIds: ["diwali-sale", "dry-fruit-boxes", "signature-editions", "gift-sets"],
    sku: "VIT-DWL-02-PTL6",
    price: 799900, // ₹7,999 (Discounted Diwali Price - 70% Off)
    compareAtPrice: 2669900, // ₹26,699 (MRP)
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792859137/vitrag/diwali_sale/swmzszvftfbneu6g3nmb.jpg",
        alt: "VITRAG Elevate Everyday Living 6-Piece Petal Ceramic Dry Fruit Server with Gold Handle and Scalloped Tray",
      },
    ],
    variants: [
      {
        id: "dwl-petal-6pc-set",
        name: "6-Piece Petal Bowl Set with Gold Handle Tray",
        price: 799900,
        compareAtPrice: 2669900,
        sku: "VIT-DWL-02-PTL6-SET",
        stockQuantity: 40,
        availability: "in-stock",
      },
    ],
    material: "Fine Vitrified Porcelain Bowls, Polished Brass Gold Center Handle & Wave-Scalloped Clear Acrylic Tray",
    dimensions: "Tray: 32cm x 26cm x 8cm; 6 Ergonomic Drop-Shaped Porcelain Serving Bowls",
    weight: "2.4 kg (with signature festive presentation gift packaging)",
    pieceCount: 6,
    careInstructions:
      "Porcelain bowls are dishwasher and microwave safe. Clean gold handle and acrylic tray with a soft damp cloth.",
    tags: [
      "Diwali Sale",
      "Diwali Special",
      "6-Piece Set",
      "Petal Bowls",
      "Gold Handle",
      "Festive Gifting",
      "Trending",
      "70% Off",
    ],
    featured: true,
    bestseller: true,
    newArrival: true,
    stockQuantity: 40,
    availability: "in-stock",
    seoTitle: "6 Pcs Petal Ceramic Dry Fruit Server Tray | Diwali Sale | VITRAG",
    seoDescription:
      "Diwali festive offer: 6-piece petal ceramic dry fruit server with gold handle tray. Elegant festive table decor and wedding gifting.",
  },
  {
    id: "diwali-4pc-glass-serving-platter-gold-handles",
    slug: "diwali-elevate-4pc-glass-serving-platter-gold-handles",
    name: "4-Piece Glass Serving Platter with Chevron Gold Handles",
    shortDescription: "Diwali Special: 4 high-clarity rectangular glass bowls with lids on a white platter with chevron gold handles.",
    description:
      "Elevate Everyday Living — a contemporary festive centerpiece for celebratory Diwali banquets. Crafted with 4 high-clarity tempered rectangular glass dishes with ergonomic cylindrical handles, arranged along an elongated white porcelain platter framed by dual chevron-angled 24K gold handles. Perfect for festive mithai, dips, warm appetizers, nuts, and savories.",
    category: "Platter & Serving",
    collectionIds: ["diwali-sale", "platters-serving", "signature-editions", "gift-sets"],
    sku: "VIT-DWL-03-GLS4",
    price: 649900, // ₹6,499 (Discounted Diwali Price - 70% Off)
    compareAtPrice: 2169900, // ₹21,699 (MRP)
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792859138/vitrag/diwali_sale/jtdjlo1lbxobu24uwmrp.jpg",
        alt: "VITRAG Elevate Everyday Living 4-Piece Glass Serving Platter with Chevron Gold Handles",
      },
    ],
    variants: [
      {
        id: "dwl-glass-4pc-platter",
        name: "4-Piece Glass Bowls with Chevron Gold Handle Platter",
        price: 649900,
        compareAtPrice: 2169900,
        sku: "VIT-DWL-03-GLS4-SET",
        stockQuantity: 30,
        availability: "in-stock",
      },
    ],
    material: "Tempered High-Clarity Glass Bowls with Lids, Premium Glazed Ceramic Platter & Sculpted Chevron Gold Handles",
    dimensions: "Platter: 48cm x 16cm x 6cm; 4 Individual Rectangular Covered Glass Bowls",
    weight: "2.6 kg (with signature festive presentation gift packaging)",
    pieceCount: 4,
    careInstructions:
      "Glass bowls and covers are 100% food safe, thermal shock resistant and dishwasher safe. Hand wash platter with soft sponge to preserve gold handles.",
    tags: [
      "Diwali Sale",
      "Diwali Special",
      "4-Piece Set",
      "Glass Bowls",
      "Gold Handles",
      "Serving Platter",
      "Festive Gifting",
      "70% Off",
    ],
    featured: true,
    bestseller: true,
    newArrival: true,
    stockQuantity: 30,
    availability: "in-stock",
    seoTitle: "4 Pcs Glass Serving Platter with Chevron Gold Handles | Diwali Sale | VITRAG",
    seoDescription:
      "Exclusive Diwali sale: 4-piece glass serving platter with chevron gold handles. Luxury presentation gift packaging with complimentary pan-India delivery.",
  },
  // --- SIGNATURE EDITIONS ---
  {
    id: "elevate-every-pour-whiskey-set",
    slug: "elevate-every-pour-crystal-whiskey-glass-set",
    name: "Elevate Every Pour — 6-Piece Crystal Whiskey Glass Set",
    shortDescription: "Timeless cut-crystal whiskey glasses in luxury burgundy & gold gift box.",
    description:
      "Elevate Every Pour: crafted with timeless precision, this 6-piece premium crystal glass set combines brilliant clarity with a deep geometric cut base. Designed for fine single malts, classic cocktails, and festive celebrations. Presented in VITRAG's signature gold-lined burgundy presentation box, ready for luxury gifting.",
    category: "Signature Editions",
    collectionIds: ["signature-editions", "mugs-cups", "gift-sets"],
    sku: "VIT-SIG-01-WHS",
    price: 249900, // ₹2,499
    compareAtPrice: 299900,
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840531/vitrag/products/nfcut030ltu9iza7ded8.png",
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
    collectionIds: ["signature-editions", "platters-serving", "gift-sets"],
    sku: "VIT-SIG-02-ROSE",
    price: 169900, // ₹1,699
    compareAtPrice: 199900,
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840532/vitrag/products/b68vbkwcapraqbr1fqrv.png",
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
    collectionIds: ["signature-editions", "mugs-cups", "gift-sets"],
    sku: "VIT-SIG-03-CAM",
    price: 219900, // ₹2,199
    compareAtPrice: 259900,
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840533/vitrag/products/n5hycyxmhehrdwjdmtbw.png",
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
    collectionIds: ["dinner-sets", "wedding-gifts"],
    sku: "VIT-DS-01",
    price: 499900, // ₹4,999
    compareAtPrice: 599900,
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840534/vitrag/categories/flvbxuosczgcuepmxcmn.jpg",
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
    collectionIds: ["dinner-sets", "wedding-gifts"],
    sku: "VIT-DS-02",
    price: 699900, // ₹6,999
    compareAtPrice: 799900,
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840538/vitrag/hero/ldiysrt5vo0onozwfrln.jpg",
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
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840539/vitrag/hero/fxga513p4taxonuyoi1y.jpg",
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
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840536/vitrag/categories/sm3piv7tv3v21rwcl1gy.jpg",
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
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840540/vitrag/hero/tjfh9qncztgkvjykejui.jpg",
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
    collectionIds: ["dry-fruit-boxes", "gift-sets", "wedding-gifts"],
    sku: "VIT-DF-01",
    price: 189900, // ₹1,899
    compareAtPrice: 229900,
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840536/vitrag/categories/u108qh4mrzwmk5frkpwx.jpg",
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
    collectionIds: ["dry-fruit-boxes", "gift-sets", "wedding-gifts"],
    sku: "VIT-DF-02",
    price: 229900, // ₹2,299
    currency: "INR",
    images: [
      {
        src: "https://res.cloudinary.com/pmip0yum/image/upload/v1792840536/vitrag/categories/u108qh4mrzwmk5frkpwx.jpg",
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
