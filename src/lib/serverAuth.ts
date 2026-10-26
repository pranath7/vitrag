import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "vitrag_admin_session";
// Server-only secret key for HMAC signing
const SESSION_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "vitrag-admin-secure-auth-secret-key-2026";

export function getExpectedAdminPasscode(): string {
  return process.env.ADMIN_PASSCODE || "vitrag2026";
}

/**
 * Timing-safe comparison to prevent timing attacks.
 */
export function verifyAdminPasscode(provided: string): boolean {
  const expected = getExpectedAdminPasscode();
  if (!provided || typeof provided !== "string") return false;

  const providedBuffer = Buffer.from(provided, "utf8");
  const expectedBuffer = Buffer.from(expected, "utf8");

  if (providedBuffer.length !== expectedBuffer.length) {
    // Constant time dummy comparison
    crypto.timingSafeEqual(expectedBuffer, expectedBuffer);
    return false;
  }

  return crypto.timingSafeEqual(providedBuffer, expectedBuffer);
}

/**
 * Create a cryptographically signed session token.
 */
export function createSessionToken(expiresInHours: number = 24): string {
  const expiresAt = Date.now() + expiresInHours * 60 * 60 * 1000;
  const payload = JSON.stringify({ role: "admin", expiresAt });
  const payloadBase64 = Buffer.from(payload, "utf8").toString("base64url");
  const signature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify a signed session token.
 */
export function verifySessionToken(token: string): boolean {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [payloadBase64, providedSignature] = parts;
  const expectedSignature = crypto
    .createHmac("sha256", SESSION_SECRET)
    .update(payloadBase64)
    .digest("base64url");

  const providedSigBuf = Buffer.from(providedSignature, "utf8");
  const expectedSigBuf = Buffer.from(expectedSignature, "utf8");

  if (providedSigBuf.length !== expectedSigBuf.length) {
    return false;
  }

  if (!crypto.timingSafeEqual(providedSigBuf, expectedSigBuf)) {
    return false;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadBase64, "base64url").toString("utf8"));
    if (typeof payload.expiresAt !== "number" || Date.now() > payload.expiresAt) {
      return false;
    }
    return payload.role === "admin";
  } catch {
    return false;
  }
}

/**
 * Verify admin session from Next.js server cookie.
 */
export async function isServerAdminAuthenticated(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(SESSION_COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) return false;
    return verifySessionToken(sessionCookie.value);
  } catch {
    return false;
  }
}

export { SESSION_COOKIE_NAME };
