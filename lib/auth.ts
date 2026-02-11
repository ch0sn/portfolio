export type AuthGate = "personal" | "employer";

const TOKEN_KEYS: Record<AuthGate, string> = {
  personal: "portfolio_personal_token",
  employer: "portfolio_employer_token",
};

export function getStoredToken(area: AuthGate): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(TOKEN_KEYS[area]);
}

export function setStoredToken(token: string, area: AuthGate): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(TOKEN_KEYS[area], token);
}

export function clearStoredToken(area: AuthGate): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(TOKEN_KEYS[area]);
}

/** Decode JWT payload without verifying (client-side expiry check only). */
export function isTokenValid(token: string, expectedAccess?: AuthGate): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return false;
    const payload = JSON.parse(
      atob(parts[1].replace(/-/g, "+").replace(/_/g, "/"))
    ) as { exp?: number; access?: string };
    if (typeof payload.exp !== "number") return false;
    if (payload.exp * 1000 <= Date.now()) return false;
    if (expectedAccess && payload.access !== expectedAccess) return false;
    return true;
  } catch {
    return false;
  }
}
