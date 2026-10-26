import { NextResponse } from "next/server";
import { isServerAdminAuthenticated } from "@/lib/serverAuth";

export async function GET() {
  const authenticated = await isServerAdminAuthenticated();
  return NextResponse.json({ authenticated });
}
