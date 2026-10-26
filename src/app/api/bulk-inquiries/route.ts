import { NextResponse } from "next/server";
import { AdminBulkInquiry } from "@/lib/adminTypes";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      name,
      company,
      phone,
      email,
      productInterest,
      quantity,
      budgetPerGift,
      deliveryDate,
      pinCode,
      notes,
    } = body || {};

    if (!name || typeof name !== "string" || name.trim().length < 2 || name.length > 100) {
      return NextResponse.json(
        { success: false, error: "Contact name is required (2-100 characters)." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || phone.trim().length < 8 || phone.length > 20) {
      return NextResponse.json(
        { success: false, error: "Valid contact phone number is required." },
        { status: 400 }
      );
    }

    if (!productInterest || typeof productInterest !== "string" || productInterest.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Product or tableware interest details are required." },
        { status: 400 }
      );
    }

    if (!quantity || typeof quantity !== "string") {
      return NextResponse.json(
        { success: false, error: "Estimated quantity is required." },
        { status: 400 }
      );
    }

    if (!pinCode || typeof pinCode !== "string" || !/^\d{6}$/.test(pinCode.trim())) {
      return NextResponse.json(
        { success: false, error: "Valid 6-digit postal PIN code is required." },
        { status: 400 }
      );
    }

    // Force safe, server-sanitized inquiry:
    const sanitizedInquiry: AdminBulkInquiry = {
      id: `inq_${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: name.trim(),
      company: company && typeof company === "string" ? company.trim().slice(0, 100) : undefined,
      phone: phone.trim(),
      email: email && typeof email === "string" ? email.trim().slice(0, 100) : undefined,
      productInterest: productInterest.trim().slice(0, 200),
      quantity: quantity.trim().slice(0, 50),
      budgetPerGift: budgetPerGift && typeof budgetPerGift === "string" ? budgetPerGift.trim().slice(0, 50) : "Negotiable",
      deliveryDate: deliveryDate && typeof deliveryDate === "string" ? deliveryDate.trim().slice(0, 50) : undefined,
      pinCode: pinCode.trim(),
      notes: notes && typeof notes === "string" ? notes.trim().slice(0, 1000) : undefined,
      status: "new", // FORCED
      // admin-only internalNotes and estimatedValuePaise are excluded
    };

    return NextResponse.json({
      success: true,
      inquiry: sanitizedInquiry,
    });
  } catch (error) {
    console.error("Bulk inquiry processing error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process bulk inquiry." },
      { status: 500 }
    );
  }
}
