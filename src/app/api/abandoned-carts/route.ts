import { NextResponse } from "next/server";
import { AbandonedCart } from "@/lib/adminTypes";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, customerName, customerPhone, customerEmail, items, totalEstimatedPaise } = body || {};

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, error: "Items list is required for cart recovery." },
        { status: 400 }
      );
    }

    const sanitizedItems = items.slice(0, 50).map((i) => ({
      productId: String(i.productId || "").slice(0, 100),
      name: String(i.name || "").slice(0, 200),
      variantName: i.variantName ? String(i.variantName).slice(0, 100) : undefined,
      quantity: Math.max(1, Math.min(50, Math.floor(Number(i.quantity) || 1))),
      pricePaise: Math.max(0, Math.floor(Number(i.pricePaise) || 0)),
      image: i.image ? String(i.image).slice(0, 500) : undefined,
    }));

    const sanitizedCart: AbandonedCart = {
      id: typeof id === "string" && id.startsWith("cart_") ? id : `cart_${Date.now()}`,
      customerName: customerName ? String(customerName).trim().slice(0, 100) : undefined,
      customerPhone: customerPhone ? String(customerPhone).trim().slice(0, 20) : undefined,
      customerEmail: customerEmail ? String(customerEmail).trim().slice(0, 100) : undefined,
      items: sanitizedItems,
      totalEstimatedPaise: Math.max(0, Math.floor(Number(totalEstimatedPaise) || 0)),
      lastActive: new Date().toISOString(),
      recovered: false, // FORCED: client cannot mark as recovered on creation
    };

    return NextResponse.json({
      success: true,
      cart: sanitizedCart,
    });
  } catch (error) {
    console.error("Abandoned cart tracking error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record abandoned cart." },
      { status: 500 }
    );
  }
}
