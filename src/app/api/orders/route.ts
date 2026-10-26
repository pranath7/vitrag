import { NextResponse } from "next/server";
import { AdminOrder } from "@/lib/adminTypes";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      customerName,
      customerPhone,
      customerEmail,
      shippingAddress,
      city,
      state,
      pinCode,
      giftNote,
      items,
      totalEstimatedPaise,
    } = body || {};

    // 1. Validation
    if (!customerName || typeof customerName !== "string" || customerName.trim().length < 2 || customerName.length > 100) {
      return NextResponse.json(
        { success: false, error: "Valid customer name (2-100 characters) is required." },
        { status: 400 }
      );
    }

    if (!customerPhone || typeof customerPhone !== "string" || customerPhone.trim().length < 8 || customerPhone.length > 20) {
      return NextResponse.json(
        { success: false, error: "Valid contact phone number is required." },
        { status: 400 }
      );
    }

    if (!shippingAddress || typeof shippingAddress !== "string" || shippingAddress.trim().length < 5 || shippingAddress.length > 500) {
      return NextResponse.json(
        { success: false, error: "Valid shipping address is required." },
        { status: 400 }
      );
    }

    if (!city || typeof city !== "string" || city.trim().length < 2 || city.length > 100) {
      return NextResponse.json(
        { success: false, error: "Valid city is required." },
        { status: 400 }
      );
    }

    if (!state || typeof state !== "string" || state.trim().length < 2 || state.length > 100) {
      return NextResponse.json(
        { success: false, error: "Valid state is required." },
        { status: 400 }
      );
    }

    if (!pinCode || typeof pinCode !== "string" || !/^\d{6}$/.test(pinCode.trim())) {
      return NextResponse.json(
        { success: false, error: "Valid 6-digit postal PIN code is required." },
        { status: 400 }
      );
    }

    if (!Array.isArray(items) || items.length === 0 || items.length > 50) {
      return NextResponse.json(
        { success: false, error: "Order items list must contain between 1 and 50 items." },
        { status: 400 }
      );
    }

    const sanitizedItems = items.map((i) => ({
      productId: String(i.productId || "").slice(0, 100),
      name: String(i.name || "").slice(0, 200),
      variantName: i.variantName ? String(i.variantName).slice(0, 100) : undefined,
      quantity: Math.max(1, Math.min(50, Math.floor(Number(i.quantity) || 1))),
      pricePaise: Math.max(0, Math.floor(Number(i.pricePaise) || 0)),
      image: i.image ? String(i.image).slice(0, 500) : undefined,
    }));

    // Calculate/verify total estimated paise safely
    const computedTotal = sanitizedItems.reduce(
      (sum, item) => sum + item.pricePaise * item.quantity,
      0
    );

    // 2. Server-enforced secure order creation
    // CRITICAL: Force status to "new", ignore any client-injected admin fields!
    const sanitizedOrder: AdminOrder = {
      id: `VIT-ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      customerEmail: customerEmail && typeof customerEmail === "string" ? customerEmail.trim().slice(0, 100) : undefined,
      shippingAddress: shippingAddress.trim(),
      city: city.trim(),
      state: state.trim(),
      pinCode: pinCode.trim(),
      giftNote: giftNote && typeof giftNote === "string" ? giftNote.trim().slice(0, 500) : undefined,
      items: sanitizedItems,
      status: "new", // FORCED
      totalEstimatedPaise: typeof totalEstimatedPaise === "number" && totalEstimatedPaise >= 0 ? totalEstimatedPaise : computedTotal,
      paymentMode: "whatsapp",
      source: "Website Checkout",
      // admin-only fields deliberately excluded
    };

    return NextResponse.json({
      success: true,
      order: sanitizedOrder,
    });
  } catch (error) {
    console.error("Order processing error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process order." },
      { status: 500 }
    );
  }
}
