const { test, describe, before, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const path = require("node:path");
const {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} = require("@firebase/rules-unit-testing");
const { doc, getDoc, setDoc, deleteDoc } = require("firebase/firestore");

const PROJECT_ID = "vitrag-security-rules-test";
const rulesPath = path.resolve(__dirname, "../firestore.rules");
const rulesContent = fs.readFileSync(rulesPath, "utf8");

let testEnv;

describe("VITRAG Firestore Security Rules", () => {
  before(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: PROJECT_ID,
      firestore: {
        host: process.env.FIRESTORE_EMULATOR_HOST?.split(":")[0] || "127.0.0.1",
        port: parseInt(process.env.FIRESTORE_EMULATOR_HOST?.split(":")[1] || "8080", 10),
        rules: rulesContent,
      },
    });
  });

  after(async () => {
    if (testEnv) {
      await testEnv.cleanup();
    }
  });

  beforeEach(async () => {
    if (testEnv) {
      await testEnv.clearFirestore();
    }
  });

  // -------------------------------------------------------------
  // 1. PRODUCTS COLLECTION
  // -------------------------------------------------------------
  describe("Products Collection (/products)", () => {
    test("public / anonymous visitor can read products", async () => {
      // Seed a product with admin privileges first
      await testEnv.withSecurityRulesDisabled(async (context) => {
        const adminDb = context.firestore();
        await setDoc(doc(adminDb, "products", "prod-101"), {
          id: "prod-101",
          name: "6-Piece Crystal Knobs Dry Fruit Set",
          price: 849900,
          availability: "in-stock",
        });
      });

      const unauthDb = testEnv.unauthenticatedContext().firestore();
      const productRef = doc(unauthDb, "products", "prod-101");
      await assertSucceeds(getDoc(productRef));
    });

    test("anonymous visitor CANNOT create, update, or delete products", async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      const productRef = doc(unauthDb, "products", "prod-101");

      await assertFails(
        setDoc(productRef, {
          id: "prod-101",
          name: "Hacked Product",
          price: 0,
          availability: "in-stock",
        })
      );

      await assertFails(deleteDoc(productRef));
    });

    test("authenticated non-admin user CANNOT write to products", async () => {
      const userDb = testEnv.authenticatedContext("regular-user", {}).firestore();
      const productRef = doc(userDb, "products", "prod-101");

      await assertFails(
        setDoc(productRef, {
          id: "prod-101",
          name: "Unauthorized Write",
          price: 100,
          availability: "in-stock",
        })
      );
    });

    test("authenticated admin CAN create, update, and read products", async () => {
      const adminDb = testEnv
        .authenticatedContext("admin-user", { admin: true })
        .firestore();
      const productRef = doc(adminDb, "products", "prod-202");

      await assertSucceeds(
        setDoc(productRef, {
          id: "prod-202",
          name: "Imperial Gold Porcelain Dinner Set",
          price: 1899900,
          availability: "in-stock",
          sku: "VIT-IMP-202",
        })
      );

      await assertSucceeds(getDoc(productRef));
    });
  });

  // -------------------------------------------------------------
  // 2. ORDERS COLLECTION (Sensitive PII)
  // -------------------------------------------------------------
  describe("Orders Collection (/orders)", () => {
    test("anonymous visitor CANNOT read orders", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), "orders", "VIT-ORD-1001"), {
          id: "VIT-ORD-1001",
          customerName: "Jane Doe",
          customerPhone: "+91 9876543210",
          shippingAddress: "123 Park Avenue",
          totalEstimatedPaise: 849900,
          status: "new",
        });
      });

      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(getDoc(doc(unauthDb, "orders", "VIT-ORD-1001")));
    });

    test("anonymous visitor CANNOT write or tamper with orders directly", async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        setDoc(doc(unauthDb, "orders", "VIT-ORD-1002"), {
          id: "VIT-ORD-1002",
          customerName: "Attacker",
          status: "paid",
        })
      );
    });

    test("authenticated non-admin user CANNOT read or write orders", async () => {
      const userDb = testEnv.authenticatedContext("normal-user", {}).firestore();
      await assertFails(getDoc(doc(userDb, "orders", "VIT-ORD-1001")));
      await assertFails(
        setDoc(doc(userDb, "orders", "VIT-ORD-1003"), {
          id: "VIT-ORD-1003",
          status: "new",
        })
      );
    });

    test("authenticated admin CAN read, update, and manage orders", async () => {
      const adminDb = testEnv
        .authenticatedContext("admin-user", { admin: true })
        .firestore();
      const orderRef = doc(adminDb, "orders", "VIT-ORD-2001");

      await assertSucceeds(
        setDoc(orderRef, {
          id: "VIT-ORD-2001",
          customerName: "Verified VIP Customer",
          customerPhone: "+91 9840610405",
          shippingAddress: "Alwarpet, Chennai",
          city: "Chennai",
          state: "Tamil Nadu",
          pinCode: "600018",
          totalEstimatedPaise: 1249900,
          status: "new",
          paymentMode: "whatsapp",
          source: "Website Checkout",
          createdAt: new Date().toISOString(),
        })
      );

      await assertSucceeds(getDoc(orderRef));
    });
  });

  // -------------------------------------------------------------
  // 3. ABANDONED CARTS COLLECTION
  // -------------------------------------------------------------
  describe("Abandoned Carts Collection (/abandoned_carts)", () => {
    test("anonymous visitor CANNOT read abandoned carts", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), "abandoned_carts", "cart_999"), {
          id: "cart_999",
          customerPhone: "+91 9123456789",
          recovered: false,
        });
      });

      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(getDoc(doc(unauthDb, "abandoned_carts", "cart_999")));
    });

    test("anonymous visitor CANNOT write or delete abandoned carts", async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        setDoc(doc(unauthDb, "abandoned_carts", "cart_888"), {
          id: "cart_888",
          recovered: true,
        })
      );
    });

    test("authenticated admin CAN read and manage abandoned carts", async () => {
      const adminDb = testEnv
        .authenticatedContext("admin-user", { admin: true })
        .firestore();
      const cartRef = doc(adminDb, "abandoned_carts", "cart_777");

      await assertSucceeds(
        setDoc(cartRef, {
          id: "cart_777",
          customerName: "Potential Buyer",
          customerPhone: "+91 9840012345",
          totalEstimatedPaise: 649900,
          lastActive: new Date().toISOString(),
          recovered: false,
        })
      );

      await assertSucceeds(getDoc(cartRef));
    });
  });

  // -------------------------------------------------------------
  // 4. BULK INQUIRIES COLLECTION
  // -------------------------------------------------------------
  describe("Bulk Inquiries Collection (/bulk_inquiries)", () => {
    test("anonymous visitor CANNOT read corporate bulk inquiries", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), "bulk_inquiries", "inq_501"), {
          id: "inq_501",
          name: "Corporate Client",
          phone: "+91 9999988888",
          productInterest: "Diwali 500 Gift Sets",
          status: "new",
        });
      });

      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(getDoc(doc(unauthDb, "bulk_inquiries", "inq_501")));
    });

    test("anonymous visitor CANNOT write bulk inquiries directly to Firestore", async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(
        setDoc(doc(unauthDb, "bulk_inquiries", "inq_502"), {
          id: "inq_502",
          name: "Attacker Lead",
          status: "converted",
        })
      );
    });

    test("authenticated admin CAN read and update bulk inquiries", async () => {
      const adminDb = testEnv
        .authenticatedContext("admin-user", { role: "admin" })
        .firestore();
      const inqRef = doc(adminDb, "bulk_inquiries", "inq_601");

      await assertSucceeds(
        setDoc(inqRef, {
          id: "inq_601",
          name: "Larsen & Toubro Corporate Desk",
          phone: "+91 9876543210",
          productInterest: "Dry Fruit Box Executive Hampers",
          quantity: "250 sets",
          budgetPerGift: "₹4,000",
          pinCode: "600001",
          status: "new",
          createdAt: new Date().toISOString(),
        })
      );

      await assertSucceeds(getDoc(inqRef));
    });
  });

  // -------------------------------------------------------------
  // 5. STORE SETTINGS COLLECTION
  // -------------------------------------------------------------
  describe("Store Settings Collection (/store_settings)", () => {
    test("anonymous visitor CANNOT read or write store settings", async () => {
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), "store_settings", "general"), {
          upiId: "9840610405@pthdfc",
          whatsappNumber: "916369142027",
        });
      });

      const unauthDb = testEnv.unauthenticatedContext().firestore();
      await assertFails(getDoc(doc(unauthDb, "store_settings", "general")));
      await assertFails(
        setDoc(doc(unauthDb, "store_settings", "general"), {
          upiId: "attacker@upi",
        })
      );
    });

    test("authenticated admin CAN read and update store settings", async () => {
      const adminDb = testEnv
        .authenticatedContext("admin-user", { admin: true })
        .firestore();
      const settingsRef = doc(adminDb, "store_settings", "general");

      await assertSucceeds(
        setDoc(settingsRef, {
          whatsappNumber: "916369142027",
          displayPhone: "+91 63691 42027",
          email: "pranathwork@gmail.com",
          upiId: "9840610405@pthdfc",
          address: "Sowcarpet, Chennai",
          announcementText: "Diwali Special",
          announcementEnabled: true,
          freeShippingThresholdPaise: 400000,
          standardDeliveryFeePaise: 19900,
          storeCurrency: "INR",
        })
      );

      await assertSucceeds(getDoc(settingsRef));
    });
  });

  // -------------------------------------------------------------
  // 6. DEFAULT DENY FOR UNMAPPED PATHS
  // -------------------------------------------------------------
  describe("Default Deny Fallback", () => {
    test("unmapped collection paths are denied for all users", async () => {
      const unauthDb = testEnv.unauthenticatedContext().firestore();
      const adminDb = testEnv
        .authenticatedContext("admin-user", { admin: true })
        .firestore();

      await assertFails(getDoc(doc(unauthDb, "system_secrets", "master_key")));
      await assertFails(
        setDoc(doc(unauthDb, "internal_logs", "log_1"), { msg: "test" })
      );
      await assertFails(getDoc(doc(adminDb, "unmapped_collection", "doc_1")));
    });
  });
});
