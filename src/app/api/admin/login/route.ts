import { NextResponse } from "next/server";
import { verifyAdminPasscode, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/serverAuth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { passcode, remember } = body || {};

    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json(
        { success: false, error: "Admin passcode is required." },
        { status: 400 }
      );
    }

    const isValid = verifyAdminPasscode(passcode.trim());
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: "Invalid admin passcode." },
        { status: 401 }
      );
    }

    const maxAgeHours = remember ? 24 * 30 : 24; // 30 days or 1 day
    const token = createSessionToken(maxAgeHours);

    const response = NextResponse.json({ success: true });
    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: maxAgeHours * 60 * 60,
    });

    return response;
  } catch (error) {
    console.error("Admin login error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error during authentication." },
      { status: 500 }
    );
  }
}
