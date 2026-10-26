const { test, describe } = require("node:test");
const assert = require("node:assert");

describe("Storefront & Admin API Security Validation", () => {
  const BASE_URL = "http://localhost:3000";

  test("POST /api/admin/login rejects invalid passcodes with 401", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode: "wrong_password_123" }),
    });
    assert.strictEqual(res.status, 401);
    const data = await res.json();
    assert.strictEqual(data.success, false);
  });

  test("POST /api/admin/login accepts valid passcode and sets httpOnly session cookie", async () => {
    const res = await fetch(`${BASE_URL}/api/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ passcode: "vitrag2026", remember: true }),
    });
    assert.strictEqual(res.status, 200);
    const setCookie = res.headers.get("set-cookie");
    assert.ok(setCookie, "Set-Cookie header must be present");
    assert.ok(setCookie.includes("vitrag_admin_session"), "Cookie name must be vitrag_admin_session");
    assert.ok(setCookie.includes("HttpOnly"), "Cookie must be HttpOnly");
  });

  test("POST /api/orders enforces status='new' and strips client-injected admin fields", async () => {
    const res = await fetch(`${BASE_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Radha Krishnan",
        customerPhone: "9840610405",
        shippingAddress: "123 NSC Bose Road",
        city: "Chennai",
        state: "Tamil Nadu",
        pinCode: "600001",
        status: "delivered", // Attacker trying to set delivered
        paymentReference: "UTR99998888", // Attacker trying to mark paid
        internalNotes: "VIP FREE GIFT",
        items: [
          {
            productId: "prod-1",
            name: "Crystal Server Tray",
            quantity: 1,
            pricePaise: 849900,
          },
        ],
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.order.status, "new");
    assert.strictEqual(data.order.paymentReference, undefined);
    assert.strictEqual(data.order.internalNotes, undefined);
  });

  test("POST /api/bulk-inquiries enforces status='new' and sanitizes input", async () => {
    const res = await fetch(`${BASE_URL}/api/bulk-inquiries`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Corporate Client",
        phone: "9876543210",
        productInterest: "Diwali Hampers",
        quantity: "100",
        pinCode: "600001",
        status: "converted", // Attacker trying to fake status
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.inquiry.status, "new");
  });

  test("POST /api/abandoned-carts forces recovered=false", async () => {
    const res = await fetch(`${BASE_URL}/api/abandoned-carts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: "Shopper",
        customerPhone: "9123456780",
        items: [{ productId: "p1", name: "Bowl", quantity: 1, pricePaise: 1000 }],
        recovered: true, // Attacker trying to spoof recovery
      }),
    });
    assert.strictEqual(res.status, 200);
    const data = await res.json();
    assert.strictEqual(data.success, true);
    assert.strictEqual(data.cart.recovered, false);
  });
});
