import { createHash, timingSafeEqual } from "node:crypto";

export const adminSessionCookieName = "colourcraft-admin-session";

export class AdminAuthError extends Error {}
export class AdminConfigError extends Error {}

function getHeaderSecret(request: Request) {
  const authorization = request.headers.get("authorization");
  if (authorization?.startsWith("Bearer ")) {
    return authorization.slice("Bearer ".length).trim();
  }

  return request.headers.get("x-admin-secret")?.trim() ?? "";
}

function getCookieValue(request: Request, cookieName: string) {
  const cookieHeader = request.headers.get("cookie") ?? "";
  const match = cookieHeader
    .split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${cookieName}=`));

  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : "";
}

export function getConfiguredAdminSecret() {
  return process.env.ADMIN_SECRET?.trim() ?? "";
}

export function getAdminSessionValue() {
  const configuredSecret = getConfiguredAdminSecret();
  if (!configuredSecret) {
    return "";
  }

  return createHash("sha256").update(configuredSecret).digest("hex");
}

export function isValidAdminSecret(secret: string | undefined) {
  const configuredSecret = getConfiguredAdminSecret();
  const candidate = secret?.trim() ?? "";
  if (!configuredSecret || !candidate) {
    return false;
  }

  const configuredBuffer = createHash("sha256").update(configuredSecret).digest();
  const candidateBuffer = createHash("sha256").update(candidate).digest();

  return timingSafeEqual(configuredBuffer, candidateBuffer);
}

export function hasValidAdminSessionCookie(cookieValue: string | undefined) {
  const expectedValue = getAdminSessionValue();
  if (!cookieValue || !expectedValue) {
    return false;
  }

  const providedBuffer = Buffer.from(cookieValue);
  const expectedBuffer = Buffer.from(expectedValue);
  if (providedBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(providedBuffer, expectedBuffer);
}

export function assertAdminAuthorized(request: Request) {
  if (!getConfiguredAdminSecret()) {
    throw new AdminConfigError("ADMIN_SECRET is not configured.");
  }

  const headerSecret = getHeaderSecret(request);
  const sessionCookie = getCookieValue(request, adminSessionCookieName);
  if (!isValidAdminSecret(headerSecret) && !hasValidAdminSessionCookie(sessionCookie)) {
    throw new AdminAuthError("Unauthorized admin request.");
  }
}
